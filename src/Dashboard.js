import { View, Text, ActivityIndicator, StyleSheet, Button, ScrollView, Modal, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, {useEffect, useState} from 'react'
import {openDatabase} from 'react-native-sqlite-storage'


export default function Dashboard() {
    const [UserData, setUserData] = useState();
    const [loading, setLoading] = useState(true);
    // const[updatedFirstName, setUpdtedFirstName] = useState();
    // const[updatedLastName, setUpdatedLastName] = useState();
    // const [updatedPassword, setUpdatedPassword]  = useState();
    const [modalVisiblity, setModalVisiblity]  = useState(false)
    const [modalData, setModalData]  = useState({});


    const db = openDatabase({
        name:'rn_sqlite',
      })

    useEffect(()=>{
        FetchUserData();
    },[])
    useEffect(()=>{
        //console.log(UserData)
    },[UserData])
    

    const UpdateUser=()=>{
      db.transaction(txn=>{
        txn.executeSql(
          'UPDATE User SET first_name= ?, last_name=?, password=? WHERE UserID = ? ',
          [modalData.first_name, modalData.last_name, modalData.password, modalData.UserID],
          (tx, result)=>{
            console.log("Data Updated Successfully");
            FetchUserData();
            setModalVisiblity(false);
          },
          (error)=>{
          console.log(error);
          }
        )
      })
    }

const DeleteUser=(ID)=>{
  Alert.alert('Deleting ?', 'Are you sure ?', [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'OK', onPress: () => {
      
  db.transaction(txn=>{
    txn.executeSql(
      'DELETE FROM User WHERE UserID = ?',
      [ID],
      (tx, result)=>{
        console.log("user Deleted Succesfully");
        FetchUserData()
      },
      (error)=>{
        console.log(error);
      }
    )
  })
    }},
  ]);





}

    const changeModalVisiblity=(item)=>{
      if(modalVisiblity){
        setModalVisiblity(false)
      }
      else{
        setModalData(item)
        setModalVisiblity(true)
      }
  

    }

    const FetchUserData= async ()=>{
        await db.transaction(txn=>{
            txn.executeSql('SELECT * FROM User',
            [],
            (tx, result)=>{
                let data = []
                for (let i = 0 ; i < result.rows.length; i++){
                  data.push(result.rows.item(i));
                }
                  setUserData(data);
                  setLoading(false)
            },
            error=>{
                console.log(error);
            }
            )
        })
    }
  return (
    loading ? <ActivityIndicator style={{}} color={'blue'}>

    </ActivityIndicator> : 
    <View>
<ScrollView>
    <View>
      {UserData.map((item)=>(
        

        
        <View key={item.UserID} style={styles.container}>
          <Text style={styles.name}>Name : {item.first_name} {item.last_name}</Text>
          <Text style={styles.email}>Email: {item.email}</Text>
          <View style={styles.buttonContainer}><Button title='update' color={'orange'} onPress={()=>changeModalVisiblity(item)}></Button>
              <View style={{...styles.buttonContainer}}>
              <Button title='delete' color={'red'} onPress={()=>DeleteUser(item.UserID)}
            >
              </Button>
              </View>
           
            </View>
        </View>
        
      ))}
    </View>
    </ScrollView>
    {
      modalVisiblity  ?
    <Modal transparent={true} animationType='fade' presentationStyle='overFullScreen'>
        <View style={{margin:40,marginTop:100,height:'70%',width:'80%', justifyContent:"center", alignItems:'center', backgroundColor:'orange', }}> 
        <TouchableOpacity style={{position:"absolute",top:0,right:10}} onPress={()=>changeModalVisiblity()}><Text style={{fontSize:20}}>x</Text></TouchableOpacity> 
        <TextInput style={styles.textInput} placeholder='first name' onChangeText={(e)=> setModalData(prev => ({...prev, first_name: e}))} value={modalData.first_name}></TextInput>
        <TextInput style={styles.textInput} placeholder='last name' onChangeText={(e)=>setModalData(prev => ({...prev, last_name: e}))} value={modalData.last_name}></TextInput>
        <TextInput style={styles.textInput} editable={false} value={modalData.email} aria-disabled={true}></TextInput>
        <TextInput style={styles.textInput} secureTextEntry value={modalData.password} placeholder='password' onChangeText={(e)=>setModalData(prev => ({...prev, password: e}))}></TextInput>
        <View style={{marginTop:30}}>
        <Button title='update details' color={'blue'} onPress={()=>UpdateUser()}></Button>
        </View>
        </View>
      </Modal>
     : null
    }
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'skyblue',
    padding:20,
    margin:10
  },
  name:{
    color:'black',
    fontSize:18
  },
  email:{
    color:'black',
    fontSize:15
  },
  buttonContainer:{
    display:'flex',
    padding:10

  },
  textInput:{
    borderColor:"black",
    borderWidth:1,
    width:'80%',
    margin:5
  }
  // modal:{
  //   // width:'100%',
  //   display:"flex",
  //   alignItems:"center",
  //   justifyContent:"center",
  
  // }
})  