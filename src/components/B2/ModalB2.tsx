// import React, { useState } from 'react'
// interface ProductProps{
//     id:number,
//     img:string,
//     detail:string,
//     price:number,
// }
// interface CartProps{
//     cart:{
//         id:number;
//         product:ProductProps,
//         quantity:number,
//        }[]
// }
// export default function ModalB2(props:CartProps) {
//     const[cart,setCart]=useState<{
//         id:number;
//         product:ProductProps,
//         quantity:number,
//        }[]>(props.cart)
//     const[totalPrice,setTotalPrice]=useState<number>(0);
//     let handleIncreaseQuantity=(id:number)=>{
//         let newCart=cart.map((item)=>{
//             if(item.id===id){
//                 let cartItem={...item,quantity:item.quantity+1};
//                 return cartItem;
//             }
//             return item;
//         })
//         setCart(newCart);
//         localStorage.setItem('cart',JSON.stringify(newCart));
//     } 
//     let handleDecreaseQuantity=(id:number)=>{
//         let newCart=cart.map((item)=>{
//             if(item.id===id && item.quantity>1){
//                 let cartItem={...item,quantity:item.quantity-1};
//                 return cartItem;
//             }
//             return item;
//         })
//         setCart(newCart);
//         localStorage.setItem('cart',JSON.stringify(newCart));
//     } 
//     let handleRemoveProduct=(id:number)=>{
//         let newCart=cart.filter((item)=>{
//             item.id!==id;
//         })
//         setCart(newCart);
//         localStorage.setItem('cart',JSON.stringify(newCart));
//     }
//     let total=cart.reduce((getSum,num)=>getSum+num.quantity,0);
//     setTotalPrice(total);
//   return (
//     <div className='modalB2'>
//       <p>Cart</p>
//       <hr />
//       {cart.map((item) => (
//         <div key={item.id} className="productCart">
//           <img style={{ width: '50px', height: '50px' }} src={item.product.img} alt="" />
//           <p>{item.product.detail}</p>
//           <p>Quantity: {item.quantity}</p>
//           <button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
//           <p>{item.quantity}</p>
//           <button onClick={() => handleDecreaseQuantity(item.id)}>-</button>
//           <i className="fa-solid fa-trash" onClick={() => handleRemoveProduct(item.id)}></i>
//         </div>
//       ))}
//       <hr />
//       <p>Tổng tiền: {totalPrice.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</p>
//     </div>
//   )
// }
import React, { useState, useEffect } from 'react';

interface ProductProps {
  id: number;
  img: string;
  detail: string;
  price: number;
}

interface CartItem {
  id: number;
  product: ProductProps;
  quantity: number;
}

interface CartProps {
  cart: CartItem[];
}

export default function ModalB2(props: CartProps) {
  const [cart, setCart] = useState<CartItem[]>(props.cart);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    const total = cart.reduce((total, item) => total + item.quantity*item.product.price, 0);
    setTotalPrice(total);
  }, [cart]);

  const handleIncreaseQuantity = (id: number) => {
    const newCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(newCart);
  };

  const handleDecreaseQuantity = (id: number) => {
    const newCart = cart.map((item) =>
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCart(newCart);
  };

  const handleRemoveProduct = (id: number) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
  };

  return (
    <div className='modalB2'>
      <p>Cart</p>
      <hr />
      {cart.map((item) => (
        <div key={item.id} className="productCart">
          <img style={{ width: '30px', height: '30px' }} src={item.product.img} alt="" />
          <p>{item.product.detail}</p>
          <button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
          <p>{item.quantity}</p>
          <button onClick={() => handleDecreaseQuantity(item.id)}>-</button>
          <i className="fa-solid fa-trash" onClick={() => handleRemoveProduct(item.id)}></i>
        </div>
      ))}
      <hr />
      <p>Total Price: {totalPrice.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</p>
    </div>
  );
}
