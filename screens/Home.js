import React, { Component, useEffect, useState, FlatList } from 'react';
import { traerPlatos } from '../axios/axiosClient';
import { StyleSheet, Text, View, TextInput} from 'react-native';
import { useNavigation } from '@react-navigation/native';
//import React, {  useState } from 'react';


const Home =({navigation})=>{
  const [buscador,setBuscador]=useState("");
  const flatlist = [
    {
      
      title: data.title,
    },
    {
      
      title: data.title,
    },
    {
      
      title: data.title,
    },
  ];


  return (
    
    <View>
      <Text>Datos ingresados</Text>
      <TextInput 
      onChangeText={(letras) => {
        if (letras.length > 2) {
          traerPlatos(letras).then((data) => {
            setBuscador(data)
            console.log(data)
          })
          
        }
      }}
     
      />
   
   <SafeAreaView>
      <FlatList
        data={flatlist}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>






    </View>
   
  ); 
}

export default Home