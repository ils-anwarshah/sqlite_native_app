import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React, {useState , useEffect} from 'react';

import {openDatabase} from 'react-native-sqlite-storage'

export default function Register({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState();

  const db = openDatabase({
    name:'rn_sqlite',
  })
  useEffect(()=>{
    createUserTable()
  },[])
  

  const createUserTable=()=>{
    db.transaction(txn =>{
      txn.executeSql(
        'SELECT name FROM sqlite_master WHERE type="table" AND name="User"',
        [],
        (tx, res)=>{
          console.log('item:'+ res.rows.length);
          if(res.rows.length == 0){
            txn.executeSql('DROP TABLE IF EXISTS User',[])
            txn.executeSql('CREATE TABLE IF NOT EXISTS User (UserID INTEGER  PRIMARY KEY AUTOINCREMENT, email VARCHAR(30), first_name VARCHAR(20), last_name VARCHAR(20), password VARCHAR(30))',
            [],
            (tx, res)=>{
              console.log("table Created");
            },
            error=>{
              console.log(error);
            }
            )
          }
        }
      )
    })
  }


  
  const CreateUser = ()=>{
    db.transaction(txn =>{
      txn.executeSql('INSERT INTO User(email, first_name, last_name, password) VALUES(?, ?, ?, ?)',
      [email,firstName,lastName,password],
      (tx, result)=>{
        console.log("user added Successful");
      },
      error=>{
        console.log("error" + error);
      }
      )
    })
  }

  const ValidateForm=()=>{
    result = false
    if(ValidFormData()){
      CreateUser()
      navigation.navigate('dashboard')
      result = true
    }
    else {
      setError('Enter Valid Data')
      result  = false
    }
    return result
  }

  const ValidFormData=()=>{
    let result = true;
    if(firstName.trim().length <= 0 || lastName.trim().length <= 0  || email.trim().length < 0 || email.length < 5|| password.trim().length < 0 || password.length < 6 ){
      result =  false
    }
    else{
      result = true
    }
    return result
  }
  

  

  return (
    <View>
      <ImageBackground
        source={{uri:'https://cutewallpaper.org/28/dandelion-phone-wallpaper-background/2081219447.jpg'}}
        style={{height: '100%'}}
        blurRadius={10}>
        <View style={styles.InputContainer}>
          <TextInput
            placeholder={error ? 'Enter Valid Name' : "First Name"}
            value={firstName}
            style={styles.InputBox}
            onChangeText={e => setFirstName(e)}></TextInput>
        <TextInput placeholder={error ? 'Enter Valid Name' : "last Name"} value={lastName} style={styles.InputBox} onChangeText={e=>setLastName(e)}></TextInput>
          <TextInput
            placeholder={error ? 'Enter Valid Email' : "Email"}
            value={email}
            style={styles.InputBox}
            onChangeText={e => setEmail(e)}></TextInput>
          <TextInput
            style={styles.InputBox}
            placeholder={error ? 'Enter Valid Password' : "Password"}
            secureTextEntry
            value={password}
            onChangeText={e => setPassword(e)}></TextInput>
        </View>
        <View style={styles.TouchableOpacityContainer}>
          <TouchableOpacity style={styles.buttonContainer} onPress={() =>ValidateForm()}>
            <View>
              <Text style={styles.button}>Register</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  InputContainer: {
    height: 300,
    padding: 20,
    justifyContent: 'flex-end',
    alignContent: 'center',
  },
  InputBox: {
    marginTop:20,
    borderBottomColor:'white',
    borderBottomWidth:2,
  },
  button: {
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  buttonContainer: {
    width: '40%',
    height: 40,
    justifyContent: 'center',
    backgroundColor: 'skyblue',
    alignItems: 'center',
    shadowColor: 'black',
    elevation: 10,
    borderRadius: 5,
  },
  buttonContainer2: {
    width: '40%',
    height: 40,
    justifyContent: 'center',
    backgroundColor: 'orange',
    alignItems: 'center',
    shadowColor: 'black',
    elevation: 10,
    borderRadius: 5,
  },
  button2: {
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  TouchableOpacityContainer: {
    paddingBottom: 20,
    paddingRight: 20,
    width: '100%',
    alignItems: 'flex-end',
  },
});
