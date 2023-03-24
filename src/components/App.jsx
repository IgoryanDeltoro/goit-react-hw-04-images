import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import ImageGallery from './imageGallery/ImageGallery';
import Searchbar from './searchbar/Searchbar';
import Loading from 'components/loading/Loading';
import apiQueries from 'components/servise/apiQueries';
import modal from 'components/modal/modal';
import { animateScroll } from 'react-scroll';
import Button from 'components/button/Button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState('');
  const [totalPaginate, setTotalPaginate] = useState(0);

  useEffect(() => {
    window.addEventListener('click', hendleOpeningModal);
    return () => window.removeEventListener('click', hendleOpeningModal);
  });

  useEffect(() => {
    if (searchValue !== '') {
      setIsLoading(true);
      hendleRequest();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, page]);

  const hendleRequest = async () => {
    try {
      const response = await apiQueries(searchValue, page);
      setTotalPaginate(Math.ceil(response.totalHits / 12));
      if (response.hits.length === 0) {
        toast('Sorry, There are no images!');
      }
      setArticles(prevState => [...prevState, ...response.hits]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const hendleOnSubmit = searchValue => {
    setSearchValue(searchValue);
    setArticles([]);
    setPage(1);
  };

  const hendleOpeningModal = event => {
    const { src } = event.target;
    if (event.target.nodeName === 'IMG') {
      const filtred = articles.find(el => el.webformatURL === src);
      modal(filtred);
    }
  };

  const hendleLoadMore = () => {
    setPage(prevState => prevState + 1);
    smoothScroll();
  };

  const smoothScroll = () => {
    animateScroll.scrollToBottom({
      duration: 1000,
      delay: 10,
      smooth: 'linear',
    });
  };

  return (
    <>
      <Searchbar onSubmit={hendleOnSubmit} />
      <ImageGallery articles={articles} />
      <Loading pending={isLoading} />
      {page < totalPaginate && (
        <> {!isLoading && <Button loadMore={hendleLoadMore} />}</>
      )}
      <ToastContainer />
    </>
  );
};

export default App;
