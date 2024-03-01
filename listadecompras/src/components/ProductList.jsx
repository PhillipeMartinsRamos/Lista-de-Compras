import './ProductList.css'

const ProductList = ({ productList, handleDelete }) => {
    let total = 0

  return (
    
    <div className="table">
      <div className="table-title listStatus">
        <ul>
            <li className='
            name'>Produto</li>
            <li className='
            price'>€/Unid</li>
            <li className='
            qty'>Qtd</li>
            <li className='
            total'>Total</li>
            <li className='empty'></li>
        </ul>
      </div>
      <div className="table-content">
        {productList.map((item) => {
            total += (item.qty * item.price)
            return(
          <ul key={item.id} className='list-row'>
            <li className='
            name'>{item.item}</li>
            <li className='
            price'>{item.price}</li>
            <li className='
            qty'>{item.qty}</li>
            <li className='
            total'>{(item.qty*item.price).toFixed(2)}</li>
            <li className='delete'><button onClick={()=>handleDelete(item.id)}>x</button></li>
          </ul> 
        )})}
      </div>
      <div className="table-result">
        <h2>Valor Total:</h2>
        <p>€ {total.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductList;
