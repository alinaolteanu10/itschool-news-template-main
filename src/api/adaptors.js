
// ne definim o functie care pe baza raspunsului de la API-ul theGuardian care o sa ne returneze doar prop 
// de care avem nevoie pt lista cu stiri
export function getNewsList(apiResponse){
    // daca raspunsul de la API nu contine date atunci returnam un array gol
    if(!apiResponse || !apiResponse.response){
        return [];
    }
    // extragem datele din raspunsul API-ului
    const apiData = apiResponse.response.results;
    // mapam datele de la API si le transformam in formatul de care avem nevoie
    const adaptatedData = apiData.map((news) =>{
        return {
            id: news.id,
            thumbnail:  news.fields.thumbnail,
            title: news.fields.headline,
            description: news.fields.trailText
        }
    });
    // returnam datele parsate
    return adaptatedData;
}
// ne definim o alta functie care parseaza datele despre o stire singulara
    export function getNewsDetails(apiResponse){
        if(!apiResponse || !apiResponse.response){
            return [];
        }
        // extragem datele de la API
        const apiData = apiResponse.response.content;
        // parsam datele despre stirea singulara
        return {
            date: apiData.webPublicationDate,
            title:apiData.fields.headLine,
            description: apiData.fields.trailText,
            image: apiData.fields.main,
            content: apiData.fields.body,
            author: apiData.fields.byline,
            thumbnail: apiData.fields.thumbnail

        }
    }