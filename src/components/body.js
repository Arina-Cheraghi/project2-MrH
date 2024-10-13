import React from "react";
import ImageSlider from "./imageSlider";
import ProductList from "./products";

const Body = ({ handleAddProduct, handleAddFavorite, favorites,searchQuery,setSearchQuery }) => { 
    return (
        <div className="body">
            <ImageSlider />
            <ProductList handleAddProduct={handleAddProduct} handleAddFavorite={handleAddFavorite} favorites={favorites} searchQuery={searchQuery} setSearchQuery={setSearchQuery} /> 
        </div>
    );
}

export default Body;
