import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

const AppStack = createStackNavigator();

import Incidents from './Pages/incidents';
import Details from './Pages/details';

export default function Routes(){
    return(
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{headerShown: false}}>
                <AppStack.Screen name="Incidents" component={Incidents}/>
                <AppStack.Screen name="Details" component={Details}/>
            </AppStack.Navigator>

        </NavigationContainer>
    );
}