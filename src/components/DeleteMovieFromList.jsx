import React, { useEffect, useRef, useState } from 'react'
import deleteButton from '../lottie/deleteButton.json'
import lottie from 'lottie-web';
import { connect } from 'react-redux';
import { updateLists } from '../redux/actions';
import { removeMovieFromList } from './api';
import { useHistory, useLocation } from 'react-router-dom';

const classNames = require('classnames')

const DeleteMovieFromList = ({session_id, media_id, list_id, updateLists}) => {
  const [lottieAnim, setLottieAnim] = useState({})
  const animation = useRef(null)
  const [theFirstPlay, setTheFirstPlay] = useState(true);
  const [deleted, setDeleted] = useState(false);

  const history = useHistory();
  const location = useLocation();
  const [isPressed, press] = useState(false)
  
  useEffect(() => {
    if(location.hash === '#action_submited' && isPressed) {
      removeMovieFromList(list_id, media_id, session_id).then(() => {
        console.log('trying to remove')
        updateLists(session_id)
      })
  
      history.push({hash: '#'})
      press(false)
    }
  }, [location, isPressed])

  useEffect(() => {
    setLottieAnim(lottie.loadAnimation({
      container: animation.current,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      animationData: JSON.parse(JSON.stringify(deleteButton))
    }))
    // if(lottieAnim.setSpeed) {
    //   lottieAnim?.setSpeed(2.5)
    // }
  }, [])
  useEffect(() => {
    if(lottieAnim.playSegments && theFirstPlay) {
      lottieAnim.playSegments([1, 2], true)
      setTheFirstPlay(false)
    }
  }, [lottieAnim])


  return (
    <div
      onMouseEnter={() => {
        if(lottieAnim.playSegments) {
          lottieAnim.playSegments([0, 5], true)
        }
      }}

      onMouseLeave={() => {
        if(lottieAnim.playSegments && !deleted) {
          lottieAnim.playSegments([1, 2], true)
        }
      }}

      onMouseDown={() => {
        if(lottieAnim.playSegments) {
          lottieAnim.playSegments([5, 18], true)
        }
      }}

      onMouseUp={() => {
        if(lottieAnim.playSegments) {
          lottieAnim.playSegments([18, 32])
          setDeleted(true)
        }
      }}
      onClick={() => {
        history.push({hash: '#conf-window'})
        press(true)
      }}
      className="addToWatchListButton"
      ref={animation}
    >
    </div>
  )
}

export default connect(
  (state) => ({
    session_id: state.session.session,
  }),
  {updateLists}
)(DeleteMovieFromList)
