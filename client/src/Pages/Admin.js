import { useState, useEffect } from "react";
import '../styles/admin.css';
import api from '../api.js'
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function Admin() {

    const [login, setLogin] = useState(localStorage.getItem('adminLogin'))
    const [info, setInfo] = useState(localStorage.getItem('adminInfo'))
    const [adminLogin, setAdminLogin] = useState({ user: '', password: '' })
    let adminInfo = JSON.parse(info);

    const [courseParams, setCourseParams] = useState([])
    //const [salesParams, setSalesParams] = useState([])
    const [itemInsertState, setItemInsertState] = useState({ nome: '', img: '', desc: '', preco: '' })
    const [itemEditState, setItemEditState] = useState({ itemId: '', nome: '', img: '', desc: '', preco: '' })
    const [itemDeleteState, setItemDeleteState] = useState({ itemId: '' })

    const navigate = useNavigate();

    const useQuery = () => new URLSearchParams(useLocation().search);
    const query = useQuery();
    const page = query.get('page');

    useEffect(() => {
        api.get('/admin').then(res => {
            let parametrosCursos = (res.data[0].cursos)
            setCourseParams(parametrosCursos)
            // let parametrosVendas = (res.data[0].agendamentos)
            // setSalesParams(parametrosVendas)
        })
    }, [])

    function loginForm() {
        if (adminLogin.user !== '' && adminLogin.password !== '') {
            fetch('http://localhost:5000/admin/loginAdmin', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(adminLogin)
            })
                .then((res) => res.json())
                .then((data) => {

                    if (data[0].resultado == 'true') {
                        let adminInfo = data[0].adminInfo[0]
                        localStorage.setItem('adminInfo', JSON.stringify(adminInfo))
                        localStorage.setItem('adminLogin', 'true')
                        navigate(0)
                    }
                    else {
                        window.alert('Usuário ou senha errados!')
                    }
                })
        }
        else {
            window.alert('Preencha todos os campos!')
        }
    }

    function logout() {
        localStorage.removeItem('adminLogin')
        localStorage.removeItem('adminInfo')
        navigate(0)
    }

    function changeCourses() {
        navigate("/admin")
    }

    function changeSales() {
        navigate("/admin?page=sales")
    }

    function OpenCreateModal() {
        document.getElementById('new-modal').style.display = 'flex'
    }

    function closeCreateModal() {
        document.getElementById('new-modal').style.display = 'none'
    }

    function openEditModal(item) {

    }

    function closeEditModal() {
        document.getElementById('edit-modal').style.display = 'none'
    }

    function openDeleteModal(item) {

    }

    function closeDeleteModal() {
        document.getElementById('delete-modal').style.display = 'none'
    }

    function insertItem() {

    }

    function editItem() {

    }

    function deleteItem() {

    }




    if (login === 'true' && page == null) return (
        <div className="admin-main-div">
            <div className="admin-login-header">
                <div className="admin-return-home">
                    <div onClick={() => navigate('/')} className="home-icon-div">
                        <h2>Home</h2>
                    </div>
                </div>
                <div className="">
                    <div onClick={() => changeCourses()} className="admin-select-products admin-select">
                        <p>Cursos</p>
                    </div>
                    <div onClick={() => changeSales()} className="admin-select-orders admin-select">
                        <p>Vendas</p>
                    </div>
                </div>

                <div className="admin-logout">
                    <button className="admin-logout-button" onClick={() => logout()}>Deslogar</button>
                </div>
            </div>


            <div className="admin-paper">
                <div className="admin-header">
                    <span className="admin-course-title">Cursos</span>
                    <input className="admin-search-input" type="text" placeholder="Pesquise por um curso..."></input>
                    <button className="admin-course-create-button" onClick={() => OpenCreateModal()}>Criar novo</button>
                </div>
                <div className="admin-crud-container">
                    <div className="cs-grid-div">

                        <div className="cs-grid-item-container">
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
                        </div>

                        <div className="cs-grid-item-container">
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
                        </div>

                        <div className="cs-grid-item-container">
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
                        </div>

                        <div className="cs-grid-item-container">
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
                        </div>

                        <div className="cs-grid-item-container">
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
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )

    if (login === 'true' && page == 'sales') return (
        <div className="admin-main-div">
            <div className="admin-login-header">
                <div className="admin-return-home">
                    <div onClick={() => navigate('/')} className="home-icon-div">
                        <h2>Home</h2>
                    </div>
                </div>
                <div className="">
                    <div onClick={() => changeCourses()} className="admin-select-products admin-select">
                        <p>Cursos</p>
                    </div>
                    <div onClick={() => changeSales()} className="admin-select-orders admin-select">
                        <p>Vendas</p>
                    </div>
                </div>

                <div className="admin-logout">
                    <button className="admin-logout-button" onClick={() => logout()}>Deslogar</button>
                </div>
            </div>


            <div className="admin-paper">
                <div className="admin-header">
                    <span className="admin-course-title">Vendas</span>
                    <input className="admin-search-input" type="text" placeholder="Pesquise por um curso..."></input>
                    <div></div>
                </div>
                <div className="">
                    <h1>conteudo</h1>
                </div>
            </div>
        </div>
    )

    return (
        <div className="admin-main-div">
            <h1 className="mt">Login Admin</h1>
            <div className="admin-form" method='get'>
                <input type="text" id="adminUser" required name="user" onChange={e => setAdminLogin({ ...adminLogin, user: e.target.value })} placeholder="Usuário" className="admin-user-input" ></input>
                <br></br>
                <input type="password" id="adminPass" required name="password" onChange={e => setAdminLogin({ ...adminLogin, password: e.target.value })} placeholder="Senha" className="admin-password-input" ></input>
                <br></br>

                <div className="divAdminButtons">
                    <button id="adminButton" className="adminButton" onClick={() => loginForm()}>Entrar</button>
                    <button className="adminButton" onClick={() => navigate('/')}>Sair</button>
                </div>
            </div>
        </div>
    )

}

export default Admin;