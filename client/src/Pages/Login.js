import UbHeader from "../Components/Header"
import Footer from "../Components/Footer";
import { useState, useEffect, useContext } from "react";
import '../styles/home.css';
import '../styles/profile.css';
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Contexts/auth";


function Login() {
    const { authenticated, login } = useContext(AuthContext);
    const [registerUserState, setRegisterUserState] = useState({ nomeUsuario: '', emailUsuario: '', password: '' })
    const navigate = useNavigate();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        if(authenticated === true){
            navigate("/perfil")
        }
    })

    const useQuery = () => new URLSearchParams(useLocation().search);
    const query = useQuery();
    const page = query.get('page');

    const handleSubmit = (e) => {
        e.preventDefault()
        //console.log("submit", { email, password })
        login(email, password)
    }

    const registerUser = async (e) => {
        if (registerUserState.nomeUsuario !== '' && registerUserState.emailUsuario !== '' && registerUserState.password !== '') {
            // insert no mysql
            fetch('http://localhost:5000/registerUser', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(registerUserState)
            })
                .then((response) => response.json())
                .then((result) => {
                    if(result[0].msg === false){
                        if(result[0].erro.code === 'ER_DUP_ENTRY'){
                            window.alert('Já existe um usuário com esse e-mail cadastrado, tente outro.')
                        }
                        else {
                            window.alert('Ocorreu um erro, usuário não cadastrado.')
                            navigate(0)
                        }
                    }
                    else {
                        window.alert('Usuário cadastrado! Entre com sua conta.')
                        navigate('/login')
                    }
                })
        }
        else {
            window.alert('Preencha todos os campos!')
        }
    }


    if (page === 'cadastro') return (
        <div className="profile-page">
            <UbHeader />
            <div className="profile-content">
                <div className="profile-register-card">
                    <div className="profile-login-card-top">
                        <h1>Bem vindo,<br></br> cadastre sua conta</h1>
                    </div>
                    <div className="profile-login-card-fields">
                        <div>
                            <p className="profile-login-inputs-title">Nome</p>
                            <input type="text" onChange={e => setRegisterUserState({ ...registerUserState, nomeUsuario: e.target.value })} className="profile-login-inputs" placeholder="John Dev" style={{ marginBottom: '20px' }}></input>
                        </div>
                        <div>
                            <p className="profile-login-inputs-title">E-mail</p>
                            <input type="text" onChange={e => setRegisterUserState({ ...registerUserState, emailUsuario: e.target.value })} className="profile-login-inputs" placeholder="exemplo@email.com" style={{ marginBottom: '20px' }}></input>
                        </div>
                        <div>
                            <p className="profile-login-inputs-title">Senha</p>
                            <input type="password" onChange={e => setRegisterUserState({ ...registerUserState, password: e.target.value })} className="profile-login-inputs" placeholder="**********"></input>
                        </div>
                    </div>
                    <div className="profile-login-card-buttons" style={{ justifyContent: 'center', marginTop: '40px' }}>
                        <button className="profile-login-buttons" onClick={registerUser}>Cadastrar</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )

    return (
        <div className="profile-page">
            <UbHeader />
            <div className="profile-content">
                <div className="profile-login-card">
                    <form onSubmit={handleSubmit}>
                        <div className="profile-login-card-top">
                            <h1>Bem vindo,<br></br> entre com sua conta</h1>
                        </div>
                        <div className="profile-login-card-fields">
                            <div style={{ marginBottom: '20px' }}>
                                <p className="profile-login-inputs-title">E-mail</p>
                                <input type="email" name="email" id="loginEmail" className="profile-login-inputs" placeholder="Digite o e-mail"
                                value={email} onChange={(e) => setEmail(e.target.value)} ></input>
                            </div>
                            <div>
                                <p className="profile-login-inputs-title">Senha</p>
                                <input type="password" name="password" id="loginPassword" className="profile-login-inputs" placeholder="Digite a senha"
                                value={password} onChange={(e) => setPassword(e.target.value)} ></input>
                            </div>
                            
                        </div>
                        <div className="profile-login-card-buttons">
                            <button className="profile-login-buttons" type="submit">Entrar</button>
                            <a href="/login?page=cadastro">
                                <button type="button" className="profile-login-buttons" style={{ backgroundColor: 'white', color: '#003F88' }}>Cadastrar</button>
                            </a>
                            
                        </div>
                    </form>
                    
                </div>
                
            </div>
            <Footer />
        </div>
    )
}

export default Login;