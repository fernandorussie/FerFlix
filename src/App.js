import React, { Component } from 'react'
import { BrowserRouter as Router,
  Routes,
  Route,
  Link } 
  from 'react-router-dom'

import Movies from './pages/Movies.js'
import Series from './pages/Series'
import Home from './pages/Home'

import {Helmet} from "react-helmet";
import Icon from './assets/iconFF.png'
import Logo from './assets/OriginalLogo.png'

import styled from 'styled-components'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  *{
    margin:0;
    padding:0;
    box-sizing:border-box;
  }
  body{
    overflow: overlay;
  }
  ::-webkit-scrollbar {
  width: 7px;
  height: 3px;
  background-color: transparent;
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
}

::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.1); 
    -webkit-border-radius: 15px;
    border-radius: 15px;
}
::-webkit-scrollbar-thumb {
    -webkit-border-radius: 10px;
    border-radius: 10px;
    height: 3px;
    background-color:rgba(255, 255, 255, 0.76); 
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.1); 
}
`
const Links = styled(Link)` 
  color: white;
  text-decoration: none;
  transition: 0.3s;
  margin: 20px;
  &:hover {
    color: #fdb927;
    text-decoration: underline;
  }
`
const Container = styled.div`
  max-width: 1920px;
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  background-color: #151722;
  display:flex;
  flex-direction: column;
  align-items: center;
`
const Box_Nav = styled.div`
  width: 80%;
  margin:20px auto;
  display:flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: ;
  color: white;
`
const Logo_Img = styled.img`
  width: 20%;
  cursor: pointer;
  transition: 0.2s ease;
  &:hover{
    filter: drop-shadow(1px -1px 3px rgba(252, 252, 252, 0.49));  }
`
const Nav = styled.nav`
  width: 60%;
  display:flex;
  justify-content: space-evenly;
  background-color: ;
`
export default class App extends Component {
  render() {
    return (
      <Container>
        <Helmet>
                <meta charSet="utf-8" />
                <title>FERFLIX</title>
                <link rel="shortcut icon" href={Icon} type="image/x-icon"></link>
        </Helmet>
        <GlobalStyle />
        <Router>
          <Box_Nav>
            <Logo_Img src={Logo} alt=""/>
            <Nav>
              <Links to="/home">Inicio</Links>
              <Links to="/movies">Filmes</Links>
              <Links to="/series">Series</Links>
            </Nav>
          </Box_Nav>
          <Routes>
            <Route path="/home" element={<Home/>}/>
            <Route path="/movies" element={<Movies/>}/>
            <Route path="/series" element={<Series/>}/>
          </Routes>
        </Router>
      </Container>
    )
  }
}
