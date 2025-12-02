import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./layout/Header";
import Footer from "./layout/Footer";

import Home from "./pages/Home";
import ParentsPage from "./pages/AuthorPage";
import ChildrenPage from "./pages/BooksPage";
import AboutPage from "./pages/AboutPage";   // <-- REAL about page

import "./App.css";

export interface Book {
  bookID: number;
  bookTitle: string;
  bookAuthor: string;
  releaseYear: number;
}

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("http://localhost:8081/books");

        if (!res.ok) throw new Error("Failed to fetch books");

        const data = await res.json();
        setBooks(data);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />

        <main className="main-content">
          <Routes>
            {/* Home Page */}
            <Route path="/" element={<Home />} />

            {/* Authors Page */}
            <Route path="/parents" element={<ParentsPage />} />

            {/* Books Page */}
            <Route
              path="/children"
              element={
                <ChildrenPage
                  books={books}
                  loading={loading}
                  error={error}
                />
              }
            />

            {/* About Page */}
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
