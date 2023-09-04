import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import AdoptedPetContext from "./AdoptedPetContext";
import Details from "./Details";
import SearchParams from "./SearchParams";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  const adoptedPet = useState(null);
  return (
    <div
      className="p-0 m-0"
      style={{
        backgroundColor: 'white'
      }}
    >
      <BrowserRouter>
        <AdoptedPetContext.Provider value={adoptedPet}>
          <QueryClientProvider client={queryClient}>
            <header className="w-full mb-10 p-7">
              <Link to="/">
                <img 
                  src="http://static.frontendmasters.com/resources/2019-05-02-complete-intro-react-v5/image-logo.png"
                  alt="logo"
                  class="object-scale-down h-11 mx-2 my-2"                  
                />
              </Link>
{/*              <div className="hidden lg:flex lg:flex-1 lg:justify-end -my-12 mx-3">
                <a href="#" className="font-roboto leading-normal text-red-700 text-lg font-semibold">
                  Log in <span aria-hidden="true">&rarr;</span>
                </a>
    </div> */}
            </header>
            <Routes>
              <Route path="/details/:id" element={<Details />} />
              <Route path="/" element={<SearchParams />} />
            </Routes>
          </QueryClientProvider>
        </AdoptedPetContext.Provider>
      </BrowserRouter>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
