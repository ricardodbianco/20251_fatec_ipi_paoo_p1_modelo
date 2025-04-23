import PromptSync from 'prompt-sync'
import axios from 'axios'

const appid = '23d67128329d0ba67ca239334e62ca77'

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