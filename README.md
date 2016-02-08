# RapPad Mobile

The RapPad Mobile app for both Android and iOS built using React Native.

## Requirements

- [Node](https://nodejs.org) 4.x or better
- [React Native](http://facebook.github.io/react-native/docs/getting-started.html) for development
- [Xcode](https://developer.apple.com/xcode/) for iOS development (optional)
- [Android SDK](https://developer.android.com/sdk/) for Android development (optional)
- [Android Lollipop](https://www.android.com/versions/lollipop-5-0/) or better for Android device testing (optional)

## Stack

- [React Native](http://facebook.github.io/react-native/) for native app development

## Installation

Start by cloning this repo and installing dependencies:

```sh
npm install
```

1. Make Gradle faster: `https://docs.gradle.org/2.4/userguide/gradle_daemon.html`

## Running

1. `react-native start`
2. `adb reverse tcp:8081 tcp:8081`
3. `cd ./android && ./gradlew installDebug` to install the APK.
4. `react-native run-ios` to start up an iOS emulator.

### Upgrading

React Native is under active development, and we want to keep up with it.

1. `react-native upgrade`
2. `rnpm link` which will add the native modules back.

## Troubleshooting

Below you'll find the issues we ran into and the fixes we found for them.

### Unable to download JS bundle

Make sure you ran the `adb reverse` command. Restarting your computer can help sometimes. Hit Crt+M to reload JS.

### I accidentally deleted some shit.

1. `react-native upgrade` will rebuild most files.
