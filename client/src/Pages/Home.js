import { useState, useEffect } from "react";
import { Grid, Text, Image, Button } from '@mantine/core';
import '../styles/home.css';
import UbHeader from "../Components/Header"
import Footer from "../Components/Footer";
import Logo from '../Pages/Images/UBlogo_alpha.png';
import Banner from '../Pages/Images/Banner.png';
// import api from '../api.js'

function Home() {

    // const [parametros, setParametros] = useState([])

    // useEffect(() => {
    //     api.get('/home').then(res => {
    //         let teste = (res.data)
    //         setParametros(teste)
    //     })
    // }, [])


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
                        <Grid justify='center' style={{ marginRight: '6%', backgroundColor: '#003F88', height: '200px', width: '250px', borderRadius: '25px' }}>
                            <Text color={'white'} size={30} weight={500} style={{ margin: 'auto' }}>
                                Item 1
                            </Text>
                        </Grid>
                        <Grid justify='center' style={{ marginRight: '6%', backgroundColor: '#003F88', height: '200px', width: '250px', borderRadius: '25px' }}>
                            <Text color={'white'} size={30} weight={500} style={{ margin: 'auto' }}>
                                Item 2
                            </Text>
                        </Grid>
                        <Grid justify='center' style={{ backgroundColor: '#003F88', height: '200px', width: '250px', borderRadius: '25px' }}>
                            <Text color={'white'} size={30} weight={500} style={{ margin: 'auto' }}>
                                Item 3
                            </Text>
                        </Grid>
                    </Grid>

                    <Grid justify='center' style={{ marginBottom: '10px' }}>
                        <Text color={'gray'} size={30} weight={500}>
                            Pesquise já o curso de sua escolha!
                        </Text>
                    </Grid>

                    <div className="cs-search-div">
                        <input className="search-input" type="text" placeholder="Pesquise seu curso..."></input>
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