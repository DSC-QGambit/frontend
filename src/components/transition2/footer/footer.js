import React from "react"
import "./footer.css"
// import img from "../../../media/logo.svg"

class Footer extends React.Component {
    render(){
        return(
            
            <div id="footer">

                {/* <img src={img} alt="" className="logo"/> */}

                    <div align="center" class="socialbtns">
                    <ul>
                    <li><a href="https://twitter.com" class="fa fa-lg fa-twitter"></a></li>
                    <li><a href="mailto:" class="fa fa-lg fa-google-plus"></a></li>
                    <li><a href="https://www.instagram.com" class="fa fa-lg fa-instagram"></a></li>
                    </ul>
                    </div>
                    
                <h3>Made by Team QB</h3>
                <img></img>
                <h4>2020 QB</h4>

            </div>            
        )
    }
}

export default Footer