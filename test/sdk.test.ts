import { cpSync, mkdirSync } from 'fs'
import { join } from 'path'
import { expect, test, beforeEach, afterEach, vi } from 'vitest'
import { registerVitest, prepare, environment, packageJson, readFile } from 'jest-fixture'
import plugin from '../index'

const initialCwd = process.cwd()
registerVitest(beforeEach, afterEach, vi)

environment('sdk')

test('Creates logos in various sizes.', async () => {
  prepare([packageJson('sdk')])

  const buildGradlePath = join(process.cwd(), 'android/build.gradle')

  mkdirSync(join(process.cwd(), 'android'))
  cpSync(join(initialCwd, 'test/build.gradle'), buildGradlePath)

  await plugin({
    options: {
      buildToolsVersion: '123.456.789',
      compileSdkVersion: 456,
    },
  })

  const buildGradleContents = readFile(buildGradlePath)

  expect(buildGradleContents).toContain(`buildToolsVersion = "123.456.789"`)
  expect(buildGradleContents).toContain(`compileSdkVersion = 456`)
})
