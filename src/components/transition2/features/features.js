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
      Sentiment Analysis
      </h2>
      <p>
      We analyze sentiments of people from different social media platforms to get a broader view of what people are talking about. This helps us curb misinformation and fake news. Also during emergencies, we provide them useful resources to help them with the right and accurate information.
      </p>
    </div>
  </div>

  <div className="feature2">
  <img src={img2} alt="" className="img"/>
    <div className="text">
      <h2>
      Opinion Based Filtering
      </h2>
      <p>
      As mentioned above we don’t believe in feeding you recommendations from what we feel you would like. We make you decide that by yourself. Our filtering works on this principle. We want you to have a look at two sides of the same coin. Having a broader perception of things helps you understand issues and information in general much better.  
      </p>
    </div>
  </div>

  <div className="feature3">
    <img src={img3} alt="" className="img"/>
    <div className="text">
      <h2>
      Factually Accurate News 
      </h2>
      <p>
      We fact check all the news articles on our platform. We verify the sources through our ML based training model which performs the aforementioned fact checking. We collect data from trustworthy news websites and provide them to you. Our classifications are performed after training our models using numerous datasets, so rest assured we provide you with the most trustworthy information.
      </p>
    </div>
  </div>
</div>


</div>
</div>
     ) }
}

export default App;