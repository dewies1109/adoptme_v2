import { Link } from "react-router-dom";

const Pet = (props) => {
  const { name, animal, breed, images, location, id } = props;

  let hero = "http://pets-images.dev-apis.com/pets/none.jpg";
  if (images.length) {
    hero = images[0];
  }

  return (
    <Link to={`/details/${id}`} className="relative block">
      <div>
        <img src={hero} alt={name} 
        className="rounded-md border-2 border-red-500"/>
      </div>
      <div 
      className="rounded-md w-full py-3 px-3 absolute bottom-0 left-0 bg-gradient-to-tr from-red-400 to-transparent pr-2 pt-2
      font-roboto font-semibold text-base text-gray-950">
        <h1>{name}</h1>
        <h2>{`${animal}, ${breed} | ${location}`}</h2>
        <h2></h2>
      </div>
    </Link>
  );
};

export default Pet;
