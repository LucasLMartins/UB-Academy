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
        <Grid container justify="center">
            <div className="cs-page-container2">
                <Grid justify='center' style={{ marginBottom: "50px" }}>
                    <Text align="center" size={40} weight={700}>
                        Entre em contato conosco
                    </Text>
                </Grid>

                <Grid justify='center' style={{marginBottom: '20px'}} >
                    <img src={CostumerSupport} className='footer-img' height='80%' width='80%' alt='Banner'/>
                </Grid> 

                <Grid container justify='center' align='center' style={{ marginBottom: '100px', width: '100%' }}>
                    <Grid justify='center'  style={{ marginRight: '4%', backgroundColor: '#003F88', height: '200px', width: '300px', borderRadius: '25px'}}>
                        <IconMapPin size={70} style={{marginTop: '10%', color: "white"}}/>
                        <Text color={'white'} size={22} weight={500} style={{margin: 'auto', marginLeft: '10px'}}>
                        123 Rua das Flores, Tarumã, Curitiba - PR, Brasil
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

                <Grid justify='center' style={{backgroundColor: '#003F88', width: '100%', borderRadius: '25px', paddingTop: '3%', marginBottom: '50px'}}>
                    <img src={Map} className='footer-img' height='95%' width='95%' alt='Banner' />
                </Grid>
            </div>
        </Grid>
        <Footer />
    </div>
  );
};

export default Suporte;