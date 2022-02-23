import React, { useEffect, useRef, useState } from 'react'
import addMoviesToList from '../lottie/addMoviesToList.json'
import lottie from 'lottie-web';
import { connect } from 'react-redux';
import { addToWatchlist, getWatchlist } from './api';
import { updateWatchlist } from '../redux/actions';
import { Link } from 'react-router-dom';
import { AddMoviesToListWindow } from './AddMoviesToListWindow';

const classNames = require('classnames')

const AddMoviesToList = ({session_id, accInfo, media_id, media_type, watchlist, updateWatchlist}) => {
  const [active, setActive] = useState(false);
  const [lottieAnim, setLottieAnim] = useState({})
  const animation = useRef(null)
  const [theFirstPlay, setTheFirstPlay] = useState(true);

  useEffect(() => {
    setLottieAnim(lottie.loadAnimation({
      container: animation.current,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      animationData: JSON.parse(JSON.stringify(addMoviesToList))
    }))
    if(lottieAnim.setSpeed) {
      lottieAnim?.setSpeed(2.5)
    }
  }, [])
  useEffect(() => {
    if(lottieAnim.playSegments && theFirstPlay) {
      lottieAnim?.playSegments([0, 1], true)
      setTheFirstPlay(false)
    }
  }, [lottieAnim])

  return (
    <>
      <div
        onMouseEnter={() => {
          if(lottieAnim.playSegments) {
            lottieAnim.playSegments([1, 59], true)
          }
        }}
        onMouseLeave={() => {
          if(lottieAnim.playSegments) {
            lottieAnim.playSegments([0, 1], true)
          }
        }}
        onMouseDown={() => {
          if(lottieAnim.playSegments) {
            lottieAnim.playSegments([59, 91], true)
          }
        }}
        onMouseUp={() => {
          if(lottieAnim.playSegments) {
            lottieAnim.playSegments([0, 1], true)
          }
        }}
        onClick={() => {
          setActive(!active)
          addToWatchlist({session_id, account_id: accInfo.id, media_type, media_id, watchlist: active})
          .then(() => {
            updateWatchlist(session_id)
          })
        }}
        className="lists-page__add-movies-to-list-button"
      >
        <div
          className="add-movies-to-list"
          ref={animation}
        />
      </div>
      {active && <AddMoviesToListWindow setActive={setActive}/>}
    </>
  )
}

export default connect(
  (state) => ({
    session_id: state.session.session,
    accInfo: state.session.accInfo,
    watchlist: state.session.watchlist
  }),
  {updateWatchlist}
)(AddMoviesToList)
