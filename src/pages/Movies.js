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





const Card = styled.div`
background-color: black;
  -webkit-box-shadow: 5px 5px 15px 0px rgba(0,0,0,0.48); 
  box-shadow: 5px 5px 15px 0px rgba(0,0,0,0.48);
  border-radius: 10px;
  width: 275px;
  height: 400px;
  margin:18px;
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
const Description = styled.div`
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
const H2 = styled.p`    
  font-family: 'Montserrat', sans-serif;
  font-size: 1.1rem; 
  transition: all 0.8s 0.1s ease; 
  &:hover{
    transform: scale(1.05, 1.01);
  }
`
const TagBox = styled.div`
  display: inline-block;
  color: white;
  padding: 2px 5px;
  border-radius: 5px;
  font-size: 0.75rem;
`
const Purple = styled.div`
background-color: purple;
`
const Pink = styled.div`
  background-color: pink;

`






const apiFilmes = axios.create({ 
    baseURL: "https://api.themoviedb.org/3/movie/popular?api_key=0beb9ac2fc4292144eeffa5c1b2bbcf2&language=pt-BR"
  })
  
  export default class Filmes extends Component {
   
    state = {
      filmList: [],
      filterFilm: [],
      noResults: true
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
        filterFilm:filmes,
      })
    }
  
    filter = (e) => {
      const { filmList, noResults } = this.state
  
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
        filterFilm: filmFiltrados,
        noResults: noResults
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
          {this.state.noResults 
              ? // filme não encontrado
              this.state.filterFilm.map((item) => (


                <Card back={item.poster_path}> 
                <CardSpacing></CardSpacing>
                <CardContent>
                  <H2>{item.title}</H2>
                  {item.vote_average <= 6 ? 
                    <p>⭐1/5</p>: 
                    <p>⭐⭐⭐⭐⭐5/5</p>
                   
                  }
                  <div>
                    <TagBox>Ação</TagBox>
                    <TagBox>Ficção cientifica</TagBox>
                  </div>
                  <Description>{item.overview}</Description>
                </CardContent>
                </Card>
              ))
               
               : // filmes filtrados
               <p>Filme não encontrado!</p>}
          </Box_Films>
        </Container>
      )
    }
  }