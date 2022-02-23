import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';

import { useHistory, useRouteMatch } from 'react-router';
import { clearList, deleteList, getCreatedList } from '../components/api';
import ListElement from '../components/ListElement';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import { ListSelector } from '../components/ListSelector';
import { updateLists } from '../redux/actions';
import add from '../lottie/add.json'
import Lottie from 'react-lottie';
import CreateListButton from '../components/CreateListButton';
import { AddMoviesToListWindow } from '../components/AddMoviesToListWindow';
import AddMoviesToList from '../components/AddMoviesToList';
import { Link, useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

const classNames = require('classnames')

const DeleteOrClearTheListButton = ({func, session_id, updateLists}) => {
  const match = useRouteMatch('/lists/:listId?')
  const history = useHistory();
  const location = useLocation();
  const [isPressed, press] = useState(false)
  
  useEffect(() => {
    if(location.hash === '#action_submited' && isPressed) {
      if(func === 'delete') {
        history.push('/lists')
        deleteList(match.params.listId, session_id).then(() => {
          updateLists(session_id)
        })
      } else {
        clearList(match.params.listId, session_id).then(() => {
          updateLists(session_id)
        })
      }
    }
  }, [location, isPressed])

  return (
    <div
      onClick={() => {
        history.push({hash: '#conf-window'})
        press(true)  
      }}
      className={classNames([{"lists-page__delete-button": func === 'delete', "lists-page__clear-button": func === 'clear'}])}
    >
      {func === 'delete' ? 'delete the list' : 'clear the list'}
    </div>
  )
}

const DeleteOrClearTheListButtonWithRedux = connect((state) => ({session_id: state.session.session}), {updateLists})(DeleteOrClearTheListButton)

const ListsPage = ({lists, session_id, updateLists}) => {
  const match = useRouteMatch('/lists/:listId?')
  const [selectedList, selectList] = useState({});
  const animation = useAnimation();
  const [titleInputValue, setTitleInputValue] = useState('')
  const history = useHistory();

  

  useEffect(() => {
    if(match.params.listId) {
      getCreatedList(match.params.listId).then((res) => {
        selectList(res)
      })
    } else {
      selectList(false)
    }
    console.log('a', selectedList)
    if(match.params.listId === selectedList.id) {
      animation.start({
        translateX: 20
      })
    } else {
      animation.start({
        translateX: 0
      })
    }
  }, [match.params.listId, lists])

  useEffect(() => {
    setTitleInputValue(selectedList.name)
  }, [selectedList])



  return (
    <>
      <div className="page">
        <div className="container">
          <div className="lists-page grid">
            <div className="lists-page__select-section grid__item--1-4">
              <AnimatePresence>
                {lists.map((list) => (
                  <ListSelector key={list.id} id={list.id} name={list.name}/>
                ))}
              </AnimatePresence>
            </div>
            <div className="lists-page__list grid__item--5-12">
              <h1 className="lists-page__title">
                {selectedList ? selectedList.name : 'This is list page'}
                {/* <input value={titleInputValue} type="text" className="lists-page__title-input" /> */}
                {selectedList && <AddMoviesToList/>}
              </h1>
              <p className="lists-page__description">{selectedList ? selectedList.description : 'select one list to see its elements'}</p>
              <div className="lists-page__list">
                <AnimatePresence>
                  {selectedList.items?.map((movie) => (
                    <ListElement key={`${selectedList.id}-${movie.id}`} media={movie} list_id={selectedList.id}/>
                  ))}
                </AnimatePresence>
              </div>
              <div style={{display: 'flex'}}>
                {selectedList &&
                  <DeleteOrClearTheListButtonWithRedux func="delete"/>
                }
                {(selectedList && selectedList.items?.length > 0) &&
                  <DeleteOrClearTheListButtonWithRedux func="clear"/>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <CreateListButton />
    </>
  )
}

export default connect((state) => ({session_id: state.session.session, lists: state.session.lists}), {updateLists})(ListsPage)