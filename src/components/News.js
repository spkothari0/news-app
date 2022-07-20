import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import NewsItem from './NewsItem'
import Spinner from './Spinner';
// import data from '../SampleResponse.json'

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      // article: data.articles,
      loading: true,
      page: 1,
      url: "https://newsapi.org/v2/top-headlines?country=us&apiKey=2ae8aaeec03849c0af193bce13f96936"
    }
  }

  async goToSite(append) {
    let url = this.state.url + append;
    await fetch(url)
      .then((res) => res.json())
      .then((json) => {
        // console.log(json, "--json response");
        if (json.status === "ok" && json.articles) {
          this.setState({ articles: json.articles, loading: false });
        }
      })
  }
  async componentDidMount() {
    await this.goToSite(`&pageSize=${this.props.pageSize}&page=${this.state.page}`);
  }

  handlePrevClick = async () => {
    await this.setState({ page: this.state.page - 1, loading: true })  // its required to add await here otherwise goToSite will take older page no.
    this.goToSite(`&pageSize=${this.props.pageSize}&page=${this.state.page}`)
  }
  handleNextClick = async () => {
    await this.setState({ page: this.state.page + 1, loading: true })  // its required to add await here otherwise goToSite will take older page no.
    this.goToSite(`&pageSize=${this.props.pageSize}&page=${this.state.page}`);
  }

  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center'>News Today - Top Headlines</h1>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title} description={element.description}
                imageUrl={!element.urlToImage ? "../news.jpg" : element.urlToImage} url={element.url} publishedAt={element.publishedAt} />
            </div>
          })}
        </div>
        <div className="container d-flex justify-content-around my-3">
          <Button variant="dark" disabled={this.state.page <= 1} onClick={this.handlePrevClick}>&larr; Previous</Button>
          <Button variant="info">{this.state.page}</Button>
          <Button variant="dark" disabled={this.state.articles.length === 0} onClick={this.handleNextClick}>Next &rarr;</Button>
        </div>
      </div>
    )
  }
}

export default News
