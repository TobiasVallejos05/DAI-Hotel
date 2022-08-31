import React, {  useState } from 'react';
import { TextInput,Button,StyleSheet,Text,View,Alert } from 'react-native';
import { enviarUsuario } from '../axios/axiosClient';
import {useContextState, ActionTypes} from '../contextState'

const Form = ({navigation}) => {
    
    const {contextState, setContextState} = useContextState();
    const [aux, setAux] = useState(true);
    const [loading, setLoading] = useState(false);
    const [obj, setObj] = useState({
            email: "challenge@alkemy.org",
            password: "react",
    });

    const validar = async() => {
    setLoading(true);
    if( 
    obj.email == "" || 
    obj.password == ""
    ){
    setAux(false)
    }
    else{
         setAux(true)
         try {
            const token = await enviarUsuario(obj)
            console.log(token)
            setContextState({
               type: ActionTypes.SetToken,
               value: token,
            });
            navigation.push('Home')
         } catch (err) {
            console.log("error: ", err)
            setLoading(false)
         }
    }
    setLoading(false);
}

    return (      
            <View style={styles.container}>
                <Text style={styles.login}>Iniciar Sesión</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder='Email'
                    onChangeText={(value)=>{setObj({...obj,email: value})}}
                    value={obj.email}
                    />
                    <TextInput 
                        style={styles.input} 
                        placeholder='Password'
                        onChangeText={(value)=>{setObj({...obj,password: value})}}       
                        value={obj.password}
                    />
                {!aux &&
                    <Text style = {styles.errorMessage} >Al menos uno de los campos está vacío. Por favor, completelo.</Text>
                }
                <br/>
                <Button style = {styles.button}
                color = "black"
                onPress = {validar}
                title = "SEARCH"
                disabled = {loading}
                />
                
           </View>            
        )        
}

const styles = StyleSheet.create({

        login:{
            fontSize: 50,
            fontWeight: 500
        },
        container:{
            flex: 1,
            alignItems: 'center',
            placeContent: 'center',
            backgroundColor: "lightgray"
        },
        input: {
            height: 40,
            width: 300,
            borderWidth: 1,
            margin: 12,
            padding: 12
          },
        errorMessage: {
            fontWeight: 500,
            color: "red"
        },
        button: {
            margin: 12,
            paddingVertical: 12,
            paddingHorizontal: 32,
            borderRadius: 4,
            elevation: 3
          },
  });
  
  export default Form;