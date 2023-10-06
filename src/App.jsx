import { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import logo from "./assets/loader.gif";
import "./App.css";

function Nav(props) {
  const { isNavOpen, toggleNav, change } = props;

  return (
    <header className="bg-blue-400 text-blue-600 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <button
            className="sm:hidden block text-blue-100 focus:outline-none mr-4"
            onClick={toggleNav}
          >
            {isNavOpen ? "Close" : "Menu"}
          </button>
          <h1 className="text-4xl" onClick={()=> change("android")}>News App</h1>
        </div>
        <nav
          className={`sm:block ${isNavOpen ? "block" : "hidden"} mt-4 sm:mt-0`}
        >
          <ul className="flex space-x-4 items-center justify-between">
            <li>
              <a
                href="#home"
                className="text-white hover:underline"
                onClick={() => change("android")}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#business"
                className="text-white hover:underline"
                onClick={() => change("business")}
              >
                Business
              </a>
            </li>
            <li>
              <a
                href="#technology"
                className="text-white hover:underline"
                onClick={() => change("technology")}
              >
                Technology
              </a>
            </li>
            <li>
              <input
                type="text"
                onChange={(e) => change(e.target.value)}
                placeholder="Search for news..."
                className="bg-gray-300 text-gray-800 rounded-full p-2"
              />
            </li>
            {/* Add more subheadings as needed */}
          </ul>
        </nav>
      </div>
    </header>
  );
}

Nav.propTypes = {
  isNavOpen: PropTypes.bool.isRequired,
  toggleNav: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [news, setNews] = useState([]);
  const [apiChange, setApiChange] = useState("android");
  const [isNavOpen, setIsNavOpen] = useState(false);

  function change(api) {
    setApiChange(api);
  }

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNav = () => {
    setIsNavOpen(false);
  };

  const api = useCallback(async () => {
    let response = await fetch(
      `https://newsapi.org/v2/everything?q=${apiChange}&apiKey=5e91c4b4a6ac46e193c41479cef88b47`
    );
    let result = await response.json();
    console.log(result);
    setNews(result.articles);
  }, [apiChange]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    api();
  }, [api]);

  return (
    <div className={`App ${isNavOpen ? "nav-open" : ""}`}>
      {isLoading ? (
        // Show loader when isLoading is true
        <img
          src={logo}
          alt="Loading..."
          style={{ width: "100px", height: "100px" }}
        />
      ) : (
        // Show news content when isLoading is false
        <>
          <Nav isNavOpen={isNavOpen} toggleNav={toggleNav} change={change} />
          <main className="container mx-auto mt-4 p-4">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {news.map((item, key) => (
                <div
                  className="w-full rounded-lg shadow-md overflow-hidden"
                  key={key}
                >
                  <img
                    className="object-cover w-full h-48 transition duration-500 ease-in-out transform hover:scale-110"
                    src={item.urlToImage}
                    alt="News"
                  />
                  <div className="p-4">
                    <h4 className="text-xl font-semibold text-blue-600">
                      {item.title}
                    </h4>
                    <p className="mb-2 leading-normal">{item.description}</p>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 text-sm text-blue-100 bg-blue-500 rounded shadow block text-center hover:bg-blue-600 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                    >
                      Read More
                    </a>
                    {/* footer */}
                  </div>
                </div>
              ))}
            </div>
          </main>
          <footer className="bg-blue-400 text-blue-100 py-4">
            <div className="container mx-auto text-center">
              <p>&copy; 2023 News App. All rights reserved.</p>
              <p>
                Made with 🤍 by{" "}
                <a href="https://www.linkedin.com/in/parth-bijpuriya-821786228/">
                  Parth Bijpuriya
                </a>
              </p>
            </div>
          </footer>
          <div
            className={`overlay ${isNavOpen ? "show" : ""}`}
            onClick={closeNav}
          ></div>
        </>
      )}
    </div>
  );
}

export default App;
