import React, { useState, useEffect } from 'react';
import Product from '../Product'
import './style.css';

function Routine({ routine, getRoutine }) {

    const [haveProducts, setHaveProducts] = useState(false);

    // remove product
    const removeProduct = (product) => {

        let removeConfirmed = window.confirm('Are you sure you want to remove this product from your routine?');

        if (removeConfirmed) {

            const updatedRoutine = JSON.stringify(routine);
            const productString = JSON.stringify(product);
            localStorage.setItem('Porefection Skincare Routine', updatedRoutine.replace(productString, ''));
            getRoutine();

        };

    };

    const handleStepCount = (steps) => {

        for (let i = 0; i < steps.length; i++) {
            steps[i].innerText = `${i + 1}`;
        };

    };

    useEffect(() => {
        let steps = document.getElementsByClassName('step');
        steps.length && setHaveProducts(true);
        handleStepCount(steps);
    }, [routine]);

    return (

        <section className="routine">

            {!haveProducts && <h3 className="no-products-message">Add products from your skincare routine and we'll put them in order for you.</h3>}

            <ol id="all-products" className="all-products">

                {routine?.highTechTools?.misc?.map((product, index) => {
                    return (<li key={index} className="product"><h1 className="step">STEP</h1><Product key={index} product={product} index={index} removeProduct={removeProduct} parent={routine.highTechTools.misc}/></li>)
                })}

                {routine?.highTechTools?.hairRemoval?.map((product, index) => {
                    return (<li key={index} className="product"><h1 className="step">STEP</h1><Product key={index} product={product} index={index} removeProduct={removeProduct} parent={routine.highTechTools.hairRemoval} /></li>)
                })}

                {routine?.highTechTools?.facialCleansingBrushes?.map((product, index) => {
                    return (<li key={index} className="product"><h1 className="step">STEP</h1><Product key={index} product={product} index={index} removeProduct={removeProduct} parent={routine.highTechTools.facialCleansingBrushes} /></li>)
                })}

                {routine?.highTechTools?.antiAging?.map((product, index) => {
                    return (<li key={index} className="product"><h1 className="step">STEP</h1><Product key={index} product={product} index={index} removeProduct={removeProduct} parent={routine.highTechTools.antiAging} /></li>)
                })}

                {routine?.highTechTools?.teethWhitening?.map((product, index) => {
                    return (<li key={index} className="product"><h1 className="step">STEP</h1><Product key={index} product={product} index={index} removeProduct={removeProduct} parent={routine.highTechTools.teethWhitening} /></li>)
                })}


                {routine?.cleansers?.misc?.map((product, index) => {
                    return (<li key={index} className="product"><h1 className="step">STEP</h1><Product key={index} product={product} index={index} removeProduct={removeProduct} parent={routine.cleansers.misc} /></li>)
                })}

                {routine?.cleansers?.faceWipes?.map((product, index) => {
                    return (<li key={index} className="product"><h1 className="step">STEP</h1><Product key={index} product={product} index={index} removeProduct={removeProduct} parent={routine.cleansers.faceWipes} /></li>)
                })}

                {routine?.cleansers?.makeupRemovers?.map((product, index) => {
                    return (<li key={index} className="product"><h1 className="step">STEP</h1><Product key={index} product={product} index={index} removeProduct={removeProduct} parent={routine.cleansers.makeupRemovers} /></li>)
                })}

                {routine?.cleansers?.faceWashAndCleansers?.map((product, index) => {
                    return (<li key={index} className="product"><h1 className="step">STEP</h1><Product key={index} product={product} index={index} removeProduct={removeProduct} parent={routine.cleansers.faceWashAndCleansers} /></li>)
                })}

                {routine?.cleansers?.exfoliators?.map((product, index) => {
                    return (<li key={index} className="product"><h1 className="step">STEP</h1><Product key={index} product={product} index={index} removeProduct={removeProduct} parent={routine.cleansers.exfoliators} /></li>)
                })}

                {routine?.cleansers?.toners?.map((product, index) => {
                    return (<li key={index} className="product"><h1 className="step">STEP</h1><Product key={index} product={product} index={index} removeProduct={removeProduct} parent={routine.cleansers.toners} /></li>)
                })}

                {routine?.cleansers?.blottingPapers?.map((product, index) => {
                    return (<li key={index} className="product"><h1 className="step">STEP</h1><Product key={index} product={product} index={index} removeProduct={removeProduct} parent={routine.cleansers.blottingPapers} /></li>)
                })}


                {routine?.treatments?.misc?.map((product, index) => {
                    return (<li key={index} className="product"><h1 className="step">STEP</h1><Product key={index} product={product} index={index} removeProduct={removeProduct} parent={routine.treatments.misc} /></li>)
                })}

                {routine?.treatments?.faceSerums?.map((product, index) => {
                    return (<li key={index} className="product"><h1 className="step">STEP</h1><Product key={index} product={product} index={index} removeProduct={removeProduct} parent={routine.treatments.faceSerums} /></li>)
                })}

                {routine?.treatments?.blemishAndAcneTreatments?.map((product, index) => {
                    return (<li key={index} className="product"><h1 className="step">STEP</h1><Product key={index} product={product} index={index} removeProduct={removeProduct} parent={routine.treatments.blemishAndAcneTreatments} /></li>)
                })}

                {routine?.treatments?.facialPeels?.map((product, index) => {
                    return (<li key={index} className="product"><h1 className="step">STEP</h1><Product key={index} product={product} index={index} removeProduct={removeProduct} parent={routine.treatments.facialPeels} /></li>)
                })}


                {routine?.masks?.misc?.map((product, index) => {
                    return (<li key={index} className="product"><h1 className="step">STEP</h1><Product key={index} product={product} index={index} removeProduct={removeProduct} parent={routine.masks.misc} /></li>)
                })}

                {routine?.masks?.faceMasks?.map((product, index) => {
                    return (<li key={index} className="product"><h1 className="step">STEP</h1><Product key={index} product={product} index={index} removeProduct={removeProduct} parent={routine.masks.faceMasks} /></li>)
                })}

                {routine?.masks?.sheetMasks?.map((product, index) => {
                    return (<li key={index} className="product"><h1 className="step">STEP</h1><Product key={index} product={product} index={index} removeProduct={removeProduct} parent={routine.masks.sheetMasks} /></li>)
                })}


                {routine?.eyeCare?.misc?.map((product, index) => {
                    return (<li key={index} className="product"><h1 className="step">STEP</h1><Product key={index} product={product} index={index} removeProduct={removeProduct} parent={routine.eyeCare.misc} /></li>)
                })}

                {routine?.eyeCare?.eyeCreamsAndTreatments?.map((product, index) => {
                    return (<li key={index} className="product"><h1 className="step">STEP</h1><Product key={index} product={product} index={index} removeProduct={removeProduct} parent={routine.eyeCare.eyeCreamsAndTreatments} /></li>)
                })}

                {routine?.eyeCare?.eyeCare?.map((product, index) => {
                    return (<li key={index} className="product"><h1 className="step">STEP</h1><Product key={index} product={product} index={index} removeProduct={removeProduct} parent={routine.eyeCare.eyeCare} /></li>)
                })}


                {routine?.moisturizers?.misc?.map((product, index) => {
                    return (<li key={index} className="product"><h1 className="step">STEP</h1><Product key={index} product={product} index={index} removeProduct={removeProduct} parent={routine.moisturizers.misc} /></li>)
                })}

                {routine?.moisturizers?.decolleteAndNeckCreams?.map((product, index) => {
                    return (<li key={index} className="product"><h1 className="step">STEP</h1><Product key={index} product={product} index={index} removeProduct={removeProduct} parent={routine.moisturizers.decolleteAndNeckCreams} /></li>)
                })}

                {routine?.moisturizers?.nightCreams?.map((product, index) => {
                    return (<li key={index} className="product"><h1 className="step">STEP</h1><Product key={index} product={product} index={index} removeProduct={removeProduct} parent={routine.moisturizers.nightCreams} /></li>)
                })}

                {routine?.moisturizers?.faceOils?.map((product, index) => {
                    return (<li key={index} className="product"><h1 className="step">STEP</h1><Product key={index} product={product} index={index} removeProduct={removeProduct} parent={routine.moisturizers.faceOils} /></li>)
                })}

                {routine?.moisturizers?.mistsAndEssences?.map((product, index) => {
                    return (<li key={index} className="product"><h1 className="step">STEP</h1><Product key={index} product={product} index={index} removeProduct={removeProduct} parent={routine.moisturizers.mistsAndEssences} /></li>)
                })}

                {routine?.moisturizers?.BBandCCcreams?.map((product, index) => {
                    return (<li key={index} className="product"><h1 className="step">STEP</h1><Product key={index} product={product} index={index} removeProduct={removeProduct} parent={routine.moisturizers.BBandCCcreams} /></li>)
                })}


                {routine?.sunscreen?.misc?.map((product, index) => {
                    return (<li key={index} className="product"><h1 className="step">STEP</h1><Product key={index} product={product} index={index} removeProduct={removeProduct} parent={routine.sunscreen.misc} /></li>)
                })}

                {routine?.sunscreen?.faceSunscreen?.map((product, index) => {
                    return (<li key={index} className="product"><h1 className="step">STEP</h1><Product key={index} product={product} index={index} removeProduct={removeProduct} parent={routine.sunscreen.faceSunscreen} /></li>)
                })}

                {routine?.sunscreen?.bodySunscreen?.map((product, index) => {
                    return (<li key={index} className="product"><h1 className="step">STEP</h1><Product key={index} product={product} index={index} removeProduct={removeProduct} parent={routine.sunscreen.bodySunscreen} /></li>)
                })}


                {routine?.selfTanners?.misc?.map((product, index) => {
                    return (<li key={index} className="product"><h1 className="step">STEP</h1><Product key={index} product={product} index={index} removeProduct={removeProduct} parent={routine.selfTanners.misc} /></li>)
                })}

                {routine?.selfTanners?.forFace?.map((product, index) => {
                    return (<li key={index} className="product"><h1 className="step">STEP</h1><Product key={index} product={product} index={index} removeProduct={removeProduct} parent={routine.selfTanners.forFace} /></li>)
                })}

                {routine?.selfTanners?.forBody?.map((product, index) => {
                    return (<li key={index} className="product"><h1 className="step">STEP</h1><Product key={index} product={product} index={index} removeProduct={removeProduct} parent={routine.selfTanners.forBody} /></li>)
                })}


                {routine?.lipBalmsAndTreatments?.misc?.map((product, index) => {
                    return (<li key={index} className="product"><h1 className="step">STEP</h1><Product key={index} product={product} index={index} removeProduct={removeProduct} parent={routine.lipBalmsAndTreatments.misc} /></li>)
                })}


                {routine?.makeup?.misc?.map((product, index) => {
                    return (<li key={index} className="product"><h1 className="step">STEP</h1><Product key={index} product={product} index={index} removeProduct={removeProduct} parent={routine.makeup.misc} /></li>)
                })}

            </ol>

            {haveProducts && <h4 className="api-credit">Product information provided by Sephora API.</h4>}

        </section>

    );

};

export default Routine;