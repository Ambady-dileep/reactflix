import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import Cards_data from '../../assets/cards/Cards_data'
import {Link} from "react-router-dom"

const TitleCards = ({title, category}) => {
    const cardsRef = useRef();

    const [apiData, setApiData] = useState([]);
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OGI1ZDEwZjc4OTE0NTM2ODg0M2U1ZWNmYzA3NGNkZiIsIm5iZiI6MTc2MjY3MTQzNy4zMDIsInN1YiI6IjY5MTAzYjRkNzAwNDhkODJlYzlhYmQ0ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-L79kPiprq3pot70jtRqKFwhFUbngM6eW5bI-bFlpGo'
        }
    };


    const handleWheel = (event) =>{
        event.preventDefault();
        cardsRef.current.scrollLeft += event.deltaY;
    }

    useEffect(()=>{

        fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
        .then(res => res.json())
        .then(res => setApiData(res.results))
        .catch(err => console.error(err));

        cardsRef.current.addEventListener('wheel', handleWheel);
    },[])
    return (
        <div className="title-cards">
            <h2>{title?title:"Popular on Netflix"}</h2>
            <div className='card-list' ref={cardsRef}>
                {apiData.map((card, index)=>{
                    return <Link to={`/player/${card.id}`} className="card" key={index}>
                        <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
                        <p>{card.original_title}</p>
                    </Link>
                })}
            </div>
        </div>
    )
}

export default TitleCards;