import axios from "axios";
export const GET_ARTICLES_PENDING = 'ARTICLES::GET_ARTICLES_PENDING';
export const GET_ARTICLES_SUCSESS = 'ARTICLES::GET_ARTICLES_SUCSESS';
export const GET_ARTICLES_FAILURE = 'ARTICLES::GET_ARTICLES_GET_ARTICLES_FAILURE';

export const getArticlesPending = () => ({
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
    try {
      const res = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
      dispatch(getArticlesSucsess(res.data));
      console.log(res.data)
    } catch (error) {
      dispatch(getArticlesFailure(error));
    }
  };
  fetchData();

}