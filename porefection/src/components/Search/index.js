import React, { useState } from 'react';
import './style.css';

function Search({ routine, getRoutine }) {

    const [userSearch, setUserSearch] = useState('');
    const [searchResults, setSearchResults] = useState();
    const [searchSuggestions, setSearchSuggestions] = useState();
    const [isOpen, setIsOpen] = useState(false);

    if (isOpen) {
        // Disable scroll
        document.body.style.overflow = "hidden";
    } else {
        // Enable scroll
        document.body.style.overflow = "auto";
    }

    const handleFocus = () => {

        (searchResults || searchSuggestions) && setIsOpen(true);

    }

    isOpen && window.scrollTo(0, 150);

    const handleInputChange = (e) => {

        setUserSearch(e.target.value);

    };

    // api keys
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'sephora.p.rapidapi.com',
            'X-RapidAPI-Key': process.env.REACT_APP_API_KEY
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

        console.log(process.env.REACT_APP_API_KEY)

        setIsOpen(true);
        setSearchSuggestions();
        setSearchResults();

        await fetch(`https://sephora.p.rapidapi.com/products/search?q=${search}&pageSize=12&currentPage=1&node=1050055`, options)
            .then(response => response.json())
            .then(response => response.products ? setSearchResults(response) : getSuggestions(search))
            .catch(err => console.error(err));

    };

    // add product
    const addProduct = async (product) => {

        console.log(product);

        setIsOpen(false);

        await fetch(`https://sephora.p.rapidapi.com/products/detail?productId=${product.id}&preferedSku=${product.sku}`, options)
            .then(response => response.json())
            .then(response => {

                const updatedRoutine = routine;

                // high tech tools
                if (response.parentCategory.displayName === 'High Tech Tools') {
                    updatedRoutine.highTechTools.misc.push(response);
                } else
                    if (response.parentCategory.displayName === 'Hair Removal') {
                        updatedRoutine.highTechTools.hairRemoval.push(response);
                    } else
                        if (response.parentCategory.displayName === 'Facial Cleansing Brushes') {
                            updatedRoutine.highTechTools.facialCleansingBrushes.push(response);
                        } else
                            if (response.parentCategory.displayName === 'Anti-Aging') {
                                updatedRoutine.highTechTools.antiAging.push(response);
                            } else
                                if (response.parentCategory.displayName === 'Teeth Whitening') {
                                    updatedRoutine.highTechTools.teethWhitening.push(response);
                                } else

                                    // cleansers
                                    if (response.parentCategory.displayName === 'Cleansers') {
                                        updatedRoutine.cleansers.misc.push(response);
                                    } else
                                        if (response.parentCategory.displayName === 'Face Wipes') {
                                            updatedRoutine.cleansers.faceWipes.push(response);
                                        } else
                                            if (response.parentCategory.displayName === 'Makeup Removers') {
                                                updatedRoutine.cleansers.makeupRemovers.push(response);
                                            } else
                                                if (response.parentCategory.displayName === 'Face Wash & Cleansers') {
                                                    updatedRoutine.cleansers.faceWashAndCleansers.push(response);
                                                } else
                                                    if (response.parentCategory.displayName === 'Exfoliators') {
                                                        updatedRoutine.cleansers.exfoliators.push(response);
                                                    } else
                                                        if (response.parentCategory.displayName === 'Toners') {
                                                            updatedRoutine.cleansers.toners.push(response);
                                                        } else
                                                            if (response.parentCategory.displayName === 'Blotting Papers') {
                                                                updatedRoutine.cleansers.blottingPapers.push(response);
                                                            } else
                                                                // treatments
                                                                if (response.parentCategory.displayName === 'Treatments') {
                                                                    updatedRoutine.treatments.misc.push(response);
                                                                } else
                                                                    if (response.parentCategory.displayName === 'Face Serums') {
                                                                        updatedRoutine.treatments.faceSerums.push(response);
                                                                    } else
                                                                        if (response.parentCategory.displayName === 'Blemish & Acne Treatments') {
                                                                            updatedRoutine.treatments.blemishAndAcneTreatments.push(response);
                                                                        } else
                                                                            if (response.parentCategory.displayName === 'Facial Peels') {
                                                                                updatedRoutine.treatments.facialPeels.push(response);
                                                                            } else

                                                                                // masks
                                                                                if (response.parentCategory.displayName === 'Masks') {
                                                                                    updatedRoutine.masks.misc.push(response);
                                                                                } else
                                                                                    if (response.parentCategory.displayName === 'Face Masks') {
                                                                                        updatedRoutine.masks.faceMasks.push(response);
                                                                                    } else
                                                                                        if (response.parentCategory.displayName === 'Sheet Masks') {
                                                                                            updatedRoutine.masks.sheetMasks.push(response);
                                                                                        } else

                                                                                            // eye care
                                                                                            if (response.parentCategory.displayName === 'Eye Care') {
                                                                                                updatedRoutine.eyeCare.misc.push(response);
                                                                                            } else
                                                                                                if (response.parentCategory.displayName === 'Eye Creams & Treatments') {
                                                                                                    updatedRoutine.eyeCare.eyeCreamsAndTreatments.push(response);
                                                                                                } else
                                                                                                    if (response.parentCategory.displayName === 'Eye Masks') {
                                                                                                        updatedRoutine.eyeCare.eyeMasks.push(response);
                                                                                                    } else

                                                                                                        // moisturizers
                                                                                                        if (response.parentCategory.displayName === 'Moisturizers') {
                                                                                                            updatedRoutine.moisturizers.misc.push(response);
                                                                                                        } else
                                                                                                            if (response.parentCategory.displayName === 'Decollete & Neck Creams') {
                                                                                                                updatedRoutine.moisturizers.decolleteAndNeckCreams.push(response);
                                                                                                            } else
                                                                                                                if (response.parentCategory.displayName === 'Night Creams') {
                                                                                                                    updatedRoutine.moisturizers.nightCreams.push(response);
                                                                                                                } else
                                                                                                                    if (response.parentCategory.displayName === 'Face Oils') {
                                                                                                                        updatedRoutine.moisturizers.faceOils.push(response);
                                                                                                                    } else
                                                                                                                        if (response.parentCategory.displayName === 'Mists & Essences') {
                                                                                                                            updatedRoutine.moisturizers.mistsAndEssences.push(response);
                                                                                                                        } else
                                                                                                                            if (response.parentCategory.displayName === 'BB & CC Creams') {
                                                                                                                                updatedRoutine.moisturizers.BBandCCcreams.push(response);
                                                                                                                            } else

                                                                                                                                // sunscreen
                                                                                                                                if (response.parentCategory.displayName === 'Sunscreen') {
                                                                                                                                    updatedRoutine.sunscreen.misc.push(response);
                                                                                                                                } else
                                                                                                                                    if (response.parentCategory.displayName === 'Face Sunscreen') {
                                                                                                                                        updatedRoutine.sunscreen.faceSunscreen.push(response);
                                                                                                                                    } else
                                                                                                                                        if (response.parentCategory.displayName === 'Body Sunscreen') {
                                                                                                                                            updatedRoutine.sunscreen.bodySunscreen.push(response);
                                                                                                                                        } else

                                                                                                                                            // self tanners
                                                                                                                                            if (response.parentCategory.displayName === 'Self Tanners') {
                                                                                                                                                updatedRoutine.selfTanners.misc.push(response);
                                                                                                                                            } else
                                                                                                                                                if (response.parentCategory.displayName === 'For Face') {
                                                                                                                                                    updatedRoutine.selfTanners.forFace.push(response);
                                                                                                                                                } else
                                                                                                                                                    if (response.parentCategory.displayName === 'For Body') {
                                                                                                                                                        updatedRoutine.selfTanners.forBody.push(response);
                                                                                                                                                    } else
                                                                                                                                                        // lip balms & treamtments
                                                                                                                                                        if (response.parentCategory.displayName === 'Lip Balms & Treatments') {
                                                                                                                                                            updatedRoutine.lipBalmsAndTreatments.misc.push(response);
                                                                                                                                                        } else {
                                                                                                                                                            updatedRoutine.makeup.misc.push(response);
                                                                                                                                                        }

                localStorage.setItem('Porefection Skincare Routine', JSON.stringify(updatedRoutine));

                getRoutine();

            })
            .catch(err => console.error(err));

    };

    return (

        <section className="search">

            {isOpen && <div className="modal-background" onClick={() => setIsOpen(false)}></div>}


            <input formaction type="text" name="search" id="search" value={userSearch} placeholder="Search for a product or ingredient" autoFocus onChange={handleInputChange} onKeyUp={(e) => e.key === 'Enter' && getProducts(userSearch)} onFocus={handleFocus} />


            {isOpen && <ul className="all-results">

                {!searchSuggestions && !searchResults && <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>}

                {searchSuggestions && <div className="search-suggestions">

                    {window.innerWidth > 768 ?
                        <div className="suggestion-message">
                            <h3>Sorry, we couldn't find anything from your search.</h3>
                            <h3>Try one of these searches instead:</h3>
                        </div> :
                        <div className="suggestion-message">
                            <h3>Sorry, we couldn't find anything from your search. Try one of these searches instead:</h3>
                        </div>}

                    {searchSuggestions?.typeAheadTerms?.map((term, index) => {

                        return (

                            index > 2 && term.productName ?

                                <li className="suggestion" key={index} onClick={() => { setUserSearch(term.productName); getProducts(term.productName); }}>

                                    <p>{term.productName}</p>

                                </li>

                                : index > -1 && term.term ?

                                    <li className="suggestion" key={index} onClick={() => { setUserSearch(term.term); getProducts(term.term); }}>

                                        <p>{term.term}</p>

                                    </li>

                                    : ''

                        )

                    })}

                </div>}

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