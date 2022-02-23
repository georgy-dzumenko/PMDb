import React, { useEffect, useRef, useState } from 'react'
import addToListLottie from '../lottie/addToListLottie.json'
import lottie from 'lottie-web';
import { connect } from 'react-redux';
import { addMovieToList, checkItemStatus, createList, getLists, removeMovieFromList } from './api';
import { AnimatePresence, motion } from 'framer-motion';
import { updateLists } from '../redux/actions';

const classNames = require('classnames')

const AddToListButton = ({session_id, lists, media_id, updateLists}) => {
  const [active, setActive] = useState(false);
  const [lottieAnim, setLottieAnim] = useState({})
  const [itemStatus, setItemStatus] = useState({})
  const [changingList, setChangingList] = useState({toBeAdded: [], toBeRemoved: []})
  const animation = useRef(null)
  const [theFirstPlay, setTheFirstPlay] = useState(true);
  const [createNewActive, setNewActive] = useState(false);
  const [newListData, setNewListData] = useState({});

  const setMovieToBeAdded = () => {
    setChangingList({...changingList, toBeAdded: [...changingList.toBeAdded, media_id]})
  }

  const setMovieToBeRemoved = () => {
    setChangingList({...changingList, toBeRemoved: [...changingList.toBeRemoved, media_id]})
  }

  const deleteMovieFromChanging = () => {
    setChangingList({
      ...changingList,
      toBeAdded:[...changingList.toBeAdded].filter(({id}) => id !== media_id),
      toBeRemoved: [...changingList.toBeRemoved].filter(({id}) => id !== media_id)
    })
  }

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
      animationData: JSON.parse(JSON.stringify(addToListLottie))
    }))
    if(lottieAnim.setSpeed) {
      lottieAnim?.setSpeed(2.5)
    }
  }, [])

  useEffect(() => {
    checkItemStatus(media_id, session_id).then((response) => {
      console.log('status', response)
      setItemStatus(response.results)
    });
  }, [lists])

  useEffect(() => {
    if(lottieAnim.playSegments && theFirstPlay) {
      if(active) {
        console.log('s')
        lottieAnim?.playSegments([79, 125], true)
      } else {
        console.log('b')
        lottieAnim?.playSegments([0, 1], true)
      }
      setTheFirstPlay(false)
    }
  }, [lottieAnim])

  useEffect(() => {
    
  }, [])

  useEffect(() => {
    
  }, [active])

  return (
    <>
      <div
        onClick={() => {
          console.log(lists)
          if(lottieAnim?.playSegments) {
            lottieAnim?.playSegments([0, 125], true)
          }
          setActive(!active)
          // addMovieToList(1, media_id, session_id)
          // .then(() => {
          //   updateLists(session_id)
          // })
        }}
        className="addToWatchListButton"
        ref={animation}
      >
      </div>
      <AnimatePresence>
        {active &&
          <motion.div
            initial={{opacity: 0, scale: 0, translateX: '-50%', translateY: '-50%'}}
            animate={{opacity: 1, scale: 1, translateX: '-50%', translateY: '-50%'}}
            exit={{opacity: 0, scale: 0, translateX: '-50%', translateY: '-50%'}}
            transition={{ duration: 0.1}}
            className="action-window"
          >
            <div className="action-window__header">
              <div className="action-window__close-button" onClick={() => setActive(false)}></div>
              <a
                className="action-window__create-list-button"
                onClick={() => setNewActive(!createNewActive)}
              >
                {!createNewActive ? "create new list" : '< back'}
              </a>
            </div>
            <div className="action-window__content">
              <div className="action-window__title">
                {!createNewActive
                  ? "select list"
                  : "create list"
                }
              </div>
              {createNewActive
                ?
                  <motion.div
                    initial={{opacity: 0, translateX: -100}}
                    animate={{opacity: 1, translateX: 0}}
                    transition={{ duration: 0.2}}
                  >
                    <form onSubmit={(event) => {
                      console.log(newListData)
                      createList(newListData.name, newListData.description, session_id).then(() => {
                        updateLists(session_id)
                        setNewActive(false);
                      })
                      
                    }}>
                      Your custom list name*
                      <input
                        placeholder='Movies for my mom'
                        value={newListData.name}
                        onChange={(event) => {
                          setNewListData({...newListData, name: event.target.value})
                        }}
                        className="action-window__input"
                        type="text"
                      />
                      Your custom list description*
                      <input
                        placeholder='Only those she loves'
                        value={newListData.description}
                        onChange={(event) => {
                          setNewListData({...newListData, description: event.target.value})
                        }}
                        className="action-window__input"
                        type="textfield"
                      />
                      <button className="action-window__submit-button" type="submit">Create</button>
                    </form>
                  </motion.div>
                :
                  <ul className="action-window__list">
                    {lists.map((list) => (
                      <motion.li
                        initial={{translateX: '-100%', opacity: 0, transitionDelay: 0.1}}
                        animate={{translateX: 0, opacity: 1}}
                        whileTap={{backgroundColor: 'lightgreen', scale: 1.1}}
                        onClick={() => {
                          if(doesMovieBelongToList(list.id)){
                            setMovieToBeRemoved();
                            removeMovieFromList(list.id, media_id, session_id)
                          } else {
                            setMovieToBeAdded()
                            addMovieToList(list.id, media_id, session_id)
                            deleteMovieFromChanging()
                          }

                          updateLists(session_id)
                          
                          checkItemStatus(media_id, session_id).then((response) => {
                            console.log('status', response)
                            setItemStatus(response.results)
                          });
                          return
                        }}
                        key={list.id}
                        className="action-window__list-element"
                      >
                        {list.name}
                        {doesMovieBelongToList(list.id) &&
                          <motion.img
                            initial={{rotateZ: '-45deg', rotateX: '-45deg', rotateY: '-45deg'}}
                            animate={{rotateZ: 0, rotateX: 0, rotateY: 0}}
                            style={{width: '25px', height: '25px', objectFit: 'contain'}}
                            src={'checkmark.png'}
                            alt="added"
                          />
                        }
                      </motion.li>
                    ))}
                  </ul>
              }
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </>
  )
}

export default connect(
  (state) => ({
    session_id: state.session.session,
    accInfo: state.session.accInfo,
    lists: state.session.lists
  }),
  {updateLists}
)(AddToListButton)
