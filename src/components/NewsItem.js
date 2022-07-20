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
    let { title = "Empty", description = "Empty", imageUrl = "../news.jpg", url = "/", publishedAt = this.state.today } = this.props;
    return (
      <div>
        <Card style={{ width: '22rem' }} className="my-3">
          <Card.Img variant="top" src={imageUrl} />
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>
              {description}
            </Card.Text>
            <Button variant="primary" href={url} target="_blank">See more</Button>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Last updated {this.calculateLastUpdated(publishedAt)}</small>
          </Card.Footer>
        </Card>
      </div>
    )
  }
}

export default NewsItem
