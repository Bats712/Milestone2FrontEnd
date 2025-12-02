import React from "react";

export default function Pagination({ page, totalPages, onPrev, onNext }) {
  return (
    <div className="flex justify-between mt-4">
      <button
        disabled={page <= 1}
        onClick={onPrev}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Prev
      </button>

      <span>
        Page {page} of {totalPages}
      </span>

      <button
        disabled={page >= totalPages}
        onClick={onNext}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
