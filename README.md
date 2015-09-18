# react-native-webpack-starter-kit
[![Dependency Status](https://david-dm.org/jhabdas/react-native-webpack-starter-kit.svg)](https://david-dm.org/jhabdas/react-native-webpack-starter-kit)
[![devDependency Status](https://david-dm.org/jhabdas/react-native-webpack-starter-kit/dev-status.svg)](https://david-dm.org/jhabdas/react-native-webpack-starter-kit#info=devDependencies)

A minimalist seed for building with React Native and Webpack.

For a list of awesome boilerplates for React Native please visit [Awesome React Boilerplates](http://habd.as/awesome-react-boilerplates/#react-native).

## Requirements

- [Xcode](https://developer.apple.com/xcode/)
- [Android SDK](https://developer.android.com/sdk/)
- Node 4.x or better

## Stack

- [React Native](http://facebook.github.io/react-native/) for native app development
- [Babel](http://babeljs.io/) for ES6+ support
- [Webpack](https://webpack.github.io/) module loader and bundler

## Installation

Strat by cloning this repo and installing dependencies:

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

Then open `ios/App.xcodeproj` in Xcode, build and run the project. For Android setup please see the official [Android Setup](http://facebook.github.io/react-native/docs/android-setup.html#content) documentation.

If you run into any issues please see the [Getting Started](http://facebook.github.io/react-native/docs/getting-started.html) guide for React Native before submitting an issue.
