import { registerRootComponent } from 'expo';

import App from './App';
import NewRelic from 'newrelic-react-native-agent'
import * as appVesrion from './package.json';
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately

NewRelic.startAgent("AA8f0d153e428310876eac4255ba2abf6f75575c78-NRMA");
NewRelic.setJSAppVersion(appVesrion.version);
registerRootComponent(App);
