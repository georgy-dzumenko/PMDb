import React, { useEffect, useRef, useState } from 'react'
import lottie from 'lottie-web';
import { connect } from 'react-redux';
import { addMovieToList, checkItemStatus, createList, getLists, removeMovieFromList } from './api';
import { AnimatePresence, motion } from 'framer-motion';
import { updateLists } from '../redux/actions';
import addList from '../lottie/addList.json'

const classNames = require('classnames')

const CreateListButton = ({session_id, lists, media_id, updateLists}) => {
  const [active, setActive] = useState(false);
  const [lottieAnim, setLottieAnim] = useState({})
  const [itemStatus, setItemStatus] = useState({})
  const [changingList, setChangingList] = useState({toBeAdded: [], toBeRemoved: []})
  const animation = useRef(null)
  const [theFirstPlay, setTheFirstPlay] = useState(true);
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
      animationData: JSON.parse(JSON.stringify(addList))
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
        lottieAnim?.playSegments([0, 1], true)
        setTheFirstPlay(false)
    }
  }, [lottieAnim])


  return (
    <>
      <div
        onClick={() => {
          console.log(lists)
          if(lottieAnim?.playSegments) {
            lottieAnim?.playSegments([0, 62], true)
          }
          setActive(!active)
          // addMovieToList(1, media_id, session_id)
          // .then(() => {
          //   updateLists(session_id)
          // })
        }}
        className="create-list-button"
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
            </div>
            <div className="action-window__content">
              <div className="action-window__title">
                  create list
              </div>
              <motion.div
                initial={{opacity: 0, translateX: -100}}
                animate={{opacity: 1, translateX: 0}}
                transition={{ duration: 0.2}}
              >
                <form onSubmit={(event) => {
                  console.log(newListData)
                  createList(newListData.name, newListData.description, session_id).then(() => {
                    updateLists(session_id)
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
)(CreateListButton)
