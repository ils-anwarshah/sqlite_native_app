import { View, Text, Image } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Login';
import Register from '../Register';
import Dashboard from '../Dashboard';

 const Stack = createNativeStackNavigator();
export default function StackNavigator() {
  return (
   <Stack.Navigator screenOptions={{headerBackground:()=>(<Image source={{uri:"https://i.pinimg.com/736x/ee/94/56/ee9456d80be646baa90d3c609f5e8a5a.jpg"}} style={{width:'100%', height:60,}}></Image>)}}>
    <Stack.Screen name='login' options={{title:'Login'}} component={Login}/>
    <Stack.Screen name='register' options={{title:'Register'}} component={Register}/>
    <Stack.Screen name='dashboard' component={Dashboard}  options={{title:"All Users",headerBackVisible:false, }}/>
   </Stack.Navigator>
  )
}