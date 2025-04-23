import PromptSync from 'prompt-sync'
import axios from 'axios'
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
// Ocultado OpenweatherAPI_Key
const appid = process.env.OPENWEATHER_API_KEY;
let latitude;
let longitude;

const prompt = PromptSync()
const cidade = prompt('Digite uma cidade para ver as coordenadas: ')
const url = `http://api.openweathermap.org/geo/1.0/direct?q=${cidade}&appid=${appid}`

axios.get(url)
.then((res) => {
    latitude = res.data[0].lat;
    longitude = res.data[0].lon;
    infoCidade();
    console.log(`Latitude: ${latitude}`)
    console.log(`Longitude: ${longitude}`)
    console.log('++++++++++++++++++++++++++++++++++++++++++++++')

})
.catch((err) => {
    console.log(`Erro: ${err}`)
})

async function infoCidade() {
    try{
        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: `Baseado na latitude ${latitude} e na longitude ${longitude}, me diga:
            Nome da cidade,
            Idioma(s) falado(s),
            Moeda local,
            Curiosidades ou fatos históricos da cidade,
            APENAS 1 sugestão turística (ponto para visitar); com essas informaçoes(ocultando a latitude e longitude) crie um texto e escreva um parágrafo utilizando elas `,
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            'nomeCidade': {
                                type: Type.STRING,
                                description: 'Nome da cidade',
                                nullable: false,
                            },
                            'idiomaCidade': {
                                type: Type.STRING,
                                description: 'Idiomas falados',
                                nullable: false,
                            },
                            'moedaCidade': {
                                type: Type.STRING,
                                description: 'Moeda local',
                                nullable: false,
                            },
                            'fatosCidade': {
                                type: Type.STRING,
                                description: 'Curiosidades ou fatos históricos da cidade',
                                nullable: false,
                            },
                            'turismoCidade': {
                                type: Type.STRING,
                                description: 'Sugestão turística (ponto para visitar)',
                                nullable: false,
                            },
                            'textoCidade': {
                                type: Type.STRING,
                                description: 'parágrafo com curiosidades, idioma, moeda e uma sugestão turística.)',
                                nullable: false,
                            },

                        },
                        propertyOrdering: [ 
                            "nomeCidade",
                            "idiomaCidade",
                            "moedaCidade",
                            "fatosCidade",
                            "turismoCidade",
                            "textoCidade"
                        ],
                    },
                },
                
            },
        });

        console.log(response.text);
    }
    catch(err){
        console.error("Gemini não conseguiu", err)
    }  
}