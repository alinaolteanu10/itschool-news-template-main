//  ne tinem intr-o constantam api-keyul nu este safe sa tinem cheia aici, ea ar trebui sa fie pusa
// pe un server 
const API_KEY = "aec94de6-0c5a-411c-9ae1-a7a6d37cc890";
// functie ce ne returneaz ami multe stiri dupa o categorie
// pageNumber si pageStyle vor avea valori default, daca un parametru nu este trimis cand functia se apeleaza inseamna ca
// acea variabila va lua valoarea default care este specificata cand se defineste parametrul
export function getNewsCategoriesEndpoints(category, pageNumber = 1, pageSize = 20) {
    // catre api-ul de la guardian trebuie sa trimitem un payload care consta in mai multe queryParams
    // printre care apikey, section(categoria), show-field(sa ne dea toate detaliie despre stire , page-size (nr de stiri
    // pe care sa le returneze si page(nr paginii curente)))
    const queryParams = `?api-key=${API_KEY}&section=${category}&show-fields=all&page-size=${pageSize}&page=${pageNumber}`;
    // returnam linkul aferent API-ului de la theGuardian cu queryparams de mai sus 
    return `https://content.guardianapis.com/search${queryParams}`;

}
// functie ce returneaza endpointul pt o singura sstire 
export function getNewsDetailsEndpoint(newsId){
    const queryParams = `?api-key=${API_KEY}&show-fields=all`;
    return `https://content.guardianapis.com/${newsId}${queryParams}`;
}
