import axios from "axios";
import { API_KEY } from "../constant";

export const SEARCH_API_CALL_SUCCESS = 'SEARCH_API_CALL_SUCCESS';
export const SEARCH_API_CALL_FAILURE = 'SEARCH_API_CALL_FAILURE';
export const ONSEARCH_INPUT = 'ONSEARCH_INPUT';
export const API_CALL = 'API_CALL'
export const CHANGE_PAGE = 'CHANGE_PAGE'

export const onSearchInput = (payload) => {
  return {
    type: ONSEARCH_INPUT,
    payload
  }
  
}

export const apiCall = (payload) => ({
  type: API_CALL
})

export const searchApiSuccess = (payload) => ({
  type: SEARCH_API_CALL_SUCCESS,
  payload
})

export const searchApiFailure = (payload) => ({
  type: SEARCH_API_CALL_FAILURE,
  payload
})

export const searchApiCall = (payload) => (dispatch) => {
  const today = new Date();
const str = today.toGMTString();
  dispatch(apiCall())
  const url = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${payload.searchedValue}&limit=30&offset=${payload.offset}&apikey=${API_KEY}`
  axios({
    method: 'GET',
    url: url,
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(res => {
    dispatch(searchApiSuccess(res.data.data))
  }).catch(err => {
    dispatch(searchApiFailure(err.message))
  })
}

export const changePagination = (payload) => ({
  type: CHANGE_PAGE,
  payload
})


