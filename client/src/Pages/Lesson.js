import React from "react";
import { useState, useEffect } from "react";
import '../styles/lesson.css';
import Header from "../Components/Header"
import Footer from "../Components/Footer";
import ReactPlayer from 'react-player'
// import api from '../api.js'

function Lesson() {



    return (
        <div className="page">
            {/* <Header /> */}
            <div className="les-page-container">
                <div className="les-left-div">
                    <div className="les-left-top-div">
                        <a href="/perfil" className="return-div">
                            <img src={require('./Images/arrowLeft.png')}></img>
                        </a>
                        <div className="les-left-top-title">
                            <h2 className="les-title">Curso de Banco de Dados</h2>
                            <h3 className="les-subtitle">Introdução ao curso</h3>
                        </div>
                        
                    </div>
                    <div className="les-video-div">
                        <ReactPlayer
                            className=''
                            width="100%"
                            height="100%"
                            url= 'https://www.youtube.com/watch?v=CQmX6GcpyvE&list=PLUae-M0w5U8dpoTgg15G2o2ypnCGoWXAU&ab_channel=Prof.FabioE.Santos'
                            controls = {true}
                        />
                    </div>
                    <div className="les-bottom-div">

                    </div>
                </div>

                <div className="les-right-div">
                    <div className="les-course-title">
                        <h3>Curso de Banco de Dados</h3>
                    </div>
                    <div className="les-lessons">
                        <div className="les-lesson-container">
                            <img className="play-icon" src={require('./Images/playArrow2.png')}></img>
                            <h4>Introdução ao curso</h4>
                        </div>
                        <div className="les-lesson-container les-lesson-selected">
                            <img className="play-icon" src={require('./Images/playArrow2.png')}></img>
                            <h4>Aula 1</h4>
                        </div>
                        <div className="les-lesson-container">
                            <img className="play-icon" src={require('./Images/playArrow2.png')}></img>
                            <h4>Aula 2</h4>
                        </div>
                    </div>
                </div>
            </div>

            {/* <Footer /> */}
        </div>
    )

}

export default Lesson;