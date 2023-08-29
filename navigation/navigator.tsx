import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../screens/Home';
import Saved from '../screens/Saved';
import NewsOverview from '../screens/NewsOverview';

const Stack = createNativeStackNavigator(); // Correctly named as Stack

const Tab = createBottomTabNavigator();

function HomeScreen() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name='Home' component={Home}></Tab.Screen>
            <Tab.Screen name='Saved' component={Saved}></Tab.Screen>
        </Tab.Navigator>
    );
}

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen options={{ headerShown: false }} name='Home' component={HomeScreen} />
                <Stack.Screen name='NewsOverview' component={NewsOverview} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
