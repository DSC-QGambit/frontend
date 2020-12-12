import React from "react";
import "./moreinfo.css"
import img from "../../../img/undraw1.png"

export default () => {
  return (
    <div id = "moreinfo">
      <div className="morecontent">
      <div className="moretext">
            <h1>How do we do it?</h1>
    
            <p>
We collect the top news articles on any topic you want, from the most well reputed sites and list them out for you to browse through. Once you decide what you want to know more about, you can view an article on the topic, except what you will be able to view is not just the article. You will be shown data which we have curated from twitter feeds, which allow us to tell you how people feel towards any particular topic by performing sentimental analysis on them. We will visualize this data for you and also show you the top opinions from both sides on any matter. As for which side you are on, will be for you to decide.</p>

            <div className="browse_button">
            <button className="morebutton morebutton3 button_anim3">
            Browse Topics
            </button>
             </div>
        </div>

        <img src={img} alt="" className="moreimg"/>
    </div>

    </div>
  );
};