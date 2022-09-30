import './style.css';

function Product({ index, routine, getRoutine, product }) {

    const handleAccordian = (e) => {

        let carrot = e.target.lastChild;

        console.log('CARROT', e.target)

        carrot.style.transform === 'scaleY(-1)'
            ? carrot.style.transform = 'scaleY(1)'
            : carrot.style.transform = 'scaleY(-1)';

        let panel = e.target.nextElementSibling;

        panel.style.maxHeight
            ? panel.style.maxHeight = null
            : panel.style.maxHeight = panel.scrollHeight + "px";

    };

        // remove product
        const removeProduct = () => {

            let removeConfirmed = window.confirm('Are you sure you want to remove this product from your routine?');
    
            if (removeConfirmed) {
    
                document.getElementById(index).classList.add("remove-product-animation");
    
                setTimeout(() => {
                    const updatedRoutine = JSON.stringify(routine);
                    const productString = JSON.stringify(product);
                    localStorage.setItem('Porefection Skincare Routine', updatedRoutine.replace(productString, ''));
                    getRoutine();
                }, 2000);
    
            };
    
        };

    return (

        <div className={"product-card"}>

            {window.innerWidth > 768 && <img className="product-image" src={product.currentSku?.skuImages?.image1500} alt={product.imageAltText}></img>}

            <div className="product-details">

                <div className="product-banner">

                    {window.innerWidth <= 768 && <img className="product-image" src={product.currentSku?.skuImages?.image1500} alt={product.imageAltText}></img>}

                    <div className="product-headline">

                        <div className="product-brand-category">
                            <p className="product-brand">{product.brand.displayName}</p>
                            <h4>|</h4>
                            <p className="product-category">{product.parentCategory.displayName}</p>
                        </div>
                        <h2 className="product-name">{product.displayName}</h2>

                    </div>

                    <svg className="remove-product-btn" viewBox="0 0 24 24" width="12" height="12" onClick={removeProduct}>
                        <line x1="2" y1="2" x2="22" y2="22" />
                        <line x1="2" y1="22" x2="22" y2="2" />
                    </svg>

                </div>

                {/* <div className="day-night-icons">

                    <svg className="day-icon" viewBox="0 0 24 24" width="30" height="30" onClick={() => removeProduct(product)}>
                        <circle cx="12" cy="12" r="6" fill="none" />
                        <line x1="12" y1="2" x2="12" y2="4" />
                        <line x1="5" y1="5" x2="6" y2="6" />
                        <line x1="2" y1="12" x2="4" y2="12" />
                        <line x1="5" y1="19" x2="6" y2="18" />
                        <line x1="12" y1="20" x2="12" y2="22" />
                        <line x1="18" y1="18" x2="19" y2="19" />
                        <line x1="20" y1="12" x2="22" y2="12" />
                        <line x1="18" y1="6" x2="19" y2="5" />
                    </svg>

                    <svg className="night-icon" viewBox="0 0 24 24" width="30" height="30" onClick={() => removeProduct(product)}>
                        <circle cx="12" cy="12" r="8" fill="currentColor" />
                        <circle cx="16" cy="8" r="7" stroke="none" fill="white" />
                        <polygon points="13 5, 14 7, 12 6, 14 6, 12 7" stroke-width="1" />
                        <polygon points="18 6, 19 8, 17 7, 19 7, 17 8" />
                        <polygon points="16 10, 17 12, 15 11, 17 11, 15 12" />
                    </svg>

                </div> */}

                <h3 className="product-detail-header" onClick={handleAccordian}>
                    Description
                    <svg className="accordian-carrot" viewBox="0 0 24 24" width="12" height="12">
                        <polyline points="2 7, 12 17, 22 7" />
                    </svg>
                </h3>

                <ul className="accordian description">
                    {product.shortDescription.replace(/<b>|<\/b>/g, '').split('<br>').map((line, index) => {
                        return (
                            <li key={index} className="description-line">
                                {line.replace(/What it is/g, '').split(':').map((item, i) => {
                                    return (<p key={i} className="description-item" style={i === 0 ? { fontWeight: '500' } : {}}>{item}</p>)
                                })}
                            </li>
                        );
                    })}
                </ul>

                <h3 className="product-detail-header" onClick={handleAccordian}>
                    Suggested Use
                    <svg className="accordian-carrot" viewBox="0 0 24 24" width="12" height="12">
                        <polyline points="2 7, 12 17, 22 7" />
                    </svg>
                </h3>

                <ol className="accordian suggested-use">
                    {product.suggestedUsage.replace(/<br>|<b>|<\/b>/g, '').replace(/&rsquo;/g, `'`).split('-').map((line, index) => {
                        return (
                            index > 0 && <li key={index} className="use-line"><p>{line}</p></li>
                        );
                    })}
                </ol>

                <h3 className="product-detail-header" onClick={handleAccordian}>
                    Ingredient Breakdown
                    <svg className="accordian-carrot" viewBox="0 0 24 24" width="12" height="12">
                        <polyline points="2 7, 12 17, 22 7" />
                    </svg>
                </h3>

                <ul className="accordian ingredient-breakdown">
                    {product.currentSku.ingredientDesc.split('Clean at Sephora')[0].replace(/, Inactive Ingredients|, Inactive Ingredients<br>/g, '<br>').replace(/<br><\/b>/g, ':').replace(/<b>|<\/b>| &ndash/g, '').split('<br>').map((line, index) => {
                        while (line.charAt(0) === '-') {
                            line = line.substring(1);
                        }
                        return (
                            line && <div className="ingredient">
                                {line.split(':').map((item, i) => {
                                    return (
                                        <p key={index + '.' + i} className="ingredient-line">{item}</p>
                                    );
                                })}
                            </div>
                        );
                    })}
                </ul>

            </div>

        </div>

    );

};

export default Product;