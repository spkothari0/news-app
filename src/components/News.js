import React, { Component } from 'react'
import NewsItem from './NewsItem'
// import CardGroup from './CardGroup'

export class News extends Component {
  constructor() {
    super();
    this.state = {
      article: [],
      loading: false
    }
  }

  async componentDidMount() {
    await fetch(
      "https://newsapi.org/v2/top-headlines?country=us&apiKey=2ae8aaeec03849c0af193bce13f96936")
      .then((res) => res.json())
      .then((json) => {
        // console.log(json, "--json response");
        if (json.status === "ok" && json.articles) {
          this.setState({ article: json.articles });
        }
      })
  }

  render() {
    return (
      <div className='container my-3'>
        <h1>News Today - Top Headlines</h1>
        <div className="row">
          {this.state.article.map((element) => {
            return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title} description={element.description}
                imageUrl={element.urlToImage} url={element.url} publishedAt={element.publishedAt} />
            </div>
          })}
        </div>
        {/* <CardGroup /> */}
      </div>
    )
  }
}

export default News
