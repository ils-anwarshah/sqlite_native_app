import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Login';
import Register from '../Register';
import Dashboard from '../Dashboard';

 const Stack = createNativeStackNavigator();
export default function StackNavigator() {
  return (
   <Stack.Navigator>
    <Stack.Screen name='login' component={Login}/>
    <Stack.Screen name='register' component={Register}/>
    <Stack.Screen name='dashboard' component={Dashboard}  options={{title:"All User",headerBackVisible:false} } />
   </Stack.Navigator>
  )
}