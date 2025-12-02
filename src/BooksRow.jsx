import React from "react";


export default function BookRow({ book, onEdit, onDelete }) {
return (
<tr className="hover:bg-gray-50">
<td className="px-3 py-2 border">{book.id}</td>
<td className="px-3 py-2 border">{book.title}</td>
<td className="px-3 py-2 border">{book.author}</td>
<td className="px-3 py-2 border">{book.isbn}</td>
<td className="px-3 py-2 border">{book.copies}</td>
<td className="px-3 py-2 border">
<div className="flex gap-2">
<button className="px-2 py-1 border rounded" onClick={onEdit}>Edit</button>
<button className="px-2 py-1 border rounded text-red-600" onClick={onDelete}>Delete</button>
</div>
</td>
</tr>
);
}