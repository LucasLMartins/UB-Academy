import { useState, useEffect } from "react";
import '../styles/courses.css';
import Header from "../Components/Header"
import Footer from "../Components/Footer";
// import api from '../api.js'

function Courses() {



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
                                <div className="cs-filter-titles">
                                    <h4>Categoria</h4>
                                    <img src={require('./Images/arrowUp.png')} width="40px" height="40px"></img>
                                </div>
                                <div className="cs-filter-cat-content">
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
                                <div className="cs-filter-titles">
                                    <h4>Preço</h4>
                                    <img src={require('./Images/arrow.png')} width="40px" height="40px"></img>
                                </div>
                                <div className="cs-filter-price-content">
                                    
                                </div>
                            </div>

                            <div className="cs-clear-filters">
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
                                <a>Item 1</a>
                            </div>
                            <div className="cs-grid-item-container">
                                <a>Item 2</a>
                            </div>
                            <div className="cs-grid-item-container">
                                <a>Item 3</a>
                            </div>
                            <div className="cs-grid-item-container">
                                <a>Item 4</a>
                            </div>
                            <div className="cs-grid-item-container">
                                <a>Item 5</a>
                            </div>
                            <div className="cs-grid-item-container">
                                <a>Item 6</a>
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