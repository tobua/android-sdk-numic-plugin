import { expect, test } from 'vitest'
import { readFile } from 'jest-fixture'
import { matchVersion } from '../match-version'

test('Extracts the correct versions for various script outputs.', () => {
  const initialMacScriptOutput = readFile('test/script/initial-mac-installed.txt')
  const { buildToolsVersion, compileSdkVersion, targetSdkVersion } =
    matchVersion(initialMacScriptOutput)

  expect(buildToolsVersion).toEqual('33.0.1')
  expect(compileSdkVersion).toBe(33)
  expect(targetSdkVersion).toBe(33)
})
