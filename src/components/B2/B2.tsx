import React, { useState } from 'react'
import B2Child from './B2Child'
import ModalB2 from './ModalB2';
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
                id:2,
                img:'https://media.bibomart.net/images/2024/2/2/1/origin/sua-bot-france-lait-so-1-400g.jpg',
                detail:"Sữa France Lait số 1 400g (0 - 6 tháng)",
                price:230000
            },
            {
                id:3,
                img:'https://media.bibomart.net/images/2024/2/2/1/origin/sua-bot-france-lait-so-1-400g.jpg',
                detail:"Sữa France Lait số 1 400g (0 - 6 tháng)",
                price:200000
            },
            {
                id:4,
                img:'https://media.bibomart.net/images/2024/2/2/1/origin/sua-bot-france-lait-so-1-400g.jpg',
                detail:"Sữa France Lait số 1 400g (0 - 6 tháng)",
                price:250000
            },
            {
                id:5,
                img:'https://media.bibomart.net/images/2024/2/2/1/origin/sua-bot-france-lait-so-1-400g.jpg',
                detail:"Sữa France Lait số 1 400g (0 - 6 tháng)",
                price:220000
            },
            {
                id:6,
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
    const [activeModal,setActiveModal]=useState<boolean>(false);
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
    let handleCart=()=>{
        setActiveModal(!activeModal);
    }
  return (
    <div className='B2'>
      <nav>
        {activeModal &&<ModalB2 cart={cart}/>}
        <div style={{display:'flex',gap:'20px',alignItems:'center'}}>
            <li>Trang chủ</li>
            <li>Danh sách sản phẩm</li>
        </div>
        <div>
        <i onClick={handleCart} className="fa-solid fa-cart-shopping"></i>
        </div>
      </nav>
      <main>
        {listProduct.map(item=><B2Child key={item.id} product={item} addProduct={addProduct}/>)}
      </main>
    </div>
  )
}
