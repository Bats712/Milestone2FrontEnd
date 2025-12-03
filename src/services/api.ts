import type { Author } from "../types/Author";
import type { Book } from "../types/Book";

// Auto-detect environment
const isLocal =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

// Base URLs
const LOCAL_API_BASE = "http://localhost:8080/";
const ONLINE_API_BASE = "https://milestonelibraryapplication-1.onrender.com/";

const API_BASE = isLocal ? LOCAL_API_BASE : ONLINE_API_BASE;

async function handleRes<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }

  if (res.status === 204) return null as T;
  return res.json();
}

// ---------- AUTHORS ----------
export async function getAllAuthors(): Promise<Author[]> {
  return handleRes(await fetch(`${API_BASE}authors`));
}

export async function getAuthorById(id: number | string): Promise<Author> {
  return handleRes(await fetch(`${API_BASE}authors/${id}`));
}

export async function createAuthor(payload: Partial<Author>): Promise<Author> {
  return handleRes(
    await fetch(`${API_BASE}authors`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
  );
}

export async function updateAuthor(
  id: number,
  payload: Partial<Author>
): Promise<Author> {
  return handleRes(
    await fetch(`${API_BASE}authors/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
  );
}

export async function deleteAuthor(id: number): Promise<void> {
  return handleRes(await fetch(`${API_BASE}authors/${id}`, { method: "DELETE" }));
}

// ---------- BOOKS ----------
export async function getAllBooks(): Promise<Book[]> {
  return handleRes(await fetch(`${API_BASE}books`));
}

export async function getBookById(id: number | string): Promise<Book> {
  return handleRes(await fetch(`${API_BASE}books/${id}`));
}

export async function createBook(payload: Partial<Book>): Promise<Book> {
  return handleRes(
    await fetch(`${API_BASE}books`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
  );
}

export async function updateBook(
  id: number,
  payload: Partial<Book>
): Promise<Book> {
  return handleRes(
    await fetch(`${API_BASE}books/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
  );
}

export async function deleteBook(id: number): Promise<void> {
  return handleRes(await fetch(`${API_BASE}books/${id}`, { method: "DELETE" }));
}

const api = {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,

  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};

export default api;
