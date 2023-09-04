import Pet from "./Pet";

const Results = ({ pets }) => {
  return (
    <div className="grid gap-x-10 grid-cols-2 
      gap-y-10 sm:grid-cols-3 lg:grid-cols-4 
      font-roboto font-semibold text-base mx-10 
      mb-10">
      {!pets.length ? (
        <h1>No Pets Found</h1>
      ) : (        
        pets.map((pet) => {
          return (
            <Pet
              animal={pet.animal}
              key={pet.id}
              name={pet.name}
              breed={pet.breed}
              images={pet.images}
              location={`${pet.city}, ${pet.state}`}
              id={pet.id}
            />
          );
        })
      )}
    </div>
  );
};

export default Results;
