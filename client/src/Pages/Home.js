import { useState, useEffect } from "react";
import '../styles/home.css'
import api from '../api.js'

function Home() {

    const [parametros, setParametros] = useState([])

    useEffect(() => {
        api.get('/home').then(res => {
            let teste = (res.data)
            setParametros(teste)
        })
    }, [])

    console.log(parametros)

    


    return (
        <div className="sei la">
            <h1>textooo</h1>
            <h2>{parametros[0].teste}</h2>

        </div>
    )
}

export default Home;