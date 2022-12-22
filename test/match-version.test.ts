import { expect, test } from 'vitest'
import { readFile } from 'jest-fixture'
import { matchVersion } from '../match-version'

test('Extracts the correct versions for various script outputs.', () => {
  const initialMacScriptOutput = readFile('test/script/initial-mac.txt')
  const initialMacVersion = matchVersion(initialMacScriptOutput)

  expect(initialMacVersion).toEqual('33.0.3')
})
