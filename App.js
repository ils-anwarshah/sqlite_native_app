import { View, Text } from 'react-native'
import React from 'react'
import RootNavigator from './src/navigation/RootNavigator'
import Login from './src/Login'

export default function App() {
  return (
    <RootNavigator>
      <Login/>
    </RootNavigator>
  )
}