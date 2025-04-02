import { useNavigate } from "react-router-dom";
import BootstrapPagination from "react-bootstrap/Pagination";

export default function Pagination(props) {
    // Componenta va primi ca si props numarul paginii care este activa, dar si url-ul catre care redirectioneaza la click pe o noua pagina
    let { active, baseUrl } = props;
    // FOlosim hook-ul useNavigate
    let navigate = useNavigate();

    // daca nu primim nici o valoare pentru active, atunci pagina 1 este cea activa
    if (!active) {
        active = 1;
    }

    // Tinem intr-un arrau stirile grupate pe pagini
    let items = [];
    for (let number = 1; number <= 5; number++) {
        items.push(
            <BootstrapPagination.Item
            key={number}
            active={number === Number(active)}
            id={active ? "pagination-active" : null}
            onClick={() => {
                // la click pe buton navigam pe noua pagina
            navigate(`${baseUrl}?page=${number}`);
            // si crolam in topul paginii
            window.scrollTo({
                top:0, 
                behavior:"smooth"
            });

            }}
            >
            </BootstrapPagination.Item>
        );
    }

    return (
        <div className="d-flex justify-content-center">
            <BootstrapPagination className="pagination">{items}</BootstrapPagination>
        </div>
    );
}