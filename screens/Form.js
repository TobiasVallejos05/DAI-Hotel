import React, {  useState } from 'react';
import { TextInput,Button,StyleSheet,Text,View,Alert } from 'react-native';
import { enviarEmailPsw } from '../axios/axiosClient';

const Form = ({navigation}) => {

    const [aux,setAux]=useState(true);
    const [botonActivado,setBotonActiado]=useState(true);
    const [token,setToken]=useState(true);
    const [obj, setObj] = useState({
            email: "",
            password: "",
    });
    const validar =async()=>{
    
    if( obj.email==""||obj.password==""){
    setAux(false)
    setBotonActiado(true)
    }
    else{
         setAux(true)
       setToken (await enviarEmailPsw(obj))
       navigation.push('Home')
       console.log("datos ingresados")
    }
}

    return (      
            <View style={styles.container}>
                
                <Text style={styles.iniciarSesion}>Iniciar Sesión</Text><br></br>
                {!aux &&
                    <Text>No ingreso los valores correspondientes</Text>
                }
                 <TextInput   style={styles.input}
                        title="Ingrese Usuario"
                        onChangeText={(value)=>{setObj({...obj,email: value})}}
                        value={obj.email}
                    />
                 <TextInput   style={styles.input}
                        onChangeText={(value)=>{setObj({...obj,password: value})}}       
                        value={obj.password}
                />
                <Button style={styles.button}
                onPress={validar}
                title="press"
                disabled={!botonActivado}
                />
                
           </View>            
        )
        
}

const styles = StyleSheet.create({

        iniciarSesion:{
            fontSize: 75,
            marginTop:'30px'
            
        },
        container:{
            flex: 1,
            width: '100vw',
            height:'100vh',
            alignItems: 'center',
            backgroundColor: "lightblue"
        },
        input: {
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
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
  
  export default Form;