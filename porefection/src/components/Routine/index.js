import './style.css';

function Routine({ routine, getRoutine }) {

    // remove product
    const removeProduct = (product) => {

        const updatedRoutine = routine.filter((_, index) => index !== product);

        localStorage.setItem('Porefection Skincare Routine', JSON.stringify(updatedRoutine));

        getRoutine();

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

                                <h2>{product.displayName}</h2>
                                <h4>{product.brand.displayName}</h4>

                                <h3 className="product-detail-header">Suggested Use</h3>
                                <ol>
                                    {product.suggestedUsage.replace(/<br>|<b>|<\/b>|/g, '').split('-').map((line, index) => {
                                        return (
                                            index > 0 && <li key={index} className="use-line">{line}</li>
                                        );
                                    })}
                                </ol>

                                <h3 className="product-detail-header">Ingredient Breakdown</h3>
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

                            </div>

                            <div className="remove-product-btn" onClick={() => removeProduct(index)}>x</div>

                        </li>

                    )

                })}

            </ul>

        </section>

    );

};

export default Routine;