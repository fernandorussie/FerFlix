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
const Box_Serie = styled.div`
    width: 100%;
    margin:20px 0;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`
const Card_Serie = styled.div`
    width: 45%;
    margin:10px;
    padding:5px;
    display:flex;
    align-items: center;
    justify-content: space-evenly;
    background-color:white;
`
const Title_Serie = styled.p`
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
const Img_Serie = styled.img`
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
`
const Box_Discription = styled.div`
    width: 60%;
    margin:0 5px;
`

const apiSerie = axios.create({
  baseURL: "https://api.themoviedb.org/3/tv/popular?api_key=0beb9ac2fc4292144eeffa5c1b2bbcf2&language=pt-BR"
})

export default class Serie extends Component {
 
  state = {
    serieList: [],
    filterSerie: []
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
        poster_path: `https://image.tmdb.org/t/p/w200/${item.poster_path}`
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
      console.log(e.target.value)

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
            <Box_Header>
                <h1>Séries</h1>
                <SearchBar type="text" placeholder="Digite uma série"
                onChange={this.filter}
                />
            </Box_Header>
          <Box_Serie>
            {this.state.filterSerie.map((item) => (
              <Card_Serie>
                  <Box_Img>
                    <Img_Serie src={item.poster_path} alt={` Imagem da série ${item.name}`}/>
                  </Box_Img>
                  <Box_Discription>
                    <Title_Serie>{item.name}</Title_Serie>
                    <Box_OverView>
                        <p>{item.overview}</p>
                    </Box_OverView>
                  </Box_Discription>
                  
              </Card_Serie>
            ))}
          </Box_Serie>
        </Container>
    )
  }
}