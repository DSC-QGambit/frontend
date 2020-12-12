import React, {useState, useEffect} from "react"

import "./list.css"

import Navbar from "../components/transition1/navbar/navbar.js"

import bestones from "./bestones.json"

const AllTimeFavorites = () => {

  const [post_id, setPost_id] = useState(0)
  const [show_post, setShow_post] = useState(0)

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  function getNames() {
    fetch('https://flask-heroku-backend.herokuapp.com/get-top-news-keywords/')
      .then(response => response.json())
      .then(json => {
        setProducts(json);
        setLoading(false);
        console.log(json)
      })
  }

  useEffect(() => {
    getNames();
  }, [loading])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [post_id])

  const products_display = products.map((data, idx) => {
    return(
      <div key={idx} className="card">
        <h1>{data.name}</h1>
        <p className="price">{data.price}</p>
        <p>{data.desc}</p>
        <p><button>Add to Cart</button></p>
      </div>
    )
  });

  const posts = bestones.map(function(data, id) {
    return (
      <div key={id} className="blog_post" onClick={() => {setPost_id(data.id) && setShow_post(1)}}>
        
        <h3 className="post_title">{data.title}</h3>

        <hr className = "post_hr"/>

        <h5 className="post_year">{data.year}</h5>

        <h6 className="post_desc">{data.desc}</h6>

        <h5 className="post_read_more">Read More</h5>

      </div>
    );
  });

  const post = bestones.map((data, id) => {
    if(data.id === post_id)
      {
        return(
          <div key={id}>

            <br/>
            <h3 className="individual_post_title">{data.title}</h3> 
            
            <h3 className="post_date">{data.date}</h3>

            <hr className = "individual_post_hr"/>
            
            {/* <img alt="" src={require("../../../img/blog/" + String(data.imageUrl) + ".jpg")} className="post_image"></img> */}
            
            <h3 className="post_body">
                {data.body.split('\n').map((item, key) => {
                    return <span key={key}>{item}<br/></span>
                })}
            </h3>
          </div>
        )
      }
    return null;
  });

  return (
    <div>
 
    {!post_id && !show_post &&
    <div>

      <Navbar />
          
      <div className="main_container">

        <h3 className="section_name">Lorem Ipsum</h3> 

        {posts}
        
      </div>
        
    </div>
    }

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
    : null }

        <div className="products">
        {products_display}
        </div>

    </div>
  )
}

export default AllTimeFavorites

// const SecondPage = () => (
  
//     <div className="list_page">

//     <Navbar />

//     <div id="intro">
//     <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
//     </div>

//     <div id="about">

//       <div id="row1">
//       <div id="contain1">
//         <div className="person1"></div>
//         <h2>Lorem Ipsum</h2>
//         <h3>Lorem Ipsum</h3>
//         <h4>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</h4>
//       </div>

//       <div id="contain2">
//       <div className="person2"></div>
//       <h2>Lorem Ipsum</h2>
//       <h3>Lorem Ipsum</h3>
//       <h4>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</h4>
//       </div>

//       <div id="contain3">
//       <div className="person3"></div>
//       <h2>Lorem Ipsum</h2>
//       <h3>Lorem Ipsum</h3>
//       <h4>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</h4>
//       </div>

//       </div>

//       <div id="row2">

//       <div id="contain4">
//       <div className="person4"></div>
//       <h2>Lorem Ipsum</h2>
//       <h3>Lorem Ipsum</h3>
//       <h4>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</h4>
      
//       </div>

//       <div id="contain6">
//       <div className="person6"></div>
//       <h2>Lorem Ipsum</h2>
//       <h3>Lorem Ipsum</h3>
//       <h4>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</h4>
      
//       </div>

//       </div>

//     </div>
//     </div>
// )

// export default SecondPage