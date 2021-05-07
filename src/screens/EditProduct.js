import React, { useCallback, useEffect, useState } from 'react';
import ToolbarStorer from '../components/ToolbarStorer';
import './EditProduct.css';

import io from "socket.io-client";
import { useParams } from 'react-router';
const socketS1 = io.connect("http://26.142.66.43:4000");

const EditProduct = ({ history }) => {
    const { id } = useParams();
    const [ status, setStatus ] = useState(true);
    const [ product, setProduct ] = useState({});
    const [ categories, setCategories ] = useState([]);

    if (status) {
        socketS1.emit('getProduct', id);
        socketS1.emit('getCategories');
        setStatus(false);
    }

    const deleteProduct = () => {
        socketS1.emit('deleteProduct', id);
    }

    useEffect(() => {
        socketS1.on('getProduct', res => {
            setProduct(JSON.parse(res));
        })

        socketS1.on('getCategories', res => {
            setCategories(JSON.parse(res));
        })

        socketS1.on('updateProduct', res => {
            history.push('/storer');
        });

        socketS1.on('deleteProduct', res => {
            history.push('/storer');
        });
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleSubmit = useCallback(e => {
        e.preventDefault();
        const { nameProduct, idCategory, priceProduct, stockProduct } = e.target.elements;

        const file = document.querySelector('input[type=file]').files[0];
        const reader = new FileReader();

        reader.addEventListener("load", () => {
            var imgProduct = reader.result.split(",")[1] 
            const upProduct = {
                idProduct: id, 
                nameProduct: nameProduct.value, 
                idCategory: parseInt(idCategory.value), 
                priceProduct: parseInt(priceProduct.value), 
                stockProduct: parseInt(stockProduct.value), 
                imgProduct: imgProduct
            }

            socketS1.emit("updateProduct", upProduct); 
        });

        if (file) {
            reader.readAsDataURL(file);
        } else {
            const upProduct = {
                idProduct: id,
                nameProduct: nameProduct.value, 
                idCategory: parseInt(idCategory.value), 
                priceProduct: parseInt(priceProduct.value), 
                stockProduct: parseInt(stockProduct.value), 
                imgProduct: product.imgProduct
            }
            socketS1.emit("updateProduct", upProduct); 
        }
    }); 

    const renderCategories = () => {
        return categories.map(category => (
            <option value={category.idCategory} selected={product.nameCategory === category.nameCategory}>{category.nameCategory}</option>
        ));
    }

    return (
        <div style={{ margin: '100px' }}>
            <ToolbarStorer/><br></br>
            <div className='jumbotron'>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Edit product</legend>
                    <div class="form-group">
                        <label>Name</label>
                        <input type="text" class="form-control" id="nameProduct" name="nameProduct" aria-describedby="nameProductHelp" placeholder="Enter product name"
                        defaultValue={product.nameProduct} required/>
                        <small id="nameProductHelp" class="form-text text-muted">Try to be descriptive enough.</small>
                    </div>
                    <div class="form-group">
                        <label>Category</label>
                        <select class="form-control" id="idCategory" name="idCategory">
                            { renderCategories() }
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Price</label>
                        <input min="0" type="number" class="form-control" id="priceProduct" name="priceProduct" aria-describedby="priceProductHelp" placeholder="Enter product price"
                        defaultValue={product.priceProduct} required/>
                        <small id="priceProductHelp" class="form-text text-muted">0 is a valid price.</small>
                    </div>
                    <div class="form-group">
                        <label>Stock</label>
                        <input min="0" type="number" class="form-control" id="stockProduct" name="stockProduct" aria-describedby="stockProductHelp" placeholder="Enter product price"
                        defaultValue={product.stockProduct} required/>
                        <small id="stockProductHelp" class="form-text text-muted">0 is a valid stock.</small>
                    </div>
                    <label>Old image</label>
                    <div className='form-group'>
                        <img
                            src={`data:image/png;base64,${product.imgProduct}`}
                            height="400px"
                            alt={product.nameProduct}
                        />
                    </div>
                    <div class="form-group">
                        <label>Load new image</label>
                        <input type="file" class="form-control-file" id="imgInput" aria-describedby="imgHelp" name="imgInput"/>
                        <small id="imgHelp" class="form-text text-muted">Please use png images of 250x250 that do not exceed 20kb.</small>
                    </div>
                    <button type="submit" class="btn btn-primary" style={{width: '200px'}}>Submit</button>
                </fieldset>
                </form><br></br>
                <button align ="right" type="button" class="btn btn-outline-danger" style={{width: '200px', backgroundColor: '#EA3C53'}}
                onClick={deleteProduct}>
                    <i class="fas fa-trash" style={{marginRight: '15px'}}></i>
                    Delete
                </button>
            </div>
        </div>
    );
}

export default EditProduct;