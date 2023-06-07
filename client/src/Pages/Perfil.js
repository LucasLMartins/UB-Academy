import { useState, useEffect, useContext } from "react";
import { Text, Grid } from "@mantine/core";
import { IconUserCircle, IconLogout } from '@tabler/icons-react';
import '../styles/home.css';
import '../styles/profile.css';
import UbHeader from "../Components/Header"
import Footer from "../Components/Footer";
//import { useLocation } from "react-router-dom";
import { AuthContext } from "../Contexts/auth";

function Perfil() {
    /* eslint-disable */
    const [courseParams, setCourseParams] = useState([])
    const { authenticated, logout } = useContext(AuthContext)
    let userInfo = JSON.parse(localStorage.getItem("user"))

    useEffect(() => {
        fetchCourses()
    }, [])

    async function fetchCourses() {
        fetch('http://localhost:5000/perfil', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ idUsuario: userInfo.idUsuario })
        })
            .then((res) => res.json())
            .then((data) => {
                let parametrosCursos = (data[0].resultado)
                setCourseParams(parametrosCursos)
                verifyCourses(parametrosCursos)
            })
    }

    async function verifyCourses(cursos) {
        if (cursos[0] === undefined) {
            const message = document.createElement("p")
            if (document.getElementById('verifyMessageId') === null) {
                message.innerText = 'Você ainda não tem nenhum curso comprado.'
                message.id = 'verifyMessageId'
                message.style.marginTop = '50px'
                message.style.fontSize = '20px'
                document.getElementById('profileCoursesGrid').appendChild(message)
            }
        }
    }

    const handleLogout = () => {
        logout()
    }


    return (
        <div className="page">
            <UbHeader />
            <Grid justify="center" style={{ margin: '0 0 0 0' }}>
                <div className="cs-page-container3">
                    <Grid container style={{ backgroundColor: '#003F88', borderRadius: '10px', margin: '5% 0 30px 0', width: '100%', display: 'flex', justifyContent: 'space-between' }} >
                        <IconUserCircle size={150} style={{ color: "white", marginLeft: '2%', boxSizing: 'border-box' }} />
                        <Text color={'white'} size={50} weight={500} style={{ marginTop: 'auto', marginBottom: 'auto', marginRight: '40%' }}>
                            {userInfo.nomeUsuario}
                        </Text>
                        <div style={{ marginTop: 'auto', marginBottom: 'auto', marginRight: '2%', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <IconLogout onMouseOver={() => document.getElementById('profileLogoutIcon').style.width = '70px'} onMouseOut={() => document.getElementById('profileLogoutIcon').style.width = '80px'} onClick={handleLogout} size={80} style={{ color: "white", cursor: 'pointer', transition: '0.2s' }} id="profileLogoutIcon" />
                        </div>

                    </Grid>

                    <Text color={'black'} align='center' size={50} weight={500}>
                        Cursos comprados
                    </Text>

                    <div id="profileCoursesGrid" style={{ textAlign: 'center' }}></div>

                    <Grid container justify='center' align='center' className="cs-grid-div" style={{ marginTop: '35px', marginBottom: '100px', minHeight: '200px' }}>
                        {
                            courseParams.map((item, i) => (
                                <a href={'/aula?Aid=' + item.idAula + '&Cid=' + item.idCurso}>
                                    <div key={i} className="cs-grid-item-container" style={{ height: '300px' }}>

                                        <div className="cs-img-container" style={{ height: '65%' }}>
                                            <img src={'http://localhost:5000/images/' + item.imagemCurso} className="cs-item-img"></img>
                                        </div>
                                        <div className="cs-item-name-container" style={{ height: '35%' }}>
                                            <p className="cs-item-name">{item.nomeCurso}</p>
                                        </div>


                                    </div>
                                </a>
                            ))
                        }
                    </Grid>

                </div>
                <Footer />
            </Grid>
        </div>
    );
};

export default Perfil;