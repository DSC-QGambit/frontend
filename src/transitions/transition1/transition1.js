import React from "react";
import Navbar from "../../components/transition1/navbar/navbar.js"
import { HashLink as HLink } from 'react-router-hash-link';
import img from "../../img/un2t.png"

import "./transition1.css"

export default () => {
  return (
    <div className="transition1">
      <Navbar/>

      <div className="content">

          <h1>Let's Pop Your Filter Bubble</h1>
  
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>

          <div className="two_buttons">
              <div className="login">
                  <a href="https://google.com">
                      <button className="button button1 button_anim1">
                        Log In
                      </button>
                  </a>
                  <a href="https://google.com" className="have_account">
                    Already have an account?
                  </a>
              </div>

              <div className="learn_more">
                  <button className="button button2 button_anim2">
                      <HLink className='white-text' style={{'margin':'5vh 0', 'textAlign':'center'}} to="/#moreinfo" >
                          Learn More
                      </HLink>
                  </button>
              </div>
          </div>
          <img src={img} alt="" className="pic"/>

      </div>
    </div>
  );
};