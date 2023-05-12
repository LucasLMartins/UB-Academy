import { useState, useEffect } from "react";
import '../styles/courses.css';
import Header from "../Components/Header"
import Footer from "../Components/Footer";
// import api from '../api.js'
import ArrowDown from "./Images/arrow.png";
import ArrowUp from "./Images/arrowUp.png";
import { useNavigate } from "react-router-dom";

function Courses() {
    const navigate = useNavigate()

    document.title = "Cursos"

    let categoryArrowState = 1;
    let priceArrowState = 0;

    function clickCategory(){
        const categoryArrow = document.getElementById('categoryArrowId');
        const categoryOptions = document.getElementById('categoryOptionsId');

        if(categoryArrowState == 0){
            categoryArrow.src = ArrowUp
            categoryArrowState = 1
            categoryOptions.style.display = 'block';
        }
        else if(categoryArrowState == 1){
            categoryArrow.src = ArrowDown
            categoryArrowState = 0
            categoryOptions.style.display = 'none';
        }
    }

    function clickPrice(){
        const priceArrow = document.getElementById('priceArrowId');
        const priceOptions = document.getElementById('priceOptionsId');

        if(priceArrowState == 0){
            priceArrow.src = ArrowUp
            priceArrowState = 1
            priceOptions.style.display = 'block';
        }
        else if(priceArrowState == 1){
            priceArrow.src = ArrowDown
            priceArrowState = 0
            priceOptions.style.display = 'none';
        }
    }

    function clearFilters(){
        //document.getElementById('range-max').value = ''
        //document.getElementById('range-min').value = ''
        navigate('/cursos')
    }

    return (
        <div className="page">
            <Header />

            <div className="cs-page-container">
                <div className="cs-top-div">
                    <div className="cs-top-div-left">
                        <img src={require('./Images/UBlogo_alpha.png')} className="cs-logo" width="200px"></img>
                    </div>
                    <div className="cs-top-div-right">
                        <h1 className="cs-title">Cursos</h1>
                    </div>
                </div>

                <div className="cs-bottom-div">
                    <div className="cs-bottom-div-left">
                        <h2 className="cs-filter-title">Filtrar por</h2>
                        <div className="cs-filter-div">
                            <div className="cs-filter-cat">
                                <div className="cs-filter-titles" onClick={() => clickCategory()}>
                                    <h4>Categoria</h4>
                                    <img id="categoryArrowId" src={ArrowUp} width="40px" height="40px"></img>
                                </div>
                                <div className="cs-filter-cat-content" id="categoryOptionsId">
                                    <ul className="">
                                        <li className="cs-filter-li">
                                            <p className="cs-filter-option">Javascript</p>
                                            <div className="cs-filter-box"></div>
                                        </li>
                                        <li className="cs-filter-li">
                                            <p className="cs-filter-option">Banco de dados</p>
                                            <div className="cs-filter-box"></div>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="cs-filter-price">
                                <div className="cs-filter-titles" onClick={() => clickPrice()}>
                                    <h4>Preço</h4>
                                    <img id="priceArrowId" src={require('./Images/arrow.png')} width="40px" height="40px"></img>
                                </div>
                                <div className="cs-filter-price-content" id="priceOptionsId">
                                    <div className="filter-by-price-min">
                                        <p className="filter-by-price-from">De:</p>
                                        <input id="range-min" className="input-from-price" type="number" placeholder="0.00"></input>
                                    </div>
                                    <div className="filter-by-price-max">
                                        <p className="filter-by-price-from">Até:</p>
                                        <input id="range-max" className="input-from-price" type="number" placeholder="0.00"></input>
                                    </div>
                                    <div className="filter-by-price-button-div">
                                        <button className="filter-by-price-button">Aplicar</button>
                                    </div>
                                </div>
                            </div>

                            <div className="cs-clear-filters" onClick={() => clearFilters()}>
                                <h3>Limpar Filtros</h3>
                            </div>
                        </div>
                    </div>

                    <div className="cs-bottom-div-right">
                        <div className="cs-search-div">
                            <input className="search-input" type="text" placeholder="Pesquise seu curso..."></input>
                        </div>
                        <div className="cs-grid-div">
                            <div className="cs-grid-item-container">
                                <a>
                                    <div className="cs-img-container">
                                        <img src={require('./Images/CostumerSupport.jpg')} className="cs-item-img"></img>
                                    </div>
                                    <div className="cs-item-name-container">
                                        <p className="cs-item-name">Curso de JavaScript e TypeScript do básico ao avançado</p>
                                    </div>
                                    <div className="cs-item-price-container">
                                        <div className="cs-item-price-container-inner">
                                            <p className="cs-item-price">R$125,00</p>
                                        </div>
                                    </div>
                                </a>
                            </div>

                            <div className="cs-grid-item-container">
                                <a>
                                    <div className="cs-img-container">
                                        <img src={require('./Images/mapa.png')} className="cs-item-img"></img>
                                    </div>
                                    <div className="cs-item-name-container">
                                        <p className="cs-item-name">Curso de JavaScript e TypeScript do básico ao avançado</p>
                                    </div>
                                    <div className="cs-item-price-container">
                                        <div className="cs-item-price-container-inner">
                                            <p className="cs-item-price">R$125,00</p>
                                        </div>
                                    </div>
                                </a>
                            </div>

                            <div className="cs-grid-item-container">
                                <a>
                                    <div className="cs-img-container">
                                        <img src={require('./Images/ublogoWhite.png')} className="cs-item-img"></img>
                                    </div>
                                    <div className="cs-item-name-container">
                                        <p className="cs-item-name">Curso de JavaScript e TypeScript do básico ao avançado</p>
                                    </div>
                                    <div className="cs-item-price-container">
                                        <div className="cs-item-price-container-inner">
                                            <p className="cs-item-price">R$125,00</p>
                                        </div>
                                    </div>
                                </a>
                            </div>

                            <div className="cs-grid-item-container">
                                <a>
                                    <div className="cs-img-container">
                                        <img src={require('./Images/mapa.png')} className="cs-item-img"></img>
                                    </div>
                                    <div className="cs-item-name-container">
                                        <p className="cs-item-name">Curso de JavaScript e TypeScript do básico ao avançado</p>
                                    </div>
                                    <div className="cs-item-price-container">
                                        <div className="cs-item-price-container-inner">
                                            <p className="cs-item-price">R$125,00</p>
                                        </div>
                                    </div>
                                </a>
                            </div>

                            <div className="cs-grid-item-container">
                                <a>
                                    <div className="cs-img-container">
                                        <img src={require('./Images/CostumerSupport.jpg')} className="cs-item-img"></img>
                                    </div>
                                    <div className="cs-item-name-container">
                                        <p className="cs-item-name">Curso de JavaScript e TypeScript do básico ao avançado</p>
                                    </div>
                                    <div className="cs-item-price-container">
                                        <div className="cs-item-price-container-inner">
                                            <p className="cs-item-price">R$125,00</p>
                                        </div>
                                    </div>
                                </a>
                            </div>

                            <div className="cs-grid-item-container">
                                <a>
                                    <div className="cs-img-container">
                                        <img src={require('./Images/mapa.png')} className="cs-item-img"></img>
                                    </div>
                                    <div className="cs-item-name-container">
                                        <p className="cs-item-name">Curso de JavaScript e TypeScript do básico ao avançado</p>
                                    </div>
                                    <div className="cs-item-price-container">
                                        <div className="cs-item-price-container-inner">
                                            <p className="cs-item-price">R$125,00</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Courses;