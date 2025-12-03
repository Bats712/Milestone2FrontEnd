

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import ChildForm from "../components/childform";
import Modal from "../components/modal";


export default function ParentDetails() {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [relatedBooks, setRelatedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showChildModal, setShowChildModal] = useState(false);
  const [editingChild, setEditingChild] = useState(null);
  const [page, setPage] = useState(1);

  const pageSize = 5;

  async function load() {
    setLoading(true);
    try {
      const a = await api.getAuthorById(id);
      setAuthor(a);

      const allBooks = await api.getAllBooks();
      const fullName = `${a.firstName} ${a.lastName}`.toLowerCase();

      setRelatedBooks(
        allBooks.filter((b) => b.bookAuthor.toLowerCase().includes(fullName))
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [id]);

  const totalPages = Math.ceil(relatedBooks.length / pageSize);
  const pageItems = relatedBooks.slice((page - 1) * pageSize, page * pageSize);

  const del = async (b) => {
    if (!confirm("Delete book?")) return;
    await api.deleteBook(b.bookID);
    load();
  };

  return (
    <div className="card">
      {loading && <div>Loading...</div>}

      {!loading && author && (
        <>
          <h2 className="text-2xl font-bold mb-3">
            {author.firstName} {author.lastName}
          </h2>

          <button
            onClick={() => { setEditingChild(null); setShowChildModal(true); }}
            className="mb-3"
          >
            + Add Book
          </button>

          <h3 className="font-semibold mb-2">Books by this author</h3>

          <table className="w-full">
            <thead><tr><th>ID</th><th>Title</th><th>Author</th><th>Year</th><th></th></tr></thead>

            <tbody>
              {pageItems.map((b) => (
                <tr key={b.bookID}>
                  <td className="border px-3 py-2">{b.bookID}</td>
                  <td className="border px-3 py-2">{b.bookTitle}</td>
                  <td className="border px-3 py-2">{b.bookAuthor}</td>
                  <td className="border px-3 py-2">{b.releaseYear}</td>
                  <td className="border px-3 py-2 text-right">
                    <button className="mr-2" onClick={() => { setEditingChild(b); setShowChildModal(true); }}>
                      Edit
                    </button>
                    <button className="text-red-600" onClick={() => del(b)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination page={page} totalPages={totalPages} onPrev={() => setPage(page - 1)} onNext={() => setPage(page + 1)} />

          <Modal open={showChildModal} title={editingChild ? "Edit Book" : "Add Book"} onClose={() => setShowChildModal(false)}>
            <ChildForm
              initial={editingChild}
              preselectedAuthor={author}
              onSaved={() => { setShowChildModal(false); setEditingChild(null); load(); }}
              onCancel={() => setShowChildModal(false)}
            />
          </Modal>
        </>
      )}
    </div>
  );
}
