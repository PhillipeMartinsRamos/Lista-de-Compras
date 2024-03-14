import { useState } from "react";
import "./ProductList.css";

const ProductList = ({ productList, handleDelete, handleEdit, setIsOpened, setItem, setPrice, setQty, setTipo, setEditId }) => {
  let total = 0;

  return (
    <div className="table">
      <div className="table-title">
        <ul>
          <li
            className="
            name"
          >
            Produto
          </li>
          <li
            className="
            price"
          >
            preço
          </li>
          <li
            className="
            qty"
          >
            Qtd
          </li>
          <li
            className="
            total"
          >
            Total
          </li>
          <li className="empty"></li>
        </ul>
      </div>
      <div className="table-content">
        {productList.map((item) => {
          total += item.qty * item.price;
          return (
            <ul
              key={item.id}
              className="list-row"

              onDoubleClick={() => {
                setIsOpened(true);
                setTipo("edit");
                setItem(item.item);
                setPrice(item.price);
                setQty(item.qty);
                setEditId(item.id)
              }}
            >
              <li
                className="
            name"
              >
                {item.item}
              </li>
              <li
                className="
            price"
              >
                € {item.price}
              </li>
              <li
                className="
            qty"
              >
                {item.qty}
              </li>
              <li
                className="
            total"
              >
                {(item.qty * item.price).toFixed(2)}
              </li>
              <li className="delete">
                <button
                  onClick={(e) => {
                    e.target.parentNode.parentNode.className =
                      "list-row-deleted";
                    setTimeout(() => handleDelete(item.id), 400);
                  }}
                >
                  x
                </button>
              </li>
            </ul>
          );
        })}
      </div>
      <div className="table-result">
        <h2>Preço Total:</h2>
        <p>€ {total.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductList;
