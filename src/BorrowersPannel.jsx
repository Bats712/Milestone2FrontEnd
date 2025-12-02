import React, { useState } from "react";
import useApi from "../hooks/useApi";


export default function BorrowersPanel() {
const { data: borrowers, refetch } = useApi("/borrowers", []);
const [name, setName] = useState("");
const [email, setEmail] = useState("");


const addBorrower = async (e) => {
e.preventDefault();


await fetch("/api/borrowers", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ name, email }),
});


setName("");
setEmail("");
refetch();
};


return (
<div className="bg-white p-4 rounded shadow">
<h3 className="font-semibold text-lg mb-2">Borrowers</h3>


<ul className="space-y-2 mb-4">
{(borrowers || []).map(b => (
<li key={b.id} className="border rounded p-2 text-sm">
<div className="font-medium">{b.name}</div>
<div className="text-gray-600 text-xs">{b.email}</div>
</li>
))}
</ul>


<form className="space-y-2" onSubmit={addBorrower}>
<input className="border p-2 w-full" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
<input className="border p-2 w-full" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
<button className="w-full bg-indigo-600 text-white py-2 rounded">Add Borrower</button>
</form>
</div>
);
}