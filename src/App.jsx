import React, { useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import toast, { Toaster } from "react-hot-toast";
import { fetchImages } from "./gallery-api";

export default function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [hasMoreImages, setHasMoreImages] = useState(true);

  const handleSearchSubmit = async (newQuery) => {
    setQuery(newQuery);
    setPage(1); // Скидаємо сторінку на 1 при новому пошуку
    setLoading(true);
    setError(null);
    setHasMoreImages(true); // При новому пошуку скидаємо стан наявності додаткових зображень

    try {
      const data = await fetchImages(newQuery, 1); // Завантажуємо зображення для першої сторінки
      setImages(data.results);

      // Якщо результатів менше 12, більше зображень немає
      setHasMoreImages(data.results.length >= 12);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    const nextPage = page + 1; // Обчислюємо наступну сторінку
    setLoading(true);

    try {
      const data = await fetchImages(query, nextPage); // Завантажуємо зображення для наступної сторінки
      if (data.results.length === 0) {
        setHasMoreImages(false); // Якщо нових результатів немає, більше зображень немає
        setLoading(false);
        return;
      }

      const newImages = [...images, ...data.results];
      setImages(newImages);

      // Якщо результатів менше 12, більше зображень немає
      setHasMoreImages(data.results.length >= 12);

      // Оновлюємо сторінку після успішного завантаження нових зображень
      setPage(nextPage);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearchSubmit} />
      <Toaster position="top-right" />
      {error && <ErrorMessage message={error} />}
      
      <ImageGallery images={images} onImageClick={handleImageClick} />
      
      {loading && <Loader />}
      
      {!loading && hasMoreImages && images.length >= 12 && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      
      {selectedImage && (
        <ImageModal
          isOpen={Boolean(selectedImage)}
          onRequestClose={closeModal}
          image={selectedImage}
        />
      )}
    </div>
  );
}
