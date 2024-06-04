import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from 'prop-types';
export default function News(props) {
  const { country, category } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [hasArticle, setHasArticle] = useState(true);
  document.title = `${capitalize((!category ? "general" : category) + " -")} NewsToday`;

  function capitalize(word) {
    return word.toLowerCase().charAt(0).toUpperCase() + word.toLowerCase().slice(1);
  }

  async function goToSite(url) {
    props.setProgress(0);
    let newsUrl = url ? url : `https://newsapi.org/v2/top-headlines?country=${country}&category=${category ? category : 'general'}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${page}`;
    await fetch(newsUrl)
      .then((res) => {
        props.setProgress(30);
        if (res.ok) {
          props.setProgress(70);
          return res.json();
        } else {
          props.setProgress(70);
          return false;
        }
      })
      .then((json) => {
        if (json.articles) {
          setArticles(json.articles);
          setLoading(false);
          setTotalResults(json.totalResults);
          setHasArticle(true);
        }
        else {
          setArticles([]);
          setLoading(false);
          setTotalResults(0);
          setHasArticle(false);
        }
          
      });
    props.setProgress(100);
  }

  useEffect(() => {
    goToSite();
  }, [country, category]);

  async function fetchMoreData(url) {
    let newsUrl = url ? url : `https://newsapi.org/v2/top-headlines?country=${country}&category=${category ? category : 'general'}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${page + 1}`;
    setPage(page + 1);
    setLoading(true);
    fetch(newsUrl)
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((json) => {
        if (json.articles) {
          setArticles(articles.concat(json.articles));
          setLoading(false);
        }
      });
  }

  return (
    <>
      <h1 className='text-center my-3' style={{ margin: '35px 0pm' }}>News Today - Top Headlines on {capitalize(!category ? "general" : category)}</h1>
      {loading && <Spinner />}
      {hasArticle && <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={totalResults !== articles.length}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title} description={element.description}
                  imageUrl={!element.urlToImage ? "https://mixkit.imgix.net/video-templates/preview/mixkit-news-logo-reveal-784-1.jpg?q=80&auto=format%2Ccompress" : element.urlToImage} url={element.url}
                  publishedAt={element.publishedAt} source={element.source.name} author={element.author} />
              </div>
            })}
          </div>
        </div>
      </InfiniteScroll>}
      {!hasArticle && <h2 className='text-center'>No article found</h2>}
    </>
  );
}

News.defaultProps = {
  pageSize: 12,
};

News.propTypes = {
  pageSize: PropTypes.number,
  apiKey: PropTypes.string.isRequired,
  setProgress: PropTypes.func.isRequired,
};
