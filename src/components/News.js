import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import NewsItem from './NewsItem'
import Spinner from './Spinner';
// import data from '../SampleResponse.json'
import PropTypes from 'prop-types';
export class News extends Component {

  static defaultProps = {
    pageSize: 12,
    country: "in",
    category: "",
    apiKey: "12d9f25940b24a5883abba1976973099"
  }

  static propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string,
    apiKey: PropTypes.string,
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
    }
    document.title = `${this.capitalize((!this.props.category ? "general" : this.props.category) + " -")} NewsToday`
  }

  capitalize = (word) => {
    return word.toLowerCase().charAt(0).toUpperCase() + word.toLowerCase().slice(1);
  }

  async goToSite(url) {
    let newsUrl = url ? url : `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}&page=${this.state.page}`;

    await fetch(newsUrl)
      .then((res) => {
        if (res.ok)
          return res.json()
      })
      .then((json) => {
        if (json.articles) {
          this.setState({ articles: json.articles, loading: false, totalResults: json.totalResults });
        }
      })
  }
  async componentDidMount() {
    // console.log("componentDidMount")
    await this.goToSite();
  }

  handlePrevClick = async () => {
    // console.log("handlePrevClick")
    await this.setState({ page: this.state.page - 1, loading: true })  // its required to add await here otherwise goToSite will take older page no.
    this.goToSite()
  }
  handleNextClick = async () => {
    // console.log("handleNextClick")
    await this.setState({ page: this.state.page + 1, loading: true })  // its required to add await here otherwise goToSite will take older page no.
    this.goToSite();
  }

  render() {
    return (
      <div>
        {<div className='container my-3'>
          <h1 className='text-center' style={{ margin: '35px 0pm' }}>News Today - Top Headlines on {this.capitalize(!this.props.category ? "general" : this.props.category)}</h1>
          {this.state.loading && <Spinner />}
          <div className="row">
            {/* {console.log(this.props)} */}
            {!this.state.loading && this.state.articles.map((element) => {
              return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title} description={element.description}
                  imageUrl={!element.urlToImage ? "../news.jpg" : element.urlToImage} url={element.url}
                  publishedAt={element.publishedAt} source={element.source.name} author={element.author} />
              </div>
            })}
          </div>
          <div className="container d-flex justify-content-around my-3">
            <Button variant="dark" disabled={this.state.page <= 1} onClick={this.handlePrevClick}>&larr; Previous</Button>
            <Button variant="info">{this.state.page}</Button>
            <Button variant="dark" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} onClick={this.handleNextClick}>Next &rarr;</Button>
          </div>
        </div>}
      </div>
    )
  }
}

export default News
