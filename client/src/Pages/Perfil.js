import { useState, useEffect } from "react";
import { Text, Grid, Anchor } from "@mantine/core";
import { IconUserCircle, IconLogout } from '@tabler/icons-react';
import '../styles/home.css';
import UbHeader from "../Components/Header"
import Footer from "../Components/Footer";

function Perfil() {
  return (
    <div className="page">
        <UbHeader />
        <Grid justify="center" style={{margin: '0 0 0 0'}}>
            <div className="cs-page-container3">
                <Grid container style={{backgroundColor: '#003F88', borderRadius: '10px', marginTop: '5%', marginBottom: '4%', width: '100%'}} >
                    <IconUserCircle size={150} style={{ color: "white", marginLeft: '5%', marginRight: '3%'}} />
                    <Text color={'white'} size={50} weight={500} style={{marginTop: 'auto', marginBottom: 'auto'}}> 
                        Usuario Exemplo do Tal
                    </Text>
                    <IconLogout size={75} style={{ marginTop: 'auto', marginBottom: 'auto', color: "white", marginLeft: '37%', marginRight: '3%'}} />
                </Grid>

                <Text color={'black'} align='center' size={50} weight={500}> 
                    Cursos em andamento
                </Text>

                <Grid container justify='center' align='center' style={{ marginTop: '30px', marginBottom: '100px', width: '100%' }}>
                    <Grid justify='center'  style={{ marginRight: '4%', backgroundColor: '#003F88', height: '250px', width: '320px', borderRadius: '25px'}}>
                        <Text color={'white'} size={22} weight={500} style={{margin: 'auto', marginLeft: '10px'}}>
                        
                        </Text>
                    </Grid>
                    <Grid justify='center' style={{ marginRight: '4%', backgroundColor: '#003F88', height: '250px', width: '320px', borderRadius: '25px'}}>
                        <Text color={'white'} size={25} weight={500} style={{margin: 'auto', marginLeft: '11%', marginBottom: '7%'}}>
                        
                        </Text>
                    </Grid>
                    <Grid justify='center' style={{ marginRight: '4%', backgroundColor: '#003F88', height: '250px', width: '320px', borderRadius: '25px'}}>
                        <Text color={'white'} size={25} weight={500} style={{margin: 'auto', marginLeft: '11%', marginBottom: '7%'}}>
                        
                        </Text>
                    </Grid>
                    
                    <Grid justify='center' style={{ backgroundColor: '#003F88', height: '250px', width: '320px', borderRadius: '25px'}}>
                        <Text color={'white'} size={25} weight={500} style={{margin: 'auto', marginBottom: '7%'}}>
                        
                        </Text>
                    </Grid>
                    
                </Grid>

            </div>
        <Footer />
        </Grid>
    </div>
  );
};

export default Perfil;