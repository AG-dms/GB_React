import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'reactstrap';
import Container from '@material-ui/core/Container';
import Pagination from '@material-ui/lab/Pagination';
import CircularProgress from '@material-ui/core/CircularProgress';
import {useDispatch, useSelector} from 'react-redux';
import {selectArticlesLoading, selectArticles} from '../../store/news/selectors';
import {getArticles} from '../../store/news/actions';

function News() {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.news.request.error);
  const progress = useSelector(selectArticlesLoading);
  const news = useSelector(selectArticles);

  const reload = () => {
    dispatch(getArticles());
  };

  useEffect(() => {
    reload();
  }, []);

  //ПАГИНАЦИЯ
  // Делаем массив с новостями которые будем отображать в текущий момент с пагинацией
  // Определяем текущую станицу
  const [curPage, setCurPage] = useState(1);
  const handleChange = (event, value) => {
    setCurPage(value);
  };
  // Задаем желаемое количество новостей на одной странице и находим длину пагинации
  const amountPage = 10;
  const lastPage = Math.ceil(news.length / amountPage);

  // Создаем массив с текущими новостями (по 10 штук на страницу, формируется из стора всех новостей)
  const [curNews, setCurNews] = useState([]);
  useEffect(() => {
    setCurNews(news.slice(amountPage * (curPage - 1), amountPage * (curPage - 1) + amountPage));
  }, [news, curPage]);

  return (
    <Container>
      <Link to='/'>
        <Button color='secondary'>На главную</Button>
      </Link>
      <h2>News</h2>
      {progress && <CircularProgress />}
      {error ? (
        <>
          <h3>{error.message}</h3>
          <Button onClick={reload}>Refresh</Button>
        </>
      ) : (
        curNews.map((item) => {
          return (
            <article key={item.id}>
              <h4>{item.title}</h4>
            </article>
          );
        })
      )}
      <Pagination count={lastPage} page={curPage} onChange={handleChange} />
    </Container>
  );
}

export default News;
