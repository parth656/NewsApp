import { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import logo from "./assets/loader.gif";
import "./App.css";
function Nav({ isNavOpen, toggleNav, change }) {
  return (
    <header className="bg-blue-500 text-blue-100">
      <div className="container mx-auto flex justify-between p-4">
        <div className="flex items-center">
          <button
            aria-label="Toggle navigation"
            type="button"
            className="sm:hidden block text-blue-100 focus:outline-none mr-4"
            onClick={toggleNav}
          >
            {isNavOpen ? "Close" : "Menu"}
          </button>
          <h1
            className="text-2xl sm:text-4xl"
            onClick={() => change("general")}
          >
            News App
          </h1>
        </div>
        <nav
          className={`sm:block ${isNavOpen ? "block" : "hidden"} mt-4 sm:mt-0`}
        >
          <ul className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 items-center justify-between">
            <li>
              <a
                href="#home"
                className="text-white hover:underline"
                onClick={() => {
                  change("general");
                  toggleNav();
                }}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#business"
                className="text-white hover:underline"
                onClick={() => {
                  change("business");
                  toggleNav();
                }}
              >
                Business
              </a>
            </li>
            <li>
              <a
                href="#technology"
                className="text-white hover:underline"
                onClick={() => {
                  change("technology");
                  toggleNav();
                }}
              >
                Technology
              </a>
            </li>
            <li>
              <a
                href="#entertainment"
                className="text-white hover:underline"
                onClick={() => {
                  change("entertainment");
                  toggleNav();
                }}
              >
                Entertainment
              </a>
            </li>
            <li>
              <a
                href="#health"
                className="text-white hover:underline"
                onClick={() => {
                  change("health");
                  toggleNav();
                }}
              >
                Health
              </a>
            </li>
            <li>
              <a
                href="#science"
                className="text-white hover:underline"
                onClick={() => {
                  change("science");
                  toggleNav();
                }}
              >
                Science
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
  const [apiChange, setApiChange] = useState("general");
  const [isNavOpen, setIsNavOpen] = useState(false);

  const change = (api) => {
    setApiChange(api);
    closeNav(); // Close the navigation when an item is clicked
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNav = () => {
    setIsNavOpen(false);
  };

  const fetchNews = useCallback(async () => {
    try {
      let response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=in&category=${apiChange}&apiKey=5e91c4b4a6ac46e193c41479cef88b47`
      );
      if (response.ok) {
        let result = await response.json();
        setNews(result.articles);
      } else {
        console.error("Error fetching news data.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }, [apiChange]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
    fetchNews();
  }, [fetchNews]);

  return (
    <div className={`App ${isNavOpen ? "nav-open" : ""}`}>
      {isLoading ? (
        <img
          src={logo}
          alt="Loading..."
          style={{ width: "100px", height: "100px" }}
        />
      ) : (
        <>
          <Nav isNavOpen={isNavOpen} toggleNav={toggleNav} change={change} />
          <main className="container mx-auto mt-4 p-4">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {news.map((item, key) => (
                <div
                  className="w-full rounded-lg shadow-md overflow-hidden flex flex-col"
                  key={key}
                >
                  <img
                    className="object-cover w-full h-48 transition duration-500 ease-in-out transform hover:scale-110"
                    src={item.urlToImage}
                    alt="News"
                  />
                  <div className="flex-grow p-4">
                    <h4 className="text-xl font-semibold text-blue-600">
                      {item.title}
                    </h4>
                    <p className="mb-2 leading-normal flex-grow">
                      {item.description}
                    </p>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 text-sm text-blue-100 bg-blue-500 rounded shadow block text-center hover:bg-blue-600 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                    >
                      Read More
                    </a>
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
            style={{ zIndex: isNavOpen ? 1 : -1 }}
          ></div>
        </>
      )}
    </div>
  );
}

export default App;
