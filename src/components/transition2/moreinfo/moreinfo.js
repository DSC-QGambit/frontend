import React from "react";
import "./moreinfo.css"
import img from "../../../img/undraw1.png"

export default () => {
  return (
    <div id = "moreinfo">
      <div className="morecontent">
      <div className="moretext">
            <h1>How do we do it?</h1>
    
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>

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