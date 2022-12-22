import { execSync } from 'node:child_process'
import { join } from 'path'
import { matchVersion } from './match-version'
import { replaceVersions } from './replace-versions'
import type { Options } from './types'

interface PluginInput {
  projectPath?: string
  nativePath?: string
  log?: (message: string, type?: 'error' | 'warning') => void
  options?: Options
}

export default async ({ nativePath = process.cwd(), options = {} }: PluginInput) => {
  const androidFolder = join(nativePath, 'android')

  const output = execSync('$ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager --list').toString()
  const platformToolsVersion = matchVersion(output)

  options.buildToolsVersion ||= platformToolsVersion

  replaceVersions(options, androidFolder)
}
