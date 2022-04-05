import React, { Component } from 'react'
import { BrowserRouter as Router,
  Routes,
  Route,
  Link } 
  from 'react-router-dom'

import Movies from './pages/Movies.js'
import Series from './pages/Series'
import Home from './pages/Home'

import styled from 'styled-components'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  *{
    margin:0;
    padding:0;
    box-sizing:border-box;
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
        <GlobalStyle />
        <Router>
          <Box_Nav>
            <h1>FerFlix</h1>
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
