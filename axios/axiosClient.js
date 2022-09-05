import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://challenge-react.alkemy.org/"
})

const API_KEY = "2f34f3b6abb54bc48a7dacd61c0353e9"

export const postLogIn = async (user) =>{
    return axiosClient.post('', {
        ...user
    }).then(response =>{
        if(response.status < 300){
            console.log(response.data)
            return response.data
        }
        else {
            console.log("Algo no funciona")
        }
    })
    .catch(function() {
        console.log("No funciona")
        throw "Error"
    })
}

export const getPlatos = async (query) =>{
    return axiosClient.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${query}`,{})
    .then(function(res){
        console.log(res.data.results)
        return res.data.results
    })
    .catch(function(){
        throw "Error"
    })
}
export const getPlatoCompleto = async (id) =>{
    return axiosClient.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`,{})
    .then(function(res){
        console.log(res.data.results)
        return res.data.results
    })
    .catch(function(){
        throw "Error"
    })
    
}