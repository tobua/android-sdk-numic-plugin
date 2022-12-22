export const matchVersion = (sdkManagerListOutput: string) => {
  const matches = sdkManagerListOutput.match(
    /platform-tools\s*\|\s(\d{1,3}\.\d{1,3}\.\d{1,10})\s*\|/
  )

  if (!matches || !Array.isArray(matches)) {
    return undefined
  }

  const platformToolsVersion = matches[1]

  return platformToolsVersion
}
