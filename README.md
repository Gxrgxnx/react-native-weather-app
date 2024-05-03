# Getting Started

## Step 1: Install dependencies

First, you will need to install the needed **dependecies** for the app.

To do so, run the following command from the _root_ of the project:

```bash
# using npm
npm install

# OR using Yarn
yarn
```

In order to install the required CocoaPods dependencies for the iOS project you need to navigate to the ios directory and run:

```bash
pod install
```

## Step 2: Configure your .env file

If you haven't already created an [OpenWeather](https://openweathermap.org/) account, you should create one.

Then, go to your account page and copy the **API key**.

Create a `.env` file at the root level of the project.

Add the following content to the `.env` file:

```plaintext
API_KEY=yourAPIKey
```

Make sure to replace yourAPIKey with the actual **API key** you obtained from your OpenWeather account.

## Step 3: Start the Metro Server

You will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of the project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 4: Start the Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of the project. Run the following command to start the _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```
