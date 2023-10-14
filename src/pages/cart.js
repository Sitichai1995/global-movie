import React, { useState } from 'react';
import { useShoppingCart } from '../context/shoppingContext';
import Payment from './payment';

const Cart = () => {
  const { cartItems, removeAllCart } = useShoppingCart();
  const [popup, setPopup] = useState(false)

  const discount = () => {
    let percentage = 0
    const productprice = cartItems.length * 10

    if (cartItems.length > 5) {
      percentage = 20
      let discountAmount = (productprice * percentage) / 100
      const totalprice = productprice - discountAmount

      return `${totalprice}$ (from ${productprice}$ -20%)`
    } else if (cartItems.length > 3) {
      percentage = 10
      let discountAmount = (productprice * percentage) / 100
      const totalprice = productprice - discountAmount

      return `${totalprice}$ (from ${productprice}$ -10%)`
    } else {
      return `${productprice}$`
    }


  }
  return (
    <div className='relative w-screen min-h-screen bg-slate-300'>
      <div className='fixed top-0 left-0 right-0 bg-gray-900 text-white p-4'>
        <div className='flex justify-between'>
          <div className='text-xl mt-2'>
            Total : {discount()}
          </div>

          <div>
            <button class="py-2 px-5 mr-2 mb-2 text-sm font-medium text-white bg-transparent rounded-lg border border-gray-200" disabled={cartItems.length === 0} onClick={() => setPopup(true)}>purchase</button>
          </div>

        </div>

      </div>
      <div className='mt-16'>
        {cartItems.map((movie, index) => (
          <div key={index} className='flex justify-center py-4'>
            <div className='flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl w-2/3'>
              <img
                className='object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg'
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt=''
              />
              <div className='flex flex-col justify-between p-4 leading-normal'>
                <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900'>{movie.title}</h5>
                
                <p className='mb-3 font-normal text-gray-700'>10 $</p>
              </div>
            </div>
          </div>
        ))}

        {cartItems.length ? (<div className='flex flex-col items-center'>
          <button class=" py-2 px-5 mr-2 mb-2 text-sm font-medium text-white bg-red-600 rounded-lg border hover:bg-red-800" onClick={removeAllCart}> Delete all</button>
        </div>) : ""}

        {/* popup */}
        <Payment trigger={popup} closePopup={setPopup} />
      </div>



    </div>
  );
};

export default Cart;
