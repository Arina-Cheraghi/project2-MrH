import React, { useEffect, useState } from 'react';
import "../assets/css/body.css";
import axios from 'axios';
import { MdOutlineShoppingCart, MdFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import anime from "../assets/img/anime.4d0a3171.png";
import { HiChevronDoubleLeft } from "react-icons/hi";
import ReactPaginate from 'react-paginate';
import { Link } from "react-router-dom";
import { MdDone } from "react-icons/md";

const ProductList = ({ handleAddProduct, handleAddFavorite, favorites }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 4;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const allProducts = [];
                let page = 1;
                let hasMoreProducts = true;

                while (hasMoreProducts) {
                    const response = await axios.get(`https://api.mrh-store.com/api/filter/%D9%81%DB%8C%DA%AF%D9%88%D8%B1-%D9%87%D8%A7%DB%8C-%D8%A7%D9%86%DB%8C%D9%85%D9%87?page=${page}&sort=new`);
                    const fetchedProducts = response.data.data.products.data.map(product => ({
                        ...product,
                        addedToCart: false
                    }));

                    if (fetchedProducts.length > 0) {
                        allProducts.push(...fetchedProducts);
                        page++;
                    } else {
                        hasMoreProducts = false;
                    }
                }

                setProducts(allProducts);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % products.length;
        setItemOffset(newOffset);
        localStorage.setItem('currentPage', event.selected);
    };

    const addProductToCart = (product) => {
        const updatedProducts = products.map(p => {
            if (p.product_id === product.id) {
                return { ...p, addedToCart: true };
            }
            return p;
        });
        setProducts(updatedProducts);

        const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
        const existingProductIndex = savedCart.findIndex(item => item.id === product.id);

        if (existingProductIndex > -1) {
            savedCart[existingProductIndex].quantity += 1;
        } else {
            product.quantity = 1;
            savedCart.push(product);
        }

        localStorage.setItem("cartItems", JSON.stringify(savedCart));
        handleAddProduct(product);
    };

    const toggleFavorite = (product) => {
        const exists = favorites.find(item => item.id === product.product_id);
        if (exists) {
            handleAddFavorite(null, product.product_id);
        } else {
            handleAddFavorite({
                id: product.product_id,
                name: product.name,
                img: product.images.length > 0 ? product.images[0].image_link : '',
            });
        }
    };

    if (loading) return (
        <div className='loading'>
            <div className='spinner'></div>
            <div className='loader'>Loading...</div>
        </div>
    );
    if (error) return <div className='errorMessage'>{error.message}</div>;

    const endOffset = itemOffset + itemsPerPage;
    const currentProducts = products.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(products.length / itemsPerPage);

    return (
        <div className='prdOut'>
            <div className='myProducts'>
                <h1>محصولات</h1>
                <div className='col-12'>
                    <div className='productWrapper'>
                        <div className='myImage'>
                            <img src={anime} alt="فیگور شخصیت های انیمه" />
                            <p>فیگور شخصیت های انیمه</p>
                        </div>
                        <div className='prdPag'>
                            <div className='show_more'>
                                <Link to="/page2">مشاهده همه محصولات<HiChevronDoubleLeft /></Link>
                            </div>
                            <div className='page1'>
                                <div className='productItems'>
                                    <ul>
                                        {currentProducts.map(product => {
                                            const mainImage = product.images.length > 0 ? product.images[0].image_link : '';

                                            return (
                                                <div className='col-3' key={product.product_id}>
                                                    <li id={product.product_id}>
                                                        {mainImage && (
                                                            <img src={mainImage} alt={product.name} style={{ width: '150px', height: 'auto' }} />
                                                        )}
                                                        <h4 className='product-title'>{product.name}</h4>
                                                        <h6 className='product-title'>
                                                            {product.features[0]?.price ? (
                                                                <>قیمت: {Number(product.features[0].price).toLocaleString()} تومان</>
                                                            ) : (
                                                                <span className='none'>ناموجود</span>
                                                            )}
                                                        </h6>
                                                        <div className='description'>
                                                            <div className='icons'>
                                                                <button onClick={() => toggleFavorite(product)}>
                                                                    {favorites.some(item => item.id === product.product_id) ? <MdOutlineFavorite /> : <MdFavoriteBorder />}
                                                                </button>
                                                                <button
                                                                    onClick={() => addProductToCart({
                                                                        id: product.product_id,
                                                                        name: product.name,
                                                                        img: mainImage,
                                                                        price: product.features[0]?.price
                                                                    })}
                                                                    disabled={product.addedToCart}
                                                                >
                                                                    {product.addedToCart ? <MdDone /> : <MdOutlineShoppingCart />}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </div>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </div>

                            <div className='pag'>
                                <ReactPaginate
                                    breakLabel="..."
                                    nextLabel=" >"
                                    onPageChange={handlePageClick}
                                    pageRangeDisplayed={6}
                                    pageCount={pageCount}
                                    previousLabel="<"
                                    renderOnZeroPageCount={null}
                                    className="pagination"
                                    activeClassName="selected-page"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductList;
