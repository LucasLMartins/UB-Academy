import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import '../styles/lesson.css';
import ReactPlayer from 'react-player'


function Lesson() {

    const [lessonsParams, setLessonsParams] = useState([])
    const [lessonParams, setLessonParams] = useState([])
    const [courseParams, setCourseParams] = useState([])

    const navigate = useNavigate();
    const useQuery = () => new URLSearchParams(useLocation().search);
    const query = useQuery();
    let Aid = query.get('Aid');
    let Cid = query.get('Cid');

    useEffect(() => {
        fetchLesson({idAula: Aid, idCurso: Cid})
    }, [Aid, Cid])

    async function fetchLesson(id) {
        fetch('http://localhost:5000/aula', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(id)
        })
            .then((res) => res.json())
            .then((data) => {
                setLessonsParams(data[0].aulas)
                setCourseParams(data[0].curso[0])
                setLessonParams(data[0].aula[0])
            })
    }

    function selectLesson() {
        document.getElementById('les-lesson'+lessonParams.idAula).style.backgroundColor = 'hsl(0deg 0% 10.2%)'
    }


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
                            <h2 className="les-title">{courseParams.nomeCurso}</h2>
                            <h3 className="les-subtitle">{lessonParams.tituloAula}</h3>
                        </div>
                        
                    </div>
                    <div className="les-video-div">
                        <ReactPlayer
                            className=''
                            width="100%"
                            height="100%"
                            url= {'http://localhost:5000/videos/'+lessonParams.video}
                            controls = {true}
                        />
                    </div>
                    
                    <div className="les-bottom-div">
                    </div>
                </div>

                <div className="les-right-div">
                    <div className="les-course-title">
                        <h3>{courseParams.nomeCurso}</h3>
                    </div>
                    <div className="les-lessons" onLoad={() => selectLesson()}>
                        {
                            lessonsParams.map((item, i) => (
                                <div key={i}> 
                                    <a href={'/aula?Aid='+item.idAula+'&Cid='+courseParams.idCurso}>
                                        <div id={'les-lesson' + item.idAula} className="les-lesson-container">
                                            <img className="play-icon" src={require('./Images/playArrow2.png')}></img>
                                            <h4>{item.tituloAula}</h4>
                                        </div>
                                        <div className="lesson-container-bottom"></div>
                                    </a>
                                </div>

                            ))
                        }
                    </div>
                </div>
            </div>

        </div>
    )

}

export default Lesson;