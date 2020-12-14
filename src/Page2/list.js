import React, {useState, useEffect} from "react"
import "./list.css"
import Navbar from "../components/transition1/navbar/navbar.js"

const AllTimeFavorites = () => {

  const [articles, setArticles] = useState([]);

  /* Keeps track of whether a particular article has been selected */
  const [post_title, setPost_title] = useState("")

  const [show_post, setShow_post] = useState(0)

  // const [loading, setLoading] = useState(true); // just use a background scheduler

  /* Makes sure the page scrolls to the top when switching from article to article */

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [post_title])

  /* Gets the whole list of articles from the back end just once when the page loads */

  useEffect(() => {
    fetch('/get-top-news-articles/') //https://flask-heroku-backend.herokuapp.com/get-top-news-articles/
      .then(response => response.json())
      .then(json => {
        setArticles(json);
        // setLoading(false); 
        console.log(json)
      })
  }, []) //loading

    /*  */

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
  }

//   useEffect(() => {
//     if(post_title!=="")
//       postArticle(selected_article)
// }, [post_title,selected_article]);

  const posts = articles.map(function(data, id) {
    return (
      <div key={id} className="blog_post newsposts" onClick={() => {setPost_title(data.title) && setShow_post(1)}}>
        <h4 className="post_title">{data.title}</h4>
        <hr className = "post_hr"/>
        <img src={data.top_image} alt=""/>
        <h6 className="post_desc">{data.text.substring(0,250)}...</h6>
        {/* <p><button onClick={postArticle(data)}>Know More</button></p> */}
      </div>
    );
  });

  const post = articles.map((data, id) => {
    if(data.title === post_title)
      {
        return(
          <div key={id}>
            {postArticle(data)}
            <br/>
            <h3 className="individual_post_title">{data.title}</h3> 
            
            {/* <h3 className="post_date">{data.date}</h3> */}

            <hr className = "individual_post_hr"/>
            
            <img src={data.top_image} alt=""/>
            <h6 className="post_desc">{data.text.substring(0,250)}...</h6>
          </div>
        )
      }
    return null;
  });

  return (
    <div className="">    
     {/* <div className="list_page"> */}

 
    {post_title==="" && !show_post &&
    <div>

      <Navbar />
          
      <div className="main_container">

        <h3 className="section_name">Trending Topics</h3> 

        <div className="products">
        {posts}

        </div>

        
      </div>
        
    </div>
    }

    {post_title!=="" && !show_post ?
    <div>

      <Navbar />

      <div className="main_container">
        
        <h5 className="blog_text_red back" onClick={() => {setPost_title("")}}>Back To List</h5>

        {post}

        <h5 className="back_to_list" onClick={() => {setPost_title("")}}>
          Back To List
        </h5>

      </div>
    
    </div>
    : null }

    </div>
  )
}

export default AllTimeFavorites