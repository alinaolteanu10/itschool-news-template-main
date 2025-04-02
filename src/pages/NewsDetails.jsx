import { useParams } from "react-router-dom";
import { getNewsDetailsEndpoint } from "../api/endpoints";
import { useFetch } from "../utils/hooks/useFetch";
import { getNewsDetails } from "../api/adaptors";
import Layout from "../components/Layout";
import { Button, Col, Container, Row } from "react-bootstrap";
import"./NewsDetails.css";
import { getFormattedDate } from "../utils/date";
import { useContext, useState } from "react";
import { FavoritesContext } from "../store/Favorites/context";
import { addToFavorites } from "../store/Favorites/actions";



export default function NewsDetails() { 
    // extragem functia care modifica state-ul global pt stiri favorite
    const {favoriteDispatch} = useContext(FavoritesContext);
    // extragem parametrul newsId din url
    let {newsId} = useParams();
    // acum vrem ca id stririri sa contina / si pt asta trebuie sa il decodam
    newsId = decodeURIComponent(newsId);
    // generam endpointul pt a primi detaliile unei stiri singulare
    const newsDetailsEndpoint = getNewsDetailsEndpoint(newsId);
    // cerem datele de la server
    const newsDetailsData = useFetch(newsDetailsEndpoint);
    // adaptam datele venite de la server deoarece nu avem nevoie de toate prop pe care ni le trimite apiuol
    const adaptedNewsDetails = getNewsDetails(newsDetailsData);
    // extragem campurile de interes din datele adaptate
    const {title, author, content, date, description, image, thumbnail} = adaptedNewsDetails;
    // formatam data 
    const formattedDate= getFormattedDate(date);
    
    
    
    function handleAddToFavorites(news){
        // apelam actiunea de adaugare la favorite
        const actionResult = addToFavorites(news);
        // trimitem rezultatul actiunii catre reducer
        favoriteDispatch(actionResult);
    }

    const [showAlert, setShowAlert] = useState(false);
    const addToFav = () =>{
        setShowAlert(true);
    }
    setTimeout(() => {
        setShowAlert(false);
    }, 4000);


    
    return (
     
        <Layout>
        
          
            <Container className="newsDetails my-5">
                
                <Row className="d-flex justify-content-center"></Row>
                <Col xs={12} lg={8}>
                <h1 className="mb-5 pt-3">{title}</h1>
                <p className="fw-bold">{description}</p>
                {/* de la api imaginea ne vne sub forma de taguri de html si pt a le afisa vom avea nevoie de prop dangerouslySetInnnerHTML */}
                <div dangerouslySetInnerHTML={{__html: image}} className="mb-4"></div>
                <div className="d-flex align-items-center justify-content-betweeen mb-4">
                <div className="fw-bold">
                    <p>{author}</p>
                    <p className="mb-0">{formattedDate}</p>
                </div>
                    <Button onClick={() =>{
                                handleAddToFavorites({
                                    id: newsId,
                                    thumbnail,
                                    title,
                                    description,
                                    hasCloseButton: true
                                }
                            );
                            addToFav();
                        }}>Adauga la favorite</Button>
                          
                            {showAlert && (
                                  <div className="succes">
                                    Adăugat cu succes la favorite!
                                    
                                  </div>
                                )}
                             
                              </div>
                            

                

       
                {/* pt continutul stirii de la api primim taguri de html- prop dangerousy.. */}
                <div dangerouslySetInnerHTML={{__html: content}}></div>
                </Col>
         
            
    </Container>
        </Layout>

    );
     
      
    
}