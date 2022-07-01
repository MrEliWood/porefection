import './style.css';

function Product({ product, removeProduct }) {

    const handleAccordian = (e) => {

        let carrot = e.target.lastChild;

        carrot.style.transform === 'scaleY(-1) translateY(-3px) rotate(45deg)'
            ? carrot.style.transform = 'scaleY(1) translateY(-3px) rotate(45deg)'
            : carrot.style.transform = 'scaleY(-1) translateY(-3px) rotate(45deg)';

        let panel = e.target.nextElementSibling;

        panel.style.maxHeight
            ? panel.style.maxHeight = null
            : panel.style.maxHeight = panel.scrollHeight + "px";

    };
    
    return (

        <>

            <img className="product-image" src={product.currentSku?.skuImages?.image1500} alt={product.imageAltText}></img>

            <div className="product-details">

                <div className="product-banner">

                    <div className="product-headline">

                        <p>{product.parentCategory.parentCategory.displayName} | {product.parentCategory.displayName}</p>
                        <h2>{product.displayName}</h2>
                        <h4>{product.brand.displayName}</h4>

                    </div>

                    <div className="remove-product-btn" onClick={() => removeProduct(product)}>
                        <div className="remove-product-left"></div>
                        <div className="remove-product-right"></div>
                    </div>

                </div>

                <h3 className="product-detail-header" onClick={handleAccordian}>Description<span className="carrot" /></h3>
                <ul className="accordian">
                    {product.shortDescription.replace(/<b>|<\/b>/g, '').split('<br>').map((line, index) => {
                        return (
                            <li key={index} className="description-line">
                                {line.replace(/What it is/g, '').split(':').map((item, i) => {
                                    return (<p key={i} className="description-item" style={i === 0 ? { fontWeight: '700' } : {}}>{item}</p>)
                                })}
                            </li>
                        );
                    })}
                </ul>

                <h3 className="product-detail-header" onClick={handleAccordian}>Suggested Use<span className="carrot" /></h3>
                <ol className="accordian">
                    {product.suggestedUsage.replace(/<br>|<b>|<\/b>|/g, '').split('-').map((line, index) => {
                        return (
                            index > 0 && <li key={index} className="use-line">{line}</li>
                        );
                    })}
                </ol>

                <h3 className="product-detail-header" onClick={handleAccordian}>Ingredient Breakdown<span className="carrot" /></h3>
                <ul className="accordian">
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

        </>

    );

};

export default Product;