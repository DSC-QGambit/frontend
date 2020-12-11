import React from "react"
import "./footer.css"
// import img from "../../../media/logo.svg"

class Footer extends React.Component {
    render(){
        return(
            
            <div id="footer">

                {/* <img src={img} alt="" className="logo"/> */}

                    <div align="center" className="socialbtns">
                    <ul>
                    <li><a href="https://twitter.com" className="fa fa-lg fa-twitter"></a></li>
                    <li><a href="mailto:xyz" className="fa fa-lg fa-google-plus"></a></li>
                    <li><a href="https://www.instagram.com" className="fa fa-lg fa-instagram"></a></li>
                    </ul>
                    </div>
                    
                <h3>Made by Team Queen's Gambit</h3>

            </div>            
        )
    }
}

export default Footer