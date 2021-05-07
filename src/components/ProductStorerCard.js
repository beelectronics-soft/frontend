import React from "react";
import "./ProductStorerCard.css"
import { Link } from "react-router-dom"

function ProductStorerCard({ product }) {
    return (
        <div class="ProductCard_html">
            <div class="ProductCard_body">
                <ul class="ProductCard_cards">
                    <li class="ProductCard_cards_item">
                        <div class="ProductCard_card">
                            <div class="ProductCard_card_image">
                                <img
                                    src={`data:image/png;base64,${product.imgProduct}`}
                                    height="200px"
                                    alt={product.nameProduct}
                                />
                            </div>
                            <div class="ProductCard_card_content" id="card-color">
                                <h2 class="ProductCard_card_title">{product.nameProduct}</h2>
                                <h1 class="ProductCard_card_title" id="category">{product.nameCategory}</h1>
                                <p class="ProductCard_card_title" id="category">${product.priceProduct}</p>
                                <Link to={`/edit/product/${product.idProduct}`}>
                                    <button type="button" class="btn btn-outline-primary" style={{ margin: 0, marginTop: "15px" }}>
                                        <svg style={{ marginRight: '10px' }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-nut-fill" viewBox="0 0 16 16">
                                            <path d="M4.58 1a1 1 0 0 0-.868.504l-3.428 6a1 1 0 0 0 0 .992l3.428 6A1 1 0 0 0 4.58 15h6.84a1 1 0 0 0 .868-.504l3.429-6a1 1 0 0 0 0-.992l-3.429-6A1 1 0 0 0 11.42 1H4.58zm5.018 9.696a3 3 0 1 1-3-5.196 3 3 0 0 1 3 5.196z"></path>
                                        </svg>
                                    Edit
                                </button>
                                </Link>
                                <br></br>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default ProductStorerCard;

