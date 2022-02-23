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
import { useRouteMatch } from 'react-router-dom';

const classNames = require('classnames')

const AddMoviesToListSearchResult = ({movie, session_id, updateLists}) => {
  const animation = useAnimation()
  const match = useRouteMatch('/lists/:listId?')

  return (
    <motion.div
      onHoverStart={() => {
        animation.start({scaleY: 1})
      }}
      onHoverEnd={() => {
        animation.start({scaleY: 0})
      }}
      className="action-window__search-result"
    >
      <Picture
        picture_path={getMovieImg(movie.poster_path)}
        w500
        mediaType="media"
      />
      <motion.div
        onClick={() => {
          addMovieToList(match.params.listId, movie.id, session_id)
          updateLists(session_id)
        }}
        initial={{scaleY: 0, transitionDelay: 0.1}}
        animate={animation}
        className="action-window__search-result-add-button"
      >
        add
      </motion.div>
    </motion.div>
  )
}

const AddMoviesToListSearchResultWithConnect = connect(
  (state) => ({
    session_id: state.session.session,
  }),
  {updateLists}
)(AddMoviesToListSearchResult)

export const AddMoviesToListWindow = ({setActive, session_id, updateLists}) => {
  const [lottieAnim, setLottieAnim] = useState({})
  const [itemStatus, setItemStatus] = useState({})
  const [changingList, setChangingList] = useState({toBeAdded: [], toBeRemoved: []})
  const animation = useRef(null)
  const [theFirstPlay, setTheFirstPlay] = useState(true);
  const [newListData, setNewListData] = useState({});

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


  return (
    <motion.div
      initial={{opacity: 0, scale: 0, translateX: '-50%', translateY: '-50%'}}
      animate={{opacity: 1, scale: 1, translateX: '-50%', translateY: '-50%'}}
      exit={{opacity: 0, scale: 0, translateX: '-50%', translateY: '-50%'}}
      transition={{ duration: 0.1}}
      className="action-window action-window--big"
    >
      <div className="action-window__header">
        <div className="action-window__close-button" onClick={() => setActive(false)}></div>
      </div>
      <div className="action-window__content">
        <div className="action-window__title">
          add movies to list
        </div>
        <div className="action-window__search-container">
          <input
            onChange={(event) => {
              onSearch(event.target.value)
              console.log(results)
            }}
            className="action-window__search"
          />
          <div className="action-window__search-icon">
            <FontAwesomeIcon
              icon={faSearch}
            />
          </div>
        </div>
        <div className="action-window__search-results-block">
          {results.length > 0
            ?
              results.map((movie) => <AddMoviesToListSearchResultWithConnect key={movie.id} movie={movie}/>)
            :
              <div className="action-window__default-result"> 
                results...
              </div>
          }
        </div>
      </div>
    </motion.div>
  )
}

export default connect(
  (state) => ({
    session_id: state.session.session,
  }),
  {updateLists}
)(AddMoviesToListWindow)
