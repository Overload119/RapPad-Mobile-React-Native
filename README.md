# react-native-webpack-starter-kit
[![Dependency Status](https://david-dm.org/jhabdas/react-native-webpack-starter-kit.svg)](https://david-dm.org/jhabdas/react-native-webpack-starter-kit)
[![devDependency Status](https://david-dm.org/jhabdas/react-native-webpack-starter-kit/dev-status.svg)](https://david-dm.org/jhabdas/react-native-webpack-starter-kit#info=devDependencies)

A minimalist seed for building with React Native and Webpack. Leverages [`react-native-webpack-server`](https://github.com/mjohnston/react-native-webpack-server). Follows the latest React Native stable release. For a list of awesome boilerplates for React Native please visit [Awesome React Boilerplates](http://habd.as/awesome-react-boilerplates/#react-native).

For an example implementation check out [Lumpen Radio](https://github.com/jhabdas/lumpen-radio).

## Requirements

- [Xcode](https://developer.apple.com/xcode/)
- [Android SDK](https://developer.android.com/sdk/)
- Node 4.x or better

## Stack

- [React Native](http://facebook.github.io/react-native/) for native app development
- [Babel](http://babeljs.io/) for ES6+ support
- [Webpack](https://webpack.github.io/) module loader and bundler

## Installation

Start by cloning this repo and installing dependencies:

```sh
git clone https://github.com/jhabdas/react-native-webpack-starter-kit.git
cd react-native-webpack-starter-kit
npm install # Install Node.js dependencies listed in ./package.json
```

## Usage

Once dependencies are installed the application with:

```sh
npm start # or: node node_modules/.bin/react-native-webpack-server start
```

This will start a [Webpack Dev Server](react-native-webpack-starter-kit) which will watch your JS files for changes and automatically generate the `index.[platform].js` file expected by your app.

Then open `ios/App.xcodeproj` in Xcode, build and run the project. For Android setup please see the official [Android Setup](http://facebook.github.io/react-native/docs/android-setup.html#content) documentation. Here's a workaround to get [device debugging on Android](https://github.com/mjohnston/react-native-webpack-server/issues/65#issuecomment-149597280) working with the Webpack Dev Server.

If you run into any issues please see the [Getting Started](http://facebook.github.io/react-native/docs/getting-started.html) guide for React Native before submitting an issue.

## Bundling for distribution

1. Execute `npm run bundle` to generate the [offline JS bundle](https://facebook.github.io/react-native/docs/running-on-device-ios.html#using-offline-bundle).
2. For iOS, update `AppDelegate.m` to load from pre-bundled file on disk.
3. Test the application, create an archive and submit to the store.

Learn more about [Submitting to App Store](http://habd.as/reflecting-on-react-native-development/#submitting-to-app-store).
