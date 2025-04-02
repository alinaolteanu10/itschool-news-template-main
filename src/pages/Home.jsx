import { Container } from "react-bootstrap";
import { getNewsList } from "../api/adaptors";
import { getNewsCategoriesEndpoints } from "../api/endpoints";
import Layout from "../components/Layout";
import NewsCardList from "../components/NewsCardList";
import { useFetch } from "../utils/hooks/useFetch";
import { Link } from "react-router-dom";


export default function Home(){
    // generam endpointurile pt categoriile de stiri
    const techNewsEndPoint = getNewsCategoriesEndpoints("technology", 1, 6);
    const footballNewsEndpoint = getNewsCategoriesEndpoints("football", 1, 6);
    const businessNewsEndpoint = getNewsCategoriesEndpoints("business", 1 , 6);
    const weatherNewsEndpoint = getNewsCategoriesEndpoints("weather", 1, 6)
    
    // fetch-uim datele de la server
    const techData =  useFetch(techNewsEndPoint);
    const footballData = useFetch(footballNewsEndpoint);
   const businessData = useFetch(businessNewsEndpoint);
   const weatherData = useFetch(weatherNewsEndpoint);

    // adaptam/parsam datele venite de la server
   const adaptedTechData = getNewsList(techData);
   const adaptedFootballData = getNewsList(footballData);
    const adaptedBusinessData = getNewsList(businessData);
    const adaptedWeatherData = getNewsList(weatherData);
  
    return(
        <Layout>
            <section className="tech my-5">
                <Container>
                    <h1 className="mb-5 pt-3">Tech</h1>
                    <NewsCardList newsList={adaptedTechData} />
                    <p>
                        Vezi toate stirile legate de tehnologie in sectiunea:{" "}
                        <Link to="/category/technology" className="text-secondary">
                            Tech
                        </Link>
                    </p>
                </Container>
            </section>
            <section className="football my-5">
                <Container>
                    <h1 className="mb-5 pt-3">Football</h1>
                    <NewsCardList newsList={adaptedFootballData} />
                    <p>
                        Vezi toate stirile legate de fotbal in sectiunea:{" "}
                        <Link to="/category/football" className="text-secondary">
                            Football
                        </Link>
                    </p>
                </Container>
            </section>
           
            <section className="business my-5">
                <Container>
                    <h1 className="mb-5 pt-3">Business</h1>
                    <NewsCardList newsList={adaptedBusinessData} />
                    <p>
                        Vezi toate stirile legate de business in sectiunea:{" "}
                        <Link to="/category/business" className="text-secondary">
                           Business
                        </Link>
                    </p>
                </Container>
            </section>
            <section className="weather my-5">
                <Container>
                    <h1 className="mb-5 pt-3">Weather</h1>
                    <NewsCardList newsList={adaptedWeatherData} />
                    <p>
                        Vezi toate stirile legate de vreme in sectiunea:{" "}
                        <Link to="/category/weather" className="text-secondary">
                            Vreme
                        </Link>
                    </p>
                </Container>
            </section>
            <section className="my-5">
                <Container>
                    <h1 className="mb-5 pt-5">Favorite</h1>
                    <p>Vrei sa iti salvezi stirile favorite pentru a le reciti mai tarziu?</p>
                    <p>In cadrul fiecarei stiri gasesti un buton prin care poti adauga stirea la favorite</p>
                    <p>
                        Vezi sectiunea:{" "}
                        <Link to="favorites" className="text-secondary">
                            Favorite
                        </Link>
                    </p>
                </Container>
            </section>
        </Layout>

    )}
