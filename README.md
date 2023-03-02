# React Native Todo App with Firebase Firestore

This is a simple todo app built with React Native and Firebase Firestore. The app allows users to create, edit, and delete todos, and automatically syncs changes across all devices in real time.

## Screenshot

![screenshot image_ios](https://res.cloudinary.com/deevlog/image/upload/c_scale,h_400/v1677465597/Screenshot_2023-02-26_at_9.51.50_pm_jee6pv.png)

## Getting Started

Prerequisites
Before you can run this app, you need to set up the the development environment for React native. See the [React native documentation](https://reactnative.dev/docs/environment-setup) for detailed instructions.

You also need to create a Firebase project and enable Firestore. See the [React Native Firebase documentation](https://rnfirebase.io/) for detailed instructions.

## Installation

To install the app, follow these steps:

Clone the repository to your local machine:

```bash
gh repo clone N4oki/Todo-ReactNative-firestore
```

Change into the project directory:

``` bash 
cd Todo-ReactNative-firestore
```

Install dependencies:

``` bash
npm install
# or
yarn install
```

for ios
``` bash 
cd ios && pod install
```

Start the Metro bundler:

``` bash
npm start
# or
yarn start
```

Run the app on Android or iOS:

``` bash
npm run android
# or
npm run ios
```

## Built With

- React Native - a JavaScript framework for building native mobile apps
- Firebase Firestore - a NoSQL document database that syncs data in real time
- Firebase auth a user authentication and identity management service which allows developers to easily integrate secure authentication into their mobile and web applications
- Reanimated - a declarative library for building highly performant animations in React Native
- React Native Gesture Handler - a library that enables gesture recognition and handling in React Native apps, providing more control over touch gestures and allowing for more advanced interactions

## Contributing

Contributions are welcome! If you find any bugs or want to add a new feature, please open an issue or submit a pull request.
