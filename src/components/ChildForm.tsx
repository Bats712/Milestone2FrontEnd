import React, { useState, useEffect } from "react";
import api from "../services/api";
import type { Author } from "../types/Author";
import type { Book } from "../types/Book";

interface ChildFormProps {
  initial: Book | null;
  onSaved: () => void;
  onCancel: () => void;
  preselectedAuthor?: Author | null;
}

const ChildForm: React.FC<ChildFormProps> = ({
  initial = null,
  onSaved,
  onCancel,
  preselectedAuthor = null
}) => {
  const [BookTitle, setBookTitle] = useState(initial?.bookTitle || "");
  const [BookAuthor, setBookAuthor] = useState(initial?.bookAuthor || "");
  const [releaseYear, setReleaseYear] = useState(initial?.releaseYear || "");
  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    api.getAllAuthors().then(setAuthors).catch(() => {});
  }, []);

  useEffect(() => {
    setBookTitle(initial?.bookTitle || "");
    setBookAuthor(initial?.bookAuthor || "");
    setReleaseYear(initial?.releaseYear || "");

    if (preselectedAuthor) {
      setBookAuthor(`${preselectedAuthor.firstName} ${preselectedAuthor.lastName}`);
    }
  }, [initial, preselectedAuthor]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: Book = {
      bookID: initial?.bookID || 0,
      bookTitle: BookTitle,
      bookAuthor: BookAuthor,
      releaseYear: Number(releaseYear)
    };

    try {
      if (initial?.bookID) {
        await api.updateBook(initial.bookID, payload);
      } else {
        await api.createBook(payload);
      }
      onSaved();
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <input
        placeholder="Book title"
        value={BookTitle}
        onChange={(e) => setBookTitle(e.target.value)}
        required
      />

      <label className="text-xs">Select Author</label>
      <select
        className="w-full"
        value={BookAuthor}
        onChange={(e) => setBookAuthor(e.target.value)}
      >
        <option value="">-- select author --</option>
        {authors.map((a) => (
          <option key={a.authorId} value={`${a.firstName} ${a.lastName}`}>
            {a.firstName} {a.lastName}
          </option>
        ))}
      </select>

      <input
        placeholder="Release year"
        type="number"
        value={releaseYear}
        onChange={(e) => setReleaseYear(e.target.value)}
        required
      />

      <div className="flex justify-end gap-2">
        <button type="button" className="border px-3 py-1" onClick={onCancel}>
          Cancel
        </button>

        <button type="submit" className="bg-indigo-600 text-white px-3 py-1 rounded">
          Save
        </button>
      </div>
    </form>
  );
};

export default ChildForm;
