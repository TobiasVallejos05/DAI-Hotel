import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://challenge-react.alkemy.org/"
})

export const validarUsuario = async (obj) =>{
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
export const traerPlatos = async (query) =>{
    return axiosClient.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=bb614d1a2cfe4751b4f2aea0a3844a1c&query=${query}`,{})
    .then(function(res){
        console.log(res.data.results)
        return res.data.results
    })
    .catch(function(){
        throw "Error"
    })
}