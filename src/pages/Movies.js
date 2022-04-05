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
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
const Box_Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`
const Title = styled.h2`
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
const Box_Films = styled.div`
    width: 100%;
    margin:20px 0;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`
const Card_Films = styled.div`
    width: 45%;
    margin:10px;
    padding:5px;
    display:flex;
    align-items: center;
    justify-content: space-evenly;
    background-color:white;
`
const Title_Films = styled.p`
    margin:10px auto;
    font-size: 20px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.7s;
    &:hover{
        opacity: 0.8;
    }
`
const Box_Img = styled.figure`
    
`
const Img_Films = styled.img`
    width: 150px;
    cursor: pointer;
    transition: all 0.4s;
    &:hover{
        opacity: 0.8;
    }
`
const Box_OverView = styled.div`
    height: 150px;
    overflow: auto;
    cursor: pointer;

 ::-webkit-scrollbar {
  width: 7px;
  height: 3px;
  background-color: #cecccc;
}
/*
::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: blue;
  border-radius: 1px;
  width: 5px;
  height: 1px;
} */

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
	background-color:blue; 
  height: 3px;
}
`
const Box_Discription = styled.div`
    width: 60%;
    margin:0 5px;
`
const Details = styled.details`
  margin:2vh 0 0 0vw;
  font-family: 'Josefin Sans', sans-serif;
`
const Sumary = styled.summary`
  font-size:1.3rem;
  font-family: 'Josefin Sans', sans-serif;
`
const Descrition = styled.p`
  width:100%;
  font-size:1.3rem;
  text-align:justify;
  margin:2vh 0 0 0vw;
  font-family: 'Josefin Sans', sans-serif;
`
const apiFilmes = axios.create({ 
    baseURL: "https://api.themoviedb.org/3/movie/popular?api_key=0beb9ac2fc4292144eeffa5c1b2bbcf2&language=pt-BR"
  })
  
  export default class Filmes extends Component {
   
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
          poster_path: `https://image.tmdb.org/t/p/w400/${item.poster_path}`
        }
      })
      this.setState({
        filmList:filmes,
        filterFilm:filmes
      })
    }
  
    filter = (e) => {
      const { filmList } = this.state
  
      if(e.target.value === ""){
        this.setState({
          filterFilm: filmList
        })
        return;
      }
      console.log(e.target.value)
  
      const filmFiltrados = filmList.filter((item) => {
        if(item.title.toLowerCase().includes(e.target.value.toLowerCase())){
          return true;
        }
      })
      this.setState({
        filterFilm: filmFiltrados
      })
    }    
    render() {
      return (
        <Container> 
          <GlobalStyle/>
            <Box_Header>
                <Title>Filmes</Title>
                <SearchBar type="text" placeholder="Digite um filme"
                onChange={this.filter}
                />
            </Box_Header>
          <Box_Films>
            {this.state.filterFilm.map((item) => (
              <Card_Films>
                  <Box_Img>
                    <Img_Films src={item.poster_path} alt={` Imagem do filme ${item.title}`}/>
                  </Box_Img>
                  <Box_Discription>
                    <Title_Films>{item.title}</Title_Films>
                    {/* <Details>
                      <Sumary>Sinopse</Sumary>
                      <Descrition>{item.overview}</Descrition>
                    </Details> */}
                    <Box_OverView>
                        <p>{item.overview}</p>
                    </Box_OverView>
                  </Box_Discription>
                  
              </Card_Films>
            ))}
          </Box_Films>
        </Container>
      )
    }
  }