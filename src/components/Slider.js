import React from "react";
import "./Slider.css";

import { ReactComponent as LeftArrow } from "../images/left.svg";
import { ReactComponent as RightArrow } from "../images/right.svg";

class Slider extends React.Component {
  state = { slideIndex: 1 };

  nextSlide = () => {
    if (this.state.slideIndex !== this.props.gallery.length) {
      this.setState({ slideIndex: this.state.slideIndex + 1 });
    } else {
      this.setState({ slideIndex: 1 });
    }
  };

  prevSlide = () => {
    if (this.state.slideIndex !== 1) {
      this.setState({ slideIndex: this.state.slideIndex - 1 });
    } else {
      this.setState({ slideIndex: this.props.gallery.length });
    }
  };

  render() {
    return this.props.gallery.length === 1 ? (
      // Display a single image with no slider if there is only ONE image for the product
      <div className="container-slider">
        <img src={this.props.gallery[0]} alt="" />
      </div>
    ) : (
      <div className="container-slider">
        {this.props.gallery.map((image, index) => {
          return (
            <div
              className={
                this.state.slideIndex === index + 1
                  ? "slide active-anim"
                  : "slide"
              }
              key={index}
            >
              <img src={image} alt="" />
              <div className="arrows-container">
                <LeftArrow
                  onClick={() => this.prevSlide()}
                  className="arrow arrow-left"
                />

                <RightArrow
                  onClick={() => this.nextSlide()}
                  className="arrow arrow-right"
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Slider;
