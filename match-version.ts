import semverSort from 'semver-sort'

// NOTE No longer used, can differ from compile and target SDK version.
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

const getMajorFromVersion = (version: string) => {
  return parseInt(version.split('.')[0], 10)
}

export const matchVersion = (sdkManagerListOutput: string) => {
  const buildToolsVersion = findNewestBuildToolsVersion(sdkManagerListOutput)
  const majorSdkVersion = getMajorFromVersion(buildToolsVersion)

  return {
    buildToolsVersion: buildToolsVersion,
    compileSdkVersion: majorSdkVersion,
    targetSdkVersion: majorSdkVersion,
  }
}
