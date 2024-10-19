import React from "react";
import ImageSlider from "./imageSlider";
import ProductList from "./products";

const Body = ({ handleAddProduct, handleAddFavorite, favorites, searchQuery, setSearchQuery, isLogin }) => {
    return (
        <div className="body">
            <ImageSlider />
            <ProductList
                handleAddProduct={handleAddProduct}
                handleAddFavorite={handleAddFavorite}
                favorites={favorites}
                setSearchQuery={setSearchQuery}
                searchQuery={searchQuery}
                isLogin={isLogin}
            />
        </div>
    );
}

export default Body;
