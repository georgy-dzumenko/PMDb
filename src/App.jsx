import './styles/App.scss';
import { Menu } from './components/Menu';
import { Route, useRouteMatch } from 'react-router-dom'
import { MoviePage } from './pages/MoviePage';
import { Info } from './pages/Info'
import Home from './pages/Home'
import { CollectionPage } from './pages/CollectionPage';
import { PersonPage } from './pages/PersonPage';
import {Switch} from 'react-router'
import { SearchPage } from './pages/SearchPage';
import { useEffect, useState } from 'react';
import { getAccInfo } from './components/api';
import LoginWindow from './pages/LoginWindow';
import Navigation from './components/Navigation'

function App() {
  const match = useRouteMatch('/:mediaType/:mediaId')
  // const [accInfo, setAccInfo] = useState({});

  // console.log(accInfo)

  // useEffect(() => {
  //   getAccInfo().then((response) => {setAccInfo(response)})
  // }, [])

  return (
    <div className="App">
      <Navigation/>
      <LoginWindow/>
      <Switch>
        <Route name="app" path="/" exact>
          <Home/>
        </Route>
        <Route name="app" path="/search" exact>
          <SearchPage/>
        </Route>
        <Route path="/info">
          <Info/>
        </Route>
        <Route path="/people/:personId" exact>
          <PersonPage id={match?.params?.personId}/>
        </Route>
        <Route path="/:mediaId/:mediaId" exact>
          {match?.params?.mediaType !== 'collections'
            ?
            <MoviePage id={match?.params?.mediaId}/>
            :
            <CollectionPage/>
          }
        </Route>
      </Switch>
      
      <Menu />
    </div>
  );
}

export default App;
