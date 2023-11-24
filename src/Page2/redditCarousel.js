import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './article.css'

const RedditCarousel = ({ redditOpinions }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    color: 'pink',
  };

  return (
    <div className="reddit-carousel-container">
      <Slider {...settings}>
        {redditOpinions.map((opinion, index) => (
          <div key={index}>
            {opinion['pos']!==0.0 || opinion['neg']!==0.0 || opinion['neu']!==0.0 ?
            <div className="reddit-container">
            <p>[Reddit Posts] Match #{index+1} - <a href={opinion['url']}>{opinion['source']}</a></p>
            <button>Positive Sentiments: {(opinion['pos'] * 100).toFixed(2) + '%'}</button>
            <button>Neutral Sentiments: {((1 - opinion['pos'] - opinion['neg']) * 100).toFixed(2) + '%'}</button>
            <button>Negative Sentiments: {(opinion['neg'] * 100).toFixed(2) + '%'}</button>
            <h3>Summary of Clustered Opinions</h3>
            {opinion['summary'].map((summaryItem, index) => (
                <p key={index}>{index+1}: {summaryItem}</p>
            ))}
            <p className="footnote-style">Note: If the listed posts don't appear relavant, then there have been no reddit threads on similar topics at <a href="https://www.reddit.com/r/news">r/news</a> or <a href="https://www.reddit.com/r/news">r/worldnews</a> in the past month.</p>
            </div>
            : <div className="reddit-container">
                <p>[Reddit Posts] Match #{index+1} - Analysis could not be done because there were no comments under <a href={opinion['url']}>{opinion['source']}</a> reddit post.</p>
                <p className="footnote-style">Note: If the listed posts don't appear relavant, then there have been no reddit threads on similar topics at <a href="https://www.reddit.com/r/news">r/news</a> or <a href="https://www.reddit.com/r/news">r/worldnews</a> in the past month.</p>
            </div>
            }
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default RedditCarousel;
