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

export default async ({
  nativePath = process.cwd(),
  // eslint-disable-next-line no-console
  log = console.log,
  options = {},
}: PluginInput) => {
  const androidFolder = join(nativePath, 'android')

  const androidHome = execSync('echo $ANDROID_HOME').toString()

  if (!androidHome) {
    log('Missing $ANDROID_HOME variable in PATH', 'warning')
    return
  }

  let output: string

  try {
    output = execSync(
      '$ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager --list_installed',
    ).toString()
  } catch (error) {
    log(
      'Failed to run sdkmanager, make sure to install and update the Android SDK Command-line Tools and make sure Android Studio is up-to-date',
      'warning',
    )
    return
  }

  const matchedInstalledVersions = matchVersion(output)

  // Unless user explicitly specifies versions, use installed version or current defaults.
  options.buildToolsVersion ||= matchedInstalledVersions.buildToolsVersion ?? '34.0.0'
  options.compileSdkVersion ||= matchedInstalledVersions.compileSdkVersion ?? 34
  options.targetSdkVersion ||= matchedInstalledVersions.targetSdkVersion ?? 34
  options.minSdkVersion ||= 23

  replaceVersions(options, androidFolder)
}
