import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovies, getGenres } from "../store";
import { useSelector, useDispatch } from "react-redux";
import SelectGenre from "../components/SelectGenre";

function MovieDetailView() {

    const dispatch = useDispatch();
    const movies = useSelector((state) => state.netflix.movies);
    const genres = useSelector((state) => state.netflix.genres);
    const genresLoaded = useSelector((state) => state.netflix.genresLoaded);

    const { id } = useParams();
    const [currentId, setCurrentId] = useState(id)
    console.log(currentId);


    const currentMovie = movies.find(element => element.name == currentId)

    console.log(currentMovie);

    useEffect(() => {
        dispatch(getGenres());
    }, []);

    useEffect(() => {
        if (genresLoaded) {
            dispatch(fetchMovies({ genres, type: "movie" }));
        }
    }, [genresLoaded]);



    return (
        <div class="container text-center">
            <div class="row">
                <div class="col-12">
                    <img style={{width:"100%"}} src={`https://image.tmdb.org/t/p/w500${currentMovie.image}`}/>
                </div>
                
            </div>

            <div class="row">
                <div class="col-12">
                    <h1>
                        {currentMovie.name}
                    </h1>
                </div>

                <div class="col-12">
                    {
                        currentMovie.genres.map(element=>

                            <h3>
                            {element}
                        </h3>
                            )
                    }
                   
                </div>
                
            </div>
        </div>
    );
}



export default MovieDetailView;
