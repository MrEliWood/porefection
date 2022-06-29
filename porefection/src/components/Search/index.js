import React, { useState } from 'react';
import './style.css';

function Search({ routine, getRoutine }) {

    const [userSearch, setUserSearch] = useState('');
    const [searchResults, setSearchResults] = useState();
    const [searchSuggestions, setSearchSuggestions] = useState();
    const [isOpen, setIsOpen] = useState(false);

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

    // search suggestions
    const getSuggestions = async (search) => {

        setSearchResults();

        await fetch(`https://sephora.p.rapidapi.com/auto-complete?q=${search}`, options)
            .then(response => response.json())
            .then(response => setSearchSuggestions(response))
            .catch(err => console.error(err));

    };

    // search products
    const getProducts = async (search) => {

        setIsOpen(true);
        setSearchSuggestions();
        setSearchResults();

        await fetch(`https://sephora.p.rapidapi.com/products/search?q=${search}&pageSize=12&currentPage=1`, options)
            .then(response => response.json())
            .then(response => response.products ? setSearchResults(response) : getSuggestions(search))
            .catch(err => console.error(err));

    };

    // add product
    const addProduct = async (product) => {

        setIsOpen(false);

        await fetch(`https://sephora.p.rapidapi.com/products/detail?productId=${product.id}&preferedSku=${product.sku}`, options)
            .then(response => response.json())
            .then(response => {

                const updatedRoutine = routine;
                updatedRoutine.push(response);
                
                localStorage.setItem('Porefection Skincare Routine', JSON.stringify(updatedRoutine));

                getRoutine();

            })
            .catch(err => console.error(err));

    };

    return (

        <section className="search">

            <input type="search" name="search" id="search" placeholder="Search for ingredients" value={userSearch} autoFocus onChange={handleInputChange} onKeyUp={(e) => e.key === 'Enter' && getProducts(userSearch)} />
            <input type="submit" name="submit" id="submit" htmlFor="search" onClick={() => getProducts(userSearch)} />

            {isOpen && <ul className="all-results">

                {!searchSuggestions && !searchResults && <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>}

                {searchSuggestions?.typeAheadTerms?.map((term, index) => {

                    return (

                        index > 2 ?

                            <li className="suggestion" key={index} onClick={() => { setUserSearch(term.productName); getProducts(term.productName); }}>

                                <p>{term.productName}</p>

                            </li>

                            : index > 0 &&

                            <li className="suggestion" key={index} onClick={() => { setUserSearch(term.term); getProducts(term.term); }}>

                                <p>{term.term}</p>

                            </li>

                    )

                })}

                {searchResults?.products?.map((product, index) => {

                    return (

                        <li className="result" key={index} onClick={() => addProduct({ id: product.productId, sku: product.currentSku.skuId })}>

                            <img className="result-image" src={product.currentSku.skuImages.image450} alt={product.currentSku.imageAltText}></img>

                            <div className="result-details">
                                <h3>{product.displayName}</h3>
                                <p>{product.brandName}</p>
                            </div>

                        </li>

                    )

                })}

            </ul>}

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