import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export class News extends Component {
  static defaultProps = {
    pageSize: 8,
    category: 'general',
    countryCode: 'in'
  }

  static propTypes = {
    pageSize: PropTypes.number,
    category: PropTypes.string,
    countryCode: PropTypes.string
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
  console.log("Fetching page:", pageNo);
  this.setState({ loading: true });

  let url = `https://gnews.io/api/v4/top-headlines?category=${this.props.category}&lang=en&country=${this.props.countryCode}&max=${this.props.pageSize}&apikey=05742e604c676a4bdb9ef7d1e89d6ba6&page=${pageNo}`;
  
  let data = await fetch(url);
  let parseData = await data.json();
  console.log("API Response:", parseData);

  this.setState({
    articles: parseData.articles || [],
    totalResults: parseData.totalArticles || 0,
    loading: false,
    page: pageNo
  });
}

  async componentDidMount() {
    this.updateNews(1);
  }

  handlePrevClick = () => {
    if (this.state.page > 1) {
      this.updateNews(this.state.page - 1);
    }
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
          {!this.state.loading && this.state.articles && this.state.articles.map((element) => {
            return (
              <div className="col-md-4 mb-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 60) + "..." : ""}
                  description={element.description ? element.description.slice(0, 90) + "..." : ""}
                  imageUrl={element.image} // ✅ GNews uses 'image' not 'urlToImage'
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
