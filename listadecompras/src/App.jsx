import { useEffect, useState } from "react";
import "./App.css";
import Input from "./components/Input";
import ProductList from "./components/ProductList";

function App() {
  //Lsita para testes
  const listaTeste = [
    {
      id: "2121",
      item: "Arroz Basmati",
      price: 2.08,
      qty: 2,
    },
    {
      id: "1515",
      item: "Milka Ao Leite",
      price: 1.39,
      qty: 1,
    },
    {
      id: "4278",
      item: "Bifanas",
      price: 3.49,
      qty: 0.895,
    },
  ];

  // getting the stored list from localstorage
  const [storedList, setStoredList] = useState(
    JSON.parse(localStorage.getItem("list"))
  );

  // saving the stored list or creating an empty list
  const [shoppingList, setShoppingList] = useState(
    storedList ? storedList : listaTeste
  );

  // verifying changes at the list and sending to localstorage
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(shoppingList));
  }, [shoppingList]);

  const [item, setItem] = useState();
  const [price, setPrice] = useState();
  const [qty, setQty] = useState();

  // function to store the value inside shoppingList
  const handleSubmit = (e) => {
    e.preventDefault();
    const addedItems = {
      id: "10",
      item: item,
      price: price,
      qty: qty,
    };

    setItem("");
    setPrice("");
    setQty("");

    console.log(addedItems);
  };

  return (
    <div className="App">
      <h1 className="title">Lista de Compras - Alex e Lipe</h1>
      <div className="form-container">
        {/* aqui ficam os inputs */}
        <Input
          handleSubmit={handleSubmit}
          setItem={setItem}
          setPrice={setPrice}
          setQty={setQty}
          item={item}
          price={price}
          qty={qty}
        />
      </div>
      <div className="list-container">
        {/* aqui fica a lista */}
        {shoppingList && <ProductList productList={shoppingList} />}
      </div>
      <button onClick={() => localStorage.clear()}>Limpar Lista</button>
    </div>
    
  );
}

export default App;
