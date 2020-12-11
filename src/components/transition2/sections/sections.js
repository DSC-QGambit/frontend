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
      Lorem Ipsum
      </h2>
      <p>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </p>
    </div>
    <img src={img1} alt="" className="img"/>
  </div>

  <div className="section2">
  <img src={img2} alt="" className="img1"/>
    <div className="text">
      <h2 className="section_headings">
      Lorem Ipsum
      </h2>
      <p>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </p>
    </div>
    <img src={img2} alt="" className="img2"/>
  </div>

  <div className="section3">
    <div className="text">
      <h2 className="section_headings">
      Lorem Ipsum
      </h2>
      <p>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.      </p>
    </div>
    <img src={img3} alt="" className="img"/>
  </div>

<div className="section4">
  <img src={img4} alt="" className="img1"/>
    <div className="text">
      <h2 className="section_headings">
      Lorem Ipsum
      </h2>
      <p>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
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