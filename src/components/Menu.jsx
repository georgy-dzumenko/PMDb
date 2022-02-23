import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { HashLink } from 'react-router-hash-link'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion';
import { translate } from './translate';
import { changeLanguage } from '../redux/actions';
import { connect } from 'react-redux';

const classNames = require("classnames")

const Menu = ({language}) => {
  const location = useLocation()
  const [firstload, setFirstLoad] = useState(true);

  useEffect(() => {
    console.log('changed')
    if(!firstload) {
      window.location.reload()
    }

    setFirstLoad(false)
  }, [language]);

  return (
    <div id="menu" className={classNames("menu", {"menu--active": location.hash === "#menu"})}>
    
      {/* <div className="navigation">
        <div className="navigation__content">
          <HashLink
            smooth to="#"
            className="menu__close-button"
          >
            <FontAwesomeIcon icon={faChevronLeft}/>
          </HashLink>
        </div>
      </div> */}
      <div className="container">
        <h1 className="menu__title">
          Menu
        </h1>
        <ul className="menu__main">
          <li className="menu__main-item">
            <HashLink className="menu__link" to="/">
              home
            </HashLink>
          </li>
          <div className="menu__section">
            <div className="menu__section-title">lists</div>
            <li className="menu__main-item">
              <HashLink className="menu__link" to="/watchlist/tv">
                watchlist
              </HashLink>
            </li>
            <li className="menu__main-item">
              <HashLink className="menu__link" to="/favorites/tv">
                favorites
              </HashLink>
            </li>
            <li className="menu__main-item">
              <HashLink className="menu__link" to="/lists">
                lists
              </HashLink>
            </li>
          </div>
          <div className="menu__section">
            <div className="menu__section-title">account</div>
            <HashLink to='/profile' className="menu__link">
              {translate({
                'en': "profile",
                "uk": 'профіль'
              })}
            </HashLink>
            <HashLink to='#login'className="menu__link">
              {translate({
                'en': "log out",
                "uk": 'вийти'
              })}
            </HashLink>
          </div>
          <div className="menu__section">
            <div
              onClick={() => {
                changeLanguage('en')
                window.location.reload()
              }} className="menu__link">
              english {language === 'en' && "✓"}
            </div>
            <div onClick={() => {
              changeLanguage('uk')
              window.location.reload()
            }}className="menu__link">
              українська {language === 'uk' && "✓"}
            </div>
          </div>
          <li className="menu__main-item">
            <HashLink className="menu__link" to="/info">
              info
            </HashLink>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default connect((state) => ({language: state.session.language}))(Menu)
