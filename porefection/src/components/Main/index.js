import React, { useState, useEffect } from 'react';
import Routine from '../Routine';
import Search from '../Search';
import './style.css';

function Main() {
	const categories = {
		highTechTools: {
			misc: [],
			hairRemoval: [],
			facialCleansingBrushes: [],
			antiAging: [],
			teethWhitening: [],
			day: true,
			night: true
		},

		cleansers: {
			misc: [],
			faceWipes: [],
			makeupRemovers: [],
			faceWashAndCleansers: [],
			exfoliators: [],
			toners: [],
			blottingPapers: [],
			day: true,
			night: true
		},

		treatments: {
			misc: [],
			faceSerums: [],
			blemishAndAcneTreatments: [],
			facialPeels: [],
			day: true,
			night: true
		},

		masks: {
			misc: [],
			faceMasks: [],
			sheetMasks: [],
			day: false,
			night: true
		},

		eyeCare: {
			misc: [],
			eyeCreamsAndTreatments: [],
			eyeMasks: [],
			day: true,
			night: true
		},

		moisturizers: {
			misc: [],
			decolleteAndNeckCreams: [],
			nightCreams: [],
			faceOils: [],
			mistsAndEssences: [],
			BBandCCcreams: [],
			day: true,
			night: true
		},

		sunscreen: {
			misc: [],
			faceSunscreen: [],
			bodySunscreen: [],
			day: true,
			night: false
		},

		selfTanners: {
			misc: [],
			forFace: [],
			forBody: [],
			day: false,
			night: true
		},

		lipBalmsAndTreatments: {
			misc: [],
			day: true,
			night: true
		},

		makeup: {
			misc: [],
			day: true,
			night: false
		}
	};

	const [routine, setRoutine] = useState(categories);

	const getRoutine = () => {
		const savedRoutine = JSON.parse(localStorage.getItem('Porefection Skincare Routine'));
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
}

export default Main;
