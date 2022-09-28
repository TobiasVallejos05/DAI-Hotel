import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://challenge-react.alkemy.org/"
})
const API_KEY = "0da6e9f7d20f41d3932a24fe3845e908"

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
        console.log(res.data)
        return res.data
    })
    .catch(function(){
        throw "Error"
    })
    
}