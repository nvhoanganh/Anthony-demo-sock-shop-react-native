import { registerRootComponent } from 'expo';

import App from './App';
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately

import * as appVesrion from './package.json';
import NewRelic from 'newrelic-react-native-agent'
NewRelic.startAgent("AAb47741c3bfa82c25ed8bf0c2fe336b668e488d07-NRMA");
NewRelic.setJSAppVersion(appVesrion.version);

registerRootComponent(App);
