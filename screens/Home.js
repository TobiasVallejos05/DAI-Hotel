import React, { Component, useEffect, useState } from 'react';
import { traerPlatos } from '../axios/axiosClient';
import { StyleSheet, Text, Image , View, TextInput, FlatList, StatusBar, SafeAreaView, TouchableOpacity, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {useContextState, ActionTypes, contextState} from '../contextState'

const Home = ({navigation}) => {
  const [buscador, setBuscador] = useState("");
  const [platos, setPlatos] = useState([]);
  const {contextState, setContextState} = useContextState();

  const renderItem = ({ item }) => {
    return <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Info',{id:item.id})}>
      <Image style={styles.tinyLogo}
      source={{
          uri: item.image.toString(),
        }} >
      </Image>
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
   
  };

  const onChange = async (letras) => {
    if (letras.length > 2) {  
    const data = await traerPlatos(letras); 
    setPlatos(data);
    console.log(platos)
  }
    
}

  return (

    <View style={styles.container} > 
    <Image 
    style={styles.tinyLogo}
    source={{
        uri: contextState.menu?.platos[0]?.image.toString(),
      }}></Image>
    <Text>{contextState.menu?.platos[0]?.title}</Text>
    <Button onPress={() => navigation.navigate('Info',{id:contextState.menu?.platos[0]?.id})}></Button>
    <Text>Datos ingresados</Text>
    <TextInput onChangeText = {onChange} style = {styles.input}
    />

    
     <SafeAreaView style={styles.container}>
      <FlatList 
        data={platos}
        keyExtractor={(data) => data.title}
        renderItem={renderItem}
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