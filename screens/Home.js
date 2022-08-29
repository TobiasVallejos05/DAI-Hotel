import React, { Component, useEffect, useState } from 'react';
import { traerPlatos } from '../axios/axiosClient';
import { StyleSheet, Text, Image , View, TextInput, FlatList, StatusBar, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {useContextState, ActionTypes, contextState} from '../contextState'
//import React, {  useState } from 'react';


const Home =({navigation})=>{
  //const {contextState,setContextState}=useContextState();
  const [buscador,setBuscador]=useState("");
  const [platos,setPlatos]=useState([]);
  
  const renderItem = ({ item }) => {
    return <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Info',{id:item.id})}>
      <Text style={styles.title}>{item.title}</Text>
      <Image 
    
      style={styles.tinyLogo}
      source={{
          uri: item.image.toString(),
        }} >
        </Image>
       
      
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
    
    <View >
      <Text>Datos ingresados</Text>
      <TextInput 
      onChangeText={onChange}
      />
       <SafeAreaView style={styles.container}>
        <FlatList 
          numColumns={999}
          data={platos}
          horizontal={false}
          keyExtractor={(data) => data.title}
          renderItem={renderItem}
        />
        </SafeAreaView>

            
    </View>  
  ); 
}
const styles = StyleSheet.create({

  tinyLogo: {
    width: 100,
    height: 100,
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 12,
  },
  title: {
    fontSize: 15,
  },
  image: {
    width: 70,
    height:70,
  },
});

export default Home