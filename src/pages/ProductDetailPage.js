import React from 'react';

const ProductDetailPage = () => {
    // Dummy product data (replace with actual data from your API)
    const product = {
        id: 1,
        name: 'Shop item template',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium at dolorem quidem modi. Nam sequi consequatur obcaecati excepturi alias magni, accusamus eius blanditiis delectus ipsam minima ea iste laborum vero?',
        price: 40.00,
        image: 'https://dummyimage.com/600x700/dee2e6/6c757d.jpg',
        sku: 'BST-498'
    };

    return (
        <section className="py-5">
            <div className="container px-4 px-lg-5 my-5">
                <div className="row gx-4 gx-lg-5 align-items-center">
                    <div className="col-md-6"><img className="card-img-top mb-5 mb-md-0" src={product.image} alt={product.name} /></div>
                    <div className="col-md-6">
                        <div className="small mb-1">SKU: {product.sku}</div>
                        <h1 className="display-5 fw-bolder">{product.name}</h1>
                        <div className="fs-5 mb-5">
                            <span className="text-decoration-line-through">${product.price + 5}.00</span>
                            <span>${product.price}</span>
                        </div>
                        <p className="lead">{product.description}</p>
                        <div className="d-flex">
                            <input className="form-control text-center me-3" id="inputQuantity" type="num" defaultValue="1" style={{maxWidth: '3rem'}} />
                            <button className="btn btn-outline-dark flex-shrink-0" type="button">
                                <i className="bi-cart-fill me-1"></i>
                                Add to cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProductDetailPage;
