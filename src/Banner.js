import React, {Component} from 'react';
import pic1 from './resources/images/708166.jpg';
import pic2 from './resources/images/808386.jpg';
import pic3 from './resources/images/587539.jpg';

class Header extends Component {
    render() {
        return (
            <div>
                <header>
                    <div id="demo" className="carousel slide" data-ride="carousel">
                        {/* Indicators */}
                        <ul className="carousel-indicators">
                            <li data-target="#demo" data-slide-to={0} className="active" />
                            <li data-target="#demo" data-slide-to={1} />
                            <li data-target="#demo" data-slide-to={2} />
                        </ul>
                        {/* The slideshow */}
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src={pic1} alt="Los Angeles" width="100%" />
                            </div>
                            <div className="carousel-item">
                                <img src={pic2} alt="Chicago" />
                            </div>
                            <div className="carousel-item">
                                <img src={pic3} alt="New York" />
                            </div>
                        </div>
                        {/* Left and right controls */}
                        <a className="carousel-control-prev" href={"#demo"} data-slide="prev">
                            <span className="carousel-control-prev-icon" />
                        </a>
                        <a className="carousel-control-next" href={"#demo"} data-slide="next">
                            <span className="carousel-control-next-icon" />
                        </a>
                    </div>
                </header>

            </div>
        );
    }
}

export default Header;