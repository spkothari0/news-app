import React, { useEffect, useState } from 'react';
// import Button from 'react-bootstrap/Button';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export default function News(props) {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  document.title = `${capitalize((!props.category ? "general" : props.category) + " -")} NewsToday`

  function capitalize(word) {
    return word.toLowerCase().charAt(0).toUpperCase() + word.toLowerCase().slice(1);
  }

  async function goToSite(url) {
    props.setProgress(0);
    let newsUrl = url ? url : `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${page}`;
    // setLoading(true);
    console.log(newsUrl, "the news url in gotosite");
    await fetch(newsUrl)
      .then((res) => {
        props.setProgress(30);
        if (res.ok) {
          props.setProgress(70);
          return res.json();
        }
        else {
          props.setProgress(70);
          return false;
        }
      })
      .then((json) => {
        if (json.articles) {
          setArticles(json.articles);
          setLoading(false);
          setTotalResults(json.totalResults);
        }
      })
    props.setProgress(100);
  }

  useEffect(() => {
    goToSite();
  }, [])

  async function handlePrevClick() {
    setPage(page - 1);
    setLoading(true);

  }
  function handleNextClick() {
    setPage(page + 1);
    setLoading(true);
  }

  async function fetchMoreData(url) {

    let newsUrl = url ? url : `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${page + 1}`;
    setPage(page + 1);
    setLoading(true);
    console.log(newsUrl, "->in fetchMoreData");
    fetch(newsUrl)
      .then((res) => {
        if (res.ok)
          return res.json()
      })
      .then((json) => {
        if (json.articles) {
          setArticles(articles.concat(json.articles));
          setLoading(false);
        }
      })
  }

  return (
    <>
      {/* <div className='container my-3'> */}
      <h1 className='text-center my-3' style={{ margin: '35px 0pm' }}>News Today - Top Headlines on {capitalize(!props.category ? "general" : props.category)}</h1>
      {loading && <Spinner />}
      <InfiniteScroll
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
      </InfiniteScroll>
      {/* <div className="container d-flex justify-content-around my-3">
        <Button variant="dark" disabled={page <= 1} onClick={handlePrevClick}>&larr; Previous</Button>
        <Button variant="info">{page}</Button>
        <Button variant="dark" disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} onClick={handleNextClick}>Next &rarr;</Button>
      </div> */}
      {/* </div> */}
    </>
  )

}

News.defaultProps = {
  pageSize: 12,
  country: "in",
  category: "",
}

News.propTypes = {
  pageSize: PropTypes.number,
  country: PropTypes.string,
  category: PropTypes.string,
  // apiKey: PropTypes.string,
}