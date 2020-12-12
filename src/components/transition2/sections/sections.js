import React from "react";
import "./sections.css";
import img1 from "../../../img/undraw6.png"
import img2 from "../../../img/undraw4.png"
import img3 from "../../../img/undraw5.png"
import img4 from "../../../img/undraw3.png"

class App extends React.Component {
  render() {
    return (
      <div>
<div className="component third-component">
</div>
<div>

<div className="sections">

  <div className="heading">
  <h1>How can we help you?</h1>
  <hr/>
  </div>

  <div className="section1">
    <div className="text">
      <h2 className="section_headings">
      For You, The Consumer
      </h2>
      <p>
      If you consume news on a daily basis, our platform is there for you with the most accurate and reliable sources. You don’t need to worry about misinformation on our platform. We are very meticulous to provide you with the right information. We respect your freedom of thinking and opinions, and we don’t want to interfere with that.
      </p>
    </div>
    <img src={img1} alt="" className="img"/>
  </div>

  <div className="section2">
  <img src={img2} alt="" className="img1"/>
    <div className="text">
      <h2 className="section_headings">
      For You, The News Provider
      </h2>
      <p>
      If you are a news provider but don’t have the capital to scale your operations, you can use our platform. We will facilitate you to provide your content into our platform. All you need to have is a factually accurate news source which we’ll be verifying to comply with our standards. We understand how difficult it might be to compete with the so-called big players. We help you transition into a scalable news provider through our platform.
      </p>
    </div>
    <img src={img2} alt="" className="img2"/>
  </div>

  <div className="section3">
    <div className="text">
      <h2 className="section_headings">
      For You, A Company
      </h2>
      <p>
      If you are a government org and or a survey collecting company, you can use our services to understand the pattern of how people think and perceive things in a certain demographic. This service will be provided only during times of emergencies like a pandemic, natural calamities, etc. No server data would be provided to third party organizations. We will be providing you with the required statistics to help you deal with crisis situations as we respect the privacy of everyone who uses our platform.
    </p>
    </div>
    <img src={img3} alt="" className="img"/>
  </div>

<div className="section4">
  <img src={img4} alt="" className="img1"/>
    <div className="text">
      <h2 className="section_headings">
      You Make The Rules
      </h2>
      <p>
      The information we consume must not be confined to our own opinions and likes. After all, the human race has evolved over several iterations through collaborations and working together as a community. Therefore, understanding different perspectives of things is the need of the hour. <br/><br/>You don’t need search engines to decide what you like. We want you to decide that for yourselves. Take charge of your own decisions and broaden your horizon.
      </p>
    </div>
    <img src={img4} alt="" className="img2"/>
  </div>

</div>


</div>
</div>
     ) }
}

export default App;