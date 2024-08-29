import React, { useState } from "react";
import css from "./SearchBar.module.css";
import toast from "react-hot-toast";

export default function SearchBar({ onSubmit }) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      setError("Please enter a search term.");
      toast.error("Please enter a search term.", {
        className: css.toastBottomCenter,
      });
      return;
    }
    setError(null);
    onSubmit(query);
    setQuery("");
  };

  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search images and photos"
          className={css.input}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className={css.button}>
          Search
        </button>
      </form>
      {error && <p className={css.error}>{error}</p>}
    </header>
  );
}
