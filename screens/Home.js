import React, { useState, useEffect } from 'react';
import { getPlatos } from '../axios/axiosClient';
import { View, Text, TextInput, Image, FlatList, SafeAreaView, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { useContextState } from '../contextState'

const Home = ({navigation}) => {

  const [platos, setPlatos] = useState([]);
  const {contextState, setContextState} = useContextState();

  const renderItem = ({ item }) => {
    return <TouchableOpacity style={styles.item} onPress={() => {
      console.log(item.id)
      navigation.navigate('Info',{id:item.id})}
      }>
      <Text style={styles.title}>{item.title}</Text>
      <Image 
      style = {styles.tinyLogo}
      source = {{
          uri: item.image.toString(),
        }} >
        </Image>
    </TouchableOpacity>
   
  };

  useEffect (async () => {
    if(contextState.token!=''){
    console.log("Ha ingresado correctamente")
    }
    else{
    navigation.navigate('Form')
    }
  },[]);

  const onChange = async (characters) => {
    if (characters.length > 2) {  
    const data = await getPlatos(characters); 
    setPlatos(data);
    console.log(platos)
    }    
  }

  useEffect (async () => {
    if(contextState.menu.platos < 4){
    <Text>Recuerde que puede seguir agregando platos al menú</Text>
    }
    else{
    <Text>Ha alcanzado el máximo de platos por menú</Text>
    }
    });
    
  useEffect (async () => {
    if(contextState.menu.platosVeganos <= 2){
    <Text>Recuerde que puede seguir agregando platos veganos al menú</Text>
    }
    else{
    <Text>Ha alcanzado el máximo de platos veganos por menú</Text>
    }
    });

  return (

    <View style={styles.container}>       

      <Text style={styles.successfulMessage}>Ha ingresado exitosamente</Text>
      <TextInput 
      onChangeText={onChange}
      style={styles.input}
      />
      
      <SafeAreaView style={styles.container}>
        <FlatList 
          data={platos}
          renderItem={renderItem}
          keyExtractor={(data) => data.title}
        />
      </SafeAreaView>         
    </View> 
  ); 
}

const styles = StyleSheet.create({

  tinyLogo: {
    justifyContent: "center",
    width: 100,
    height: 100
  },
  container: {
    display: "flex",
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "lightgray",
    alignItems: "center",
  },
  successfulMessage: {
    fontSize: 20,
    fontweight: 500,
    margin: 10
  },
  input: {
    height: 40,
    width: 300,
    borderWidth: 1,
    margin: 12,
    padding: 12
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16
  },
  title: {
    fontSize: 20,
    fontWeight: 400
  },
  image: {
    width: 100,
    height: 100
  },
});

export default Home