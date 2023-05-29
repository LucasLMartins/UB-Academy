import { useState, useEffect } from "react";
import '../styles/courses.css';
import api from '../api.js'
import Header from "../Components/Header"
import Footer from "../Components/Footer";
// import api from '../api.js'
import ArrowDown from "./Images/arrow.png";
import ArrowUp from "./Images/arrowUp.png";
import { useNavigate, useLocation } from "react-router-dom";

function Courses() {
    const [courseParams, setCourseParams] = useState([])
    const [courseParamsFilter, setCourseParamsFilter] = useState([])

    const navigate = useNavigate()
    const useQuery = () => new URLSearchParams(useLocation().search);
    const query = useQuery();
    let queryCategory = query.get('cat');
    let queryPriceMin = query.get('min');
    let queryPriceMax = query.get('max');
    let querySearch = query.get('search')
    let i = 0;
    

    document.title = "Cursos"

    let categoryArrowState = 1;
    let priceArrowState = 0;

    useEffect(() => {
        api.get('/cursos').then(res => {
            let parametrosCursos = (res.data[0].cursos)
            setCourseParams(parametrosCursos)
            if (querySearch !== null && querySearch !== '') {
                parametrosCursos = parametrosCursos.filter(
                    i => i.nomeCurso.toLowerCase().includes(querySearch.toLowerCase())
                )
            }
            filterCourses(parametrosCursos)
        })

        if (queryCategory == 'null') {
            queryCategory = ''
        }
        if (queryPriceMin == 'null') {
            queryPriceMin = ''
        }
        if (queryPriceMax == 'null') {
            queryPriceMax = ''
        }
        if (querySearch == 'null') {
            querySearch = ''
        }

    }, [queryCategory, queryPriceMin, queryPriceMax, querySearch])

    function clickCategory() {
        const categoryArrow = document.getElementById('categoryArrowId');
        const categoryOptions = document.getElementById('categoryOptionsId');

        if (categoryArrowState == 0) {
            categoryArrow.src = ArrowUp
            categoryArrowState = 1
            categoryOptions.style.display = 'block';
        }
        else if (categoryArrowState == 1) {
            categoryArrow.src = ArrowDown
            categoryArrowState = 0
            categoryOptions.style.display = 'none';
        }
    }

    function clickPrice() {
        const priceArrow = document.getElementById('priceArrowId');
        const priceOptions = document.getElementById('priceOptionsId');

        if (priceArrowState == 0) {
            priceArrow.src = ArrowUp
            priceArrowState = 1
            priceOptions.style.display = 'block';
        }
        else if (priceArrowState == 1) {
            priceArrow.src = ArrowDown
            priceArrowState = 0
            priceOptions.style.display = 'none';
        }
    }

    function clearFilters() {
        //document.getElementById('range-max').value = ''
        //document.getElementById('range-min').value = ''
        navigate('/cursos')
    }

    async function filterCourses(param){
        let filter = param;

        if(queryCategory !== null && queryCategory !== ''){
            filter = filter.filter(i => i.categoria == queryCategory)
            console.log('categoria pegando')
        }
        if((queryPriceMin !== null && queryPriceMin !== '') &&
        (queryPriceMax !== null && queryPriceMax !== '') ) 
        {
            filter = filter.filter(i => i.precoCurso >= queryPriceMin && i.precoCurso <= queryPriceMax)
            console.log('preço pegando')
        }


        if(
            (queryCategory == null || queryCategory == '') &&
            ((queryPriceMin == null || queryPriceMin == '') && (queryPriceMax == null || queryPriceMax == '')) &&
            (querySearch == null || querySearch == '')
        ) {
            console.log('pegando nada')
        }


        if(queryCategory !== null && queryCategory !== '') {
            document.getElementById('categoryOptionAll').style.backgroundColor = '#ffffff'
            for(i=1; i<7; i++){
                document.getElementById('categoryOption'+i).style.backgroundColor = '#ffffff'
            }
            document.getElementById('categoryOption' + queryCategory).style.backgroundColor = '#003F88'
        }
        else {
            for(i=1; i<7; i++){
                document.getElementById('categoryOption'+i).style.backgroundColor = '#ffffff'
            }
            document.getElementById('categoryOptionAll').style.backgroundColor = '#003F88'
        }


        setCourseParamsFilter(filter)
    }

    function changePriceFilter() {
        const rangeMaxValue = document.getElementById('range-max')
        const rangeMinValue = document.getElementById('range-min')
        
    }

    function clickCategory_item(categoria){
        navigate('/cursos?cat='+categoria+'&min='+queryPriceMin+'&max='+queryPriceMax+'&search='+querySearch)
    }

    function clickCategory_itemAll() {
        navigate('/cursos?cat=&min='+queryPriceMin+'&max='+queryPriceMax+'&search='+querySearch)
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
                                        <li className="cs-filter-li" onClick={() => clickCategory_itemAll()}>
                                            <p className="cs-filter-option">Todas</p>
                                            <div className="cs-filter-box" id="categoryOptionAll"></div>
                                        </li>
                                        <li className="cs-filter-li" onClick={() => clickCategory_item('1')}>
                                            <p className="cs-filter-option">Programação</p>
                                            <div className="cs-filter-box" id="categoryOption1"></div>
                                        </li>
                                        <li className="cs-filter-li" onClick={() => clickCategory_item('2')}>
                                            <p className="cs-filter-option">Banco de Dados</p>
                                            <div className="cs-filter-box" id="categoryOption2"></div>
                                        </li>
                                        <li className="cs-filter-li" onClick={() => clickCategory_item('3')}>
                                            <p className="cs-filter-option">Segurança</p>
                                            <div className="cs-filter-box" id="categoryOption3"></div>
                                        </li>
                                        <li className="cs-filter-li" onClick={() => clickCategory_item('4')}>
                                            <p className="cs-filter-option">Qualidade de software</p>
                                            <div className="cs-filter-box" id="categoryOption4"></div>
                                        </li>
                                        <li className="cs-filter-li" onClick={() => clickCategory_item('5')}>
                                            <p className="cs-filter-option">Redes</p>
                                            <div className="cs-filter-box" id="categoryOption5"></div>
                                        </li>
                                        <li className="cs-filter-li" onClick={() => clickCategory_item('6')}>
                                            <p className="cs-filter-option">Inteligência Artificial</p>
                                            <div className="cs-filter-box" id="categoryOption6"></div>
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
                                        <button className="filter-by-price-button" onClick={() => changePriceFilter()}>Aplicar</button>
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
                            {
                                courseParamsFilter.map((item, i) => (
                                    <div key={i} className="cs-grid-item-container">
                                        <a href="#">
                                            <div className="cs-img-container">
                                                <img src={'http://localhost:5000/images/' + item.imagemCurso} className="cs-item-img"></img>
                                            </div>
                                            <div className="cs-item-name-container">
                                                <p className="cs-item-name">{item.nomeCurso}</p>
                                            </div>
                                            <div className="cs-item-price-container">
                                                <div className="cs-item-price-container-inner">
                                                    <p className="cs-item-price">R${item.precoCurso},00</p>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Courses;