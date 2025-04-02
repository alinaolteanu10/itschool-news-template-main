
import Page404 from "./pages/Page404";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import NewsCategory from "./pages/NewsCategory";
import Favorites from "./pages/Favorites";
import { useReducer } from "react";
import { favoritesReducer, initialState } from "./store/Favorites/reducer";
import { FavoritesContext } from "./store/Favorites/context";
import NewsDetails from "./pages/NewsDetails";
import { useLocalStorage } from "./utils/hooks/useLocalStorage";

// definim rutele necesare aplicatiei
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement:<Page404 />
  },
  {
    path: "/news/:newsId",
    element: <NewsDetails /> 

  },
  { path: "/category/:categoryId",
    element:<NewsCategory />
  },
  {
    path: "/favorites",
    element: <Favorites />
  }
]);


function App() {
  // initializa reducerul pt produse favorite folosind hookul usereducer care are nevoie de un state initial si reducerul care modifica stateul

  // Daca am state in localStorage, il preiau, daca nu pornesc de la initialState.
  const [initialLocalStorageState] = useLocalStorage("favorites", initialState);
  const [favoritesState, favoriteDispatch] = useReducer(
    favoritesReducer,
    initialLocalStorageState
  );
  // ne mai trebuie obiectul ce va contine valoarea contextuui
  const favoritesContextValue = { favoritesState, favoriteDispatch };

  return (
    <div className="App">
      {/* pasam stateul global si dipathcul catre intreaga aplicatie
       */}
      <FavoritesContext.Provider value={favoritesContextValue}>
        {/* adaugam providerul de routare necesar pt a sti reactul ce rute avem in aplicatie */}
        <RouterProvider router={appRouter}></RouterProvider>
      </FavoritesContext.Provider>
    </div>
  );
}
export default App;
