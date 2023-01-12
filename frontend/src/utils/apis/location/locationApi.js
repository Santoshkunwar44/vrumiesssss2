// const reponse = await axios.post("https://countriesnow.space/api/v0.1/countries/state/cities", {
//                 country: "United States",
//                 state: "New York"
//             })
//             console.log(reponse)

import axios from "axios"

export const getStatesOfAmerica = () => axios.post("https://countriesnow.space/api/v0.1/countries/states", {
    country: "United States",
})
export const getCitiesInState = (state) => axios.post("https://countriesnow.space/api/v0.1/countries/state/cities", {
    country: "United States",
    state
})