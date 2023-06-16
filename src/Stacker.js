import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import App from '../App';
import Details from './Details';

const Stack = createNativeStackNavigator();

const Stacker = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Reddit" component={App} />
        <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Stacker;
