import React, { useCallback, useEffect, useRef, useState } from 'react'
import lottie from 'lottie-web';
import { connect } from 'react-redux';
import { addMovieToList, checkItemStatus, createList, getLists, getMovieImg, getMoviesByTitle, removeMovieFromList } from './api';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import { updateLists } from '../redux/actions';
import addList from '../lottie/addList.json'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import debounce from 'lodash.debounce'
import { Picture } from './Picture';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';

const classNames = require('classnames')

export const ConfirmationWindow = ({ session_id, updateLists}) => {
  const [lottieAnim, setLottieAnim] = useState({})
  const [itemStatus, setItemStatus] = useState({})
  const [changingList, setChangingList] = useState({toBeAdded: [], toBeRemoved: []})
  const animation = useRef(null)
  const [theFirstPlay, setTheFirstPlay] = useState(true);
  const [newListData, setNewListData] = useState({});
  const location = useLocation()
  const [active, setActive] = useState(false);

  const history = useHistory();


  const [results, setResults] = useState([])

  const onSearch = useCallback(debounce((title) => {
    getMoviesByTitle(title, 'movie').then((data) => setResults((data || []).slice(0, 7)))
  }, 500), [])

  const doesMovieBelongToList = (list_id) => {
    if(changingList.toBeRemoved.some(({id}) => list_id === id)) {
      return false;      
    }
    if(changingList.toBeAdded.some(({id}) => list_id === id)) {
      return true
    }
    return itemStatus?.some(({id}) => list_id === id)
  }

  useEffect(() => {
    setLottieAnim(lottie.loadAnimation({
      container: animation.current,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      animationData: JSON.parse(JSON.stringify(addList))
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

  useEffect(() => {
    if(location.hash === '#conf-window') {
      setActive(true)
    } else {
      setActive(false)
    }
  }, [location])


  return (
    <div
      id="conf-window"
      key="conf-window"
      // exit={{opacity: 0, scale: 0, translateX: '-50%', translateY: '-50%'}}
      // transition={{ duration: 0.1}}
      className={classNames(["action-window", "action-window--for-confirmation", {"action-window--for-confirmation--active": active}])}
      
    >
      <div className="action-window__header">
        <div className="action-window__close-button" onClick={() => history.push({hash: '#'})}></div>
      </div>
      <div className="action-window__content">
        <div className="action-window__title">
          Are you sure?
        </div>
        <button onClick={() => history.push({hash: 'action_submited'})} className="action-window__submit-button">
          Yes
        </button>
      </div>
    </div>
  )
}
