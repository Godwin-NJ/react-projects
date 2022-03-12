import React, { useState, useEffect } from "react";
import { FaSearch, FaWindows } from "react-icons/fa";
import Photo from "./Photo";
// const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`

const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

function App() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState("");

  const fetchImages = async () => {
    setLoading(true);
    let url;
    const urlPage = `&page=${page}`;
    const urlQuery = `&query=${query}`;

    if (query) {
      url = `${searchUrl}${clientID}${urlPage}${urlQuery}`;
    } else {
      url = `${mainUrl}${clientID}${urlPage}`;
    }

    try {
      const reponse = await fetch(url);
      const data = await reponse.json();
      // console.log(data);
      setPhotos((oldPhotos) => {
        if (query && page === 1) {
          return data.results;
        } else if (query) {
          return [...oldPhotos, ...data.results];
        }
        return [...oldPhotos, ...data];
      });

      // setPhotos((oldPhoto) => {
      //   return [...oldPhoto, ...data];
      // });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchImages();
    // eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    const event = window.addEventListener("scroll", () => {
      if (
        !loading &&
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 2
      ) {
        setPage((oldPage) => {
          return oldPage + 1;
        });
      }
    });

    return () => window.removeEventListener("scroll", event);
    // eslint-disable-next-line
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchImages();
  };

  return (
    <main>
      <section className="search">
        <form className="search-form">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="search"
            className="form-input"
          />
          <button type="submit" className="submit-btn" onClick={handleSubmit}>
            <FaSearch />
          </button>
        </form>
      </section>
      <section className="photos">
        <div className="photos-center">
          {photos.map((photo) => {
            // console.log(photo);
            return <Photo key={photo.id} {...photo} />;
          })}
        </div>
        {loading && <h2 className="loading">Loading....</h2>}
      </section>
    </main>
  );
}

export default App;
