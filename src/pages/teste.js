import React, { Component } from 'react'
import axios from "axios";
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
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: red;
`
const Box_Header = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-evenly;
`
const Title = styled.p`

`
const SearchBar = styled.input`
    width: 25%;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid black;
    font-size:16px;
    color: black;
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
  width: 12px;
}

::-webkit-scrollbar-track {
  background: orange;
}

::-webkit-scrollbar-thumb {
  background-color: blue;
  border-radius: 20px;
  border: 3px solid orange;
}
`
const Box_Discription = styled.div`
    width: 60%;
    margin:0 5px;
`







const Card = styled.div`
background-color: black;
  -webkit-box-shadow: 5px 5px 15px 0px rgba(0,0,0,0.48); 
  box-shadow: 5px 5px 15px 0px rgba(0,0,0,0.48);
  border-radius: 10px;
  width: 275px;
  height: 400px;
  overflow: hidden;
  position: relative;
  z-index: 1;
`
const CardSpacing = styled.div`
  padding-top: 200px;  
  transition: padding 0.2s; 
  ${Card}:hover &{
    padding-top: 25px;  
  } 
`
const CardContent = styled.div`
  padding-top: 80px;
  padding-left: 12px;
  padding-right: 12px;
  background: -moz-linear-gradient(top,  rgba(0,0,0,0) 0%, rgba(0,0,0,1) 15%);
  background: -webkit-linear-gradient(top,  rgba(0,0,0,0) 0%,rgba(0,0,0,1) 15%);
  background: linear-gradient(to bottom,  rgba(0,0,0,0) 0%,rgba(0,0,0,1) 15%);
  height: 100vh;
  
  color: white;
`
const Description = styled.div`
 padding: 15px 0 0 0; 
 color: white;
`
const H2 = styled.p`    
  font-family: 'Montserrat', sans-serif;
  font-size: 1.1rem;  
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
    baseURL: "https://rickandmortyapi.com/api/character"
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
        if(item.name.toLowerCase().includes(e.target.value.toLowerCase())){
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
                <h1>Filmes</h1>
                <SearchBar type="text" placeholder="Digite um filme"
                onChange={this.filter}
                />
            </Box_Header>
          <Box_Films>
            {this.state.filterFilm.map((item) => (
              
              <Card> 
                <CardSpacing></CardSpacing>
                <CardContent>
                  <H2>{item.title}</H2>
                  <p>⭐⭐⭐⭐⭐ 5/5</p>
                  <div>
                    <TagBox>Ação</TagBox>
                    <TagBox>Ficção cientifica</TagBox>
                  </div>
                  <Description>{item.overview}</Description>
                </CardContent>
              </Card>
              
              // <Card_Films>
              //     <Box_Img>
              //       <Img_Films src={item.image} alt={` Imagem do filme ${item.title}`}/>
              //     </Box_Img>
              //     <Box_Discription>
              //       <Title_Films>{item.name}</Title_Films>
              //       <Box_OverView>
              //           <p>{item.overview}</p>
              //       </Box_OverView>
              //     </Box_Discription>
              // </Card_Films>
            ))}
          </Box_Films>
        </Container>
      )
    }
  }