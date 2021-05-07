import React from "react";
import "./ProductCard.css"
import { Link } from "react-router-dom"

function ProductCard({ product }) {
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
                                <Link to={`/product/${product.idProduct}`} className="info__button">
                                    <h2 class="ProductCard_card_title">{product.nameProduct}</h2>
                                </Link>
                                <h1 class="ProductCard_card_title" id="category">{product.nameCategory}</h1>
                                <p class="ProductCard_card_title" id="category">${product.priceProduct}</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default ProductCard;