import React, { useState } from "react";
import type { Author } from "../types/Author";

interface ParentFormProps {
  initial: Author | null;
  onSaved: () => void;
  onCancel: () => void;
}

const ParentForm: React.FC<ParentFormProps> = ({ initial, onSaved, onCancel }) => {
  const [firstName, setFirstName] = useState(initial?.firstName ?? "");
  const [lastName, setLastName] = useState(initial?.lastName ?? "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSaved();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First name"
      />

      <input
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last name"
      />

      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default ParentForm;
