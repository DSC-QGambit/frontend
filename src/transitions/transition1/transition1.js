import React from "react";
import Navbar from "../../components/transition1/navbar/navbar.js"
import { HashLink as HLink } from 'react-router-hash-link';
import img from "../../img/newspaper.png"

import "./transition1.css"

export default () => {
  return (
    <div className="transition1">
      <Navbar/>

      <div className="content">

          <h1>Let's Pop Your Filter Bubble</h1>
  
          <p>The things you click, like, and post result in more of the same. Personalization algorithms create a safe, predictable space. Rather than making our world bigger, our world shrinks a little. Call it an echo chamber or a filter bubble, it’s worrisome that personalization narrows our exposure to new ideas and even spreads misinformation. But fret not, for we're here to right the wrong.</p>

          <div className="two_buttons">
              <div className="login">
              <HLink to='/list' >yoo
                      <button className="button button1 button_anim1">
                        Browse News
                      </button>
                  </HLink>
                  {/* <a href="https://google.com" className="have_account"> */}
                  <span className="have_account">
                    We'll make it worth your while.
                  </span>
              </div>

              <div className="learn_more">
                      <HLink className='white-text' style={{'margin':'5vh 0', 'textAlign':'center'}} to="/#moreinfo" >
                      <button className="button button2 button_anim2">
                          Learn More
                          </button>
                      </HLink>
              </div>
          </div>
          <img src={img} alt="" className="pic"/>

      </div>
    </div>
  );
};