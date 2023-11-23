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
  const [reddit_opinion, setReddit_opinion] = useState({});
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

  useEffect(() => {
    if (post_title !== "") {
      getArticleData(articles.find(data => data.title === post_title));
    }
  }, [post_title]);

  const getArticleData = (data) => {
    getArticleSummary(data.text);
    getRedditPublicOpinion(post_title);
    getRelatedArticles(data);
    getMediaBiasStats();
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

    // while(Object.keys(reddit_opinion).length === 0);
  };

  // const getMediaBiasStats = async () => {
  //   try {
  //     const response = await fetch('https://political-bias-database.p.rapidapi.com/ASdata', {
  //       method: 'GET',
  //       headers: {
  //         'X-RapidAPI-Key': 'a316563259msh808280fd09a9419p1e1e98jsnf72eb1d4263b',
  //         'X-RapidAPI-Host': 'political-bias-database.p.rapidapi.com'
  //       },
  //     });

  //     if (!response.ok) {
  //       setAll_sides({'bias': 'Unavailable', 'confidence': 'Unavailable', 'agreement': 'Unavailable', 'disagreement': 'Unavailable'});
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }

  //     const responseJson = await response.json();
  //     const article = articles.find(article => article.title === post_title);
  //     const pattern = new RegExp("^" + article.source + ".*$", "i");

  //     if (responseJson !== undefined) {
  //       const all_sides_data = responseJson.find(entry => pattern.test(entry.name));
  //       setAll_sides(all_sides_data);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const getMediaBiasStats = async () => {
    try {
      const localStorageKey = 'political_bias_data';
      const localStorageData = localStorage.getItem(localStorageKey);
  
      if (localStorageData) {
        console.log("found")
        const allSidesJson = JSON.parse(localStorageData);
        const article = articles.find((article) => article.title === post_title);
        const pattern = new RegExp(`^${article.source}.*$`, 'i');
        const allSidesData = allSidesJson.find((entry) => pattern.test(entry.name));
        if (allSidesData !== undefined) {
          console.log(allSidesData)
          allSidesData.timestamp = new Date().toISOString();
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

      console.log("not found")
  
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
        console.log(responseJson)
        const allSidesData = responseJson.find((entry) => pattern.test(entry.name));
        if (allSidesData !== undefined) {
          console.log(allSidesData)
          allSidesData.timestamp = new Date().toISOString();
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

  const handleClosePost = () => {
    setPost_title("");
    setPost_desc("");
    setReddit_opinion({})
    setAllSides({})
    setRelatedArticles([])
  };

  // const renderTextWithLineBreaks = (text) => {
  //   return text.split('\n').map((line, index) => (
  //     <React.Fragment key={index}>
  //       {line}
  //       <br />
  //     </React.Fragment>
  //   ));
  // };


  function caps(str) {
    return str.replace(/(?<=(?:^|[.?!])\W*)[a-z]/g, i => i.toUpperCase())
  }

  const Loader = React.memo(({height}) => {
    return <div className="loader-container" style={{height:height}}>
    {/* <div className="loading-text">Please wait...</div> */}
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
            <h3 className="individual_post_title">{data.title}
              <i className="material-icons" style={{ float: 'right'}} onClick={handleClosePost}>
                close
              </i>
            </h3>
            <hr className="individual_post_hr" />

            <div className="image-and-text-container">
              <div className="image-container">
                <img className="article_image" src={data.top_image} alt="" />
              </div>
              <div className="text-container">
                {post_desc!=="" ? <p className="individual_post_desc">{caps(post_desc)}</p> : <p>Please wait...</p> }
                <p className="individual_post_desc">View the full story <a href={data.link}>here</a>.</p>
              </div>
            </div>

            <div className="sentiment-container">
              {Object.keys(allSides).length !== 0 ? (
                <div className="all-sides-container">
                  <p><b>Data about news source ({data.source}) from AllSides:</b></p>
                  <p>Bias: {allSides.bias ? allSides.bias : "Unavailable"}</p>
                  <p>Confidence: {allSides.confidence ? allSides.confidence : "Unavailable"}</p>
                  <p>{allSides.agreement ? allSides.agreement : "Unavailable"} raters agree with these scores while {allSides.disagreement ? allSides.disagreement : "Unavailable"} disagree.</p>
                  {relatedArticles.length!==0 ? 
                  <ul>Related articles:
                  {relatedArticles.map((summaryItem, index) => (
                      <li key={index}>{index+1}. <a href={summaryItem['url']}>{summaryItem['title'].substring(0, 60)}{summaryItem['title'].length>50?"...":null}</a></li>
                  ))}
                  </ul>
                   : null}
                </div>
              ) : (
                <div className="all-sides-container">
                  <p>[Fetching AllSides Data...]</p>
                <Loader height='20vh'/>
                </div>
              )}

              {Object.keys(reddit_opinion).length !== 0 ? (
                  <RedditCarousel redditOpinions={reddit_opinion} />
                ) : (
                  <div className="reddit-carousel-container">
                  <p>[Fetching Reddit Data...]</p>
                    <Loader height='20vh'/>
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
