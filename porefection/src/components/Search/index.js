import React, { useState } from 'react';
import Form from '../Form';
import './style.css';

function Search({ routine, getRoutine }) {
	const [userSearch, setUserSearch] = useState('');
	const [searchResults, setSearchResults] = useState();
	const [searchSuggestions, setSearchSuggestions] = useState();
	const [showProductForm, setShowProductForm] = useState(false);
	const [isOpen, setIsOpen] = useState(false);

	if (isOpen) {
		// Disable scroll
		document.body.style.overflow = 'hidden';
	} else {
		// Enable scroll
		document.body.style.overflow = 'auto';
	}

	const handleFocus = () => {
		(searchResults || searchSuggestions) && setIsOpen(true);
	};

	isOpen && window.scrollTo(0, 120);

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
			.then((response) => response.json())
			.then((response) => setSearchSuggestions(response))
			.catch((err) => console.error(err));
	};

	// search products
	const getProducts = async (search) => {
		setIsOpen(true);
		setSearchSuggestions();
		setSearchResults();

		await fetch(`https://sephora.p.rapidapi.com/products/search?q=${search}&pageSize=12&currentPage=1&node=1050055`, options)
			.then((response) => response.json())
			.then((response) => (response.products ? setSearchResults(response) : getSuggestions(search)))
			.catch((err) => console.error(err));
	};

	// add product
	const addProduct = async (product) => {
		setIsOpen(false);

		await fetch(`https://sephora.p.rapidapi.com/products/detail?productId=${product.id}&preferedSku=${product.sku}`, options)
			.then((response) => response.json())
			.then((response) => {
				const updatedRoutine = routine;

				switch (response.parentCategory.displayName) {
					// high tech tools
					case 'High Tech Tools':
						updatedRoutine.highTechTools.misc.push(response);
						break;
					case 'Hair Removal':
						updatedRoutine.highTechTools.hairRemoval.push(response);
						break;
					case 'Facial Cleansing Brushes':
						updatedRoutine.highTechTools.facialCleansingBrushes.push(response);
						break;
					case 'Anti-Aging':
						updatedRoutine.highTechTools.antiAging.push(response);
						break;
					case 'Teeth Whitening':
						updatedRoutine.highTechTools.teethWhitening.push(response);
						break;

					// cleansers
					case 'Cleansers':
						updatedRoutine.cleansers.misc.push(response);
						break;
					case 'Face Wipes':
						updatedRoutine.cleansers.faceWipes.push(response);
						break;
					case 'Makeup Removers':
						updatedRoutine.cleansers.makeupRemovers.push(response);
						break;
					case 'Face Wash & Cleansers':
						updatedRoutine.cleansers.faceWashAndCleansers.push(response);
						break;
					case 'Exfoliators':
						updatedRoutine.cleansers.exfoliators.push(response);
						break;
					case 'Toners':
						updatedRoutine.cleansers.toners.push(response);
						break;
					case 'Blotting Papers':
						updatedRoutine.cleansers.blottingPapers.push(response);
						break;

					// treatments
					case 'Treatments':
						updatedRoutine.treatments.misc.push(response);
						break;
					case 'Face Serums':
						updatedRoutine.treatments.faceSerums.push(response);
						break;
					case 'Blemish & Acne Treatments':
						updatedRoutine.treatments.blemishAndAcneTreatments.push(response);
						break;
					case 'Facial Peels':
						updatedRoutine.treatments.facialPeels.push(response);
						break;

					// masks
					case 'Masks':
						updatedRoutine.masks.misc.push(response);
						break;
					case 'Face Masks':
						updatedRoutine.masks.faceMasks.push(response);
						break;
					case 'Sheet Masks':
						updatedRoutine.masks.sheetMasks.push(response);
						break;

					// eye care
					case 'Eye Care':
						updatedRoutine.eyeCare.misc.push(response);
						break;
					case 'Eye Creams & Treatments':
						updatedRoutine.eyeCare.eyeCreamsAndTreatments.push(response);
						break;
					case 'Eye Masks':
						updatedRoutine.eyeCare.eyeMasks.push(response);
						break;

					// moisturizers
					case 'Moisturizers':
						updatedRoutine.moisturizers.misc.push(response);
						break;
					case 'Decollete & Neck Creams':
						updatedRoutine.moisturizers.decolleteAndNeckCreams.push(response);
						break;
					case 'Night Creams':
						updatedRoutine.moisturizers.nightCreams.push(response);
						break;
					case 'Face Oils':
						updatedRoutine.moisturizers.faceOils.push(response);
						break;
					case 'Mists & Essences':
						updatedRoutine.moisturizers.mistsAndEssences.push(response);
						break;
					case 'BB & CC Creams':
						updatedRoutine.moisturizers.BBandCCcreams.push(response);
						break;

					// sunscreen
					case 'Sunscreen':
						updatedRoutine.sunscreen.misc.push(response);
						break;
					case 'Face Sunscreen':
						updatedRoutine.sunscreen.faceSunscreen.push(response);
						break;
					case 'Body Sunscreen':
						updatedRoutine.sunscreen.bodySunscreen.push(response);
						break;

					// self tanners
					case 'Self Tanners':
						updatedRoutine.selfTanners.misc.push(response);
						break;
					case 'For Face':
						updatedRoutine.selfTanners.forFace.push(response);
						break;
					case 'For Body':
						updatedRoutine.selfTanners.forBody.push(response);
						break;

					// lip balms & treamtments
					case 'Lip Balms & Treatments':
						updatedRoutine.lipBalmsAndTreatments.misc.push(response);
						break;

					// misc
					default:
						updatedRoutine.makeup.misc.push(response);
				}

				localStorage.setItem('Porefection Skincare Routine', JSON.stringify(updatedRoutine));

				getRoutine();
			})
			.catch((err) => alert(err));
	};

	return (
		<section className='search'>
			{isOpen && <div className='modal-background' onClick={() => setIsOpen(false)}></div>}

			{isOpen && (
				<svg className='close-modal-btn' viewBox='0 0 24 24' width='18' height='18' onClick={() => setIsOpen(false)}>
					<line x1='2' y1='2' x2='22' y2='22' />
					<line x1='2' y1='22' x2='22' y2='2' />
				</svg>
			)}

			<div className='search-input'>
				<div className='input-caption'>Search for a product</div>

				<form className='search-container'>
					<input type='search' name='search' id='search' value={userSearch} placeholder='Niacinamide 10% + Zinc 1% Oil Control Serum' autoFocus onChange={handleInputChange} onKeyUp={(e) => e.key === 'Enter' && getProducts(userSearch)} onFocus={handleFocus} />
					<button
						className='search-btn'
						onClick={(e) => {
							e.preventDefault();
							getProducts(userSearch);
						}}>
						Search
					</button>
				</form>
			</div>

			{isOpen && (
				<ul className='all-results'>
					{!searchSuggestions && !searchResults && !showProductForm && (
						<div className='lds-ellipsis'>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
						</div>
					)}

					{searchSuggestions && (
						<div className='search-suggestions'>
							{window.innerWidth > 768 ? (
								<div className='suggestion-message'>
									<p>Sorry, we couldn't find anything from your search.</p>
									<p>Try one of these searches instead:</p>
								</div>
							) : (
								<div className='suggestion-message'>
									<p>Sorry, we couldn't find anything from your search. Try one of these searches instead:</p>
								</div>
							)}

							{searchSuggestions?.typeAheadTerms?.map((term, index) => {
								return index > 2 && term.productName ? (
									<li
										className='suggestion'
										key={index}
										onClick={() => {
											setUserSearch(term.productName);
											getProducts(term.productName);
										}}>
										<h3>{term.productName}</h3>
									</li>
								) : index > -1 && term.term ? (
									<li
										className='suggestion'
										key={index}
										onClick={() => {
											setUserSearch(term.term);
											getProducts(term.term);
										}}>
										<h3>{term.term}</h3>
									</li>
								) : (
									''
								);
							})}

							<div className='enter-product-info'>
								<p>OR</p>

								<button
									onClick={() => {
										setSearchSuggestions();
										setShowProductForm(true);
									}}>
									Enter Product Info
								</button>
							</div>
						</div>
					)}

					{searchResults?.products?.map((product, index) => {
						return (
							<li className='result' key={index} onClick={() => addProduct({ id: product.productId, sku: product.currentSku.skuId })}>
								<img className='result-image' src={product.currentSku.skuImages.image450} alt={product.currentSku.imageAltText}></img>

								<div className='result-details'>
									<h3>{product.displayName}</h3>
									<p>{product.brandName}</p>
								</div>
							</li>
						);
					})}

					{showProductForm && <Form />}
				</ul>
			)}
		</section>
	);
}

export default Search;
