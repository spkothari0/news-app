import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import moment from 'moment';

export class NewsItem extends Component {
  constructor() {
    super();
    this.state = {
      today: new Date(),
    }
  }

  calculateLastUpdated(publishedAt) {
    return moment(publishedAt).fromNow();
  }

  render() {
    let { title = "Empty", description = "Empty", imageUrl = "../news.jpg", url = "/", publishedAt = this.state.today, source = "unknows", author = "Unknown source" } = this.props;
    return (
      <div className="my-3">
        <Card>
          <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{ left: '90%', zIndex: '1' }} >
            {!author ? "unknown" : author}
          </span>
          <Card.Img variant="top" src={imageUrl} />
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>
              {description}
            </Card.Text>
            <Button variant="primary" href={url} target="_blank">See more</Button>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Published by {<strong>{!source ? "Unknows source" : source}</strong>} on {this.calculateLastUpdated(publishedAt)}</small>
          </Card.Footer>
        </Card>
      </div>
    )
  }
}

export default NewsItem
