import React, { useState, useMemo, useEffect } from "react";
import api from "../services/api";
import ParentForm from "../components/parentform";
import Modal from "../components/Modal";
import Pagination from "../components/pagination";

export default function ParentsPage() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const pageSize = 5;

  async function load() {
    setLoading(true);
    try {
      const data = await api.getAllAuthors();
      setAuthors(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const s = q.toLowerCase();
    return authors.filter((a) =>
      `${a.firstName} ${a.lastName}`.toLowerCase().includes(s)
    );
  }, [authors, q]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);

  const del = async (a) => {
    if (!confirm("Delete author?")) return;
    await api.deleteAuthor(a.authorId);
    load();
  };

  return (
    <div className="card">

     
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Authors</h2>

        <div className="flex gap-3">
          <input
            placeholder="Search..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="w-64"
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
            <th style={{ width: "10%" }}>ID</th>
            <th style={{ width: "30%" }}>First</th>
            <th style={{ width: "30%" }}>Last</th>
            <th style={{ width: "30%" }}></th>
          </tr>
        </thead>

        <tbody>
          {loading && (
            <tr>
              <td colSpan="4" className="text-center py-3">
                Loading...
              </td>
            </tr>
          )}

          {!loading &&
            pageItems.map((a) => (
              <tr key={a.authorId}>
                <td className="border px-3 py-2">{a.authorId}</td>
                <td className="border px-3 py-2">{a.firstName}</td>
                <td className="border px-3 py-2">{a.lastName}</td>

                <td className="border px-3 py-2">
                  <div className="flex justify-end gap-3">
                    <button
                      className="btn btn-secondary"
                      onClick={() => {
                        setEditing(a);
                        setShowModal(true);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger"
                      onClick={() => del(a)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

   
      <Pagination
        page={page}
        totalPages={totalPages}
        onPrev={() => setPage(page - 1)}
        onNext={() => setPage(page + 1)}
      />

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        title={editing ? "Edit Author" : "Add Author"}
      >
        <ParentForm
          initial={editing}
          onSaved={() => {
            setShowModal(false);
            setEditing(null);
            load();
          }}
          onCancel={() => setShowModal(false)}
        />
      </Modal>
    </div>
  );
}
