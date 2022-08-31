import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://challenge-react.alkemy.org/"
})

const API_KEY = "2f34f3b6abb54bc48a7dacd61c0353e9"

export const enviarUsuario= async (obj) =>{
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
        alert("Por favor, ingrese los datos nuevamente")
        throw err
    })
}
export const traerPlatos= async (query) =>{
    return axiosClient.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${query}`,{})
    .then(function(res){
        console.log(res.data.results)
        return res.data.results
    })
    .catch(function(){
        throw "Error"
    })
}
export const detallePlato= async (id) =>{
    return axiosClient.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`,{})
    .then(function(res){
        console.log(res.data.results)
        return res.data.results
    })
    .catch(function(){
        throw "Error"
    })
    
}