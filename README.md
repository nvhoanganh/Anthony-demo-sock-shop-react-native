# Set up NewRelic on React Native app developed using Expo Managed workflow (Tested on iOS)

## Create a new expo app

```bash

# install Expo cli
npm install --global expo-cli

# create new expo app, select `tabs (Typescript)` template when asked
expo init weavesock-shop-mobile

# make sure you can run the app (you should see Iphone 8 simulator open showing the app)
cd weavesock-shop-mobile
npm run ios

# run expo prebuild command
expo prebuild --clean

```

## Install NewRelic Mobile Agent

-   modify the `Podfile` founder under the `ios` folder and add `pod 'NewRelicAgent'` to the first line

```bash
# from inside the ios folder
cd ios
pod install
# you should see `Installing NewRelicAgent (7.3.4)` message
```

## Register your mobile app to New Relic One

-   Login to one.newrelic.com, click on `Add More Data`, search for Mobile, select XCFramework
-   On the next screen, enter name for your app
-   Select `CocoaPods` as installation method
-   Scroll to step 4 and copy this line
-   `[NewRelic startWithApplicationToken:@"YOUR_UNIQUE_TOKEN"];`
-   Modify `AppDelegate.m` file founder under the `ios\weavesock-shop-mobile` folder and add the following to line 2

```h
#import "AppDelegate.h"
// line 2
#import <NewRelic/NewRelic.h>
```

-   Modify `AppDelegate.m` file founder under the `ios\weavesock-shop-mobile` folder and add the following to `didFinishLaunchingWithOptions` method

```h
@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [NewRelic startWithApplicationToken:@"YOUR_UNIQUE_TOKEN"];
```

-   open XCode by running the following command

```bash
cd ios
open weavesock-shop-mobile.xcworkspace
```

-   In XCode, select your project in the navigator, then click on the application target.
-   Select Build Phases, then add a New Run Script Build Phase
-   In the script text area (beneath the Shell line) enter this script:

```bash
SCRIPT=`/usr/bin/find "${SRCROOT}" -name newrelic_postbuild.sh | head -n 1`

/bin/sh "${SCRIPT}" "YOUR_UNIQUE_TOKEN"
```

-   run your project again

```bash
# from the root folder (parent folder of ios folder)
npm run ios
```

-   open one.newrelic.com, you should see your app under `Explorer/Mobile applications`
![](2022-03-01-15-42-38.png)

## Deploy your app to iOS store

```bash
# install EAS tool
npm install -g eas-cli && eas login

# build IOS app, this will login to Apple Developer account, sign the app and build it in Expo Cloud
eas build --platform ios

# once done, submit the app to app store, this will guide you through the process of submitting your app to Apple App Store
eas submit -p ios
```

## Build Android version

```bash
# build AAB file which is used for submitting to Android App Store
eas build -p android

# you can also build it in APK format if you want to download and test it before submitting to the app store, check out the build profile in app.json
eas build -p android --profile preview
```