import React, { useState, useEffect } from "react";
import "./list.css";
import "./article.css";
import Navbar from "../components/transition1/navbar/navbar.js";

const AllTimeFavorites = () => {
  const [articles, setArticles] = useState([]);
  const [articlesFetched, setArticlesFetched] = useState(false);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [post_title, setPost_title] = useState("");
  const [all_sides, setAll_sides] = useState({});
  const [reddit_opinion, setReddit_opinion] = useState({});
  const [sentimentsFetched, setSentimentsFetched] = useState(false);
  const [relevant, setRelevant] = useState(false);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/get-top-news-articles/', { method: 'GET' })
      .then(response => response.json())
      .then(json => {
        setArticles(json);
        console.log(json);
        setArticlesFetched(true);
      });
  }, []);

  const postArticle = (data) => {
    fetch('/post-selected-news-article/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => console.log(res));

    getRedditPublicOpinion(post_title);
    setSentimentsFetched(true);
  };

  const getRedditPublicOpinion = (data) => {
    fetch('/get-public-opinion-from-reddit/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => setReddit_opinion(data));
  };

  const getMediaBiasStats = async () => {
    try {
      const response = await fetch('https://political-bias-database.p.rapidapi.com/ASdata', {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'a316563259msh808280fd09a9419p1e1e98jsnf72eb1d4263b',
          'X-RapidAPI-Host': 'political-bias-database.p.rapidapi.com'
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseJson = await response.json();
      const article = articles.find(article => article.title === post_title);
      const pattern = new RegExp("^" + article.source + ".*$", "i");

      if (responseJson !== undefined) {
        const all_sides_data = responseJson.find(entry => pattern.test(entry.name));
        setAll_sides(all_sides_data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (post_title !== "") {
      postArticle(articles.find(data => data.title === post_title));
    }
  }, [post_title]);

  const handleClosePost = () => {
    setPost_title("");
    setSentimentsFetched(false);
  };

  const renderTextWithLineBreaks = (text) => {
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  const posts = articles.map(function (data, id) {
    return (
      <div key={id} className="newsposts" onClick={() => { setPost_title(data.title) }}>
        <div className="post-content">
          <img src={data.top_image} className="post_image" alt="" />
          <h3 className="post_date">{data.published.substring(0, 10)}</h3>
          <h4 className="post_title">{data.title}</h4>
        </div>
      </div>
    );
  });

  const post = articles.map((data, id) => {
    if (data.title === post_title) {
      return (
        <div key={id} className="individual_post">
          <div className="post-container">
            <h3 className="individual_post_title">{data.title}
              <i className="material-icons" style={{ float: 'right', marginTop: '1px' }} onClick={handleClosePost}>
                close
              </i>
            </h3>
            <hr className="individual_post_hr" />

            <div className="image-and-text-container">
              <div className="image-container">
                <img className="article_image" src={data.top_image} alt="" />
              </div>
              <div className="text-container">
                <p className="individual_post_desc">{renderTextWithLineBreaks(data.text)}</p>
              </div>
            </div>

            <div className="sentiment-container">
              {all_sides ? (
                <div className="all-sides-container">
                  <p><b>Data about news source ({data.source}) from AllSides:</b></p>
                  <p>Bias: {all_sides.bias ? all_sides.bias : "Unavailable"}</p>
                  <p>Confidence: {all_sides.confidence ? all_sides.confidence : "Unavailable"}</p>
                  <p>{all_sides.agreement ? all_sides.agreement : "Unavailable"} raters agree with these scores while {all_sides.disagreement ? all_sides.disagreement : "Unavailable"} disagree.</p>
                </div>
              ) : null}

              {reddit_opinion ? (
                <div className="reddit-container">
                  <p><b>Analysis on the reddit thread on '{reddit_opinion['source']}' suggests the following sentiments:</b></p>
                  <p>Positive: {reddit_opinion['pos'] ? (reddit_opinion['pos'] * 100).toFixed(2) + '%' : "Unavailable"}</p>
                  <p>Neutral: {reddit_opinion['neu'] ? (reddit_opinion['neu'] * 100).toFixed(2) + '%' : "Unavailable"}</p>
                  <p>Negative: {reddit_opinion['neg'] ? (reddit_opinion['neg'] * 100).toFixed(2) + '%' : "Unavailable"}</p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      );
    }
    return null;
  });

  const AllPosts = React.memo(() => {
    return (
      <div className="allposts">
        <h3 className="section_name">Trending Topics</h3>
        {posts}
      </div>
    );
  });

  const IndividualPost = React.memo(() => {
    return (
      <div className="individual">
        <div className="main_container">
          {post}
        </div>
      </div>
    );
  });

  const Loader = React.memo(() => {
    return <div className="loader"></div>;
  });

  return (
    <div className="list_container">
      <div className="list_page">
        <Navbar />
        {console.log(sentimentsFetched)}
        {console.log(post_title)}

        {post_title === "" && articlesFetched ? (
        <AllPosts />
      ) : post_title !== "" && sentimentsFetched ? (
        <IndividualPost />
      ) : (
        <Loader />
      )}

      </div>
    </div>
  );
};

export default AllTimeFavorites;

