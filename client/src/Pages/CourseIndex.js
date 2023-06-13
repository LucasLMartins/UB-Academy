import Header from "../Components/Header"
import Footer from "../Components/Footer";
import '../styles/courseIndex.css';
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import React from "react";


function CourseIndex() {
    //const [courseId, setCourseId] = useState({ idCurso: '' })
    const [courseParams, setCourseParams] = useState([])
    const [lessonParams, setLessonParams] = useState([])

    const navigate = useNavigate();
    const useQuery = () => new URLSearchParams(useLocation().search);
    const query = useQuery();
    const id = query.get('id');

    useEffect(() => {
        fetchCourse({ idCurso: id })
    }, [id])

    async function fetchCourse(id) {
        fetch('http://localhost:5000/curso', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(id)
        })
            .then((res) => res.json())
            .then((data) => {
                setCourseParams(data[0].curso[0])
                if (data[0].curso[0] !== undefined) {
                    switch (data[0].curso[0].categoria) {
                        case '1':
                            data[0].curso[0].categoriaValue = 'Programação';
                            break;
                        case '2':
                            data[0].curso[0].categoriaValue = 'Dados';
                            break;
                        case '3':
                            data[0].curso[0].categoriaValue = 'Segurança';
                            break;
                        case '4':
                            data[0].curso[0].categoriaValue = 'Qualidade';
                            break;
                        case '5':
                            data[0].curso[0].categoriaValue = 'Redes';
                            break;
                        case '6':
                            data[0].curso[0].categoriaValue = 'Inteligência Artificial';
                            break;
                    }
                }




                setLessonParams(data[0].aulas)
            })

    }

    return (
        <div>
            <Header />
            <div className="ci-main">
                <div className="ci-top">
                    <div className="ci-top-left">
                        <div className="ci-top-left-1">
                            <h2 style={{ fontSize: '26px', marginBottom: '25px', color: 'rgb(200 200 200)' }}>Curso de {courseParams.categoriaValue}</h2>
                        </div>
                        <div className="ci-top-left-2">
                            <h1 style={{ fontSize: '40px', marginBottom: '25px' }}>{courseParams.nomeCurso}</h1>
                        </div>
                        <div className="ci-top-left-3">
                            <p style={{ fontSize: '22px' }}>{courseParams.descricaoCurso}</p>
                        </div>
                    </div>
                    <div className="ci-top-right">
                        <div className="ci-top-right-top">
                            <div className="cs-img-container" style={{ borderRadius: '10px 10px 0 0' }}>
                                <img alt="imagem do curso" src={'http://localhost:5000/images/' + courseParams.imagemCurso} className="cs-item-img"></img>
                            </div>
                        </div>
                        <div className="ci-top-right-bottom">
                            <div className="ci-top-right-bottom-infos">
                                <p style={{ fontSize: '24px', fontWeight: 'bold', color: 'rgb(45, 45, 45)' }}>Este curso inclui:</p>
                                <div style={{ marginTop: '20px' }}>
                                    <img width='20px' src="lesson.png"></img>
                                    <p style={{ marginLeft: '10px', display: 'inline-block', color: 'rgb(80, 80, 80)' }}>{courseParams.qnt} Aulas</p>
                                </div>
                                <div style={{ marginTop: '15px' }}>
                                    <img width='20px' src="certificate.png"></img>
                                    <p style={{ marginLeft: '10px', display: 'inline-block', color: 'rgb(80, 80, 80)' }}>Certificado</p>
                                </div>
                                
                                
                            </div>
                            <button type="button" className="profile-login-buttons" style={{ marginTop: '30px', width: '80%', marginBottom: '30px' }}>Comprar</button>
                        </div>
                    </div>
                </div>
                <div className="ci-bottom">
                    <div className="ci-bottom-title">
                        <h3>Conteúdo do curso</h3>
                    </div>
                    <div className="ci-bottom-lessons-container">
                        {
                            lessonParams.map((item, i) => (
                                <div key={i} className="ci-bottom-lesson-container">
                                    <img width='20px' src="lesson.png"></img>
                                    <p style={{ display: 'inline-block', marginLeft: '10px' }}>{item.tituloAula}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default CourseIndex;