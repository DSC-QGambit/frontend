import React from "react";
import Transition1 from "./transitions/transition1/transition1.js"
// import Transition2 from "./transitions/transition2/transition2.js"
import './App.css';

class FullPage extends React.Component {
  render() {
    return (
      <div>
        <Transition1 />           
        {/* <Transition2 /> */}
      </div>
    );
  }
}

export default FullPage;
