import React, { useState, useEffect } from 'react';
import Routine from '../Routine'
import Search from '../Search'
import './style.css';

function Main() {

    const [routine, setRoutine] = useState([]);

    const getRoutine = () => {
        const savedRoutine = JSON.parse(localStorage.getItem('Porefection Skincare Routine'))
        savedRoutine && setRoutine(savedRoutine);
    };

    useEffect(() => {
        getRoutine();
        // eslint-disable-next-line
    }, []);

    return (

        <main>

            <Search routine={routine} setRoutine={setRoutine} getRoutine={getRoutine} />
            <Routine routine={routine} setRoutine={setRoutine} getRoutine={getRoutine} />

        </main>

    );

};

export default Main;