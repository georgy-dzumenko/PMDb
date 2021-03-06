import React, { useEffect, useRef, useState } from 'react'
import { MovieCard } from './MovieCard';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getGenres } from './api';
import { PersonCard } from './PersonCard';

const classNames = require('classnames');

export const MoviesSlider = ({moviesList = null, peopleList = []}) => {
  const slider = useRef(null);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    getGenres().then((response) => setGenres(response));
  }, [])

  return (
    <div
      className="movies-slider"
    >
      {/* <img src={bannerMovie} className="movies-slider__banner"></img> */}
      <div
        onClick={() => {
          slider.current.scrollBy({
            left: -1 * slider.current.clientWidth * 0.9,
            behavior: "smooth"
          })
        }}
        className={classNames(["movies-slider__scroll-button", "movies-slider__scroll-button--left", {"movies-slider--disabled": moviesList || peopleList}])}
        >
        <FontAwesomeIcon icon={faChevronLeft}/>
      </div>
      <div
        ref={slider}
        className="movies-slider__tape"
      >
        <div className="movies-slider__content">
          {peopleList.map((person) => (
            <div>
              <PersonCard person={person} />
            </div>
          ))}
          {!!moviesList ? moviesList?.map((movie, index) => (
            <div>
              <MovieCard last={index === 0} movie={movie} genres={genres}/>
            </div>
          )) : ''}
        </div>
      </div>
      <div
        onClick={() => {
          slider.current.scrollBy({
            left: slider.current.clientWidth * 0.9,
            behavior: "smooth"
          })
        }}
        className="movies-slider__scroll-button movies-slider__scroll-button--right"
      >
        <FontAwesomeIcon icon={faChevronRight}/>
      </div>
    </div>
  )
}