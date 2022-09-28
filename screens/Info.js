import React, { useState, useEffect } from 'react';
import { View, Image, Text, Button, StyleSheet } from 'react-native';
import { useContextState, ActionTypes } from '../contextState';
import { getPlatoCompleto } from '../axios/axiosClient';

const Info = ({navigation, route}) => {
    
    const [plato, setPlato] = useState("");
    const {contextState, setContextState} = useContextState();
    
    const agregarPlato = () => {
      
      let platosVeganos = 0;
      let platosNoVeganos = 0;

      for(let i = 0; i < contextState.menu.platos.length; i++){
        if(contextState.menu.platos[i].vegan == true){
          platosVeganos++;
          console.log(platosVeganos)
        }else{
          platosNoVeganos++;
          console.log(platosNoVeganos)
        }
      }
      if(plato.vegan == true){
        platosVeganos++;
      }else{
        platosNoVeganos++;
      }
      if(platosVeganos <=2 && platosNoVeganos <= 2){
        console.log(plato.title)
        setContextState({
          type: ActionTypes.SetMenuPlatos,
          value: plato,
          });
        console.log(contextState.menu.platos[1])
      navigation.push('Home')
    }else{  
      alert("El máximo de platos veganos tanto como no veganos es 2")
      }
    }
    
    const eliminarPlato = () => {
      const indexPlato = contextState.menu.platos.findIndex( (platos) => platos.id === route.params.id );
      console.log(indexPlato)
      contextState.menu.platos.splice(indexPlato , 1),
      console.log(contextState.menu.platos)
      navigation.push('Home')
    }

    const volverAtras = () => {
      navigation.push('Home')
    }

    useEffect (async () => {
      if(contextState.token!=''){
        console.log("Ha ingresado correctamente")
      }else{
        navigation.navigate('Login')
      }
        console.log(route.params.id)
        const id = route.params.id;
        const data = await getPlatoCompleto(id); 
        console.log(data);
        setPlato(data);
    },[route.params.id]);

    console.log(plato.title, plato.image);

return (      
    
    <View style = {styles.container}>
      <Image 
      style = {styles.tinyLogo}
      source = {{
        uri: plato.image
      }}>
      </Image>
      <Text>Nombre del Plato: {plato.title}</Text>
      <Text>Health Score: {plato.healthScore}</Text>
      <Text>Precio por Unidad: {plato.pricePerServing}</Text>
      {plato.vegan ? <Text>El plato es vegano</Text>:<Text>El plato no es vegano</Text>}<br/>
      {contextState.menu.platos.find(p => p.id === route.params.id) ? 
      <Button style = {styles.button} color = "black" title = "DELETE" onPress = {eliminarPlato} /> : 
      <Button style = {styles.button} color = "black" title = "ADD" onPress = {agregarPlato} />}
      <br/><Button color = "black" title = "GO BACK" onPress = {volverAtras} />
      </View> 
)
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    placeContent: 'center',
    backgroundColor: "lightgray"
  },
  tinyLogo: {
    width: 200,
    height: 200
  },
  button: {
    margin: 12,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3
  }
  });

export default Info;