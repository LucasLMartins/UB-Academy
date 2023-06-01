import { useState, useEffect } from "react";
import '../styles/admin.css';
import api from '../api.js'
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import React from "react";

function Admin() {

    // Variáveis de login e info de admin
    const [login] = useState(localStorage.getItem('adminLogin'))
    const [adminLogin, setAdminLogin] = useState({ user: '', password: '' })

    // Variáveis para upload de imagens
    const [imageFile, setImageFile] = useState()
    const [imageFileName, setImageFileName] = useState("")
    const [editImageFile, setEditImageFile] = useState()
    const [editImageFileName, setEditImageFileName] = useState("")

    // Variáveis para upload de videos
    const [videoFile, setVideoFile] = useState()
    const [videoFileName, setVideoFileName] = useState("")

    // Variáveis parametros cursos e vendas
    const [courseParams, setCourseParams] = useState([])
    const [salesParams, setSalesParams] = useState([])
    const [Search, setSearch] = useState({ search: '' })

    // Variáveis parametros curso
    const [lessonsPage, setLessonsPage] = useState([])
    const [lessonsPageL, setLessonsPageL] = useState([])

    // Variáveis para inserção no banco de dados
    const [courseInsertState, setCourseInsertState] = useState({ nome: '', categoria: '1', preco: '', descricao: '', img: '', skills: '' })
    const [courseEditState, setCourseEditState] = useState({ nome: '', categoria: '', preco: '', descricao: '', img: '', skills: '', id: '' })

    //const [itemEditState, setItemEditState] = useState({ itemId: '', nome: '', img: '', desc: '', preco: '' })
    //const [itemDeleteState, setItemDeleteState] = useState({ itemId: '' })

    const navigate = useNavigate();

    const useQuery = () => new URLSearchParams(useLocation().search);
    const query = useQuery();
    const page = query.get('page');
    const querySearch = query.get('search')
    const courseId = query.get('courseId')


    useEffect(() => {
        api.get('/admin').then(res => {
            fetchCoursesPage(res.data[0].cursos)
            fetchSalesPage(res.data[0].vendas)
            fetchLessonsPage(res.data[0].cursos, res.data[0].aulas)
        })
        /* eslint-disable */
}, [querySearch])

    async function fetchCoursesPage(cursos) {
        if (querySearch !== null) {
            cursos = cursos.filter(
                i => i.nomeCurso.toLowerCase().includes(querySearch.toLowerCase())
            )
        }
        setCourseParams(cursos)
    }

    async function fetchSalesPage(vendas) {
        setSalesParams(vendas)
    }

    async function fetchLessonsPage(cursos, aulas) {
        let curso = cursos.filter(
            i => i.idCurso == courseId
        )

        let aula = aulas.filter(
            i => i.idCurso == courseId
        )

        switch (curso[0].categoria) {
            case '1':
                curso[0].categoriaValue = 'Programação';
                break;
            case '2':
                curso[0].categoriaValue = 'Dados';
                break;
            case '3':
                curso[0].categoriaValue = 'Segurança';
                break;
            case '4':
                curso[0].categoriaValue = 'Qualidade';
                break;
            case '5':
                curso[0].categoriaValue = 'Redes';
                break;
            case '6':
                curso[0].categoriaValue = 'Inteligência Artificial';
                break;
        }
        curso[0].categoria
        setLessonsPage(curso[0])
        setLessonsPageL(aula)
        
    }

    const SearchCourse = (e) => {
        e.preventDefault()
        navigate('/admin?search=' + Search.search)
    }

    const SearchSale = (e) => {
        e.preventDefault()
        navigate('/admin?page=sales&search=' + Search.search)
    }

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
        document.getElementById('input-admin').value = ''
        navigate("/admin")
    }

    function changeSales() {
        document.getElementById('input-admin').value = ''
        navigate("/admin?page=sales")
    }

    // Edit course modal
    function openEditCourseModal() {
        document.getElementById('new-modal-edit-course').style.display = 'flex'

        setCourseEditState({
            nome: lessonsPage.nomeCurso,
            categoria: lessonsPage.categoria,
            preco: lessonsPage.precoCurso,
            descricao: lessonsPage.descricaoCurso,
            img: lessonsPage.imagemCurso,
            skills: lessonsPage.skillsCurso,
            id: lessonsPage.idCurso
        })
    }
    function closeEditCourseModal() {
        document.getElementById('new-modal-edit-course').style.display = 'none'
    }

    // Delete course modal
    function openDeleteCourseModal() {
        document.getElementById('new-modal-delete-course').style.display = 'flex'
    }
    function closeDeleteCourseModal() {
        document.getElementById('new-modal-delete-course').style.display = 'none'
    }

    // Create lesson modal
    function openCreateLessonModal() {

    }
    function closeCreateLessonModal() {

    }

    // Edit lesson modal
    function openEditLessonModal() {

    }
    function closeEditLessonModal() {

    }

    //Delete lesson modal
    function openDeleteLessonModal() {

    }
    function closeDeleteLessonModal() {

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
        setCourseInsertState({ ...courseInsertState, img: e.target.files[0].name })
        document.getElementById('choose-image-button').style.backgroundImage = 'url(' + URL.createObjectURL(e.target.files[0]) + ')'
        document.getElementById('choose-image-button').style.backgroundSize = '100% 100%'
    }

    const saveEditImageFile = (e) => {
        setEditImageFile(e.target.files[0])
        setEditImageFileName(e.target.files[0].name)
        setCourseEditState({ ...courseEditState, img: e.target.files[0].name })
        document.getElementById('choose-image-button-edit').style.backgroundImage = 'url(' + URL.createObjectURL(e.target.files[0]) + ')'
        document.getElementById('choose-image-button-edit').style.backgroundSize = '100% 100%'
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

    const editCourse = async (e) => {
        if (courseEditState.nome !== '' && courseEditState.categoria !== '' && courseEditState.preco !== '' && courseEditState.descricao !== '' && courseEditState.img !== '' && courseEditState.skills !== '') {
            // upload de imagem
            if (editImageFileName !== ""){
                const formData = new FormData()
                formData.append("file", editImageFile)
                formData.append("fileName", editImageFileName)
                try {
                    const res = await axios.post(
                        "http://localhost:5000/admin/imageUpload",
                        formData
                    )
                    console.log(res)
                } catch (ex) {
                    console.log(ex)
                }
            }
            

            // insert no mysql
            fetch('http://localhost:5000/admin/editCourse', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(courseEditState)
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

    async function deleteCourse() {
        let id = { id: courseId}
        fetch('http://localhost:5000/admin/deleteCourse', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(id)
        })
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
            })
        navigate(0)
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
                    <form onSubmit={SearchCourse} className="admin-search-input-form">
                        <input onChange={e => setSearch({ ...Search, search: e.target.value })} id="input-admin" className="admin-search-input" type="text" placeholder="Pesquise por um curso..."></input>
                    </form>

                    <button className="admin-course-create-button" onClick={() => document.getElementById('new-modal').style.display = 'flex'}>Criar novo</button>
                </div>
                <div className="admin-crud-container">
                    <div className="cs-grid-div">
                        {
                            courseParams.map((item, i) => (
                                <div key={i} className="cs-grid-item-container">
                                    <a href={'/admin?page=lessons&courseId=' + item.idCurso}>
                                        <div className="cs-img-container">
                                            <img src={'http://localhost:5000/images/' + item.imagemCurso} className="cs-item-img" alt="banner do curso"></img>
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

                <div id="new-modal" className="insert-new-modal">
                    <div className="new-modal-container">
                        <div className="insert-new-modal-top">
                            <p className="create-new-course">Criar novo curso</p>
                            <span className="close-insert-new-modal" onClick={() => document.getElementById('new-modal').style.display = 'none'}>X</span>
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
                            <input onChange={e => setCourseInsertState({ ...courseInsertState, nome: e.target.value })} type="text" required name="nomeCurso" id="nomeCurso" className="input-new-modal"></input>
                            <br></br>
                            <label>Categoria</label>
                            <br></br>
                            <select onChange={e => setCourseInsertState({ ...courseInsertState, categoria: e.target.value })} name="categoriaCurso" id="categoriaCurso" className="input-new-modal-category">
                                <option value='1' defaultValue>Programação</option>
                                <option value='2'>Dados</option>
                                <option value='3'>Segurança</option>
                                <option value='4'>Qualidade</option>
                                <option value='5'>Redes</option>
                                <option value='6'>Inteligência Artificial</option>
                            </select>
                            <br></br>
                            <label>Preço</label>
                            <br></br>
                            <input onChange={e => setCourseInsertState({ ...courseInsertState, preco: e.target.value })} type="number" required name="precoCurso" id="precoCurso" className="input-new-modal"></input>
                            <br></br>
                            <label>Descrição</label>
                            <br></br>
                            <input onChange={e => setCourseInsertState({ ...courseInsertState, descricao: e.target.value })} type="text" required name="descricaoCurso" id="descricaoCurso" className="input-new-modal"></input>
                            <br></br>
                            <label>Skills</label>
                            <br></br>
                            <input onChange={e => setCourseInsertState({ ...courseInsertState, skills: e.target.value })} type="text" required name="skillsCurso" id="skillsCurso" className="input-new-modal"></input>
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
                    <form onSubmit={SearchSale} className="admin-search-input-form">
                        <input onChange={e => setSearch({ ...Search, search: e.target.value })} id="input-admin" className="admin-search-input" type="text" placeholder="Pesquise por um curso..."></input>
                    </form>
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


                    <p>{salesParams[0].idVenda}</p>

                </div>
            </div>
        </div>
    )

    if (login === 'true' && page === 'lessons') {
        if (typeof lessonsPage.nomeCurso == 'string') {
            return (
                <div className="admin-main-div">
                    <div className="admin-login-header">
                        <div className="admin-return-home">
                            <div onClick={() => navigate('/')} className="home-icon-div">
                                <h2>Home</h2>
                            </div>
                        </div>
                        <div className="">
                            <div onClick={() => navigate("/admin")} className="admin-select-products admin-select">
                                <p>Cursos</p>
                            </div>
                            <div onClick={() => navigate("/admin?page=sales")} className="admin-select-orders admin-select">
                                <p>Vendas</p>
                            </div>
                        </div>
        
                        <div className="admin-logout">
                            <button className="admin-logout-button" onClick={() => logout()}>Logout</button>
                        </div>
                    </div>
        
                    <div className="admin-paper">
                        <div className="admin-les-container">
                            <div className="admin-les-top">
                                <div className="admin-les-top-title">
                                    <h3 style={{ display: 'inline-block', fontSize: '25px', paddingTop: '5px' }}>Curso</h3>
                                    <div className="admin-les-top-title-float">
                                        <div className="">
                                            <button onClick={() => openEditCourseModal()} className="admin-les-editButton" style={{ marginRight: '30px' }}>Editar</button>
                                            <button onClick={() => openDeleteCourseModal()} className="admin-les-deleteButton">Excluir</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="admin-les-top-container">
                                    <div className="admin-les-top-categories" style={{ marginBottom: '0px' }}>
                                        <div className="admin-les-imagemCurso admin-les-infos" style={{ width: '15%', borderRight: '0' }}>
                                            <p className="admin-les-info-title" style={{ padding: '10px 0' }}>Banner</p>
                                        </div>
                                        <div className="admin-les-nomeCurso admin-les-infos" style={{ width: '20%', borderRight: '0' }}>
                                            <p className="admin-les-info-title">Nome</p>
                                        </div>
                                        <div className="admin-les-categoria admin-les-infos" style={{ width: '15%', borderRight: '0' }}>
                                            <p className="admin-les-info-title">Categoria</p>
                                        </div>
                                        <div className="admin-les-precoCurso admin-les-infos" style={{ width: '10%', borderRight: '0' }}>
                                            <p className="admin-les-info-title">Preço</p>
                                        </div>
                                        <div className="admin-les-descricaoCurso admin-les-infos" style={{ width: '20%', borderRight: '0' }}>
                                            <p className="admin-les-info-title">Descrição</p>
                                        </div>
                                        <div className="admin-les-skillsCurso admin-les-infos" style={{ width: '20%' }}>
                                            <p className="admin-les-info-title">Skills</p>
                                        </div>
                                    </div>
        
                                    <div className="admin-les-top-categories">
                                        <div className="admin-les-imagemCurso admin-les-infos" style={{ width: '15%', borderTop: '0', borderRight: '0' }}>
                                            <div className="admin-les-img-container">
                                                <img src={'http://localhost:5000/images/' + lessonsPage.imagemCurso} className="cs-item-img" alt="banner do curso"></img>
                                            </div>
                                        </div>
                                        <div className="admin-les-nomeCurso admin-les-infos" style={{ width: '20%', borderTop: '0', borderRight: '0', textAlign: 'left' }}>
                                            <p className="admin-les-info-content">{lessonsPage.nomeCurso}</p>
                                        </div>
                                        <div className="admin-les-categoria admin-les-infos" style={{ width: '15%', borderTop: '0', borderRight: '0' }}>
                                            <p className="admin-les-info-content">{lessonsPage.categoriaValue}</p>
                                        </div>
                                        <div className="admin-les-precoCurso admin-les-infos" style={{ width: '10%', borderTop: '0', borderRight: '0' }}>
                                            <p className="admin-les-info-content">R${lessonsPage.precoCurso},00</p>
                                        </div>
                                        <div className="admin-les-descricaoCurso admin-les-infos" style={{ width: '20%', borderTop: '0', borderRight: '0' }}>
                                            <p className="admin-les-info-content" style={{ textAlign: 'left' }}>{lessonsPage.descricaoCurso}</p>
                                        </div>
                                        <div className="admin-les-skillsCurso admin-les-infos" style={{ width: '20%', borderTop: '0' }}>
                                            <p className="admin-les-info-content">{lessonsPage.skillsCurso}</p>
                                        </div>
                                    </div>
        
                                </div>
                            </div>
        
                            <div className="admin-les-bottom">
                                <div className="admin-les-bottom-title">
                                    <h3 style={{ display: 'inline-block', fontSize: '25px', paddingTop: '5px' }}>Aulas</h3>
                                    <div className="admin-les-top-title-float">
                                        <div className="">
                                            <button className="admin-les-createButton" style={{ marginRight: '0px' }}>Criar nova aula</button>
                                        </div>
                                    </div>
                                </div>
        
                                <div className="admin-les-bottom-container">
                                    <div className="admin-les-bottom-categories">
                                        <div className="admin-les-infos" style={{ width: '25%', borderRight: '0' }}>
                                            <p className="admin-les-info-title" style={{ padding: '10px 0' }}>Título</p>
                                        </div>
                                        <div className="admin-les-infos" style={{ width: '40%', borderRight: '0' }}>
                                            <p className="admin-les-info-title">Descrição</p>
                                        </div>
                                        <div className="admin-les-infos" style={{ width: '20%', borderRight: '0' }}>
                                            <p className="admin-les-info-title">Video</p>
                                        </div>
                                        <div className="admin-les-infos" style={{ width: '15%' }}>
                                            <p className="admin-les-info-title" style={{ marginLeft: '16px' }}>Ações</p>
                                        </div>
                                    </div>
        
                                    {
                                        lessonsPageL.map((item, i) => (
                                            <div key={i} className="admin-les-bottom-categories">
                                                <div className="admin-les-infos" style={{ width: '25%', borderTop: '0', borderRight: '0' }}>
                                                    <p className="admin-les-info-content">{item.tituloAula}</p>
                                                </div>
                                                <div className="admin-les-infos" style={{ width: '40%', borderTop: '0', borderRight: '0' }}>
                                                    <p className="admin-les-info-content">{item.descricaoAula}</p>
                                                </div>
                                                <div className="admin-les-infos" style={{ width: '20%', borderTop: '0', borderRight: '0' }}>
                                                    <p className="admin-les-info-content">{item.video}</p>
                                                </div>
                                                <div className="admin-les-infos" style={{ width: '15%', justifyContent: 'space-evenly', borderTop: '0' }}>
                                                    <div className="admin-les-actions les-actions-edit">
                                                        <img width='25px' src="edit.png"></img>
                                                        <p>Editar</p>
                                                    </div>
                                                    <div className="admin-les-actions les-actions-delete">
                                                        <img width='25px' src="delete.png"></img>
                                                        <p>Excluir</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
        
                                </div>
                            </div>
                        </div>
                    </div>
        
        
                    {/* edit modal */}
                    <div id="new-modal-edit-course" className="insert-new-modal">
                        <div className="new-modal-container" style={{ borderColor: 'rgb(241, 157, 0)' }}>
                            <div className="insert-new-modal-top">
                                <p className="create-new-course">Editar curso</p>
                                <span className="close-edit-modal" onClick={() => closeEditCourseModal()}>X</span>
                            </div>
        
                            <div>
                                <label>Imagem do curso</label>
                                <br></br>
                                <div className="choose-image-div">
                                    <div id="choose-image-button-edit" className="choose-image-button" style={{backgroundImage: 'url(http://localhost:5000/images/' + lessonsPage.imagemCurso + ')', backgroundSize: '100% 100%'}}></div>
                                    <input type="file" name="file" className="imgInput" accept="image/png, image/jpeg, image/jpg" onChange={saveEditImageFile}></input>
                                </div>
                                <br></br>
                                <label>Nome do curso</label>
                                <br></br>
                                <input onChange={e => setCourseEditState({ ...courseEditState, nome: e.target.value })} type="text" required name="nomeCurso" id="editNomeCurso" className="input-new-modal" defaultValue={lessonsPage.nomeCurso} style={{ borderColor: 'rgb(241, 157, 0)' }}></input>
                                <br></br>
                                <label>Categoria</label>
                                <br></br>
                                <select onChange={e => setCourseEditState({ ...courseEditState, categoria: e.target.value })} name="categoriaCurso" id="categoriaCurso" className="input-new-modal-category" style={{ borderColor: 'rgb(241, 157, 0)' }} defaultValue={lessonsPage.categoria}>
                                    <option value='1'>Programação</option>
                                    <option value='2'>Dados</option>
                                    <option value='3'>Segurança</option>
                                    <option value='4'>Qualidade</option>
                                    <option value='5'>Redes</option>
                                    <option value='6'>Inteligência Artificial</option>
                                </select>
                                <br></br>
                                <label>Preço</label>
                                <br></br>
                                <input onChange={e => setCourseEditState({ ...courseEditState, preco: e.target.value })} type="number" required name="precoCurso" id="precoCurso" className="input-new-modal" defaultValue={lessonsPage.precoCurso} style={{ borderColor: 'rgb(241, 157, 0)' }}></input>
                                <br></br>
                                <label>Descrição</label>
                                <br></br>
                                <input onChange={e => setCourseEditState({ ...courseEditState, descricao: e.target.value })} type="text" required name="descricaoCurso" id="descricaoCurso" className="input-new-modal" defaultValue={lessonsPage.descricaoCurso} style={{ borderColor: 'rgb(241, 157, 0)' }}></input>
                                <br></br>
                                <label>Skills</label>
                                <br></br>
                                <input onChange={e => setCourseEditState({ ...courseEditState, skills: e.target.value })} type="text" required name="skillsCurso" id="skillsCurso" className="input-new-modal" defaultValue={lessonsPage.skillsCurso} style={{ borderColor: 'rgb(241, 157, 0)' }}></input>
                                <br></br>
                                <button className="admin-edit-button" onClick={editCourse}>Editar</button>
        
                            </div>
                        </div>
                    </div>
        
        
                    {/* delete modal */}
                    <div id="new-modal-delete-course" className="insert-new-modal">
                        <div className="new-modal-container" style={{ borderColor: 'rgb(238, 0, 0)' }}>
                            {/* <div className="insert-new-modal-top">
                                <p className="create-new-course">Excluir curso</p>
                                <span className="close-edit-modal" onClick={() => closeDeleteCourseModal()}>X</span>
                                
                            </div> */}
                            <div className="delete-new-modal">
                                <div className="delete-new-modal-text">
                                    <p className="create-new-course">Deseja mesmo excluir este curso?</p>
                                </div>
                                <div className="delete-new-modal-buttons">
                                    <button className="delete-confirm-button" onClick={() => deleteCourse()} style={{ marginRight: '50px' }}>Sim</button>
                                    <button className="delete-confirm-button" onClick={() => closeDeleteCourseModal()}>Não</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            navigate('/admin')
        }
    }

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