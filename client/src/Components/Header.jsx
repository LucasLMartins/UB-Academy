import * as React from 'react';
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { TextInput, Checkbox, Button, Group, Modal, Header, Text, Anchor, Grid } from '@mantine/core';
import Logo from '../Pages/Images/ublogoWhite.png';
import { IconUserCircle } from '@tabler/icons-react';

export default function UbHeader() {
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      email: '',
      senha: '',
      termosDeServico: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email inválido.'),
      senha: (value) => ((value) ? null : 'Senha inválida.')
    },
  });

  return (
    <>
      <Modal opened={opened} onClose={close} title="Login" centered xOffset={0}>
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <TextInput
            withAsterisk
            label="Email"
            placeholder="exemplo@email.com"
            {...form.getInputProps('email')}
          />

          <TextInput
            withAsterisk
            label="Senha"
            placeholder="exemplo123"
            {...form.getInputProps('senha')}
          />

          <Checkbox
            mt="md"
            label="Eu concordo com todos os termos de serviço."
            {...form.getInputProps('termsOfService', { type: 'checkbox' })}
          />

          <Group position="right" mt="md">
            <Button style={{ backgroundColor: '#003F88' }} type="submit">Confirmar</Button>
          </Group>
        </form>
      </Modal>

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
          <Grid style={{ marginTop: 4, marginRight: 300 }}>
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
          <Grid style={{ marginTop: 10, marginLeft: 300 }}>

            <IconUserCircle onClick={open} size={70} style={{ color: "white" }} />
          </Grid>
        </Grid>
      </Header>
    </>
  );
}