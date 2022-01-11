import React, { useEffect, useRef, useState } from 'react'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PersonCard } from './PersonCard';
import MovieCard from './MovieCard';
import { motion, useAnimation, useTrnsform, useViewportScroll } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const classNames = require('classnames');

export const MoviesSlider = ({moviesList = [], peopleList = []}) => {
  const slider = useRef(null);
  const {ref, inView} = useInView()
  const animation = useAnimation();

  useEffect(() => {
    if(inView) {
      animation.start({
        scaleX: 1
      })
    } else {
      animation.start({
        scaleX: 0
      })
    }
  }, [inView])

  return (
    <motion.div
      ref={ref}
      animate={animation}
      className={classNames("movies-slider", {"movies-slider--disabled": [...moviesList, ...peopleList].length === 0})}
    >
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
              <PersonCard key={person.id} person={person} />
            </div>
          ))}
          {!!moviesList ? moviesList?.map((movie, index) => (
            <div>
              <MovieCard key={movie.id} last={index === 0} movie={movie} />
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
    </motion.div>
  )
}