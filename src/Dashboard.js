import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Button,
  ScrollView,
  Modal,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
  StatusBar,
  Dimensions
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {openDatabase} from 'react-native-sqlite-storage';

export default function Dashboard() {
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  const [UserData, setUserData] = useState();
  const [loading, setLoading] = useState(true);
  // const[updatedFirstName, setUpdtedFirstName] = useState();
  // const[updatedLastName, setUpdatedLastName] = useState();
  // const [updatedPassword, setUpdatedPassword]  = useState();
  const [modalVisiblity, setModalVisiblity] = useState(false);
  const [modalData, setModalData] = useState({});

  const db = openDatabase({
    name: 'rn_sqlite',
  });

  useEffect(() => {
    FetchUserData();
  }, []);
  useEffect(() => {
    //console.log(UserData)
  }, [UserData]);

  const UpdateUser = () => {
    db.transaction(txn => {
      txn.executeSql(
        'UPDATE User SET first_name= ?, last_name=?, password=? WHERE UserID = ? ',
        [
          modalData.first_name,
          modalData.last_name,
          modalData.password,
          modalData.UserID,
        ],
        (tx, result) => {
          console.log('Data Updated Successfully');
          FetchUserData();
          setModalVisiblity(false);
        },
        error => {
          console.log(error);
        },
      );
    });
  };

  const DeleteUser = ID => {
    Alert.alert('Deleting ?', 'Are you sure ?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          db.transaction(txn => {
            txn.executeSql(
              'DELETE FROM User WHERE UserID = ?',
              [ID],
              (tx, result) => {
                console.log('user Deleted Succesfully');
                FetchUserData();
              },
              error => {
                console.log(error);
              },
            );
          });
        },
      },
    ]);
  };

  const changeModalVisiblity = item => {
    if (modalVisiblity) {
      setModalVisiblity(false);
    } else {
      setModalData(item);
      setModalVisiblity(true);
    }
  };

  const FetchUserData = async () => {
    await db.transaction(txn => {
      txn.executeSql(
        'SELECT * FROM User',
        [],
        (tx, result) => {
          let data = [];
          for (let i = 0; i < result.rows.length; i++) {
            data.push(result.rows.item(i));
          }
          setUserData(data);
          setLoading(false);
        },
        error => {
          console.log(error);
        },
      );
    });
  };
  return loading ? (
    <ActivityIndicator style={{}} color={'blue'}></ActivityIndicator>
  ) : (
    <View>
      <StatusBar backgroundColor={'#0f85e7'} />
      <ImageBackground source={{uri:'https://cutewallpaper.org/28/dandelion-phone-wallpaper-background/2081219447.jpg'}} style={{height:height,width:width, }} blurRadius={10}>
      <ScrollView>
        
        <View>
          {UserData.map(item => (
            <View key={item.UserID} style={styles.container}>
              <Text style={styles.name}>
                Name : {item.first_name} {item.last_name}
              </Text>
              <Text style={styles.email}>Email: {item.email}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={() => changeModalVisiblity(item)}
                  style={styles.button1}>
                  <Text
                    style={{textAlign: 'center', color: 'white', fontSize: 16}}>
                    Update
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => DeleteUser(item.UserID)}
                  style={styles.button2}>
                  <Text
                    style={{textAlign: 'center', color: 'white', fontSize: 16}}>
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
        
      </ScrollView>
      </ImageBackground>
      {modalVisiblity ? (
        <Modal
          transparent={true}
          animationType="fade"
          presentationStyle="overFullScreen"
          style={{position:'absolute', width:width, height:height, top:0, left:0}}>
          <View
            style={styles.modalView}>
            <TouchableOpacity
              style={{position: 'absolute', top: 0, right: 10}}
              onPress={() => changeModalVisiblity()}>
              <Text style={{fontSize: 20}}>x</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.textInput}
              placeholder="first name"
              onChangeText={e =>
                setModalData(prev => ({...prev, first_name: e}))
              }
              value={modalData.first_name}></TextInput>
            <TextInput
              style={styles.textInput}
              placeholder="last name"
              onChangeText={e =>
                setModalData(prev => ({...prev, last_name: e}))
              }
              value={modalData.last_name}></TextInput>
            <TextInput
              style={styles.textInput}
              editable={false}
              value={modalData.email}
              aria-disabled={true}></TextInput>
            <TextInput
              style={styles.textInput}
              secureTextEntry
              value={modalData.password}
              placeholder="password"
              onChangeText={e =>
                setModalData(prev => ({...prev, password: e}))
              }></TextInput>
            <View style={{marginTop: 30}}>
              <Button
                title="update details"
                color={'blue'}
                onPress={() => UpdateUser()}></Button>
            </View>
          </View>
        </Modal>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    elevation:10,
    borderRadius:10,
    padding: 20,
    margin: 10,
  },
  name: {
    color: 'black',
    fontSize: 18,
  },
  email: {
    color: 'black',
    fontSize: 15,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    //flexWrap:"wrap",
    padding: 10,
  },
  button1:{
    
      backgroundColor: 'orange',
      padding: 10,
      marginBottom: 5,
    
  },
  modalView:{
    margin: 40,
    marginTop: 100,
    // height: '70%',
    // width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'skyblue',
    position:'absolute', width:Dimensions.get('window').width- 80, height:Dimensions.get('window').height - 300, 
  },
  button2:{
    
    backgroundColor: 'red',
    padding: 10,
    marginBottom: 5,
  
},
  textInput: {
    marginTop:20,
    borderBottomColor:'black',
    borderBottomWidth:2,
    width: '80%',
    margin: 5,
  },
  // modal:{
  //   // width:'100%',
  //   display:"flex",
  //   alignItems:"center",
  //   justifyContent:"center",

  // }
});
