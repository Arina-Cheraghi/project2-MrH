import React, { useEffect, useState } from 'react';
import "../assets/css/body.css";
import axios from 'axios';
import toast from 'react-hot-toast';
import { MdOutlineShoppingCart, MdOutlineFavorite, MdFavoriteBorder, MdDone } from "react-icons/md";
import ReactPaginate from 'react-paginate';
import PriceRangeSlider from './rangeSlider';

const Page2 = ({ handleAddProduct, handleAddFavorite, favorites }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 4;
    const [priceRange, setPriceRange] = useState([970000, 23400000]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`https://api.mrh-store.com/api/filter/%D9%81%DB%8C%DA%AF%D9%88%D8%B1-%D9%87%D8%A7%DB%8C-%D8%A7%D9%86%DB%8C%D9%85%D9%87?page=1&sort=new`);
                const fetchedProducts = response.data.data.products.data;

                setProducts(fetchedProducts);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const savedPage = localStorage.getItem('currentPage2');
        if (savedPage) {
            setItemOffset(Number(savedPage) * itemsPerPage);
        }
    }, []);

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
            toast("این محصول قبلاً به سبد خرید اضافه شده است.");
        } else {
            product.quantity = 1;
            savedCart.push(product);
            toast.success("محصول با موفقیت به سبد خرید اضافه شد!");
        }

        localStorage.setItem("cartItems", JSON.stringify(savedCart));
        handleAddProduct(product);
    };

    if (loading) return <div className='loading'></div>;
    if (error) return <div className='errorMessage'>Error: {error.message}</div>;

    const filteredProducts = products.filter(product => {
        const price = product.features[0]?.price || 0;
        return price >= priceRange[0] && price <= priceRange[1];
    });

    const endOffset = itemOffset + itemsPerPage;
    const currentProducts = filteredProducts.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
        setItemOffset(newOffset);
        localStorage.setItem('currentPage2', event.selected);
    };

    const rangeSelector = (event, newValue) => {
        setPriceRange(newValue);
        setItemOffset(0);
    };

    return (
        <div className='page2'>
            <div className='prdOut'>
                <div className='myProducts'>
                    <h1>محصولات</h1>
                    <div className='col-12'>
                        <div className='productWrapper'>
                            <div className='col-3'>
                                <div className='range'>
                                    <PriceRangeSlider value={priceRange} rangeSelector={rangeSelector} />
                                </div>
                            </div>
                            <div className='col-9'>
                                <div className='prdPag'>
                                    <div className='productItems'>
                                        <ul>
                                            {currentProducts.map(product => {
                                                const mainImage = product.images.length > 0 ? product.images[0].image_link : '';

                                                return (
                                                    <div className='col-3' key={product.product_id}>
                                                        <li>
                                                            {mainImage && (
                                                                <img src={mainImage} alt={product.name} style={{ width: '150px', height: 'auto' }} />
                                                            )}
                                                            <h4 className='product-title'> {product.name}</h4>
                                                            <h6 className='product-title'>
                                                                {product.features[0]?.price ? (
                                                                    <>قیمت: {Number(product.features[0].price).toLocaleString()} تومان</>
                                                                ) : (
                                                                    <span className='none'>ناموجود</span>
                                                                )}
                                                            </h6>
                                                            <div className='description' id='pg2-icon'>
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

                                    <div className='pag' id='page2-pag'>
                                        <ReactPaginate
                                            breakLabel="..."
                                            nextLabel=" >"
                                            onPageChange={handlePageClick}
                                            pageRangeDisplayed={5}
                                            pageCount={pageCount}
                                            previousLabel="< "
                                            renderOnZeroPageCount={null}
                                            activeClassName="selected-page" 
                                            forcePage={Math.floor(itemOffset / itemsPerPage)}
                                        />
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page2;
