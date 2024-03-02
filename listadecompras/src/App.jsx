import { useEffect, useState } from "react";
import "./App.css";
import Input from "./components/Input";
import ProductList from "./components/ProductList";
import uniqid from "uniqid";

function App() {
  // getting the stored list from localstorage
  const storedList = JSON.parse(localStorage.getItem("list"));
  // saving the stored list or creating an empty list
  const [shoppingList, setShoppingList] = useState(
    storedList ? storedList : []
  );

  // verifying changes at the list and sending to localstorage
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(shoppingList));
  }, [shoppingList]);

  const [item, setItem] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState("");

  // function to store the value inside shoppingList
  const handleSubmit = (e) => {
    e.preventDefault();

    let convertedPrice = price[0] === "," || price[0] === "." ? 0 + price.replace(",", ".") : price.replace(",", ".")
    if(convertedPrice[convertedPrice.length - 1] === "."){
      convertedPrice = `${convertedPrice}00`
    }
    if(!convertedPrice.includes(".")){
      convertedPrice = `${convertedPrice}.00`
      
    }
    if(convertedPrice[convertedPrice.length - 2] === "."){
      convertedPrice = `${convertedPrice}0`
    }

    const addedItems = {
      id: uniqid(),
      item: item,
      price: convertedPrice,
      qty: qty[0] === "," || qty[0] === "." ? 0 + qty.replace(",", ".") : qty.replace(",", ".")
    };

    setShoppingList([...shoppingList, addedItems]);

    setItem("");
    setPrice("");
    setQty("");

    console.log(addedItems);
  };

  const handleDelete = (id) => {
    setShoppingList(shoppingList.filter((item) => item.id !== id));
  };

  return (
    <div className="App">
      <h1 className="title">Lista de Compras</h1>
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
        {shoppingList && (
          <ProductList productList={shoppingList} handleDelete={handleDelete} />
        )}
      </div>
      <button className="clearList" onClick={() => setShoppingList([])}>
          Limpar Lista
        </button>

        <p className="footer">Desenvolvido por Alex e Lipe</p>
    </div>
  );
}

export default App;
