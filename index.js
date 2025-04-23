import PromptSync from 'prompt-sync'
import axios from 'axios'

// Ocultei Openweatherapi key
const appid = process.env.OPENWEATHER_API_KEY;

const prompt = PromptSync()
const cidade = prompt('Digite uma cidade para ver as coordenadas: ')
const url = `http://api.openweathermap.org/geo/1.0/direct?q=${cidade}&appid=${appid}`

axios.get(url)
.then((res) => {
    console.log(`Latitude: ${res.data[0].lat}`)
    console.log(`Longitude: ${res.data[0].lon}`)
})
.catch((err) => {
    console.log(`Erro: ${err}`)
})