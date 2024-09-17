import React from 'react';
import { MovieCard } from '../movie-card/movie-card';


function MoviesList(props) {
    const { movies } = props;
    return movies.map(m => (
      <MovieCard movieData={m} key={m._id}/>
    ));
}

export default MoviesList;