import React, { useState } from 'react';
import { TextInput, Button, StyleSheet, Text, View } from 'react-native';
import { postLogIn } from '../axios/axiosClient';
import { useContextState, ActionTypes} from '../contextState'

const Login = ({navigation}) => {
    
    const [user, setUser] = useState({
        email: "challenge@alkemy.org",
        password: "react",
    });
    
    const {contextState, setContextState} = useContextState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(true);
    
    const validar = async() => {
    setLoading(true);
    if( 
    user.email == "" || 
    user.password == ""
    ){
    setError(false)
    }
    else{
         setError(true)
         try {
            const token = await postLogIn(user)
            console.log(token)
            setContextState({
               type: ActionTypes.SetToken,
               value: token,
            });
            navigation.push('Home')
         } catch {
            alert("Por favor, vuelva a ingresar los datos")
            console.log("error")
            setError(true)
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
                    onChangeText={(value)=>{setUser({...user,email: value})}}
                    value={user.email}
                    />
                    <TextInput 
                        style={styles.input} 
                        placeholder='Password'
                        onChangeText={(value)=>{setUser({...user,password: value})}}       
                        value={user.password}
                    />
                {!error &&
                    <Text style = {styles.errorMessage}> Al menos uno de los campos está vacío. Por favor, completelo.</Text>
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
  
  export default Login;