import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-10 py-4 border-t">
      <div className="container-page mx-auto px-6 text-center text-gray-600">
        <p className="text-sm">
          © {new Date().getFullYear()} Library Application — Milestone 2 Project
        </p>
      </div>
    </footer>
  );
}
