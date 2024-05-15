import React, { useState } from 'react'
import B2Child from './B2Child'
interface Product{
    id:number,
    img:string,
    detail:string,
    price:number,
}
interface Cart{
    id:number;
    product:Product,
    quantity:number,
}
export default function B2() {
    const [listProduct,setListProduct]=useState<Product[]>(
        [
            {
                id:1,
                img:'https://media.bibomart.net/images/2024/2/2/1/origin/sua-bot-france-lait-so-1-400g.jpg',
                detail:"Sữa France Lait số 1 400g (0 - 6 tháng)",
                price:220000
            },
            {
                id:1,
                img:'https://media.bibomart.net/images/2024/2/2/1/origin/sua-bot-france-lait-so-1-400g.jpg',
                detail:"Sữa France Lait số 1 400g (0 - 6 tháng)",
                price:230000
            },
            {
                id:1,
                img:'https://media.bibomart.net/images/2024/2/2/1/origin/sua-bot-france-lait-so-1-400g.jpg',
                detail:"Sữa France Lait số 1 400g (0 - 6 tháng)",
                price:200000
            },
            {
                id:1,
                img:'https://media.bibomart.net/images/2024/2/2/1/origin/sua-bot-france-lait-so-1-400g.jpg',
                detail:"Sữa France Lait số 1 400g (0 - 6 tháng)",
                price:250000
            },
            {
                id:1,
                img:'https://media.bibomart.net/images/2024/2/2/1/origin/sua-bot-france-lait-so-1-400g.jpg',
                detail:"Sữa France Lait số 1 400g (0 - 6 tháng)",
                price:220000
            },
            {
                id:1,
                img:'https://media.bibomart.net/images/2024/2/2/1/origin/sua-bot-france-lait-so-1-400g.jpg',
                detail:"Sữa France Lait số 1 400g (0 - 6 tháng)",
                price:220000
            },
        ]
    )
    const [cart,setCart]=useState<Cart[]>(()=>{
        let cartLocal=localStorage.getItem('cart');
        let list=(cartLocal)?JSON.parse(cartLocal):[];
        return list;
    })
    const addProduct=(id:number)=>{
        let productChoice=listProduct.find(item=>item.id===id);
        if(productChoice){
            let item={
                id:Math.floor(Math.random()*10000000),
                product:productChoice,
                quantity:1,
            }
            let newCart=[...cart,item];
            setCart(newCart);
            localStorage.setItem('cart',JSON.stringify(newCart));
        }
    }
  return (
    <div className='B2'>
      <nav>
        <div style={{display:'flex',gap:'20px',alignItems:'center'}}>
            <li>Trang chủ</li>
            <li>Danh sách sản phẩm</li>
        </div>
        <div>
        <i className="fa-solid fa-cart-shopping"></i>
        </div>
      </nav>
      <main>
        {listProduct.map(item=><B2Child key={item.id} product={item} addProduct={addProduct}/>)}
      </main>
    </div>
  )
}
