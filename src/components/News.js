import React, { Component } from 'react'
// import Button from 'react-bootstrap/Button';
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {

  static defaultProps = {
    pageSize: 12,
    country: "in",
    category: "",
    // apiKey: "d093053d72bc40248998159804e0e67d"
  }

  static propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string,
    // apiKey: PropTypes.string,
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    }
    document.title = `${this.capitalize((!this.props.category ? "general" : this.props.category) + " -")} NewsToday`
  }

  capitalize = (word) => {
    return word.toLowerCase().charAt(0).toUpperCase() + word.toLowerCase().slice(1);
  }

  async goToSite(url) {
    this.props.setProgress(0);
    let newsUrl = url ? url : `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}&page=${this.state.page}`;

    await fetch(newsUrl)
      .then((res) => {
        // console.log(newsUrl, "->in gotosite");
        this.props.setProgress(30);
        if (res.ok) {
          this.props.setProgress(70);
          return res.json();
        }
        else {
          this.props.setProgress(70);
          return false;
        }

      })
      .then((json) => {
        if (json.articles) {
          this.setState({
            articles: json.articles,
            loading: false,
            totalResults: json.totalResults
          });
        }
      })
    this.props.setProgress(100);
  }
  async componentDidMount() {
    await this.goToSite();
  }

  handlePrevClick = async () => {
    this.setState({ page: this.state.page - 1, loading: true }, () => { this.goToSite() })  // its required to add await here otherwise goToSite will take older page no.

  }
  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1, loading: true }, () => { this.goToSite() })  // its required to add await here otherwise goToSite will take older page no.
  }

  fetchMoreData = async (url) => {
    await this.setState({ page: this.state.page + 1 }, () => {
      let newsUrl = url ? url : `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}&page=${this.state.page}`;
      fetch(newsUrl)
        .then((res) => {
          if (res.ok)
            return res.json()
        })
        .then((json) => {
          if (json.articles) {
            this.setState({ articles: this.state.articles.concat(json.articles) });
          }
        })
    })
  }

  render() {
    return (
      <>
        {/* <div className='container my-3'> */}
        <h1 className='text-center' style={{ margin: '35px 0pm' }}>News Today - Top Headlines on {this.capitalize(!this.props.category ? "general" : this.props.category)}</h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.totalResults !== this.state.articles.length}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
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
            <Button variant="dark" disabled={this.state.page <= 1} onClick={this.handlePrevClick}>&larr; Previous</Button>
            <Button variant="info">{this.state.page}</Button>
            <Button variant="dark" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} onClick={this.handleNextClick}>Next &rarr;</Button>
          </div> */}
        {/* </div> */}
      </>
    )
  }
}

export default News
