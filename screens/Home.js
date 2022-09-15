import React, { useState } from 'react';
import { getPlatos } from '../axios/axiosClient';
import { StyleSheet, Text, Image , View, TextInput, FlatList, StatusBar, SafeAreaView, TouchableOpacity, Button } from 'react-native';
import {useContextState } from '../contextState'

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
    
      style={styles.tinyLogo}
      source={{
          uri: item.image.toString(),
        }} >
        </Image>
 
    </TouchableOpacity>
   
  };

  const renderItem2 = ({ item }) => {
    return <TouchableOpacity style={styles.item} onPress={() => {
      console.log(item.title)
      navigation.navigate('Info',{id:item.id})}
      }>
      <Text style={styles.title}>{item.title}</Text>
      <Image 
    
      style={styles.tinyLogo}
      source={{
          uri: item?.image?.toString(),
        }} >
        </Image>
        <Button onPress={() => navigation.navigate('Info',{id:item?.id})}></Button>
        
    </TouchableOpacity>
   
  };

  const onChange = async (characters) => {
    if (characters.length > 2) {  
    const data = await getPlatos(characters); 
    setPlatos(data);
    console.log(platos)
  }    
}

  return (

    <View style={styles.container}> 
      
      <SafeAreaView>
      <FlatList
        data={contextState.menu.platos}
        renderItem={renderItem2}
        keyExtractor={(data) => data.title}
      />
 
    </SafeAreaView>
      <Text style={styles.successfulMessage}>Ha ingresado exitosamente</Text>
      <TextInput 
      onChangeText={onChange}
      style={styles.input}
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