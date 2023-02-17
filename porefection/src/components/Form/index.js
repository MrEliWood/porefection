import React, { useState } from 'react';
import './style.css';

function Form() {
	const [name, setName] = useState('');
	const [brand, setBrand] = useState('');
	const [category, setCategory] = useState('High Tech Tools');
	const [subcategory, setSubcategory] = useState('Miscellaneous');

	// define categories
	const categories = ['High Tech Tools', 'Cleansers', 'Treatments', 'Masks', 'Eye Care', 'Moisturizers', 'Sunscreen', 'Self Tanners', 'Lip Balms & Treatments', 'Makeup'];

	// set subcategories based on category
	let subCategories;

	switch (category) {
		case 'High Tech Tools':
			subCategories = ['Miscellaneous', 'Hair Removal', 'Facial Cleansing Brushes', 'Anti-Aging', 'Teeth Whitening'];
			break;

		case 'Cleansers':
			subCategories = ['Miscellaneous', 'Face Wipes', 'Makeup Removers', 'Face Wash & Cleansers', 'Exfoliators', 'Toners', 'Blotting Papers'];
			break;

		case 'Treatments':
			subCategories = ['Miscellaneous', 'Face Serums', 'Blemish & Acne Treatments', 'Facial Peels'];
			break;

		case 'Masks':
			subCategories = ['Miscellaneous', 'Face Masks', 'Sheet Masks'];
			break;

		case 'Eye Care':
			subCategories = ['Miscellaneous', 'Eye Creams & Treatments', 'Eye Masks'];
			break;

		case 'Moisturizers':
			subCategories = ['Miscellaneous', 'Decollete & Neck Creams', 'Night Creams', 'Face Oils', 'Mists & Essences', 'BB & CC Creams'];
			break;

		case 'Sunscreen':
			subCategories = ['Miscellaneous', 'Face Sunscreen', 'Body Sunscreen'];
			break;

		case 'Self Tanners':
			subCategories = ['Miscellaneous', 'For Face', 'For Body'];
			break;

		default:
			subCategories = ['Miscellaneous'];
	}

	const handleInputChange = (e) => {
		const { name, value } = e.target;

		switch (name) {
			case 'name':
				setName(value);
				break;

			case 'brand':
				setBrand(value);
				break;

			case 'category':
				setCategory(value);
				break;

			case 'subcategory':
				setSubcategory(value);
				break;

			default:
				break;
		}
	};

	return (
		<div className='product-input-form-container'>
			<form className='product-input-form'>
				<div className='product-input-container'>
					<div className='input-caption'>Product</div>
					<input type='text' name='name' id='product-input-name' value={name} placeholder='Niacinamide 10% + Zinc 1% Oil Control Serum' autoFocus onChange={handleInputChange} />
				</div>

				<div className='product-input-container'>
					<div className='input-caption'>Brand</div>
					<input type='text' name='brand' id='product-input-brand' value={brand} placeholder='The Ordinary' onChange={handleInputChange} />
				</div>

				<div className='product-input-container'>
					<div className='input-caption'>Category</div>

					<div className='dropdown-container'>
						<select name='category' id='product-input-category' value={category} onChange={handleInputChange}>
							<option disabled value='Select a Category'>
								Select a Category
							</option>
							{categories.map((category) => (
								<option value={category}>{category}</option>
							))}
						</select>

						<svg className='dropdown-carrot' viewBox='0 0 24 24' width='12' height='12'>
							<polyline points='2 7, 12 17, 22 7' />
						</svg>
					</div>
				</div>

				<div className='product-input-container'>
					<div className='input-caption'>Subcategory</div>
					<div className='dropdown-container'>
						<select name='subcategory' id='product-input-category' value={subcategory} onChange={handleInputChange}>
							<option disabled value='Select a Category'>
								Select a Subcategory
							</option>
							{subCategories.map((category) => (
								<option value={category}>{category}</option>
							))}
						</select>

						<svg className='dropdown-carrot' viewBox='0 0 24 24' width='12' height='12'>
							<polyline points='2 7, 12 17, 22 7' />
						</svg>
					</div>
				</div>

				<div className='product-submit-container'>
					<button>Add Product</button>
				</div>
			</form>
		</div>
	);
}

export default Form;
