import { Component } from "react";

class Carousel extends Component {
  state = {
    active: 0,
  };

  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };

  handleIndexClick = (event) => {
    this.setState({
      active: +event.target.dataset.index,
    });
  };

  render() {
    const { active } = this.state;
    const { images } = this.props;
    return (
      <div className="carousel" class="grid grid-cols-3 gap-4">
        <img src={images[active]} alt="animal" 
        class="my-20 mx-20 -mt-10 rounded-md border-2 border-red-500"/>
        <div className="carousel-smaller" class="col-span-2 -mt-10 ml-24 ">
          {images.map((photo, index) => (
            // eslint-disable-next-line
            <img
              key={photo}
              src={photo}
              className={index === active ? "active" : ""}
              alt="animal thumbnail"
              onClick={this.handleIndexClick}
              data-index={index}
              class="inline-block rounded-full w-20 mb-10 ml-10 border-2 border-red-500"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
