import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { API_ENDPOINT } from './context'

const SingleMovie = () => {

  const {id} = useParams()
  console.log(id);
   const [loading, setLoading] = useState(true);
   const [error, setIsError] = useState({ show: false, msg: "" });
   const [movies, setMovies] = useState({});

   const fetchMovie = async(url)=>{
    const response = await fetch(url);
    const data = await response.json();
   console.log(data);
   if(data.Response === "True"){
    setMovies(data);
    setLoading(false)
   }else{
    setIsError({show:true , msg: "data.Error"});
    setLoading(false)
    
   }
   }
   useEffect(()=>{
    fetchMovie(`${API_ENDPOINT}&i=${id}`);
   } ,[id])
   if(loading){
    return <div className='loading'></div>
   }
   if(error.show){
    return <div className='page-error'>
    <h1>{error.msg}</h1>
    <Link to="/" className='btn'>back to home</Link>
   </div>
   }
   const {Poster : poster ,Title : title , Year : year ,Plot : plot} = movies
  return <section className="single-movie">
    <img src={poster} alt={title}/>
    <div className="single-movie-info">
      <h2>{title}</h2>
      <p>{plot}</p>
      <h4>{year}</h4>
      <Link to ="/" className='btn'>back to home</Link>
    </div>
  </section>
}

export default SingleMovie
