import React, { useEffect, useRef } from 'react'
import { getMovieImg } from './api'
import { useHistory } from 'react-router';
import AddToWatchListButton from './AddToWatchListButton';
import { connect } from 'react-redux';
import { Picture } from './Picture';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import DeleteMovieFromList from './DeleteMovieFromList';
import { random } from 'lodash';

const classNames = require("classnames");

const ListElement = ({ media, genres, list_id}) => {
  const history = useHistory();
  const {ref, inView} = useInView()
  const animation = useAnimation();
  const deleteLottie = useRef(null)

  useEffect(() => {
    
  })

  useEffect(() => {
    if(inView) {
      animation.start({
        scale: 1,
      })
    } else {
      animation.start({
        scale: 0.4,
      })
    }
  }, [inView])
  return (
    <div style={{heigth: 'max-size', width: '100%'}}>
      <motion.div
        key={`${list_id}-${media.id}`}
        // initial={{scale: 0.1}}
        ref={ref}
        animate={animation}
        className={classNames("list-card")}
      >
        <div
          onClick={() => {
            history.push(`/${media.media_type}/${media.id}`)
            window.location.reload();
          }}
          className="list-card__img"
        >
          <Picture picture_path={media.poster_path}/>
        </div>
        <div className="list-card__title">
          {media.title}
        </div>
        {/* <div className="watchlist__remove-from-watchlist-block">
          <AddToWatchListButton media_id={movie.id} media_type={media_type} />
        </div> */}
        <div className="list-card__action-button-container">
          <div ref={deleteLottie} className="list-card__delete-button">
            <DeleteMovieFromList media_id={media.id} list_id={list_id}/>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default connect((state) => ({genres: state.session.genres}))(ListElement)