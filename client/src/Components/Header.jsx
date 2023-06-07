import * as React from 'react';
import { Header, Text, Grid } from '@mantine/core';
import Logo from '../Pages/Images/ublogoWhite.png';
import { IconUserCircle } from '@tabler/icons-react';
//import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

export default function UbHeader() {
  //const [opened, { open, close }] = useDisclosure(false);

  //const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem("user") !== null){
      showProfile()
    }
  })

  // const form = useForm({
  //   initialValues: {
  //     email: '',
  //     senha: '',
  //     termosDeServico: false,
  //   },

  //   validate: {
  //     email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email inválido.'),
  //     senha: (value) => ((value) ? null : 'Senha inválida.')
  //   },
  // });


  function showProfile() {
    document.getElementById('iconUserCircle').style.display = 'flex';
    document.getElementById('HeaderUserLoginDiv').style.display = 'none';
  }

  return (
    <>

      <Header
        style={{ backgroundColor: '#003F88', position: 'fixed', border: '0', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}
        shadow="sm"
        height={100}
      >
        <Grid
          style={{ paddingTop: 15, margin: '-10px 0 0 0'}}
          container
          spacing={0}
          justify="center">
          <Grid style={{ marginTop: 4, marginRight: '15%' }} onClick={() => showProfile()}>
            <img alt='ub-logo' src={Logo} className='footer-img' height='80px' width='100px'></img>
          </Grid>
          <a href="/" style={{ marginRight: 75, marginTop: '5px', width: '142px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} className='headerOptionsDiv'>
            {/* <h3 className='headerOptionsText'>Home</h3> */}
            <Text color={'white'}  size={50} weight={700} className='headerOptionsText'>
              Home
            </Text>
          </a>
          <a href="/cursos" style={{ marginRight: 75, marginTop: '5px', width: '157px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} className='headerOptionsDiv'>
            <Text color={'white'} size={50} weight={700} className='headerOptionsText'>
              Cursos
            </Text>
          </a>
          <a href="/suporte" style={{ marginTop: '5px', width: '188px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} className='headerOptionsDiv'>
            <Text color={'white'} size={50} weight={700} className='headerOptionsText'>
              Suporte
            </Text>
          </a>
          <Grid style={{ marginTop: 3, marginLeft: '15%' }}>
            <a href='/perfil' id='iconUserCircle' style={{ height: '85px', width: '85px', display: 'none', justifyContent: 'center', alignItems: 'center'}}>
              <IconUserCircle id='headerProfileIcon' onMouseOver={() => document.getElementById('headerProfileIcon').style.width = '75px'} onMouseOut={() => document.getElementById('headerProfileIcon').style.width = '85px'} size={85} style={{ color: "white", cursor: 'pointer', transition: '0.2s' }} />
            </a>
            
            <div id='HeaderUserLoginDiv' style={{ display: 'flex', alignItems: 'center' }}>
              <a href='/login' style={{ height: '55px', width: '110px' }}>
                <button className='headerLoginButton' >Entrar</button>
              </a>
            </div>
          </Grid>
        </Grid>
      </Header>
    </>
  );
}