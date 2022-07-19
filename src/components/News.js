import React, { Component } from 'react'
import NewsItem from './NewsItem'
import data from '../SampleResponse.json'
// import CardGroup from './CardGroup'

export class News extends Component {
  article = data.articles;
  constructor() {
    super();
    this.state = {
      article: this.article,
      loading: false
    }
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
