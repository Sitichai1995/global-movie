import React, { useState } from 'react'
import Logo from '../assests/logo.png'
import { Link } from 'react-router-dom'
import { useShoppingCart } from '../context/shoppingContext';

const Search = ({ onSearch }) => {
    const { cartItems} = useShoppingCart();

    const [search, setSearch] = useState("")

    //collect word
    const handleChange = (e) => {
        const searchData = e.target.value
        setSearch(searchData)
        onSearch(searchData)
    }
    return (
        <nav className="bg-white border-gray-200 ">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div className="flex items-center">
                    <img src={Logo} className="h-8 mr-3" alt="Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap ">DO-movies</span>
                </div>
                <div className="flex md:order-2">
                    <div className="relative hidden md:block">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                            <span className="sr-only">Search icon</span>
                        </div>
                        <input type="text" id="search-navbar" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50" placeholder="Search..." value={search} onChange={handleChange} />
                    </div>
                    <div className='ml-4'>
                        <Link to={"/cart"}>
                            <button type="button" class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-slate-900 rounded-lg">
                                cart
                                <span class="inline-flex items-center justify-center w-4 h-4 ml-2 mt-1 text-xs font-semibold text-black bg-white rounded-full">
                                    {cartItems.length}
                                </span>
                            </button>
                        </Link>

                    </div>
                </div>

            </div>
        </nav>


    )
}

export default Search


