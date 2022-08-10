import React, {useState} from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, TextInput, Button, TouchableOpacity } from 'react-native';
import { Header, LearnMoreLinks, Colors, DebugInstructions, ReloadInstructions } from 'react-native/Libraries/NewAppScreen';
import { Formik } from 'formik'; 
import * as yup from 'yup';

const Form = () => {
    const [postres, elegirPostre] = useState('Seleccionar Postre');
     return (
      <>      
          <View>
            
            <Text style={styles.formulario}> Formulario de Contacto </Text>
   
            <Formik
              validateOnMount={true}
              validationSchema={loginValidationSchema}
              initialValues={{ email:'', password: ''}}
              onSubmit={values => console.log(values)}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
                isValid,
              }) => (
                <>
   
                  <TextInput style={styles.email} 
                    placeholder="micorreo@micorreo.com"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    keyboardType="email-address" /> 
   
                    {(errors.email && touched.email) &&
                      <Text style={styles.errorText}>{errors.email}</Text>
                    }
           
                  <TextInput style={styles.password} 
                    placeholder="Nro. de Teléfono"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    keyboardType="number-pad" /> 
   
                    {(errors.password && touched.password) &&
                      <Text style={styles.errorText}>{errors.password}</Text>
                    }
           
                  <TouchableOpacity
                    style={styles.colorBtn}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.colorTxtBtn}>Aceptar</Text>
                  </TouchableOpacity>
   
                </>
              )}
            </Formik>
          </View>      
      </>
    )
  };

  const loginValidationSchema = yup.object().shape({
   
    email: yup
      .string("Ingresa tu Email")
      .required("*Campo requerido")
      .email("Ingresa un Email válido"),
   
    password: yup
      .number("Ingresa tu Teléfono")
      .required("*Campo requerido"), 
   
  });
   
  const styles = StyleSheet.create({
   
    formulario: {
      color: Colors.black,
      fontSize: 18,
      marginTop: 20,
      fontWeight: '600',
      padding: 4,
      paddingRight: 12,
      textAlign: 'center',
    },
   
    email: {
      color: Colors.dark,
      fontSize: 18,
      marginTop: 20,
      marginLeft: 20,
      marginRight: 20, 
      fontWeight: '600',
      paddingLeft: 20,
      borderWidth: 1,
      borderRadius: 7,
      borderColor: Colors.black,
      paddingRight: 12,
    }, 
   
    password: {
      color: Colors.dark,
      fontSize: 18,
      marginTop: 20,
      marginLeft: 20,
      marginRight: 20, 
      fontWeight: '600',
      paddingLeft: 20,
      borderWidth: 1,
      borderRadius: 7,
      borderColor: Colors.black,
      paddingRight: 12,
    },
   
    colorBtn: {
      borderWidth: 1,
      borderColor: '#007BFF',
      backgroundColor: '#007BFF',
      padding: 15,
      marginLeft: 20,
      marginRight: 20,
      borderRadius: 7,
    },
   
    colorTxtBtn: {
      color: '#FFFFFF',
      fontSize: 20,
      textAlign: 'center'
    },
   
    errorText: {
      fontSize: 14,
      color: 'red',
      marginBottom: 20,
      marginLeft: 20
    }
   
  });

  export default Form;