import './Input.css'

const Input = ({handleSubmit, setItem, setPrice, setQty, item, price, qty}) => {

  return (
    <div>
      <form className='form' onSubmit={handleSubmit}>
        <label className='label-item'>item:<input type="text" name="item" onChange={(e)=>setItem(e.target.value)} value={item} /></label>
        <label className='label-quantity'>quantidade:<input type="text" name="quantity" onChange={(e)=>setQty(e.target.value)} value={qty} /></label>
        <label className='label-value'>valor:<input type="text" name="price" onChange={(e)=>setPrice(e.target.value)} value={price} /></label>
        <input className='button' type="submit" value="adicionar" />
      </form>
    </div>
  )
}

export default Input