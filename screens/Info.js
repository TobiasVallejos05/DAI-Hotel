import React, {  useState, useEffect} from 'react';
import { TextInput, Button, StyleSheet, Text, View,Alert,Image } from 'react-native';
import {useContextState, ActionTypes} from '../contextState'
import { useNavigation } from '@react-navigation/native';
import { detallePlato } from '../axios/axiosClient';


const Info = ({navigation, route}) => {
    
    const [plato, setPlato] = useState("");
    const {contextState, setContextState} = useContextState();
    const Home = ({plato})=>{
      console.log(plato.title)
          setContextState({
          type: ActionTypes.SetTitulo,
          value:plato.title,
          });
          setContextState({
          type: ActionTypes.SetImage,
          value:plato.image,
          });
          setContextState({
          type: ActionTypes.SetPrecioPorUnidad,
          value:plato.pricePerServing,
          });
          setContextState({
            type: ActionTypes.SetSano,
            value:plato.healthScore,
          });
          setContextState({
            type: ActionTypes.SetVegano,
            value:plato.vegan,
          });
          setContextState({
            type: ActionTypes.SetVegetariano,
            value:plato.vegetarian,
      });

navigation.push('Home')
    
}

    useEffect (async() => {
        console.log(route.params.id)
        const id= route.params.id;
        const data = await detallePlato(id); 
        console.log(data);
        setPlato(data);
        
    console.log(plato.pricePerServing)
    },[]);

return (      
    
    <View>
    <Image 
    
    style={styles.tinyLogo}
    >
    </Image> 
    <Text>Plato: {plato.title}</Text>
    <Text>Que tan sano es: {plato.healthScore}</Text>
    <Text>Precio por unidad: {plato.pricePerServing}</Text>
    {plato.vegan ? <Text>El plato es vegano</Text>:<Text>El plato no es vegano</Text>}
    {plato.vegetarian ? <Text>El plato es vegetariano</Text>:<Text>El plato no es vegetariano</Text>}

    <Button style={styles.button}
                color = "black"
                title="ADD"
                onClick={Home}
               
                />
    </View> 
)}

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