# android-sdk-numic-plugin

<img align="right" src="https://github.com/tobua/android-sdk-numic-plugin/raw/main/logo.png" width="20%" alt="Android SDK Numic Plugin Logo" />

Numic plugin to configure native folders to use the currently installed Android SDK. This ensures the build will always be successful even after updating the system.

## Installation

This plugin requires the project is managed through [numic](https://npmjs.com/numic).

```
npm i --save-dev android-sdk-numic-plugin
```

`buildToolsVersion`, `compileSdkVersion` and `targetSdkVersion` will be set to the newest one installed, while `minSdkVersion` will default to the React Native template unless configured explicitly.

## Prerequisites

Make sure to update or install the Android SDK CLI Tools. This can be done when opening a project with Android Studio and clicking the icon "SDK Manager" on the top-right.

<p align="center">
  <img src="https://github.com/tobua/android-sdk-numic-plugin/raw/main/update.png" width="80%" alt="Updating Android CLI Tools" />
</p>

Furthermore, it's important to properly configure the `$ANDROID_HOME` variable. On macOS when installing Android Studio this can be set to `export ANDROID_HOME=$HOME/Library/Android/sdk` in `~/.zshrc`.

## Configuration

The detailed Android SDK versions can be configured in `package.json` under the `numic` property. This will override automatically using the installed version as described above.

```js
{
  "name": "my-app",
  "numic": {
    "android-sdk-numic-plugin": {
      "compileSdkVersion": 33,
      "targetSdkVersion": 33,
      "minSdkVersion": 21,
      "buildToolsVersion": "33.0.3"
    }
  }
}
```
