/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App.js';
import {name as appName} from './app.json';
import Stacker from './src/Stacker.js';

const Main = () => {
    return <Stacker />;
};
AppRegistry.registerComponent(appName, () => Main);
