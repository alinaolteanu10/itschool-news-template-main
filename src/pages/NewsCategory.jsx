import { useParams, useSearchParams } from "react-router-dom";
import { getNewsCategoriesEndpoints } from "../api/endpoints";
import { getNewsList } from "../api/adaptors";
import { useFetch } from "../utils/hooks/useFetch";
import Layout from "../components/Layout";
import { Container } from "react-bootstrap";
import NewsCardList from "../components/NewsCardList";
import Pagination from "../components/Pagination";

export default function NewsCategory() {
    // extragem parametrul venit din url
    const {categoryId}  = useParams();
   
    //   extragem queryul din search pt currentPage
    const [queryParams] = useSearchParams();
    let currentPage = queryParams.get('page');
    // daca nu avem queryParam in url inseamna ca suntm pe prima pagina
    if(!currentPage){
        currentPage = 1;

    }
    // generam endpointul catre care sa facem call-ul la server
 const newsCategoryEndpoints = getNewsCategoriesEndpoints(categoryId);
 // fetchuim datele de la the guardian
 const newsData = useFetch(newsCategoryEndpoints);
//  / adaptam datele venite de la server
      const adaptedNewsData = getNewsList(newsData);


// in functie de parametrul primit n url decidem ce titlu sa aratam
    let title = "";
    switch (categoryId) {
        case "technology":
            title="Tech";
            break;
        case "football":
            title="Footbal";
            break;
        case "business":
            title="Business";
            break;
    
        default:
            break;
    }
    return (
        <Layout>
            <Container className="my-5">
                <h1 className="mb-5 pt-3">{title}</h1>
                {/* {/* afisam lista cu stiri} */}
                <NewsCardList newsList={adaptedNewsData} />
                {/* afisam paginatia
                 */}
                 <Pagination active={currentPage} baseUrl={`/category/${categoryId}`}></Pagination>
            </Container>
        </Layout>
    )
}