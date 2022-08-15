import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import CardSlider from "../components/CardSlider";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import SelectGenre from "../components/SelectGenre";
import Slider from "../components/Slider";
import NotAvailable from "../components/NotAvailable";

function MoviePage() {


  const [isScrolled, setIsScrolled] = useState(false);
  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ genres, type: "movie" }));
    }
  }, [genresLoaded]);

  const [user, setUser] = useState(undefined);


  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  console.log(movies);

  return (
    <Container>
      <div className="navbar">
        <Navbar isScrolled={isScrolled} />
      </div>
      <div className="data">
        <SelectGenre genres={genres} type="movie" />


        <div className="row" style={{display:"flex"}}>
          {
            movies.map(movie =>
              <div className="col-md-3 col-sm-4 col-xs-6" key={movie.id} style={{cursor:"pointer"}} onClick={e=> navigate(`/movie-details/${movie.name}`)}>
                <div className="card" style={{ width: "300px", margin:"12px" }} >
                  <img style={{width:"100%",height:"250px"}} src={`https://image.tmdb.org/t/p/w500${movie.image}`} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title" style={{color:"#e50815",textAlign:"center"}}><b>{movie.name.slice(0,10)}</b> <br/>{movie.genres[0]}</h5>
                  </div>
                </div>
              </div>

            )
          }

        </div>






      </div>
    </Container>
  );
}

const Container = styled.div`
  .data {
    margin-top: 8rem;
    .not-available {
      text-align: center;
      color: white;
      margin-top: 4rem;
    }
  }
`;
export default MoviePage;
