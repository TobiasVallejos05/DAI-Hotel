import React, { useState, useEffect } from 'react';
import { getPlatos } from '../axios/axiosClient';
import { View, Text, TextInput, Image, FlatList, SafeAreaView, TouchableOpacity, StyleSheet, StatusBar, Button } from 'react-native';
import { useContextState } from '../contextState'

const Home = ({navigation}) => {

  const [platos, setPlatos] = useState([]);
  const {contextState, setContextState} = useContextState();
  const [precioPromedio, setPrecioPromedio]=useState("");
  const [healthScore, setHealthScore]=useState("");

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

    console.log(contextState.token)
    if(contextState.token != ''){
      console.log("Ha ingresado correctamente")
    }
    else{
      console.log("No ha ingresado los datos correctamente. Por favor, vuelva a intentarlo")
      navigation.navigate('Login')
    }
    let precioAcumulativo = 0;
    let totalHealthScore = 0;
    for(let i = 0; i < contextState.menu.platos.length; i++){
      precioAcumulativo = precioAcumulativo + contextState.menu.platos[i].pricePerServing;
      totalHealthScore = totalHealthScore + contextState.menu.platos[i].healthScore;
    
    }
    setHealthScore(totalHealthScore/contextState.menu.platos.length);
    setPrecioPromedio(precioAcumulativo);
    
},[]);

  const onChange = async (characters) => {
    if (characters.length > 2) {  
    const data = await getPlatos(characters); 
    setPlatos(data);
    console.log(platos)
    }    
  }

  const renderItem2 = ({ item }) => {
    return <TouchableOpacity style = {styles.item} onPress = {() => {
      console.log(item.title)
      navigation.navigate('Info',{id:item.id})}
      }>
      <Text style={styles.title}>{item.title}</Text>
      <Image 
      style={styles.tinyLogo}
      source={{
        uri: item?.image?.toString(),
      }}>
      </Image>
      <Button onPress = {() => navigation.navigate('Info',{id:item?.id})}></Button>
      </TouchableOpacity>
  };

  return (

    <View style={styles.container}>       

    <SafeAreaView style={styles.container}>
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
      <Text style={styles.priceAndHealthScore}>El precio acumulativo de todos los platos es {isNaN(precioPromedio)?0:precioPromedio}</Text>
      <Text style={styles.priceAndHealthScore}>El promedio de Health Score es {isNaN(healthScore)?0:healthScore}</Text>
      
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
    alignItems: "center"
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
    fontWeight: 400,
    alignItems: 'center',
    placeContent: 'center'
  },
  image: {
    width: 100,
    height: 100
  },
  priceAndHealthScore: {
    marginBottom: 8
  }
});

export default Home