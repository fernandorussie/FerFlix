import React, { Component} from 'react'
import axios from "axios";
import Carousel from 'nuka-carousel';
import styled from 'styled-components'

const Container = styled.div`
width: 100%;
`
const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100vh;
`
const Title = styled.p`
  font-size: 4vw;
  font-weight: 700;
  color: white;
`
const Carousels = styled(Carousel)` 
  width: 100%;
  height: 60vh;
  background-color: ;
`
const Arrow = styled.svg`
  fill:#fff;
  opacity: 0;
  transition: 0.3s ease-in-out;
  cursor: pointer;
  &:hover{
    opacity: 1;
  }
`
const Fig = styled.figure`
height: ;
width: ;
margin: 18px;
padding: 18px;
`
const Img = styled.img`
  width: 28vw;
  border-radius: 10px;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.5);

  cursor: pointer;
  &:hover{
    transition: 250ms ease-out;
    transform: scale(1.1,1.1);
  }
`

const apiSerie = axios.create({
  baseURL: "https://api.themoviedb.org/3/tv/popular?api_key=0beb9ac2fc4292144eeffa5c1b2bbcf2&language=pt-BR"
})
const apiFilmes = axios.create({ 
  baseURL: "https://api.themoviedb.org/3/movie/popular?api_key=0beb9ac2fc4292144eeffa5c1b2bbcf2&language=pt-BR"
})
export default class Home extends Component {
  state = {
    serieList: [],
    filterSerie: [],
    filmList: [],
    filterFilm: [],
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

  // async componentDidMount() {
  //     this.getSeries();
  // }
  // getSeries = async () => {
  //   const response = await apiSerie.get()
  //   console.log(response)

  //   const series = response.data.results.map((item) => {
  //     return {
  //       ...item,
  //       backdrop_path: `https://image.tmdb.org/t/p/w400/${item.backdrop_path}`
  //     }
  //   })
  //   this.setState({
  //     serieList: series,
  //     filterSerie: series
  //   })
  // }
  render() {
    return (
      <Container>

        <Div>
          <Title>Veja aqui os melhores filmes da semana!</Title>
          <Carousels autoGenerateStyleTag={true} renderBottomCenterControls={false} wrapAround={true} slidesToShow={3} autoplay={true} autoplayInterval={2000} renderCenterLeftControls={({ previousSlide }) => (
                    <Arrow onClick={previousSlide} xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></Arrow>
                )}
                renderCenterRightControls={({ nextSlide }) => (
                    <Arrow onClick={nextSlide} 
                    xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></Arrow>
                )}
          >
            {this.state.filterFilm.map((item) => (
                <Fig>
                  <Img src={item.backdrop_path} alt={` Imagem do filme ${item.title}`}/>
                </Fig>
            ))}
          </Carousels>
        </Div>
        
        {/* <Div>
          <Title>Veja aqui as melhores séries da semana!</Title>
          <Carousels autoGenerateStyleTag={true} renderBottomCenterControls={false} wrapAround={true} slidesToShow={3} autoplay={true} autoplayInterval={2000} renderCenterLeftControls={({ previousSlide }) => (
                    <Arrow onClick={previousSlide} xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/></Arrow>
                    )}
                    renderCenterRightControls={({ nextSlide }) => (
                        <Arrow onClick={nextSlide} 
                        xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></Arrow>
                )}
          >
            {this.state.filterSerie.map((item) => (
                <Fig>
                  <Img src={item.backdrop_path} alt={` Imagem da série ${item.name}`}/>
                </Fig>
            ))}
          </Carousels>
        </Div> */}
      </Container>
    )
  }
}
