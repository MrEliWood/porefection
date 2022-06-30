import './style.css';

function Routine({ routine, getRoutine }) {

    // remove product
    const removeProduct = (product) => {

        let removeConfirmed = window.confirm('Are you sure you want to remove this product from your routine?');

        if (removeConfirmed) {

            const updatedRoutine = routine.filter((_, index) => index !== product);
            localStorage.setItem('Porefection Skincare Routine', JSON.stringify(updatedRoutine));
            getRoutine();

        };

    };

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

        <section className="routine">

            <h1>YOUR ROUTINE</h1>

            <ul className="all-products">

                {routine?.map((product, index) => {

                    return (

                        <li key={index} className="product">

                            <img className="product-image" src={product.currentSku?.skuImages?.image1500} alt={product.imageAltText}></img>

                            <div className="product-details">

                                <div className="product-banner">

                                    <div className="product-headline">

                                        <h2>{product.displayName}</h2>
                                        <h4>{product.brand.displayName}</h4>

                                    </div>

                                    <div className="remove-product-btn" onClick={() => removeProduct(index)}>
                                        <div className="remove-product-left"></div>
                                        <div className="remove-product-right"></div>
                                    </div>

                                </div>

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
                                    {product.currentSku.ingredientDesc.replace(/, Inactive Ingredients/g, '<br>Inactive Ingredients').replace(/<br><\/b>/g, ':').replace(/<b>|<\/b>| &ndash/g, '').split('<br>').map((line, index) => {
                                        while (line.charAt(0) === '-') {
                                            line = line.substring(1);
                                        }
                                        return (
                                            <div className="ingredient">
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

                        </li>

                    )

                })}

            </ul>

        </section>

    );

};

export default Routine;