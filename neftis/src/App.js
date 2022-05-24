import "./styles/App.scss"
import "./index.css"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from './pages/Register';
import Login from './pages/Login';
import Post from './pages/Post';
import NotFound from './pages/NotFound';
import Alert from "./components/Alert";
import Header from "./components/Header";
import Home from "./pages/Home";
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from "react";
import { refreshToken } from './redux/actions/authActions';
import Notifications from "./pages/Notifications";
import Explore from "./pages/Explore";
import Message from "./pages/Message";

function App() {
  const {auth} = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken())
  },[dispatch])

  return (
    <div className="App light"> {/* Colocar el thema dark o light*/}
      <Router>
        <Alert/>
        { auth.token && <Header/>}
        {/* <Header/>  */}
        <Switch>
          {/* // Nombre de la ruta se llamada register. */}
          <Route exact path="/register"> 
          {/* // Nuestra pagina register. */}
            <Register />
          </Route>
          <Route exact path="/">
            {auth.token ? <Home/> : <Login/>}
            {/* {auth.token ? <Login/> : <Home/>}  */}
          </Route>
          <Route exact path="/login">
            <Login/>
          </Route>
          <Route exact path="/message">
            <Message/>
          </Route>
          <Route exact path="/explore">
            <Explore/>
          </Route>
          <Route exact path="/notification">
            <Notifications/>
          </Route>
          <Route exact path='/post/:id'>
            <Post/>
          </Route>
          {/* Pagina en cado de no encontrarse ninguna.  */}
          <Route> <NotFound/> </Route> 
        </Switch>
      </Router>
    </div>
  )
}

export default App
