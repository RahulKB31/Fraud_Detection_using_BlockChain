import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './pages/Home';
import VerifyProduct from './pages/VerifyProduct';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Home} options={{ title: 'Home' }} />
                <Stack.Screen name="VerifyProduct" component={VerifyProduct} options={{ title: 'Verify Product' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}