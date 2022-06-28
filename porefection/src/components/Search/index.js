import React, { useState } from 'react';
import './style.css';

function Search({ routine, setRoutine }) {

    const [userSearch, setUserSearch] = useState('');
    const [searchResults, setSearchResults] = useState();

    // const steps = [
    //     {
    //         name: 'cleanser',
    //         time: 'day & night',
    //         examples: [
    //             'mycellar water'
    //         ]
    //     },

    //     {
    //         name: 'toner',
    //         time: 'day & night',
    //         examples: [
    //             'alpha hydroxy acid',
    //             'beta hydroxy acid',
    //             'yaluronic acid',
    //             'rose water',
    //             'green tea',
    //             'vitamin c',
    //             'vitamin e'
    //         ]
    //     },

    //     {
    //         name: 'serum',
    //         time: 'day & night',
    //         examples: [
    //             'hyaluronic acid',
    //             'vitamin c',
    //             'retinol',
    //             'vitamin b3',
    //             'peptides',
    //             'Colloidal sulfur',
    //             'niacinamide'
    //         ]
    //     },

    //     {
    //         name: 'spot treatment',
    //         time: 'day & night'
    //     },

    //     {
    //         name: 'moisturizer',
    //         time: 'day & night'
    //     },

    //     {
    //         name: 'retinol',
    //         time: 'night'
    //     },

    //     {
    //         name: 'face oil',
    //         time: 'day & night',
    //         examples: [
    //             'maracuja oil',
    //             'olive oil',
    //             'marula oil',
    //             'rosehip oil'
    //         ]
    //     },

    //     {
    //         name: 'sunscreen',
    //         time: 'day',
    //         examples: [
    //             'oxybenzone',
    //             'octinoxate',
    //             'titanium dioxide',
    //             'zinc oxide'
    //         ]
    //     },

    // ];

    const handleInputChange = (e) => {

        setUserSearch(e.target.value);

    };

    // api keys
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'sephora.p.rapidapi.com',
            'X-RapidAPI-Key': '2bf03530c4msh1d7941385d4e837p14e84fjsnfd38d72b506e'
        }
    };

    // search products
    const getProducts = () => {

        fetch(`https://sephora.p.rapidapi.com/products/search?q=${userSearch}&pageSize=12&currentPage=1`, options)
            .then(response => response.json())
            .then(response => setSearchResults(response))
            .catch(err => console.error(err));

    };

    // // product details
    const addProduct = (e, product) => {

        fetch(`https://sephora.p.rapidapi.com/products/detail?productId=${product.id}&preferedSku=${product.sku}`, options)
            .then(response => response.json())
            .then(response => setRoutine([...routine, response]))
            .catch(err => console.error(err));

    };

    return (

        <section className="search">

            <input type="search" name="search" id="search" placeholder="Search for ingredients" value={userSearch} autoFocus onChange={handleInputChange} onKeyUp={(e) => e.key === 'Enter' && getProducts()} />
            <input type="submit" name="submit" id="submit" htmlFor="search" onClick={e => getProducts(e)} />

            <ul className="all-results">

                {searchResults?.products?.map((product, index) => {

                    return (

                        <li className="result" key={index} onClick={e => addProduct(e, { id: product.productId, sku: product.currentSku.skuId })}>

                            <img className="result-image" src={product.currentSku.skuImages.image450} alt={product.currentSku.imageAltText}></img>

                            <div className="result-details">
                                <h3>{product.displayName}</h3>
                                <p>{product.brandName}</p>
                            </div>

                        </li>

                    )

                })}

            </ul>

            {/* <ul>

                {steps.map((step, index) => {

                    return (

                        <li key={index}>

                            <h2>{step.name}</h2>

                            <div className="examples">
                                {step.examples?.map((example, index) => {
                                    return (<p key={index}>{example}</p>)
                                })}
                            </div>

                            <p>{step.time}</p>

                        </li>

                    )

                })}

            </ul> */}

        </section>

    );

};

export default Search;