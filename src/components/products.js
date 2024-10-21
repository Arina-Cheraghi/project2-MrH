import React, { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MdOutlineShoppingCart, MdFavoriteBorder, MdOutlineFavorite, MdDone } from "react-icons/md";
import anime from "../assets/img/anime.4d0a3171.png";
import { HiChevronDoubleLeft } from "react-icons/hi";
import toast from 'react-hot-toast';
import "../assets/css/body.css";

const ProductList = ({ handleAddProduct, handleAddFavorite, favorites, setSearchQuery, searchQuery, isLogin }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(() => {
        // Retrieve the current page from localStorage, defaulting to 0
        return parseInt(localStorage.getItem('currentPage')) || 0;
    });
    const itemsPerPage = 4;
    const navigate = useNavigate();

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

    useEffect(() => {
        // Save the current page to localStorage whenever it changes
        localStorage.setItem('currentPage', currentPage);
    }, [currentPage]);

    const filteredProducts = products.filter(product => {
        const productName = product.name.toLowerCase();
        const productPrice = product.features[0]?.price ? Number(product.features[0].price) : '';
        const formattedPrice = productPrice.toLocaleString().replace(/,/g, '');

        return productName.includes(searchQuery.toLowerCase()) ||
            formattedPrice.includes(searchQuery.replace(/,/g, ''));
    });

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const currentProducts = filteredProducts.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    const handlePageChange = (direction) => {
        if (direction === 'next' && currentPage < totalPages - 1) {
            setCurrentPage(prevPage => prevPage + 1);
        } else if (direction === 'prev' && currentPage > 0) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    const jumpToPage = (pageNumber) => {
        if (pageNumber >= 0 && pageNumber < totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const showPaginationButtons = () => {
        const buttons = [];
    
        // Show first three pages
        for (let i = 0; i < Math.min(3, totalPages); i++) {
            buttons.push(
                <button
                    key={i}
                    onClick={() => jumpToPage(i)}
                    className={i === currentPage ? 'selected-page' : ''}
                    disabled={i === currentPage}
                >
                    {i + 1}
                </button>
            );
        }
    
        // Add "..." button if needed
        if (totalPages > 6) {
            buttons.push(
                <button
                    key="dots"
                    onClick={() => setCurrentPage(currentPage + 3)}
                    disabled={currentPage >= totalPages - 3}
                >
                    ...
                </button>
            );
        }
    
        // Show last three pages
        for (let i = Math.max(totalPages - 3, 3); i < totalPages; i++) {
            buttons.push(
                <button
                    key={i}
                    onClick={() => jumpToPage(i)}
                    className={i === currentPage ? 'selected-page' : ''}
                    disabled={i === currentPage}
                >
                    {i + 1}
                </button>
            );
        }
    
        return buttons;
    };
    

    const addProductToCart = (product) => {
        if (!product.price) {
            toast.error("این محصول ناموجود است", {
                style: {
                    fontFamily: "Vazir",
                    fontSize: "small"
                },
            });
            return;
        }

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
            toast.error("این محصول قبلاً به سبد خرید اضافه شده است", {
                style: {
                    fontFamily: "Vazir",
                    fontSize: "small"
                },
            });
        } else {
            product.quantity = 1;
            savedCart.push(product);
            toast.success("محصول به سبد خرید اضافه شد", {
                style: {
                    fontFamily: "Vazir",
                    fontSize: "small"
                },
            });
        }

        localStorage.setItem("cartItems", JSON.stringify(savedCart));
        handleAddProduct(product);
    };

    const toggleFavorite = (product) => {
        if (!isLogin) {
            navigate('/login');
            return;
        } else {
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
        }
    };

    if (loading) return (
        <div className='loading'>
            <div className='spinner'></div>
            <div className='loader'>Loading...</div>
        </div>
    );
    if (error) return <div className='errorMessage'>{error.message}</div>;

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
                                <Link to="/page2">مشاهده رنج قیمت<HiChevronDoubleLeft /></Link>
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
                                <div className='pagTitle'>
                                    <button onClick={() => handlePageChange('prev')} disabled={currentPage === 0}>قبلی</button>
                                    <span>صفحه {currentPage + 1} از {totalPages}</span>
                                    <button onClick={() => handlePageChange('next')} disabled={currentPage === totalPages - 1}>بعدی</button>
                                </div>
                                <div className='page-buttons'>
                                    {showPaginationButtons()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductList;
