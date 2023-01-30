import React from "react";

import Header from "./components/Header";
import Drawer from "./components/Drawer/index";
import Home from "./pages/Home";
import AppContext from "./context";
import axios from "axios";
import { Route } from "react-router-dom";
import Favourites from "./pages/Favourites";
import Orders from "./pages/Ordes";

const App = () => {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favourites, setFavourites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const cartResponse = await axios.get(
          "https://635902faff3d7bddb9967d80.mockapi.io/cart"
        );
        const itemsResponse = await axios.get(
          "https://635902faff3d7bddb9967d80.mockapi.io/items"
        );
        const favouritesResponse = await axios.get(
          "https://635902faff3d7bddb9967d80.mockapi.io/favourites"
        );
        setIsLoading(false);

        setCartItems(cartResponse.data);
        setFavourites(favouritesResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert("Ошибка при запросе данных");
      }
    }
    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find(
        (item) => Number(item.parentId) === Number(obj.id)
      );
      if (findItem) {
        setCartItems((prev) =>
          prev.filter((item) => Number(item.parentId) !== Number(obj.id))
        );
        await axios.delete(
          `https://635902faff3d7bddb9967d80.mockapi.io/cart/${findItem.id}`
        );
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post(
          "https://635902faff3d7bddb9967d80.mockapi.io/cart",
          obj
        );
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          })
        );
      }
    } catch (error) {
      alert("Ошибка при добавлении товара в корзину");
      console.error(error);
    }
  };

  const onAddToFavorite = (obj) => {
    try {
      const findItem = favourites.find(
        (favObj) => Number(favObj.id) === Number(obj.id)
      );
      if (findItem) {
        axios.delete(
          `https://635902faff3d7bddb9967d80.mockapi.io/favourites/${obj.id}`
        );
      } else {
        axios.post(
          "https://635902faff3d7bddb9967d80.mockapi.io/favourites",
          obj
        );
        setFavourites((prev) => [...prev, obj]);
      }
    } catch (error) {
      alert("Ошибка при добавлении товара в закладки");
      console.log(error);
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value.trimStart());
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://635902faff3d7bddb9967d80.mockapi.io/cart/${id}`);
      setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(id))
      );
    } catch (error) {
      alert("Ошибка при удалении товара из корзины");
    }
  };

  return (
    <AppContext.Provider
      value={{
        items,
        isItemAdded,
        cartItems,
        setCartOpened,
        onAddToFavorite,
        favourites,
				setCartItems
      }}
    >
      <div className="wrapper clear">

        <Drawer
          onRemoveItem={onRemoveItem}
          items={cartItems}
          opened={cartOpened}
          onCloseCart={() => setCartOpened(false)}
        />
        <Header onClickCart={() => setCartOpened(true)} />
        <Route path="/" exact>
          <Home
            items={items}
            onChangeSearchInput={onChangeSearchInput}
            onAddToCart={onAddToCart}
            onAddToFavorite={onAddToFavorite}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            isLoading={isLoading}
          />
        </Route>
        <Route path="/favourites" exact>
          <Favourites />
        </Route>
        <Route path="/orders" exact>
          <Orders />
        </Route>
      </div>
    </AppContext.Provider>
  );
};

export default App;
