import * as React from 'react';
import { Header, Text, Anchor, Grid } from '@mantine/core';
import Logo from '../Pages/Images/ublogoWhite.png';
import { IconUserCircle } from '@tabler/icons-react';

export default function UbHeader() {
  return (
    <Header
      style={{ backgroundColor: '#003F88'}}
      shadow="sm"  
      height={110}
    >
      <Grid
      style={{paddingTop: 15 }}       
      container
      spacing={0}
      justify="center">
      <Grid style={{marginTop: 4, marginRight: 300}}>
        <img src={Logo} className='footer-img' height='80px' width='100px'></img>
      </Grid>
        <Anchor href="/" style={{ marginRight: 25 }}>
          <Text color={'white'} size={50} weight={700}>
            Home
          </Text>
        </Anchor>
        <Anchor href="/cursos" style={{ marginRight: 25 }}>
          <Text color={'white'} size={50} weight={700}>
            Cursos
          </Text>
        </Anchor>
        <Anchor href="/suporte">
          <Text color={'white'} size={50} weight={700}>
            Suporte
          </Text>
        </Anchor>
        <Grid style={{marginTop: 10, marginLeft: 300}}>
          <IconUserCircle  size={70} style={{ color: "white"}} />
        </Grid>
      </Grid>
    </Header>
  );
}