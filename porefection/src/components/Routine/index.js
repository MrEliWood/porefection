import React, { useState, useEffect } from 'react';
import Product from '../Product'
import './style.css';

function Routine({ routine, getRoutine }) {

    const [haveProducts, setHaveProducts] = useState(false);

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

                {Object.values(routine)?.map((category, i) => {

                    return Object.values(category)?.map((subCategory, j) => {

                        return Array.isArray(subCategory) && subCategory?.map((product, k) => {

                            return (<li key={i + j + k} id={i + j + k} className="product"><h1 className="step">STEP</h1><Product key={i + j + k} index={i + j + k} routine={routine} getRoutine={getRoutine} product={product} /></li>)

                        })

                    })

                })}

            </ol>

            {haveProducts && <h4 className="api-credit">Product information provided by Sephora API.</h4>}

        </section>

    );

};

export default Routine;