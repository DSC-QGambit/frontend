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
            <p>Match #{index+1} - Analysis on the reddit thread on <b>'<a href={opinion['url']}>{opinion['source']}</a>'</b> suggests the following sentiments:</p>
            <p>Positive: {(opinion['pos'] * 100).toFixed(2) + '%'}
            &emsp; &emsp; 
            Negative: {(opinion['neg'] * 100).toFixed(2) + '%'}</p>
            <p>Summary of clustered takes:</p>
            {opinion['summary'].map((summaryItem, index) => (
                <p key={index}>{index+1}: {summaryItem}</p>
            ))}
            </div>
            : <div className="reddit-container">
                <p>Match #{index+1} - Analysis could not be done because there were no comments.</p>
            </div>
            }
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default RedditCarousel;
