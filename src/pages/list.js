import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from '../components/search'
import { useShoppingCart } from '../context/shoppingContext';

const List = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [addedToCart, setAddedToCart] = useState({});

    //context
    const { addToCart } = useShoppingCart();
    // Get all movies
    const getMovies = async () => {
        try {
            const response = await axios.get(
                'https://api.themoviedb.org/3/search/movie?api_key=1ae0ccf08a944005258f61ca70f4df4b&query=a'
            );
            setData(response.data.results);
            setFilteredData(response.data.results);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleSearch = (query) => {
        const filteredResults = data.filter((movie) =>
            movie.title.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredData(filteredResults);
    }

    //add to cart 
    const handleAddToCart = (movie) => {
        addToCart(movie)
        setAddedToCart((prevAddedToCart) => ({
            ...prevAddedToCart, [movie.id] : true
        }))
    }
    //disabled Add to cart
    const isAddedToCart = (movie) => !!addedToCart[movie.id];

    useEffect(() => {
        getMovies(); // Fetch all movies 
    }, []);


    return (
        <div>
            <Search onSearch={handleSearch} />
            <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-5">
                {filteredData.map((movie) => (
                    <div key={movie.id} >
                        <div class=" flex flex-wrap items-center justify-center">
                            <div class="  relative rounded-lg max-w-xs shadow-lg h-96 w-64" style={{
                                backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat'
                            }}>
                                
                                <div
                                    className="absolute inset-0 bg-black opacity-40 rounded-lg"
                                ></div>
                                
                                
                                <div class="relative text-white px-2 pb-6 mt-6">
                                    <div class="flex justify-between">
                                        <span class=" font-semibold text-lg">{movie.title}</span>
                                        <button 
                                        disabled={isAddedToCart(movie)} 
                                        onClick={() => handleAddToCart(movie)}>
                                            {!addedToCart[movie.id] ? (<span class=" bg-white rounded-full text-orange-500 text-xs font-bold px-3 py-2 leading-none flex items-center">add to cart</span>) : (<span class=" bg-white rounded-full text-green-500 text-xs font-bold px-3 py-2 leading-none flex items-center">added!</span>)}
                                        </button>

                                    </div>
                                    <span class=" font-semibold text-sm">10 $</span>
                                </div>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default List;
