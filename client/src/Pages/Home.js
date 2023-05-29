import { useState, useEffect } from "react";
import { Grid, Text, Image, Button } from '@mantine/core';
import '../styles/home.css';
import UbHeader from "../Components/Header"
import Footer from "../Components/Footer";
import Logo from '../Pages/Images/UBlogo_alpha.png';
import Banner from '../Pages/Images/Banner.png';
import api from '../api.js'
import { useNavigate, useLocation } from "react-router-dom";

function Home() {

    const [courseParams, setCourseParams] = useState([])
    const [formInput, setFormInput] = useState({search: ''})

    const navigate = useNavigate()

    useEffect(() => {
        api.get('/cursos').then(res => {
            let parametrosCursos = (res.data[0].cursos)
            setCourseParams(parametrosCursos.slice(0, 3))
        })
    }, [])

    const SearchCourse = (e) => {
        e.preventDefault()
        navigate('/cursos?search='+formInput.search)
    }


    return (
        <div className="page">
            <UbHeader />
            <Grid shadow="xl" style={{ position: 'relative', margin: '0 0 0 0' }}>
                <img src={Banner} className='footer-img' height='930px' width='100%' alt='Banner' />
                <Text
                    color={'white'}
                    shadow="xl"
                    size={50}
                    weight={700}
                    style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1, width: '1000px', textAlign: 'center'}}
                >
                    A maior plataforma de cursos online
                </Text>

                <Text
                    color={'#cccccc'}
                    shadow="xl"
                    size={40}
                    weight={600}
                    style={{ position: 'absolute', top: '57%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1 }}
                >
                    UniBrasil ACADEMY
                </Text>
            </Grid>
            <Grid container justify="center" style={{ margin: 0 }}>
                <div className="cs-page-container2">

                    <Grid justify='center' style={{ marginTop: '50px', marginBottom: '50px' }}>
                        <Text color={'#003F88'} size={40} weight={700}>
                            Cursos em alta
                        </Text>
                    </Grid>

                    <Grid container justify='center' align='center' style={{ marginBottom: '125px', width: '100%' }}>
                        {
                            courseParams.map((item, i) => (
                                <Grid key={i} justify='center' style={{ marginRight: '5%', backgroundColor: '#003F88', height: '195px', width: '320px', borderRadius: '25px', cursor: 'pointer', boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}>
                                    <a href="#">
                                        <div className="home-img-container">
                                            <img src={'http://localhost:5000/images/' + item.imagemCurso} className="home-item-img"></img>
                                        </div>
                                        {/* <Text color={'white'} size={30} weight={500} style={{ margin: 'auto' }}>
                                        Item 1
                                        </Text> */}
                                    </a>
                                </Grid>
                            ))
                        }
                    </Grid>

                    <Grid justify='center' style={{ marginBottom: '10px' }}>
                        <Text color={'gray'} size={30} weight={500}>
                            Pesquise já o curso de sua escolha!
                        </Text>
                    </Grid>

                    <div className="cs-search-div">
                        <form onSubmit={SearchCourse}>
                            <input onChange={e => setFormInput({...formInput, search: e.target.value})} className="search-input" type="text" placeholder="Pesquise seu curso..."></input>
                        </form>
                    </div>

                    <Grid justify='center' style={{ marginTop: '110px', marginBottom: '70px' }}>
                        <img src={Logo} className='footer-img' height='200px' width='350px'></img>
                    </Grid>
                </div>
            </Grid>
            <Footer />
        </div>
    )
}

export default Home;