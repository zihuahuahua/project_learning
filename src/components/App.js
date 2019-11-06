import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Header'
import Movie from './Movie'
import Search from './Search'

const MOVIE_API_URL = 'https://www.omdbapi.com/?s=man&apikey=4a3b711b'

const App = () => {
  const [loading, setLoading] = useState(true)
  const [movies, setMovies] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => { 
    // 类似 componentDidMount, componentDidUpdate 和 componentWillUnmount 的结合
    // useEffect 接受两个参数，一个是您要运行的函数，另一个是数组。在该数组中，只传入一个值，该值告诉React如果传入的值未更改，则跳过该函数
    fetch(MOVIE_API_URL).then(res => res.json()).then(jsonRes => {
      setMovies(jsonRes.Search)
      setLoading(false)
    })
  }, [])

  const search = searchValue => {
    setLoading(true)
    setErrorMessage(null)

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
      .then(res => res.json())
      .then(jsonRes => {
        if (jsonRes.Response === 'True') {
          setMovies(jsonRes.Search)
          setLoading(false)
        } else {
          setErrorMessage(jsonRes.Error)
          setLoading(false)
        }
      })
  }

  return (
    <div className="App">
      <Header text="HOOKED" />
      <Search search={search} />
      <p className="App-intro">Sharing a few of our favourite movies.</p>
      <div className="movies">
        {loading && !errorMessage ? (
          <span>loading...</span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
            movies.map((movie, index) => (
              <Movie key={`${index}-${movie.Title}`} movie={movie} />
            ))
          )}
      </div>
    </div>
  )
}

export default App;
