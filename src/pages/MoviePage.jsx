import React, { useEffect, useState } from 'react'
import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import { getCredits, getCrew, getMovieImg, getMoviesById, getReviews, getSimilar, getTrailer } from '../components/api';
import {MoviesSlider} from '../components/MoviesSlider'
import AddToWatchListButton from '../components/AddToWatchListButton';

import { motion } from 'framer-motion';
import { connect } from 'react-redux';
import MarkAsFavoriteButton from '../components/MarkAsFavoriteButton';
import { Picture } from '../components/Picture';
import AddToListButton from '../components/AddToListButton';
import { translate } from '../components/translate';
import { Review } from '../components/Review';

const MoviePage = ({accInfo}) => {
  console.log('перейшов')
  const match = useRouteMatch("/:mediaType/:mediaId");
  const [cast, setCast] = useState([])
  const [trailer, setTrailer] = useState([])
  const [crew, setCrew] = useState([])
  const [movie, setMovie] = useState({});
  const [similar, setSimilar] = useState([]);
  const [reviews, setReviews] = useState([]);
  // const location = useLocation();
  const mediaType = match.params.mediaType
  const mediaId = match.params.mediaId

  // console.log(accInfo)

  useEffect(() => {
    getTrailer(mediaId, mediaType).then((response) => { setTrailer(response[0]?.key) })
    getCrew(mediaId, mediaType).then((response) => { setCrew(response.reverse()) })
    getCredits(mediaId, mediaType).then((response) => { setCast(response.reverse()) })
    getMoviesById(mediaId, mediaType).then((response) => { setMovie(response) })
    getSimilar(mediaId, mediaType).then((response) => { setSimilar(response.reverse()) })
    getReviews(mediaId, mediaType).then((response) => { setReviews(response) })
  }, [mediaId, mediaType])

  useEffect(() => {
    // window.scrollTo(0, 0);
  }, [match])

  return (
    <div className="page">
      <div className="container">
        <div className="movie-page">
          <section className="page__section grid grid--desktop">
            <motion.div
              initial={{opacity: 0, translateX: -100}}
              animate={{opacity: 1, translateX: 0}}
              transition={{ duration: 0.5}}
              className="movie-page__poster grid__item--1-4"
            >
              <div className="movie-page__poster-img">
                <Picture mediaType={mediaType} picture_path={movie.poster_path}/>
              </div>
            </motion.div>
            <div className="page__description grid__item--5-12 grid--desktop">
              <motion.div
                initial={{opacity: 0, translateX: -200}}
                animate={{opacity: 1, translateX: 0}}
                transition={{ duration: 0.7}}
                className="grid"
              >
                <div key="poster" className="grid__item--1-12 movie-page__title">
                  {movie?.title}
                  <div className="movie-page__media-type">{movie.media_type}</div>
                </div>
                <div key="selected-movie-description" className="movie-page__votes grid__item--1-12">
                  rating: <span className="movie-page__votes-value">{movie?.vote_average}</span>
                </div>
                <div key="selected-movie-overview" className="movie-page__overview grid__item--1-12">
                  {movie.overview}
                </div>
                <div key="selected-movie-genres" className="movie-page__genres-list grid__item-1-12">
                  {movie.genres?.map(({name}) =>
                    <div className="movie-page__genre">
                      {name}
                    </div>
                  )}
                </div>
                {movie.belongs_to_collection &&
                  <div key="selected-movie-collection" className="grid__item--1-12">
                    collection:
                    <Link className="movie-page__action-title-link" to={`/collections/${movie.belongs_to_collection.id}`}>
                      {movie.belongs_to_collection.name}
                    </Link>
                  </div>
                }
                <div key="selected-movie-action-buttons" className="grid__item--1-12">
                  <div className="movie-page__action">
                    {accInfo.id && 
                      <>
                        <AddToWatchListButton
                          media_id={mediaId}
                          media_type={mediaType}
                        />
                        <MarkAsFavoriteButton
                          media_id={mediaId}
                          media_type={mediaType}
                        />
                        {mediaType === 'movie' &&
                          <AddToListButton
                            media_id={mediaId}
                            media_type={mediaType}
                          />
                        }
                      </>
                    }
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
          <section className="page__section">
            <div className="movie-page__trailer">
              <iframe
                title="trailer"
                className="movie-page__video"
                src={`https://www.youtube.com/embed/${trailer}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </section>
          <section className="page__section">
            <div className="reviews-section">
              {reviews.length > 0 &&
                <div className="reviews-section__title">
                  {translate({
                    'en': "Reviews",
                    "uk": 'Відгуки'
                  })}
                </div>
              }
                {
                  reviews.map((review) => (
                      <Review review={review}/>
                  ))
                }
            </div>
          </section>
          <section className="page__section">
            {cast.length > 0
              ?
                <>
                  <div className="page__title">
                    {translate({
                      'en': "Cast",
                      "uk": 'Акторський склад'
                    })}
                  </div>
                  <MoviesSlider key="cast-slider" peopleList={cast} />
                </>
              : ''
            }
          </section>
          <section className="page__section">
            {crew.length > 0
              ?
                <>
                  <div className="page__title">
                    {translate({
                      'en': "Crew",
                      "uk": 'Знімальна група'
                    })}
                  </div>
                  <MoviesSlider key="crew-slider" peopleList={crew} />
                </>
              : ''
            }
          </section>
          <section className="page__section">
            <div className="page__title">
              {translate({
                'en': "Similar",
                "uk": 'Схоже'
              })}
            </div>
            <MoviesSlider key="similar-slider" moviesList={similar} />
          </section>
        </div>
      </div>
    </div>
  )
}

export default connect((state) => ({accInfo: state.session.accInfo}))(MoviePage)