import { useState, useEffect } from "react";
import '../styles/admin.css';
import api from '../api.js'
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import React from "react";

function Admin() {

    // Variáveis de login e info de admin
    const [login, setLogin] = useState(localStorage.getItem('adminLogin'))
    const [info, setInfo] = useState(localStorage.getItem('adminInfo'))
    const [adminLogin, setAdminLogin] = useState({ user: '', password: '' })
    let adminInfo = JSON.parse(info);

    // Variáveis para upload de arquivo
    const [videoFile, setVideoFile] = useState()
    const [videoFileName, setVideoFileName] = useState("")
    const [imageFile, setImageFile] = useState()
    const [imageFileName, setImageFileName] = useState("")
    const [imageConfirmFile, setimageConfirmFile] = useState(null)

    // Variáveis parametros cursos e vendas
    const [courseParams, setCourseParams] = useState([])
    const [salesParams, setSalesParams] = useState([])

    // restante
    const [courseInsertState, setCourseInsertState] = useState({ nome: '', categoria: '1', preco: '', descricao: '', img: '', skills: '' })
    //const [itemEditState, setItemEditState] = useState({ itemId: '', nome: '', img: '', desc: '', preco: '' })
    //const [itemDeleteState, setItemDeleteState] = useState({ itemId: '' })

    const navigate = useNavigate();

    const useQuery = () => new URLSearchParams(useLocation().search);
    const query = useQuery();
    const page = query.get('page');

    useEffect(() => {
        api.get('/admin').then(res => {
            let parametrosCursos = (res.data[0].cursos)
            let parametrosVendas = (res.data[0].vendas)
            setCourseParams(parametrosCursos)
            setSalesParams(parametrosVendas)
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

                    if (data[0].resultado === 'true') {
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

    const saveVideoFile = (e) => {
        setVideoFile(e.target.files[0])
        setVideoFileName(e.target.files[0].name)
    }

    const uploadVideoFile = async (e) => {
        const formData = new FormData()
        formData.append("file", videoFile)
        formData.append("fileName", videoFileName)
        try {
            const res = await axios.post(
                "http://localhost:5000/admin/videoUpload",
                formData
            )
            console.log(res)
        } catch (ex) {
            console.log(ex)
        }
    }

    const saveImageFile = (e) => {
        setImageFile(e.target.files[0])
        setImageFileName(e.target.files[0].name)
        setCourseInsertState({ ...courseInsertState, img: e.target.files[0].name})
        document.getElementById('choose-image-button').style.backgroundImage = 'url('+ URL.createObjectURL(e.target.files[0]) +')'
        document.getElementById('choose-image-button').style.backgroundSize = '100% 100%'
    }

    const insertCourse = async (e) => {
        if (courseInsertState.nome !== '' && courseInsertState.categoria !== '' && courseInsertState.preco !== '' && courseInsertState.descricao !== '' && courseInsertState.img !== '' && courseInsertState.skills !== '') {
            // upload de imagem
            const formData = new FormData()
            formData.append("file", imageFile)
            formData.append("fileName", imageFileName)
            try {
                const res = await axios.post(
                    "http://localhost:5000/admin/imageUpload",
                    formData
                )
                console.log(res)
            } catch (ex) {
                console.log(ex)
            }
            
            // insert no mysql
            fetch('http://localhost:5000/admin/insertCourse', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(courseInsertState)
            })
                .then((response) => response.json())
                .then((result) => {
                    console.log(result)
                })

            navigate(0)
        }
        else {
            window.alert('Preencha todos os campos!')
        }
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
                    <button className="admin-logout-button" onClick={() => logout()}>Logout</button>
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
                        {
                            courseParams.map((item, i) => (
                                <div key={i} className="cs-grid-item-container">
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
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div id="new-modal" className="insert-new-modal">
                    <div className="new-modal-container">
                        <div className="insert-new-modal-top">
                            <p className="create-new-course">Criar novo curso</p>
                            <span className="close-insert-new-modal" onClick={() => closeCreateModal()}>X</span>
                        </div>

                        <div>
                            <label>Imagem do curso</label>
                            <br></br>
                            <div className="choose-image-div">
                                <div id="choose-image-button" className="choose-image-button"></div>
                                <input type="file" name="file" className="imgInput" accept="image/png, image/jpeg, image/jpg" onChange={saveImageFile}></input>
                            </div>
                            <br></br>
                            <label>Nome do curso</label>
                            <br></br>
                            <input onChange={e => setCourseInsertState({ ...courseInsertState, nome: e.target.value})} type="text" required name="nomeCurso" id="nomeCurso" className="input-new-modal"></input>
                            <br></br>
                            <label>Categoria</label>
                            <br></br>
                            <select onChange={e => setCourseInsertState({ ...courseInsertState, categoria: e.target.value})} name="categoriaCurso" id="categoriaCurso" className="input-new-modal-category">
                                <option value='1' selected>Programação</option>
                                <option value='2'>Dados</option>
                                <option value='3'>Segurança</option>
                                <option value='4'>Qualidade</option>
                                <option value='5'>Redes</option>
                                <option value='6'>Inteligência Artificial</option>
                            </select>
                            <br></br>
                            <label>Preço</label>
                            <br></br>
                            <input onChange={e => setCourseInsertState({ ...courseInsertState, preco: e.target.value})} type="number" required name="precoCurso" id="precoCurso" className="input-new-modal"></input>
                            <br></br>
                            <label>Descrição</label>
                            <br></br>
                            <input onChange={e => setCourseInsertState({ ...courseInsertState, descricao: e.target.value})} type="text" required name="descricaoCurso" id="descricaoCurso" className="input-new-modal"></input>
                            <br></br>
                            <label>Skills</label>
                            <br></br>
                            <input onChange={e => setCourseInsertState({ ...courseInsertState, skills: e.target.value})} type="text" required name="skillsCurso" id="skillsCurso" className="input-new-modal"></input>
                            <br></br>
                            <button className="admin-create-button" onClick={insertCourse}>Criar</button>
                            
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    if (login === 'true' && page === 'sales') return (
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
                    <button className="admin-logout-button" onClick={() => logout()}>Logout</button>
                </div>
            </div>


            <div className="admin-paper">
                <div className="admin-header">
                    <span className="admin-course-title">Vendas</span>
                    <input className="admin-search-input" type="text" placeholder="Pesquise por um curso..."></input>
                    <div></div>
                </div>
                <div className="">
                    <h1>upload de videos </h1>
                    <br></br>
                    <input type="file" name="file" onChange={saveVideoFile}></input>
                    <button onClick={uploadVideoFile}>Enviar</button>

                    <br></br>
                    <br></br>
                    <br></br>

                    <h1>upload de imagens</h1>
                    <br></br>
                    <input type="file" name="file" onChange={saveImageFile}></input>
                    <button onClick={insertCourse}>Enviar</button>

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