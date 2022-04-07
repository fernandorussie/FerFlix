import React, { Component } from 'react'
import axios from "axios";

import styled from 'styled-components'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  *{
    input::placeholder {
    color: white;
  }
  }
  
`
const Container = styled.div`
  width: 84%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
const BoxSearch = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`
const TitlePage = styled.h2`
  font-size: 39px;
  color: white;
`
const SearchBar = styled.input`
    width: 25%;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid white;
    font-size:16px;
    color: white;
    outline: none;
`
const BoxCards = styled.div`
    width: 100%;
    margin:20px 0;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`
const Card = styled.div`
background-color: black;
  -webkit-box-shadow: 5px 5px 15px 0px rgba(0,0,0,0.48); 
  box-shadow: 5px 5px 15px 0px rgba(0,0,0,0.48);
  border-radius: 10px;
  width: 250px;
  height: 400px;
  margin:12px;
  overflow: hidden;
  position: relative;
  z-index: 1;
  cursor: pointer;

  transition: all 0.8s 0.1s ease; 

  &:before {
  content: "";
  position: absolute;
  z-index: -1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-image: url(${props => props.back});
    background-position: center;
    background-size: cover;
    background-repeat:no-repeat;
  background-color: blue;
  opacity: 0.8;
  }
  &:hover{
  }
`
const CardSpacing = styled.div`
  padding-top: 200px;  
  transition: all 0.6s 0.1s ease; 
  ${Card}:hover &{
    padding-top: 25px;  
  } 
`
const CardContent = styled.div`
  padding-top: 80px;
  padding-left: 12px;
  padding-right: 12px;
  background: -moz-linear-gradient(top,  rgba(0,0,0,0) 0%, rgba(0,0,0,0.9) 15%);
  background: -webkit-linear-gradient(top,  rgba(0,0,0,0) 0%,rgba(0,0,0,0.9) 15%);
  background: linear-gradient(to bottom,  rgba(0,0,0,0) 0%,rgba(0,0,0,0.9) 15%);
  height: 100vh;
  color: white;
  transition: all 0.8s 0.1s ease; 
`
const TitleContent = styled.p`    
  font-family: 'Montserrat', sans-serif;
  font-size: 1.1rem; 
  transition: all 0.8s 0.1s ease; 
  &:hover{
    transform: scale(1.05, 1.01);
  }
`
const BoxGenres = styled.div`
  display: inline-block;
  color: white;
  padding: 2px 5px;
  border-radius: 5px;
  font-size: 0.75rem;
`
const DescriptionContent = styled.div`
height: 40%;
 padding: 15px 0 0 0; 
 color: white;
 overflow: hidden;
 cursor: pointer;

 ${Card}:hover &{
    overflow: auto;
  }
 ::-webkit-scrollbar {
  width: 7px;
  height: 3px;
  background-color: transparent;
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
    background-color: blue; 
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
}
::-webkit-scrollbar-thumb{
	background-color:rgba(255, 0, 0, 0.37); 
  height: 3px;
  width: 1px; 
  }
`

const apiSerie = axios.create({
  baseURL: "https://api.themoviedb.org/3/tv/popular?api_key=0beb9ac2fc4292144eeffa5c1b2bbcf2&language=pt-BR"
})

export default class Serie extends Component {
 
  state = {
    serieList: [],
    filterSerie: [],
    genres: [ 
      {id: 28, name: 'Ação'}
     ,{id: 12, name: 'Aventura'}
     ,{id: 16, name: 'Animação'}
     ,{id: 35, name: 'Comédia'}
     ,{id: 80, name: 'Crime'}
     ,{id: 99, name: 'Documentário'}
     ,{id: 18, name: 'Drama'}
     ,{id: 10751, name: 'Família'}
     ,{id: 14, name: 'Fantasia'}
     ,{id: 36, name: 'História'}
     ,{id: 27, name: 'Terror'}
     ,{id: 10402, name: 'Música'}
     ,{id: 9648, name: 'Mistério'}
     ,{id: 10749, name: 'Romance'}
     ,{id: 878, name: 'Ficção científica'}
     ,{id: 10770, name: 'Cinema TV'}
     ,{id: 53, name: 'Thriller'}
     ,{id: 10752, name: 'Guerra'}
     ,{id: 37, name: 'Faroeste'}],
  }

  async componentDidMount() {
      this.getSeries();
  }
  getSeries = async () => {
    const response = await apiSerie.get()
    console.log(response)

    const series = response.data.results.map((item) => {
      return {
        ...item,
        poster_path: `https://image.tmdb.org/t/p/w400/${item.poster_path}`
      }
    })
    this.setState({
      serieList:series,
      filterSerie: series
    })
  }
  filter = (e) => {
      const { serieList } = this.state

      if(e.target.value === ""){
          this.setState({ 
            filterSerie: serieList
          })
          return;
      }

      const serieFiltrados = serieList.filter((item) => {
          if(item.name.toLowerCase().includes(e.target.value.toLowerCase())){
              return true;
          }
      })
      this.setState({
        filterSerie: serieFiltrados
       })
  }

  render() {
    return (
      <Container> 
          <GlobalStyle/>
            <BoxSearch>
                <TitlePage>Séries</TitlePage>
                <SearchBar type="text" placeholder="Digite uma série"
                onChange={this.filter}
                />
            </BoxSearch>
          <BoxCards>
            {this.state.filterSerie.map((item) => (
              <Card back={item.poster_path}> 
              <CardSpacing></CardSpacing>
              <CardContent>
                <TitleContent>
                  {item.title}
                </TitleContent>

                {item.vote_average >=8 ? 
                  <p>⭐⭐⭐⭐⭐</p>: 
                  item.vote_average >=7 ?
                  <p>⭐⭐⭐⭐</p>: 
                  item.vote_average >=6 ?
                  <p>⭐⭐⭐</p>: 
                  item.vote_average >=5 ?
                  <p>⭐⭐</p>: 
                  item.vote_average >=4 ?
                  <p>⭐</p>: 
                  <p>Título sem rank</p>
                }
                <div>
                  <BoxGenres>
                    {this.state.genres.map((cpf) => (
                      cpf.id === item.genre_ids[0]?
                      <p>{cpf.name}</p>:null
                    ))}                    
                  </BoxGenres>
                  <BoxGenres>
                  {this.state.genres.map((cpf) => (
                      cpf.id === item.genre_ids[2]?
                      <p>{cpf.name}</p>:
                      null
                    ))}
                  </BoxGenres>
                  <BoxGenres>
                  {this.state.genres.map((cpf) => (
                      cpf.id === item.genre_ids[3]?
                      <p>{cpf.name}</p>:
                      null
                    ))}
                  </BoxGenres>
                </div>
                <DescriptionContent>
                  {item.overview !== ""? item.overview: "Titulo sem sinopse"}
                </DescriptionContent>
              </CardContent>
              </Card>
            ))}
          </BoxCards>
        </Container>
    )
  }
}