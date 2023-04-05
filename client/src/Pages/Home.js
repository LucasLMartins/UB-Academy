import { useState, useEffect } from "react";
import '../styles/home.css';
import Header from "../Components/Header"
import Footer from "../Components/Footer";
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
            <Header />
            <div className="page-container">
                <h1>textooo</h1>
                <h2>teste</h2>
            </div>
            <Footer />
        </div>

    )
}

export default Home;