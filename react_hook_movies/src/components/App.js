import React, { useState, useEffect, useReducer } from 'react';
import './App.css';
import Header from './Header'
import Movie from './Movie'
import Search from './Search'

const MOVIE_API_URL = 'https://www.omdbapi.com/?s=man&apikey=4a3b711b'

const initialState = {
  loading: true,
  movies: [],
  errorMessage: null
}
const reducer = (state, action) => {
  switch (action.type) {
    case 'SEARCH_MOVIES_REQUEST':
      return {
        ...state,
        loading: true,
        errorMessage: null
      }
    case 'SEARCH_MOVIES_SUCCESS':
      return {
        ...state,
        loading: false,
        movies: action.payload
      }
    case 'SEARCH_MOVIES_FAIL':
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      }
    default:
      return state;
  }
}
const App = () => {
  // const [loading, setLoading] = useState(true)
  // const [movies, setMovies] = useState([])
  // const [errorMessage, setErrorMessage] = useState(null)

  // 多个 useState 有相关的功能，可以利用 useReducer 进行组合
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    // 类似 componentDidMount, componentDidUpdate 和 componentWillUnmount 的结合
    // useEffect 接受两个参数，一个是您要运行的函数，另一个是数组。在该数组中，只传入一个值，该值告诉 React 如果传入的值未更改，则跳过该函数
    fetch(MOVIE_API_URL).then(res => res.json()).then(jsonRes => {
      // setMovies(jsonRes.Search)
      // setLoading(false)
      dispatch({
        type: 'SEARCH_MOVIES_SUCCESS',
        payload: jsonRes.Search
      })
    })
  }, [])

  const search = searchValue => {
    // setLoading(true)
    // setErrorMessage(null)
    dispatch({
      type: 'SEARCH_MOVIES_REQUEST',
    })

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
      .then(res => res.json())
      .then(jsonRes => {
        if (jsonRes.Response === 'True') {
          // setMovies(jsonRes.Search)
          // setLoading(false)
          dispatch({
            type: 'SEARCH_MOVIES_SUCCESS',
            payload: jsonRes.Search
          })
        } else {
          // setErrorMessage(jsonRes.Error)
          // setLoading(false)
          dispatch({
            type: 'SEARCH_MOVIES_FAIL',
            payload: jsonRes.Error
          })
        }
      })
  }

  const { movies, loading, errorMessage } = state

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
