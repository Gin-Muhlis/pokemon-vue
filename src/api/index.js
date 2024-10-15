import axios from "axios"

// setup API
const Api = axios.create({
    baseURL: "https://pokeapi.co/api"
})

export default Api