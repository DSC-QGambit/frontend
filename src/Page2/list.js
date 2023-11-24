import React, { useState, useEffect } from "react";
import "./list.css";
import "./article.css";
import Navbar from "../components/transition1/navbar/navbar.js";
import RedditCarousel from "./redditCarousel";

const AllTimeFavorites = () => {
  const [articles, setArticles] = useState([]);
  const [articlesFetched, setArticlesFetched] = useState(false);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [post_title, setPost_title] = useState("");
  const [post_desc, setPost_desc] = useState("");
  const [allSides, setAllSides] = useState({});
  const [MBFCData, setMBFCData] = useState({});
  const [reddit_opinion, setReddit_opinion] = useState({});

  useEffect(() => {
    const localStorageKey = 'top_news_articles';
    const localStorageTimestampKey = 'top_news_articles_timestamp';

    const localStorageData = localStorage.getItem(localStorageKey);
    const localStorageTimestamp = localStorage.getItem(localStorageTimestampKey);

    if (localStorageData && localStorageTimestamp) {
      const cachedArticles = JSON.parse(localStorageData);
      const timestamp = new Date(localStorageTimestamp);

      // Check if the data is less than half a day old
      const ageInDays = Math.floor((new Date() - timestamp) / (1000 * 60 * 60 * 24));
      if (ageInDays <= 0.5) {
        console.log(ageInDays)
        setArticles(cachedArticles);
        setArticlesFetched(true);
        return;
      }
    }

    fetch('https://news-article-extraction.streamlit.app:8888/get-top-news-articles/', { method: 'GET' })
    // fetch('http://127.0.0.1:5000/get-top-news-articles/', { method: 'GET' })
      .then((response) => response.json())
      .then((json) => {
        setArticles(json);
        setArticlesFetched(true);
        localStorage.setItem(localStorageKey, JSON.stringify(json));

        const currentTimestamp = new Date().toISOString();
        localStorage.setItem(localStorageTimestampKey, currentTimestamp);
      })
      .catch((error) => {
        console.error('Error fetching top news articles:', error);
      });

    // Data not found in localStorage or is older than 15 days, fetch from the API
    fetch('https://news-article-extraction.streamlit.app/get-top-news-articles/', { method: 'GET' })
    // fetch('http://127.0.0.1:5000/get-top-news-articles/', { method: 'GET' })
      .then((response) => response.json())
      .then((json) => {
        setArticles(json);
        setArticlesFetched(true);
        localStorage.setItem(localStorageKey, JSON.stringify(json));

        const currentTimestamp = new Date().toISOString();
        localStorage.setItem(localStorageTimestampKey, currentTimestamp);
      })
      .catch((error) => {
        console.error('Error fetching top news articles:', error);
      });
  }, []);


  // useEffect(() => {
  //   fetch('http://127.0.0.1:5000/get-top-news-articles/', { method: 'GET' })
  //     .then(response => response.json())
  //     .then(json => {
  //       setArticles(json);
  //       setArticlesFetched(true);
  //     });
  // }, []);

  useEffect(() => {
    if (post_title !== "") {
      getArticleData(articles.find(data => data.title === post_title));
    }
  }, [post_title]);

  const getArticleData = (data) => {
    getArticleSummary(data.text);
    getRedditPublicOpinion(post_title);
    getRelatedArticles(data);
    getAllSidesStats();
    getMBFCStats();
  };

  const getArticleSummary = (data) => {
    fetch('http://127.0.0.1:5000/get-article-summary/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => setPost_desc(data))
  };

  const getRedditPublicOpinion = (data) => {
    fetch('http://127.0.0.1:5000/get-public-opinion-from-reddit/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => setReddit_opinion(data));
  };

  const getRelatedArticles = (data) => {
    fetch('http://127.0.0.1:5000/get-related-articles/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => setRelatedArticles(data))
  };

  const getAllSidesStats = async () => {
    try {
      const localStorageKey = 'political_bias_data';
      const localStorageData = localStorage.getItem(localStorageKey);
  
      if (localStorageData) {
        // console.log("found")
        const allSidesJson = JSON.parse(localStorageData);
        const article = articles.find((article) => article.title === post_title);
        const pattern = new RegExp(`^${article.source}.*$`, 'i');
        const allSidesData = allSidesJson.find((entry) => pattern.test(entry.name));
        if (allSidesData !== undefined) {
          setAllSides(allSidesData);
        } else {
          console.error('Matching entry not found.');
        }
        return;
      }
  
      // Data not found in localStorage, fetch from the API
      const response = await fetch('https://political-bias-database.p.rapidapi.com/ASdata', {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '9c542f7a75msh570705e86f037cfp1ec215jsndba0823c6d94',
          'X-RapidAPI-Host': 'political-bias-database.p.rapidapi.com',
        },
      });

      // console.log("not found")
  
      if (!response.ok) {
        setAllSides({
          bias: 'Unavailable',
          confidence: 'Unavailable',
          agreement: 'Unavailable',
          disagreement: 'Unavailable',
        });
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const responseJson = await response.json();
      const article = articles.find((article) => article.title === post_title);
      const pattern = new RegExp(`^${article.source}.*$`, 'i');
  
      if (responseJson !== undefined) {
        const allSidesData = responseJson.find((entry) => pattern.test(entry.name));
        if (allSidesData !== undefined) {
          // allSidesData.timestamp = new Date().toISOString();
          localStorage.setItem(localStorageKey, JSON.stringify(responseJson));
          setAllSides(allSidesData);
        } else {
          console.error('Matching entry not found.');
        }
      }
    } catch (error) {
      console.error(error);
    }
  };  

  const getMBFCStats = async () => {
    try {
      const localStorageKey = 'political_bias_mbfc_data';
      const localStorageData = localStorage.getItem(localStorageKey);
  
      if (localStorageData) {
        // console.log("found")
        const MBFCJson = JSON.parse(localStorageData);
        const article = articles.find((article) => article.title === post_title);
        const pattern = new RegExp(`^${article.source}.*$`, 'i');
        const MBFCData = MBFCJson.find((entry) => pattern.test(entry.name));
        if (MBFCData !== undefined) {
          setMBFCData(MBFCData)
        } else {
          console.log('Matching AllSides entry not found.');
          setMBFCData({
            bias: 'Unavailable',
            credibility: 'Unavailable',
            factual: 'Unavailable',
          });
        }
        return;
      }
  
      // Data not found in localStorage, fetch from the API
      const response = await fetch('https://political-bias-database.p.rapidapi.com/MBFCdata', {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '9c542f7a75msh570705e86f037cfp1ec215jsndba0823c6d94',
          'X-RapidAPI-Host': 'political-bias-database.p.rapidapi.com',
        },
      });

      // console.log("not found")
  
      if (!response.ok) {
        setMBFCData({
          bias: 'Unavailable',
          credibility: 'Unavailable',
          factual: 'Unavailable',
        });
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const responseJson = await response.json();
      const article = articles.find((article) => article.title === post_title);
      const pattern = new RegExp(`^${article.source}.*$`, 'i');
  
      if (responseJson !== undefined) {
        const MBFCData = responseJson.find((entry) => pattern.test(entry.name));
        if (MBFCData !== undefined) {
          // MBFCData.timestamp = new Date().toISOString();
          localStorage.setItem(localStorageKey, JSON.stringify(responseJson));
          setMBFCData(MBFCData);
        } else {
          console.log('Matching MBFC entry not found.');
          setMBFCData({
            bias: 'Unavailable',
            credibility: 'Unavailable',
            factual: 'Unavailable',
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };  

  const handleClosePost = () => {
    setPost_title("");
    setPost_desc("");
    setReddit_opinion({});
    setAllSides({});
    setMBFCData({});
    setRelatedArticles([]);
  };

  function caps(str) {
    return str.replace(/(?<=(?:^|[.?!])\W*)[a-z]/g, i => i.toUpperCase())
  }

  const Loader = React.memo(({height}) => {
    return <div className="loader-container" style={{height:height}}>
    <div className="loader"></div>
  </div>;
  });

  const posts = articles.map(function (data, id) {
    return (
      <div key={id} className="newsposts" onClick={() => { setPost_title(data.title) && setPost_desc(data.desc) }}>
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
            <h2 className="individual_post_title">{data.title}
              <i className="material-icons" style={{ float: 'right'}} onClick={handleClosePost}>
                close
              </i>
            </h2>
            <hr className="individual_post_hr" />

            <div className="image-and-text-container">
              <div className="image-container">
                <img className="article_image" src={data.top_image} alt="" />
              </div>
              <div className="text-container">
                <h3>Summary</h3>
                {post_desc!=="" ? <p className="individual_post_desc">{caps(post_desc)}</p> : <p className="footnote-style">Please wait...</p> }
                <p className="individual_post_desc">View the full story from {data.source} <a href={data.link}>here</a>.</p>
              </div>
            </div>

            <div className="sentiment-container">
              {Object.keys(allSides).length !== 0 && Object.keys(MBFCData).length !== 0 ? (
                <div className="all-sides-container">
                  <h3>News Source Bias from AllSides</h3>
                  <button>Bias: {allSides.bias ? allSides.bias : "Unavailable"}</button> &emsp;
                  <button>Confidence: {allSides.confidence ? allSides.confidence.replace("rating", "").trim() : "Unavailable"}</button>
                  {/* <p>Note: {allSides.agreement ? allSides.agreement : "Unavailable"} rater{allSides.agreement!=1?"s":null} agree{allSides.agreement==1?"s":null} with these scores while {allSides.disagreement ? allSides.disagreement : "Unavailable"} disagree{allSides.disagreement==1?"s":null}.</p> */}
                  <p className="footnote-style">
                    Note: {allSides.agreement ? `${allSides.agreement} rater${allSides.agreement !== 1 ? 's' : ''}` : 'Unavailable'}{' '}
                    agree{allSides.agreement === 1 ? 's' : ''} with these scores while{' '}
                    {allSides.disagreement ? `${allSides.disagreement} disagree${allSides.disagreement === 1 ? 's' : ''}` : 'Unavailable'}.
                  </p>
                  {/* <hr className="individual_post_hr"/> */}
                  <h3>News Source Bias from Media Bias Fact Check (MBFC)</h3>
                  <button>Bias: {MBFCData.bias ? MBFCData.bias : "Unavailable"}</button>
                  <button>Credibility: {MBFCData.credibility ? MBFCData.credibility.replace("credibility", "").trim() : "Unavailable"}</button>
                  <button>Factual: {MBFCData.factual ? MBFCData.factual : "Unavailable"}</button>
                  {relatedArticles.length!==0 ? 
                  <ul>
                  {/* <hr className="individual_post_hr"/> */}
                  <h3>Related Articles</h3>
                  {relatedArticles.map((summaryItem, index) => (
                      <li key={index} className="footnote-style">{index+1}. <a href={summaryItem['url']}>{summaryItem['title'].substring(0, 65)}{summaryItem['title'].length>65?"...":null}</a></li>
                  ))}
                  </ul>
                   : <p className="footnote-style"><br/>Any recent related articles, if found, will be listed shortly.</p>}
                </div>
              ) : (
                <div className="all-sides-container">
                  <p>[Fetching AllSides Data...]</p>
                <Loader height='25vh'/>
                </div>
              )}

              {Object.keys(reddit_opinion).length !== 0 ? (
                  <RedditCarousel redditOpinions={reddit_opinion} />
                ) : (
                  <div className="reddit-carousel-container">
                  <p>[Fetching Reddit Data...]</p>
                    <Loader height='25vh'/>
                  </div>
                )}
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
        <h3 className="section_name">Latest News</h3>
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

  return (
    <div className="list_container">
      <div className="list_page">
        <Navbar />

        {post_title === "" && articlesFetched ? (
        <AllPosts />
      ) : post_title !== "" ? (
        <IndividualPost />
      ) : (
        <Loader height='90vh'/>
      )}

      </div>
    </div>
  );
};

export default AllTimeFavorites;
