import "./Input.css";

const Input = ({
  handleSubmit,
  handleEdit,
  setItem,
  setPrice,
  setQty,
  item,
  price,
  qty,
  tipo,
  setTipo,
  isOpened,
  setIsOpened,
  editId,
}) => {


  return (
    <div className="form-container">
      <button
        className="btn-add-item"
        onClick={() => {
          setIsOpened(true);
          setItem("");
          setPrice("");
          setQty("");
          setTipo("add");
        }}
      >
        +
      </button>
      {isOpened && (
        <div className="container-form">
          <form
            className="form"
            onSubmit={
              tipo === "add"
                ? handleSubmit
                : (e) => {
                    e.preventDefault();
                    handleEdit(editId);
                  }
            }
          >
            <button
              className="btn-close-form"
              onClick={() => setIsOpened(false)}
            >
              x
            </button>
            {tipo === "add" && (
              <h2 className="titulo-form">Adicionar produto</h2>
            )}
            {tipo === "edit" && <h2 className="titulo-form">Editar produto</h2>}
            <label className="label-item">
              item:
              <input
                type="text"
                name="item"
                onChange={(e) => {
                  setItem(e.target.value);
                }}
                value={item}
                autoFocus
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
              />
            </label>
            <input
              className="button"
              type="submit"
              value={tipo === "add" ? "adicionar" : "Salvar edição"}
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default Input;
