import React, {useState, useEffect} from "react"
import "./list.css"
import Navbar from "../components/transition1/navbar/navbar.js"

const AllTimeFavorites = () => {

  const [post_title, setPost_title] = useState("")
  // const [post_id] = useState(0)

  const [show_post, setShow_post] = useState(0)

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  function getArticles() {
    fetch('https://flask-heroku-backend.herokuapp.com/get-top-news-articles/')
      .then(response => response.json())
      .then(json => {
        setArticles(json);
        setLoading(false);
        console.log(json)
      })
  }

  useEffect(() => {
    getArticles();
  }, [loading])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [post_title])

  // function postArticle(data) {
      
  //   fetch('/post-selected-news-article/', 
  //     {
  //       method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(data)
  // })
  //       .then(res => res.json())
  //       .then(res => console.log(res))
  //       // .then(data => setPostId(data.id));
  // }

//   useEffect(() => {
//     // POST request using axios inside useEffect React hook
//     const article = { title: 'React Hooks POST Request Example' };
//     axios.post('https://reqres.in/api/articles', article)
//         .then(response => console.log(response.data.id));

// // empty dependency array means this effect will only run once (like componentDidMount in classes)
// }, []);

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
        
        <h5 className="blog_text_red back" onClick={() => {setPost_title(0)}}>Back To List</h5>

        {post}

        <h5 className="back_to_list" onClick={() => {setPost_title(0)}}>
          Back To List
        </h5>

      </div>
    
    </div>
    : null }

    </div>
  )
}

export default AllTimeFavorites