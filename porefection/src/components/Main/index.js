import React, { useState } from 'react';
import Routine from '../Routine'
import Search from '../Search'
import './style.css';

function Main() {

    const [routine, setRoutine] = useState([]);

    return (

        <main>

            <h1>Main</h1>
            <Search routine={routine} setRoutine={setRoutine} />
            <Routine routine={routine} setRoutine={setRoutine} />

        </main>

    );

};

export default Main;