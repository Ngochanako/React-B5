import React from 'react'
interface ProductProps{
    product:{
    id:number,
    img:string,
    detail:string,
    price:number,},
    addProduct:(id:number)=>void,
}
export default function B2Child(props:ProductProps) {
     let {product,addProduct}=props;
  return (
    <div className='product'>
        <img src={product.img} alt="" />
        <p>{product.detail}</p>
        <p>{product.price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</p>
        <button onClick={()=>addProduct(product.id)}>Thêm sản phẩm</button>
    </div>
  )
}
