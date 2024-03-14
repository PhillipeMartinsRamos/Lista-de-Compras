import "./Input.css";

const Input = ({
  handleSubmit,
  setItem,
  setPrice,
  setQty,
  item,
  price,
  qty,
}) => {
  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <label className="label-item">
          item:
          <input
            type="text"
            name="item"
            onChange={(e) => {
              setItem(e.target.value);
            }}
            value={item}
            required
          />
        </label>
        <label className="label-value">
          Preço(€):
          <input
            type="text"
            name="price"
            onChange={(e) => {
              let regex = /^[0-9]*([.,][0-9]{0,2})?$/; // define uma expressão regular para números com até 2 casas decimais
              if (regex.test(e.target.value)) {
                // verifica se o valor não corresponde à expressão regular
                setPrice(e.target.value.replace(/[^0-9,.]/g, "")); // remove os caracteres inválidos // atualiza o valor do input
              }
            }}
            value={price}
            required
          />
        </label>
        <label className="label-quantity">
          quantidade:
          <input
            type="text"
            name="quantity"
            onChange={(e) => {
              let regex = /^[0-9]*([.,][0-9]{0,3})?$/; // define uma expressão regular para números com até 2 casas decimais
              if (regex.test(e.target.value)) {
                // verifica se o valor não corresponde à expressão regular
                setQty(e.target.value.replace(/[^0-9,.]/g, "")); // remove os caracteres inválidos // atualiza o valor do input
              }
            }}
            value={qty}
            required
          />
        </label>
        <input className="button" type="submit" value="adicionar" />
      </form>
    </div>
  );
};

export default Input;
