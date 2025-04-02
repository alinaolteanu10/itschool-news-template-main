// prima data exportam un state innitial
export const initialState = {
    news: [],
}
// exportam reduccereul care ne modif stateul
export function favoritesReducer(state, action) {
    switch(action.type) {
        case 'ADD_TO_FAVORITES': {
            // Cautam daca stirea pe are -a dat click este deja
            const isInList = state.news.find((newsItem) => 
            { return newsItem.id === action.payload.id

        });
        // daca este in lista atunci returnam stateul
        if(isInList){
            return state;

        } else{
            // daca nu este in lista il adaugam inn state la inceputul listei de stiri favorite
            const newState= {
            news: [action.payload, ...state.news]
        };
        return newState
        }
    }
    case 'REMOVE_FROM_FAVORITES':{
        // pt a scoate o stire de la favorite trebuie sa filtram din state elementul care are id-ul primit pe payload
        const filteredNews = state.news.filter((newsItem) => {
            return newsItem.id !== action.payload
        });
        const newState = {
            news: filteredNews
        };
            return newState;
        }
        // nu uitam sa definim si un default in care sa returnam stateul
        default: {
            return state;
        }
    }
}