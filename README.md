# RapPad Mobile

This is my app.

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

## Troubleshooting

### Unable to download JS bundle

Make sure you ran the `adb reverse` command. Restarting your computer can help sometimes. Hit Crt+M to reload JS.
