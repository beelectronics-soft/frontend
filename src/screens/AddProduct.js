import React, { useCallback, useEffect, useState } from 'react';
import ToolbarStorer from '../components/ToolbarStorer';
import './AddProduct.css';

import io from "socket.io-client";
import { getAuthContext } from '../utils/AuthContext';
const socketS1 = io.connect("http://26.142.66.43:4000");
const socketS2 = io.connect("http://26.142.66.43:4001");

const AddProduct = ({ history }) => {
    const [ status, setStatus ] = useState(true);
    const [ categories, setCategories ] = useState([]);
    const { currentUser } = getAuthContext();

    if (status) {
        socketS2.emit('getUser', currentUser.idUser);
        setStatus(false);
    }

    useEffect(() => {
        socketS2.on('getUser', res => {
            if (res !== false) {
                socketS1.emit('getCategories');
            }

            window.location.reload(false);
        })
        
        socketS1.on("getCategories", res => {
            setCategories(JSON.parse(res));
        });
    
        socketS1.on("addProduct", res => {
            history.push("/storer");
        });
    });

    const renderCategories = () => {
        return categories.map(category => (
            <option value={category.idCategory}>{category.nameCategory}</option>
        ));
    }

    const handleSubmit = useCallback(e => {
        e.preventDefault();
        const { nameProduct, idCategory, priceProduct, stockProduct } = e.target.elements;

        const file = document.querySelector('input[type=file]').files[0];
        const reader = new FileReader();

        reader.addEventListener("load", () => {
            var imgProduct = reader.result.split(",")[1] 
            const product = {
                nameProduct: nameProduct.value, 
                idCategory: parseInt(idCategory.value), 
                priceProduct: parseInt(priceProduct.value), 
                stockProduct: parseInt(stockProduct.value), 
                imgProduct: imgProduct
            }

            socketS1.emit("addProduct", product); 
        });

        if (file) {
            reader.readAsDataURL(file);
        } else {
            alert("Error on image file");
        }

    }, []); 

    return (
        <div style={{ margin: '100px' }}>
            <ToolbarStorer/><br></br>
            <div className='jumbotron'>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>New Product</legend>
                    <div class="form-group">
                        <label>Name</label>
                        <input type="text" class="form-control" id="nameProduct" name="nameProduct" aria-describedby="nameProductHelp" placeholder="Enter product name"
                        required/>
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
                        required/>
                        <small id="priceProductHelp" class="form-text text-muted">0 is a valid price.</small>
                    </div>
                    <div class="form-group">
                        <label>Stock</label>
                        <input min="0" type="number" class="form-control" id="stockProduct" name="stockProduct" aria-describedby="stockProductHelp" placeholder="Enter product stock"
                        required/>
                        <small id="stockProductHelp" class="form-text text-muted">0 is a valid stock.</small>
                    </div>
                    <div class="form-group">
                        <label>Load image</label>
                        <input type="file" class="form-control-file" id="imgInput" aria-describedby="imgHelp" name="imgInput"
                        accept=".jpg, .png, .jpeg"/>
                        <small id="imgHelp" class="form-text text-muted">Please use png images of 250x250 that do not exceed 20kb.</small>
                    </div>
                    <button type="submit" class="btn btn-primary" style={{width: '200px'}}>Submit</button>
                </fieldset>
                </form>
            </div>
        </div>
    );
}

export default AddProduct;