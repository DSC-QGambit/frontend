import React, {useState, useEffect} from "react"
import "./list.css"
import Navbar from "../components/transition1/navbar/navbar.js"

const AllTimeFavorites = () => {

  /* Keeps track of whether a particular article has been selected */

  const [articles, setArticles] = useState([]);
  const [relatedArticles, setRelatedArticles] = useState([]);

  /* Keeps track of whether a particular article has been selected */
  const [post_title, setPost_title] = useState("")
  const [all_sides, setAll_sides] = useState({})
  const [relevant, setRelevant] = useState(false)

  const [show_post, setShow_post] = useState(false)

  // const [loading, setLoading] = useState(true); // just use a background scheduler

  /* Makes sure the page scrolls to the top when switching from article to article */

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [post_title])

  /* Gets the whole list of articles from the back end just once when the page loads */

  useEffect(() => {
    // fetch('/get-top-news-articles/') //https://flask-heroku-backend.herokuapp.com/get-top-news-articles/
    fetch('http://127.0.0.1:5000/get-top-news-articles/', {method: 'GET'}) ///get-top-news-articles/
    .then(response => response.json())
      .then(json => {
        setArticles(json);
        // setLoading(false); 
        console.log(json)
      })
  }, []) //loading

  function postArticle(data) {
    fetch('/post-selected-news-article/', 
    {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(res => console.log(res))
        // .then(data => setPostId(data.id));

    getMediaBiasStats()
  }

  function getRelatedArticles(keywords) {
    // console.log(data)

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(keywords), // Convert the data to a JSON string
    };

    fetch('http://127.0.0.1:5000/get-related-news-from-keywords/', requestOptions)
    .then(response => response.json())
      .then(json => {
        setRelatedArticles(json);
        // setLoading(false); 
        console.log(json)
      })
    }

  function getRelatedArticles(data) {
      
    fetch('/get-related-news-from-keywords/', 
    {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        // .then(res => console.log(res))
        .then(data => setRelatedArticles(data))
        .then(e => setRelevant(true));

    // console.log(relatedArticles)
  }

  async function getMediaBiasStats() {
    try{
      const response = await fetch('https://political-bias-database.p.rapidapi.com/ASdata', 
      {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': 'a316563259msh808280fd09a9419p1e1e98jsnf72eb1d4263b',
            'X-RapidAPI-Host': 'political-bias-database.p.rapidapi.com'
          },
      }) //maybe separate the below code to not .then
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })    
      .then(response => {
          var article = articles.filter(article => article.title === post_title)[0]
          var pattern = new RegExp("^" + article.source + ".*$", "i");
          if(response!==undefined) 
            var all_sides_data = response.filter(entry => pattern.test(entry.name))[0]
            setAll_sides(all_sides_data)
        })
    } 
    catch (error) {
      console.error(error)
    }
  }

//   useEffect(() => {
//     if(post_title!=="")
//       postArticle(selected_article)
// }, [post_title,selected_article]);

  const posts = articles.map(function(data, id) {
    return (
      <div key={id} className="newsposts" onClick={() => {setPost_title(data.title) && setShow_post(true)}}>
        <div className="post-content">
          <img src={data.top_image} className="post_image" alt=""/>
          <h3 className="post_date">{data.published.substring(0,10)}</h3>
          <h4 className="post_title">{data.title}</h4>
        {/* <hr className = "post_hr"/> */}
        {/* <h6 className="post_desc">{data.text.substring(0,250)}...</h6> */}
        {/* <p><button onClick={postArticle(data)}>Know More</button></p> */}
        </div>
      </div>
    );
  });

  function renderTextWithLineBreaks(text) {
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  }

  const post = articles.map((data, id) => {
    if(data.title === post_title)
      {
        return(
          <div key={id} className="individual_post">
            {postArticle(data)}
            <br/>
            <h3 className="individual_post_title">{data.title}</h3> 
            <h3 className="post_date">{data.date}</h3>
            <hr className = "individual_post_hr"/>
            <img src={data.top_image} alt=""/>
            <h6 className="individual_post_desc">{renderTextWithLineBreaks(data.text)}...</h6>

            {getRelatedArticles(data.title)}
            {all_sides?<div>
                <p>Bias: {all_sides.bias?all_sides.bias:"Unavailable"}</p>
                <p>Confidence: {all_sides.confidence?all_sides.confidence:"Unavailable"}</p>
            </div>:null}
            {/* {relevant ? <p>{relatedArticles}</p> : null} */}
          </div>
        )
      }
    return null;
  });

  return (
    <div className="list_container">    
      <div className="list_page">
        
        {post_title==="" && !show_post &&
          <div className="allposts">

            <Navbar />
            
              <h3 className="section_name">Trending Topics</h3>  

              {posts}
              
          </div>
        }

        {post_title!=="" && !show_post &&
        <div className="individual">

          <Navbar />
          <div className="main_container">
            {post}
            <h5 className="back_to_list" onClick={() => {setPost_title("") && setShow_post(false)}}>
              Back To List
            </h5>

          </div>
        
        </div>
        }

      </div>
    </div>
  )
}

export default AllTimeFavorites