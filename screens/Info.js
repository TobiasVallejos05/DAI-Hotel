import React, { useState, useEffect } from 'react';
import { View, Image, Text, Button, StyleSheet } from 'react-native';
import { useContextState, ActionTypes } from '../contextState';
import { getPlatoCompleto } from '../axios/axiosClient';

const Info = ({navigation, route}) => {
    
    const [plato, setPlato] = useState("");
    const {contextState, setContextState} = useContextState();
    
    const agregarPlato = () => {
      console.log(plato.title)
      setContextState({
        type:ActionTypes.SetMenuPlatos,
        value:plato,
        });
      console.log(contextState.menu.platos[1])
      navigation.push('Home')
    }
    
    const eliminarPlato = () => {
      const indexPlato = contextState.menu.platos.findIndex( (platos) => platos.id === route.params.id );
      console.log(indexPlato)
      contextState.menu.platos.splice(indexPlato , 1),
      console.log(contextState.menu.platos)
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
    
    <View>
    <Image 
    style = {styles.tinyLogo}
    source = {{
        uri: plato.image
      }}>
    </Image>
    <Text>Plato: {plato.title}</Text>
    <Text>Que tan sano es: {plato.healthScore}</Text>
    <Text>Precio por unidad: {plato.pricePerServing}</Text>
    {plato.vegan ? <Text>El plato es vegano</Text>:<Text>El plato no es vegano</Text>}
    {contextState.menu.platos.find(p => p.id === route.params.id) ? <Button style = {styles.button} title = "Eliminar" onPress = {eliminarPlato}/> : <Button style = {styles.button} title = "Agregar" onPress = {agregarPlato}/>}

    </View> 
)
}

const styles = StyleSheet.create({

    tinyLogo: {
      width: 100,
      height: 100,
    },

    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
      },
  });

export default Info;