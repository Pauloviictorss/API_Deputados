import axios from "axios"


 const  getDeputadoid = async (query) => {
    const response = await axios.get("https://dadosabertos.camara.leg.br/api/v2/deputados/?nome=" + query  )

    return response.data.dados
 }

 const  getPartidoid = async (query) => {
   const response = await axios.get("https://dadosabertos.camara.leg.br/api/v2/partidos?sigla=" + query  )

   return response.data.dados
}

 export {getDeputadoid, getPartidoid}