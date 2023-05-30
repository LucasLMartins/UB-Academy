import Header from "../Components/Header"
import Footer from "../Components/Footer";
import '../styles/courseIndex.css';
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import React from "react";


function CourseIndex() {
    //const [courseId, setCourseId] = useState({ idCurso: '' })
    const [courseParams, setCourseParams] = useState([])

    const navigate = useNavigate();
    const useQuery = () => new URLSearchParams(useLocation().search);
    const query = useQuery();
    const id = query.get('id');
    
    useEffect(() => {
        fetchCourse({idCurso: id})
    }, [id])

    async function fetchCourse(id) {
        fetch('http://localhost:5000/curso', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(id)
        })
            .then((res) => res.json())
            .then((data) => {
                setCourseParams(data[0].curso[0])
            })

    }

    return (
        <div>
            <Header />
            <div className="ci-main">
                <div className="ci-">
                    <p>aaaa</p>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default CourseIndex;