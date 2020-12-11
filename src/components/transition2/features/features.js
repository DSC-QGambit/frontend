import React from "react";
import "./features.css";
import img1 from "../../../media/visualisation.svg";
import img2 from "../../../media/risk.svg";
import img3 from "../../../media/detection.svg";

class App extends React.Component {
  render() {
    return (
      <div>
      <div>

<div className="features">
  <h1>Our Features<hr/>
</h1>

  <div className="feature1">
  <img src={img1} alt="" className="img"/>
    <div className="text">
      <h2>
      Lorem Ipsum
      </h2>
      <p>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
      </p>
    </div>
  </div>

  <div className="feature2">
  <img src={img2} alt="" className="img"/>
    <div className="text">
      <h2>
      Lorem Ipsum
      </h2>
      <p>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
      </p>
    </div>
  </div>

  <div className="feature3">
    <img src={img3} alt="" className="img"/>
    <div className="text">
      <h2>
      Lorem Ipsum
      </h2>
      <p>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
      </p>
    </div>
  </div>
</div>


</div>
</div>
     ) }
}

export default App;