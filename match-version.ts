import semverSort from 'semver-sort'

const findPlatformTools = (sdkManagerListOutput: string) => {
  const matches = [...sdkManagerListOutput.matchAll(/platform-tools\s*\|\s(\d{1,3})/g)]

  if (!matches || !Array.isArray(matches)) {
    return undefined
  }

  // Newest version first.
  const sortedVersions = matches
    .map((match) => Number(match[1]))
    .sort()
    .reverse()

  // Only major version required.
  return sortedVersions[0]
}

const findNewestBuildToolsVersion = (sdkManagerListOutput: string) => {
  const matches = [...sdkManagerListOutput.matchAll(/build-tools;(\d{1,3}\.\d{1,3}\.\d{1,10})/g)]

  if (!matches || !Array.isArray(matches)) {
    return undefined
  }

  const availableVersions = matches.map((match) => match[1])

  // Newest version first.
  const sortedVersions = semverSort.desc(availableVersions)

  return sortedVersions[0]
}

export const matchVersion = (sdkManagerListOutput: string) => {
  const platformToolsVersion = findPlatformTools(sdkManagerListOutput)

  return {
    buildToolsVersion: findNewestBuildToolsVersion(sdkManagerListOutput),
    compileSdkVersion: platformToolsVersion,
    targetSdkVersion: platformToolsVersion,
  }
}
