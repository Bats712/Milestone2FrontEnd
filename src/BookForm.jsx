import React, { useState } from "react";


export default function BookForm({ initial = {}, onSaved, onCancel }) {
const [title, setTitle] = useState(initial.title || "");
const [author, setAuthor] = useState(initial.author || "");
const [isbn, setIsbn] = useState(initial.isbn || "");



const isEdit = Boolean(initial.id);


const submit = async (e) => {
e.preventDefault();
const payload = { title, author, isbn, copies: Number(copies) };
const url = isEdit ? `/api/books/${initial.id}` : "/api/books";
const method = isEdit ? "PUT" : "POST";


await fetch(url, {
method,
headers: { "Content-Type": "application/json" },
body: JSON.stringify(payload),
});


onSaved();
};


return (
<form onSubmit={submit} className="space-y-3 p-4 border rounded">
<h3 className="text-lg font-semibold">{isEdit ? "Edit Book" : "Add Book"}</h3>


<div>
<label className="block text-sm">Title</label>
<input className="border p-2 w-full" value={title} onChange={e => setTitle(e.target.value)} />
</div>


<div>
<label className="block text-sm">Author</label>
<input className="border p-2 w-full" value={author} onChange={e => setAuthor(e.target.value)} />
</div>


<div className="grid grid-cols-2 gap-2"></div>
<div>
<label className="block text-sm">ISBN</label>
<input className="border p-2 w-full" value={isbn} onChange={e => setIsbn(e.target.value)} />
</div>
<div>
<label className="block text-sm">Copies</label></div>
</form>
)}
