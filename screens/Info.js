import React, {  useState, useEffect} from 'react';
import { TextInput,Button,StyleSheet,Text,View,Alert } from 'react-native';
import {useContextState, ActionTypes} from '../contextState'
import { useNavigation } from '@react-navigation/native';
import { detallePlato } from '../axios/axiosClient';


const Info = ({navigation, route}) => {
    
    const [plato, setPlato]=useState("");
   

    
    useEffect (async() => {
        console.log(route.params.id)
        const data = await detallePlato(route.params.id); 
        setPlato(data);
        
    
    
    console.log(plato)
    },[]);

return (      
    <View>
    <Text>Hola</Text>
    <Text>{plato}</Text>
    </View> 
)

}
export default Info;