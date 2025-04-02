import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { removeFromFavorites } from "../store/Favorites/actions";
import { useContext } from "react";
import { FavoritesContext } from "../store/Favorites/context";
import './NewsCard.css';

export default function NewsCard(props) {
    const{favoriteDispatch} = useContext(FavoritesContext);
    const {newsId, imgSrc, title, description, hasCloseButton} = props;
    function handleRemoveFromFavorites(id) {
        const actionResult = removeFromFavorites(id);
        favoriteDispatch(actionResult);
    }
    return (
        <Card className="newsCard d-flex flex-column justify-content-betweeen align-items-center h-100">
        {/* // {la click pe card vom fi redirectionati catre pagina cu detalii} */}
        {/* caracterul / din id il deruteaza pe react router deci trebuie sa il codifica */}
        <Link to={`/news/${encodeURIComponent(newsId)}`}>
            <Card.Img src={imgSrc} variant="top" />
            <Card.Body>
                <Card.Title>
                    {title}
                </Card.Title>
                <Card.Text>{description}</Card.Text>
            </Card.Body>
        </Link>
        {/* daca avem buton de eliminare de la favorite atunci il afisam  */}
        {hasCloseButton && (
            <Button variant="light" onClick={()=>
            (
                handleRemoveFromFavorites(newsId)
        )}> 

            <span className="material-icons text-dark">close</span>

            </Button>
        )}
        </Card>
    )
}