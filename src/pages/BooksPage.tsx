import { useState, useMemo } from "react";
import Modal from "../components/modal";
import ChildForm from "../components/ChildForm";
import type { Book } from "../types/Book";
import api from "../services/api";


interface ChildrenPageProps {
  books: Book[];
  loading: boolean;
  error: string | null;
}

const pageSize = 5;

const ChildrenPage: React.FC<ChildrenPageProps> = ({ books, loading, error }) => {
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Book | null>(null);

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
    window.location.reload();
  };

  if (loading) return <p>Loading books...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="card">

      <div className="flex justify-between mb-4">
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

          <button
            className="btn btn-primary"
            onClick={() => {
              setEditing(null);
              setShowModal(true);
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
          {pageItems.map((b) => (
            <tr key={b.bookID}>
              <td className="border px-3 py-2">{b.bookID}</td>
              <td className="border px-3 py-2">{b.bookTitle}</td>
              <td className="border px-3 py-2">{b.bookAuthor}</td>
              <td className="border px-3 py-2">{b.releaseYear}</td>

              <td className="border px-3 py-2 text-right">
                <button
                  className="btn btn-secondary mr-2"
                  onClick={() => {
                    setEditing(b);
                    setShowModal(true);
                  }}
                >
                  Edit
                </button>

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

      <div className="pagination mt-3">
        <button
          className="btn btn-secondary"
          disabled={page <= 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Prev
        </button>

        <span className="px-3">
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

   
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title={editing ? "Edit Book" : "Add Book"}
      >
        <ChildForm
          initial={editing}
          onSaved={() => {
            setShowModal(false);
            setEditing(null);
            window.location.reload();
          }}
          onCancel={() => setShowModal(false)}
        />
      </Modal>
    </div>
  );
};

export default ChildrenPage;
