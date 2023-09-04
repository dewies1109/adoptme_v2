import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Results from "./Results";
import AdoptedPetContext from "./AdoptedPetContext";
import useBreedList from "./useBreedList";
import fetchSearch from "./fetchSearch";
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });
  const [adoptedPet] = useContext(AdoptedPetContext);
  const [animal, setAnimal] = useState("");
  const [breeds] = useBreedList(animal);

  const results = useQuery(["search", requestParams], fetchSearch);
  const pets = results?.data?.pets ?? [];

  return (
    <div className="my-0 mx-10">
      <div className=" grid grid-cols-3 gap-4"> 
        <div className="-mr-8 ml-8">
          <form
            className="p-10 mb-10            
              flex flex-col 
              justify-left 
              items-left" 
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const obj = {
                animal: formData.get("animal") ?? "",
                breed: formData.get("breed") ?? "",
                location: formData.get("location") ?? "",
              };
              setRequestParams(obj);
            }}
          >
            {adoptedPet ? (
              <div className="pet image-container">
                <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
              </div>
            ) : null}
            <div>
              <label htmlFor="location" className="block text-base font-roboto font-semibold leading-6 text-gray-900">
                Location
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="location"
                  name="location"
                  placeholder="Location"
                  className="search-input block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
                />
              </div>            
            </div>

            <div>
              <label htmlFor="animal" className="block text-base font-roboto font-semibold leading-6 text-gray-900">
                Animal
              </label>
              <select
                id="animal"
                name="animal"                
                onChange={(e) => {
                  setAnimal(e.target.value);
                }}
                onBlur={(e) => {
                  setAnimal(e.target.value);
                }}
                className="search-input mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-red-500 sm:text-sm sm:leading-6"
              >
                <option />
                {ANIMALS.map((animal) => (
                  <option key={animal} value={animal}>
                    {animal}
                  </option>
                ))}
              </select>              
            </div>

            <div>
              <label htmlFor="breed" className="block text-base font-roboto font-semibold leading-6 text-gray-900">
                Breed
              </label>
              <select
                disabled={!breeds.length}
                id="breed"
                name="breed"
                className="search-input grayed-out-disabled mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-red-500 sm:text-sm sm:leading-6"
              >
                <option />
                {breeds.map((breed) => (
                  <option key={breed} value={breed}>
                    {breed}
                  </option>
                ))}
              </select>              
            </div>

            <button className="rounded-md bg-red-700 px-3 py-2 text-sm font-roboto font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
              Submit
            </button>
          </form>        
        </div>
        <div class="col-span-2 -mt-40 -ml-10 pl-6">
          <img 
            src="https://raw.githubusercontent.com/dewies1109/plant-db-json/main/Untitled%20design%20(1).png"
            alt="logo"
            class="max-w-4xl"                  
          />
        </div>
      </div>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
