import './style.css';

function Routine({ routine, setRoutine }) {

    return (

        <section className="routine">

            <h1>ROUTINE</h1>

            <ul className="all-products">

                {routine?.map((product, index) => {

                    return (

                        <li key={index} className="product">

                            <img className="product-image" src={product.currentSku.skuImages.image1500} alt={product.imageAltText}></img>

                            <div className="product-details">
                                <h3>{product.displayName}</h3>
                                <p>{product.brandName}</p>
                            </div>

                        </li>

                    )

                })}

            </ul>

        </section>

    );

};

export default Routine;