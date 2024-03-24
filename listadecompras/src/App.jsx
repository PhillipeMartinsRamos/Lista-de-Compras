import { useEffect, useState } from "react";
import "./App.css";
import Input from "./components/Input";
import ProductList from "./components/ProductList";
import uniqid from "uniqid";
import { GoAlert } from "react-icons/go";

function App() {
  // getting the stored list from localstorage
  const storedList = JSON.parse(localStorage.getItem("list"));
  // saving the stored list or creating an empty list
  const [shoppingList, setShoppingList] = useState(
    storedList ? storedList : []
  );

  // hook that render or not the form
  const [isOpened, setIsOpened] = useState(false);
  const [isOpenedDelete, setIsOpenedDelete] = useState(false);

  // verifying changes at the list and sending to localstorage
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(shoppingList));
  }, [shoppingList]);

  const [item, setItem] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState("");
  const [tipo, setTipo] = useState("add");

  const [editId, setEditId] = useState("");

  // function to store the value inside shoppingList
  const handleSubmit = (e) => {
    e.preventDefault();

    let convertedPrice =
      price[0] === "," || price[0] === "."
        ? 0 + price.replace(",", ".")
        : price.replace(",", ".");
    if (convertedPrice[convertedPrice.length - 1] === ".") {
      convertedPrice = `${convertedPrice}00`;
    }
    if (!convertedPrice.includes(".")) {
      convertedPrice = `${convertedPrice}.00`;
    }
    if (convertedPrice[convertedPrice.length - 2] === ".") {
      convertedPrice = `${convertedPrice}0`;
    }

    const addedItems = {
      id: uniqid(),
      item: item,
      price: convertedPrice,
      qty:
        qty[0] === "," || qty[0] === "."
          ? 0 + qty.replace(",", ".")
          : qty.replace(",", "."),
    };

    setShoppingList([...shoppingList, addedItems]);

    setItem("");
    setPrice("");
    setQty("");

    setIsOpened(false);

    console.log(addedItems);
  };

  const handleDelete = (id) => {
    setShoppingList(shoppingList.filter((item) => item.id !== id));
  };

  const handleEdit = (id) => {
    const index = shoppingList.findIndex((produto) => produto.id === id);
    let newList = [...shoppingList];

    let convertedPrice =
      price[0] === "," || price[0] === "."
        ? 0 + price.replace(",", ".")
        : price.replace(",", ".");

    if (convertedPrice[convertedPrice.length - 1] === ".") {
      convertedPrice = `${convertedPrice}00`;
    }
    if (!convertedPrice.includes(".")) {
      convertedPrice = `${convertedPrice}.00`;
    }
    if (convertedPrice[convertedPrice.length - 2] === ".") {
      convertedPrice = `${convertedPrice}0`;
    }

    newList[index].item = item;
    newList[index].price = convertedPrice;
    (newList[index].qty =
      qty[0] === "," || qty[0] === "."
        ? 0 + qty.replace(",", ".")
        : qty.replace(",", ".")),
      setShoppingList(newList);

    setEditId("");
    setItem("");
    setPrice("");
    setQty("");
    setIsOpened(false);
  };

  return (
    <div className="App">
      <h1 className="title">
        Lista de <br /> Compras
      </h1>

      {/* aqui ficam os inputs */}
      <Input
        handleSubmit={handleSubmit}
        handleEdit={handleEdit}
        setItem={setItem}
        setPrice={setPrice}
        setQty={setQty}
        item={item}
        price={price}
        qty={qty}
        tipo={tipo}
        setTipo={setTipo}
        isOpened={isOpened}
        setIsOpened={setIsOpened}
        editId={editId}
      />
      <div className="list-container">
        {/* aqui fica a lista */}
        {shoppingList && (
          <ProductList
            productList={shoppingList}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            setIsOpened={setIsOpened}
            setItem={setItem}
            setPrice={setPrice}
            setQty={setQty}
            setTipo={setTipo}
            setEditId={setEditId}
          />
        )}
      </div>

      <div className="instructions">
        <p>Instruções de uso</p>
        <ul>
          <li>
            <span className="index-instructions">Adicionar produto: </span>Toque
            no botão (<button className="btn-add-inst smallest">+</button>) e
            insira os valores.
          </li>
          <li>
            <span className="index-instructions">Alterar produto: </span>Toque
            duas vezes no produto.
          </li>
          <li>
            <span className="index-instructions">Excluir produto: </span>Toque
            no botão (<button className="btn-delete-inst small">x</button>) ao
            lado do produto a ser excluído.
          </li>
          <li>
            <span className="index-instructions">Limpar Lista: </span>Toque no
            botão (<button className="clearList small">Limpar Lista</button>)
          </li>
        </ul>
      </div>
      <button className="clearList" onClick={() => setIsOpenedDelete(true)}>
        Limpar Lista
      </button>
      {isOpenedDelete && (
        <div className="container-clear-list-screen">
          <div className="clear-list-screen">
            <GoAlert className="icon-alert" />
            <h3>Quer mesmo limpar a lista?</h3>
            <p>Após a limpeza da lista, não será possível recuperá-la</p>
            <div className="container-clear-list-buttons">
              <button className="btn-green" onClick={() => setIsOpenedDelete(false)}>Cancelar</button>
              <button 
                onClick={() => {
                  setShoppingList([]);
                  setIsOpenedDelete(false);
                }}
              >
                Limpar Lista
              </button>
            </div>
          </div>
        </div>
      )}
      <p className="footer">Desenvolvido por Alex e Lipe</p>
    </div>
  );
}

export default App;
