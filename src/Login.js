import { View, Text, ImageBackground, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import {openDatabase} from 'react-native-sqlite-storage'
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function Login({navigation}) {

  const [email, setEmail]  = useState('');
  const [password, setPassword ] = useState('');
  const[error, setError] = useState('')

  const db = openDatabase({
    name:'rn_sqlite',
  })


  const onSumbit=()=>{
    db.transaction(txn=>{
      txn.executeSql('SELECT * FROM User WHERE email=?',
      [email],
      (tx, result)=>{
        if (result.rows.length == 0 || result.rows.item(0).password !== password ){
          setError('Email or Password is wrong')
        }
        else{
          // console.log(result.rows.item(0))
          setError('')
          navigation.navigate('dashboard')
          // console.log(result.rows);
        }
      },
      error=>{
        console.log(error);
      }
      )
    })
  }

  return (
    <ImageBackground  source={{uri:'https://cutewallpaper.org/28/dandelion-phone-wallpaper-background/2081219447.jpg'}} style={{height:'100%',}} blurRadius={10}>
    <View>
      
      <View style={styles.InputContainer}>

        <TextInput placeholder={" Email"} value={email} style={styles.InputBox} onChangeText={e=>setEmail(e)} ></TextInput>
        <TextInput
        style={styles.InputBox}
          placeholder=" Password"
          secureTextEntry
          value={password} onChangeText={e=>setPassword(e)}></TextInput>
      </View>
      <Text style={styles.error}>{error}</Text>
      <View style={styles.TouchableOpacityContainer} >
      <TouchableOpacity style={styles.buttonContainer} onPress={onSumbit}>
        <View ><Text style={styles.button} >Login</Text></View>
      </TouchableOpacity>
      </View>
      <View style={styles.TouchableOpacityContainer}><TouchableOpacity style={styles.buttonContainer2} onPress={()=>navigation.navigate('register')}>
        <View ><Text style={styles.button2} >Register</Text></View>
      </TouchableOpacity></View>
      
    </View>
    </ImageBackground>
    
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
      borderBottomColor:'white',
      borderBottomWidth:2,
      // backgroundColor:'skyblue'
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
  },
  error:{
    color:'red',
    marginLeft:20
  }
})