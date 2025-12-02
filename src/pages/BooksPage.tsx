import React, { useState, useEffect, useMemo } from "react";
import api from "../services/api";
import ChildForm from "../components/ChildForm";
import Modal from "../components/Modal";
import type { Book } from "../types/Book";

const pageSize = 5;

const ChildrenPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [q, setQ] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [show, setShow] = useState<boolean>(false);
  const [editing, setEditing] = useState<Book | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await api.getAllBooks();
      setBooks(data as Book[]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const s = q.toLowerCase();
    return books.filter(
      (b) =>
        b.bookTitle.toLowerCase().includes(s) ||
        b.bookAuthor.toLowerCase().includes(s)
    );
  }, [books, q]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);

  const del = async (b: Book) => {
    if (!confirm("Delete book?")) return;
    await api.deleteBook(b.bookID);
    load();
  };

  return (
    <div className="card">
      <div className="flex justify-between mb-3">
        <h2 className="text-xl font-bold">Books</h2>

        <div className="flex gap-2">
          <input
            placeholder="Search..."
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setPage(1);
            }}
            className="border px-3 py-2 rounded"
          />

          {/* Add button (same style idea as AuthorsPage) */}
          <button
            className="btn btn-primary"
            onClick={() => {
              setEditing(null);
              setShow(true);
            }}
          >
            + Add
          </button>
        </div>
      </div>

      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Year</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {loading && (
            <tr>
              <td colSpan={5}>Loading...</td>
            </tr>
          )}

          {!loading &&
            pageItems.map((b) => (
              <tr key={b.bookID}>
                <td className="border px-3 py-2">{b.bookID}</td>
                <td className="border px-3 py-2">{b.bookTitle}</td>
                <td className="border px-3 py-2">{b.bookAuthor}</td>
                <td className="border px-3 py-2">{b.releaseYear}</td>
                <td className="border px-3 py-2 text-right">
                  {/* Edit button */}
                  <button
                    className="btn btn-secondary mr-2"
                    onClick={() => {
                      setEditing(b);
                      setShow(true);
                    }}
                  >
                    Edit
                  </button>

                  {/* Delete button */}
                  <button
                    className="btn btn-danger"
                    onClick={() => del(b)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <button
          className="btn btn-secondary"
          disabled={page <= 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Prev
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          className="btn btn-secondary"
          disabled={page >= totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>

      {/* Modal for Add/Edit */}
      <Modal
        open={show}
        title={editing ? "Edit Book" : "Add Book"}
        onClose={() => setShow(false)}
      >
        <ChildForm
          initial={editing}
          onSaved={() => {
            setShow(false);
            setEditing(null);
            load();
          }}
          onCancel={() => setShow(false)}
        />
      </Modal>
    </div>
  );
};

export default ChildrenPage;
