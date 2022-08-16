import './style.css';

function Product({ product, removeProduct }) {

    const handleAccordian = (e) => {

        let carrot = e.target.lastChild;

        carrot.style.transform === 'scaleY(-1)'
            ? carrot.style.transform = 'scaleY(1)'
            : carrot.style.transform = 'scaleY(-1)';

        let panel = e.target.nextElementSibling;

        panel.style.maxHeight
            ? panel.style.maxHeight = null
            : panel.style.maxHeight = panel.scrollHeight + "px";

    };

    return (

        <div className="product-card">

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

                    <svg className="remove-product-btn" viewBox="0 0 24 24" width="12" height="12" onClick={() => removeProduct(product)}>
                        <line x1="2" y1="2" x2="22" y2="22" />
                        <line x1="2" y1="22" x2="22" y2="2" />
                    </svg>

                </div>

                <div className="day-night-icons">

                    <svg className="day-icon" viewBox="0 0 24 24" width="96" height="96" onClick={() => removeProduct(product)}>
                        <circle cx="12" cy="12" r="6" />
                        <line x1="12" y1="2" x2="12" y2="4" />
                        <line x1="5" y1="5" x2="6" y2="6" />
                        <line x1="2" y1="12" x2="4" y2="12" />
                        <line x1="5" y1="19" x2="6" y2="18" />
                        <line x1="12" y1="20" x2="12" y2="22" />
                        <line x1="18" y1="18" x2="19" y2="19" />
                        <line x1="20" y1="12" x2="22" y2="12" />
                        <line x1="18" y1="6" x2="19" y2="5" />
                    </svg>

                    <svg className="night-icon" viewBox="0 0 24 24" width="96" height="96" onClick={() => removeProduct(product)}>
                        <path d="
                            M 6 4
                            A 2 2 0 0 0 18 20
                            M 6 4
                            A 1 1 0 0 0 18 20" />
                        {/* <polygon points="16 5, 17 7, 15 6, 17 6, 15 7" />
                        <polygon points="18 10, 19 12, 17 11, 19 11, 17 12" />
                        <polygon points="15 15, 16 17, 14 16, 16 16, 14 17" /> */}
                    </svg>

                </div>

                <h3 className="product-detail-header" onClick={handleAccordian}>
                    Description
                    <svg className="accordian-carrot" viewBox="0 0 24 24" width="12" height="12" onClick={() => removeProduct(product)}>
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
                    <svg className="accordian-carrot" viewBox="0 0 24 24" width="12" height="12" onClick={() => removeProduct(product)}>
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
                    <svg className="accordian-carrot" viewBox="0 0 24 24" width="12" height="12" onClick={() => removeProduct(product)}>
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