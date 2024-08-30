import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import toast, { Toaster } from "react-hot-toast";
import { fetchImages } from "./gallery-api";
import "./App.css";

export default function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchImages(query, page);
        setImages((prevImages) => [...prevImages, ...data.results]);
        setTotalPages(data.total_pages);

        setShowBtn(page < data.total_pages);

        toast.dismiss();
      } catch (err) {
        setError("Failed to fetch images. Please try again later.");
        toast.error("Oops!!! Something went wrong.", {
          position: "top-right",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query, page]);

  const handleSearchSubmit = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
    setTotalPages(0);
    setShowBtn(false);
    setError(null);
    toast.dismiss();
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="app-container">
      <SearchBar onSubmit={handleSearchSubmit} />
      <Toaster/>
      <ImageGallery images={images} onImageClick={handleImageClick} />

      {loading && <Loader />}

      {error && <ErrorMessage message={error} />}

      {showBtn && !loading && page < totalPages && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}

      {!showBtn && !loading && page >= totalPages && totalPages > 0 && (
        <p style={{ textAlign: "center", margin: "20px 0" }}>
          End of Collection
        </p>
      )}

      <ImageModal
        isOpen={Boolean(selectedImage)}
        onRequestClose={closeModal}
        image={selectedImage}
      />
    </div>
  );
}
