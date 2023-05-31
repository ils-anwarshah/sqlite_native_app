import { View, Text, ImageBackground, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import {openDatabase} from 'react-native-sqlite-storage'
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function Login({navigation}) {

  const [email, setEmail]  = useState('');
  const [password, setPassword ] = useState('');

  const db = openDatabase({
    name:'rn_sqlite',
  })


  return (
    <View>
      <ImageBackground source={{uri:'https://cdn.pixabay.com/photo/2022/06/29/19/07/colored-7292420__340.jpg'}} style={{height:'100%'}} blurRadius={80}>
      <View style={styles.InputContainer}>

        <TextInput placeholder={" Email"} value={email} style={styles.InputBox} onChangeText={e=>setEmail(e)} ></TextInput>
        <TextInput
        style={styles.InputBox}
          placeholder=" Password"
          secureTextEntry
          value={password} onChangeText={e=>setPassword(e)}></TextInput>
      </View>
      <View style={styles.TouchableOpacityContainer} >
      <TouchableOpacity style={styles.buttonContainer} onPress={()=>navigation.navigate('dashboard')}>
        <View ><Text style={styles.button} >Login</Text></View>
      </TouchableOpacity>
      </View>
      <View style={styles.TouchableOpacityContainer}><TouchableOpacity style={styles.buttonContainer2} onPress={()=>navigation.navigate('register')}>
        <View ><Text style={styles.button2} >Register</Text></View>
      </TouchableOpacity></View>
      </ImageBackground>
    </View>
    
  )
}
const styles = StyleSheet.create({
  InputContainer:{
      height:300,
      padding:20,
      justifyContent:'flex-end',
      alignContent: 'center',
  },
  InputBox:{
      marginTop:20,
      borderColor:'white',
      borderWidth:2,
      borderRadius:5
  },
  button:{
      textAlignVertical:'center',
      textAlign:'center'
  },
  buttonContainer:{
      width:'40%',
      height:40,
      justifyContent:'center',
      backgroundColor:'skyblue',
      alignItems:'center',
      shadowColor:'black',
      elevation:10,
      borderRadius:5
  
  },
  buttonContainer2:{
      width:'40%',
      height:40,
      justifyContent:'center',
      backgroundColor:'orange',
      alignItems:'center',
      shadowColor:'black',
      elevation:10,
      borderRadius:5
     
  },
  button2:{
      textAlignVertical:'center',
      textAlign:'center'
  },
  TouchableOpacityContainer:{
      paddingBottom:20,
      paddingRight:20,
      width:'100%',
      alignItems:'flex-end',
  }
})