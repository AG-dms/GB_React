import axios from "axios";
export const GET_ARTICLES_PENDING = 'ARTICLES::GET_ARTICLES_PENDING';
export const GET_ARTICLES_SUCSESS = 'ARTICLES::GET_ARTICLES_SUCSESS';
export const GET_ARTICLES_FAILURE = 'ARTICLES::GET_ARTICLES_GET_ARTICLES_FAILURE';

const getArticlesPending = () => ({
  type: GET_ARTICLES_PENDING
})

const getArticlesSucsess = (articles) => ({
  type: GET_ARTICLES_SUCSESS,
  payload: articles
})
const getArticlesFailure = (error) => ({
  type: GET_ARTICLES_FAILURE,
  payload: error
})

export const getArticles = () => (dispatch) => {
  dispatch(getArticlesPending());
  const fetchData = async () => {
    await axios
      .get(`https://jsonplaceholder.typicode.com/posts`)
      .then((res) => {
        dispatch(getArticlesSucsess(res.data));
      })
      .catch((error) => {
        dispatch(getArticlesFailure(error));
      })
  };
  fetchData();

}