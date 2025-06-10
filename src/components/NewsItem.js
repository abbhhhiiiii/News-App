import React, { Component } from 'react';

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl } = this.props;
    return (
      <div className="my-3">
        <div className="card shadow-sm h-100 border-0 rounded-4 overflow-hidden">
          <img
            src={!imageUrl ? "https://wallpaperaccess.com/full/2112588.jpg" : imageUrl}
            className="card-img-top object-fit-cover"
            alt="News"
            style={{ height: '200px', objectFit: 'cover' }}
          />
          <div className="card-body d-flex flex-column">
            <h5 className="card-title fw-semibold text-dark">{title?.slice(0, 60) + "..."}</h5>
            <p className="card-text text-secondary">{description?.slice(0, 100) + "..."}</p>
            <a
              rel="noreferrer"
              href={newsUrl}
              target="_blank"
              className="btn btn-sm btn-outline-primary mt-auto align-self-start px-3 py-1 rounded-pill"
            >
              Read more →
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
