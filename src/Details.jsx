import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import AdoptedPetContext from "./AdoptedPetContext";
import Modal from "./Modal";
import ErrorBoundary from "./ErrorBoundary";
import fetchPet from "./fetchPet";
import Carousel from "./Carousel";
 
const Details = () => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const results = useQuery(["details", id], fetchPet);
  // eslint-disable-next-line no-unused-vars
  const [_, setAdoptedPet] = useContext(AdoptedPetContext);

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }

  const pet = results.data.pets[0];

  return (
    <div className="details">
      <Carousel images={pet.images} className="z-0"/>
      <div className="z-10 -mt-96 mr-20 ml-96 pl-56 
      font-roboto">
        <h1 class="font-bold text-3xl">{pet.name}</h1>
        <h2 class="font-semibold">{`${pet.animal} — ${pet.breed} — ${pet.city}, ${pet.state}`}</h2>
        <button 
        onClick={() => setShowModal(true)}
        className="my-3 rounded-md bg-red-700 px-3 py-2 text-sm font-roboto font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
          Adopt {pet.name}
          </button>
        <p>{pet.description}</p>
        {showModal ? (
          
          <Modal>
            <div class="
            absolute inset-x-0 bottom-20 h-16
            ml-96 pl-56 relative">
              <h1 class="font-roboto text-red-700 text-xl font-bold">Would you like to adopt {pet.name}?</h1>
              <div className="buttons">
                <button
                  onClick={() => {
                    setAdoptedPet(pet);
                    navigate("/");
                  }}
                  className="my-3 rounded-md bg-red-700 px-3 py-2 text-sm font-roboto font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                >
                  Yes
                </button>
                <button onClick={() => setShowModal(false)}
                className="ml-10 rounded-md bg-white px-3 py-2 text-sm font-bold text-red-700 shadow-sm ring-2 ring-inset ring-red-600 hover:bg-red-500 hover:ring-red-500 hover:text-white">No</button>
              </div>
            </div>
          </Modal>
          
        ) : null}
      </div>
    </div>
  );
};

export default function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
