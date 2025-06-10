import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export class News extends Component {
  static defaultProps = {
    pageSize: 8,
    category: 'general'
  }

  static propTypes = {
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    };
  }

  async updateNews(pageNo) {
    this.setState({ loading: true });
    let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&apiKey=ed6e2272af60462dba92c3d600d08eb3&page=${pageNo}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false,
      page: pageNo
    });
  }

  async componentDidMount() {
    this.updateNews(1);
  }

  handlePrevClick = () => {
    this.updateNews(this.state.page - 1);
  }

  handleNextClick = () => {
    if (this.state.page + 1 <= Math.ceil(this.state.totalResults / this.props.pageSize)) {
      this.updateNews(this.state.page + 1);
    }
  }

  render() {
    return (
      <div className='container my-4'>
        <h1 className='text-center fw-bold mb-4' style={{ fontFamily: 'Segoe UI', color: '#0d6efd' }}>
          🌍 ACP News - Global Top Headlines
        </h1>

        {this.state.loading && <Spinner />}

        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return (
              <div className="col-md-4 mb-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 60) + "..." : ""}
                  description={element.description ? element.description.slice(0, 90) + "..." : ""}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                />
              </div>
            )
          })}
        </div>

        <div className="container d-flex justify-content-between my-4">
          <button disabled={this.state.page <= 1} className="btn btn-outline-primary" onClick={this.handlePrevClick}>
            &larr; Previous
          </button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-outline-primary" onClick={this.handleNextClick}>
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
