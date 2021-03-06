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
  
          <p>The things you click, like, and post result in more of the same. Netflix suggests new things to watch based on what you have already watched. Twitter will suggest who to follow based on other people you follow. Facebook tailors your newsfeed based on who you interact with. Google shows different search results based on what you have searched before. Personalization algorithms create a safe, predictable space. Rather than making our world bigger, our world shrinks a little. Call it an echo chamber or a filter bubble, it’s worrisome that personalization narrows our exposure to new ideas and even spreads misinformation. But fret not, for we're here to right the wrong.</p>

          <div className="two_buttons">
              <div className="login">
                  <a href="https://google.com">
                      <button className="button button1 button_anim1">
                        Browse News
                      </button>
                  </a>
                  <a href="https://google.com" className="have_account">
                    We'll make it worth your while.
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