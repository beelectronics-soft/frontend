import React from 'react';
import './Record.css';

const Record = ({ record }) => {
    return (
        <div className="jumbotron">
            <p>Product Name: {record.nameProduct}</p>
            <p className="cartitem__price">Price: ${record.priceProduct}</p>
            <p className="cartitem__price">Qty: {record.qtyProduct}</p>
            <p className="cartitem__price">Date: {record.dateRecord.split("T")[0]}</p>
        </div>
    );
}

export default Record;