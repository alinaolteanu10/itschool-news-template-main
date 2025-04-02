import { Col, Container, Row } from "react-bootstrap";
import NewsCard from "./NewsCard";

export default function NewsCardList(props){
    const {newsList} = props;
 
    return (
        // folosim grid-ul de la bootsstrap pt a aseza elementele in pagina
        <Container>
            <Row>
                {/* o sa mapam pin lista de stiri(neewsList) sin pt fieacre item aficam un card cu stirea */}
                {newsList.map((news) => {
                    return (
                        <Col xs={12} md={6} lg={4} className="mb-4" key={news.id}
                        >
                        <NewsCard
                        newsId={news.id}
                        imgSrc={news.thumbnail}
                        title={news.title}
                        description={news.description}
                        hasCloseButton={news.hasCloseButton}
                        
                        ></NewsCard>
                        </Col>
                    );

                })}
            </Row>
        </Container>
    );
}