import { useState, useEffect } from "react";
import { Text, Grid, Anchor } from "@mantine/core";
import '../styles/home.css';
import UbHeader from "../Components/Header"
import Footer from "../Components/Footer";
import CostumerSupport from '../Pages/Images/CostumerSupport.jpg';
import Map from '../Pages/Images/mapa.png';
import { IconMapPin, IconMail, IconPhone } from '@tabler/icons-react';

function Suporte() {
  return (
    <div className="page">
        <UbHeader />
        <Grid container justify="center" style={{margin: '100px 0 0 0'}}>
            <div className="cs-page-container2">
                <Grid justify='center' style={{ marginBottom: "50px" }}>
                    <Text align="center" size={40} weight={700}>
                        Entre em contato conosco
                    </Text>
                </Grid>

                <Grid justify='center' style={{marginBottom: '20px'}} >
                    <img style={{ border: 'solid 5px #003F88', borderRadius: '30px' }} src={CostumerSupport} className='footer-img' height='80%' width='950px' alt='Banner'/>
                </Grid> 

                <Grid container justify='center' align='center' style={{ marginBottom: '100px', width: '100%' }}>
                    <Grid justify='center'  style={{ marginRight: '4%', backgroundColor: '#003F88', height: '200px', width: '300px', borderRadius: '25px'}}>
                        <IconMapPin size={70} style={{marginTop: '10%', color: "white"}}/>
                        <Text color={'white'} size={22} weight={500} style={{margin: 'auto', marginLeft: '10px'}}>
                        442 Rua Konrad Adenauer, Tarumã, Curitiba - PR, Brasil
                        </Text>
                    </Grid>
                    <Grid justify='center' style={{ marginRight: '4%', backgroundColor: '#003F88', height: '200px', width: '300px', borderRadius: '25px'}}>
                        <IconPhone size={70} style={{marginTop: '10%', color: "white"}}/>
                        <Text color={'white'} size={25} weight={500} style={{margin: 'auto', marginLeft: '11%', marginBottom: '7%'}}>
                        +55 (41) 3524-0020
                        </Text>
                    </Grid>
                    <Grid justify='center' style={{ backgroundColor: '#003F88', height: '200px', width: '300px', borderRadius: '25px'}}>
                        <IconMail size={70} style={{marginTop: '10%', color: "white"}}/>
                        <Text color={'white'} size={25} weight={500} style={{margin: 'auto', marginBottom: '7%'}}>
                        contato@unibrasil.com
                        </Text>
                    </Grid>
                </Grid>

                <Text color={'#003F88'} size={25} weight={700} style={{margin: 'auto', marginBottom: '20px' }}>
                    Localização
                </Text>

                <Grid justify='center' style={{textAlign: 'center', width: '100%', borderRadius: '25px', border: '5px solid #003F88', paddingTop: '0%', marginBottom: '50px'}}>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3603.403214228609!2d-49.214388587994016!3d-25.424779777471578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94dce59c9e651415%3A0x85a8d5d301a236df!2sUniBrasil%20Centro%20Universit%C3%A1rio!5e0!3m2!1spt-BR!2sbr!4v1684111748112!5m2!1spt-BR!2sbr" className="sup-map" width="100%" height="500px" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </Grid>
            </div>
        </Grid>
        <Footer />
    </div>
  );
};

export default Suporte;