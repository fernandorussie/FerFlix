import React, { Component } from 'react'
import axios from "axios";
import Carousel from 'react-elastic-carousel'

import styled from 'styled-components'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  *{
    input::placeholder {
    color: black;
  }
  }
`
const Container = styled.div`
.rec.rec-arrow:disabled {
    visibility: hidden ;
}
`
const Img = styled.img`
  width: 40vw;
`
const apiFilmes = axios.create({ 
  baseURL: "https://api.themoviedb.org/3/movie/popular?api_key=0beb9ac2fc4292144eeffa5c1b2bbcf2&language=pt-BR"
})

export default class Home extends Component {
  state = {
    filmList: [],
    filterFilm: []
  }

 async componentDidMount() { 
     this.getFilmes();
  }
  getFilmes = async () => {
    const response = await apiFilmes.get()

    console.log(response)

    const filmes = response.data.results.map((item) => {
      return {
        ...item,
        backdrop_path: `https://image.tmdb.org/t/p/w400/${item.backdrop_path}`
      }
    })
    this.setState({
      filmList:filmes,
      filterFilm:filmes
    })
  }
  render() {
    return (
      <Container>Está é a page Home
        <Carousel itemsToShow={1} enableAutoPlay autoPlaySpeed={3000}>
          {this.state.filterFilm.map((item) => (
                    <figure>
                      <Img src={item.backdrop_path} alt={` Imagem do filme ${item.title}`}/>
                    </figure>
          ))}
        </Carousel>
      </Container>
    )
  }
}
