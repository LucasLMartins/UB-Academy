import * as React from 'react';
import { Header, Text, Avatar, Anchor, Grid } from '@mantine/core';
import Logo from '../Pages/Images/ublogoWhite.png';

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
        <Grid style={{marginTop: 25, marginLeft: 300}}>
          <Avatar radius="xl" />
        </Grid>
      </Grid>
    </Header>
  );
}