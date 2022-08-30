import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://challenge-react.alkemy.org/"
})

export const enviarEmailPsw= async (obj) =>{
    return axiosClient.post('', {
        ...obj
    }).then(response =>{
        if(response.status < 300){
            console.log(response.data)
            return response.data
        }
        else {
            console.log("Algo no funciona")
        }
    })
    .catch(function(err) {
        console.log("No funciona", err)
        alert("No funciona, ingrese los datos correctamente")
        throw err
    })
}
export const traerPlatos= async (query) =>{
    return axiosClient.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=635b27286e98400ea84029d977de6fbc&query=${query}`,{})
    .then(function(res){
        console.log(res.data.results)
        return res.data.results
    })
    .catch(function(){
        throw "Error"
    })
}
export const detallePlato= async (id) =>{
    return axiosClient.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=635b27286e98400ea84029d977de6fbc`,{})
    .then(function(res){
        console.log(res.data.results)
        return res.data.results
    })
    .catch(function(){
        throw "Error"
    })
    
}