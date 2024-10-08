import React from "react";
import ImageSlider from "./imageSlider";
import ProductList from "./products";

const Body = ({ handleAddProduct, handleAddFavorite, favorites }) => { 
    return (
        <div className="body">
            <ImageSlider />
            <ProductList handleAddProduct={handleAddProduct} handleAddFavorite={handleAddFavorite} favorites={favorites} /> 
        </div>
    );
}

export default Body;
