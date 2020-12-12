import React, {useState, useEffect} from "react"
import "./list.css"
import Navbar from "../components/transition1/navbar/navbar.js"

const AllTimeFavorites = () => {

  // const [post_id, setPost_id] = useState(0)
  const [post_id] = useState(0)

  // const [show_post, setShow_post] = useState(0)

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
  }, [post_id])

  const articles_display = articles.map((data, idx) => {
    return(
      <div key={idx} className="newsposts">
        <h4 className="post_title">{data.title}</h4>
        <hr className = "post_hr"/>
        <img src={data.top_image} alt=""/>
        <h6 className="post_desc">{data.text.substring(0,250)}...</h6>
        <p><button>Know More</button></p>
      </div>
    )
  });

  // const articles_display = articles.forEach(element => {
  //       console.log(element)
  // })

  // const posts = bestones.map(function(data, id) {
  //   return (
  //     <div key={id} className="blog_post" onClick={() => {setPost_id(data.id) && setShow_post(1)}}>
        
  //       <h3 className="post_title">{data.title}</h3>

  //       <hr className = "post_hr"/>

  //       <h5 className="post_year">{data.year}</h5>

  //       <h6 className="post_desc">{data.desc}</h6>

  //       <h5 className="post_read_more">Read More</h5>

  //     </div>
  //   );
  // });

  // const post = bestones.map((data, id) => {
  //   if(data.id === post_id)
  //     {
  //       return(
  //         <div key={id}>

  //           <br/>
  //           <h3 className="individual_post_title">{data.title}</h3> 
            
  //           <h3 className="post_date">{data.date}</h3>

  //           <hr className = "individual_post_hr"/>
            
  //           {/* <img alt="" src={require("../../../img/blog/" + String(data.imageUrl) + ".jpg")} className="post_image"></img> */}
            
  //           <h3 className="post_body">
  //               {data.body.split('\n').map((item, key) => {
  //                   return <span key={key}>{item}<br/></span>
  //               })}
  //           </h3>
  //         </div>
  //       )
  //     }
  //   return null;
  // });

  return (
    <div className="">    
     {/* <div className="list_page"> */}

{/*  
    {!post_id && !show_post &&
    <div> */}

      <Navbar />
          
      <div className="main_container">

        <h3 className="section_name">Trending Topics</h3> 

        <div className="products">
        {articles_display}
        </div>

        {/* {posts} */}
        
      </div>
{/*         
    </div>
    } */}
{/* 
    {post_id && !show_post ?
    <div>

      <Navbar />

      <div className="main_container">
        
        <h5 className="blog_text_red back" onClick={() => {setPost_id(0)}}>Back To List</h5>

        {post}

        <h5 className="back_to_list" onClick={() => {setPost_id(0)}}>
          Back To List
        </h5>

      </div>
    
    </div>
    : null } */}

    </div>
  )
}

export default AllTimeFavorites