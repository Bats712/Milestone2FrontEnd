

export default function AboutPage() {
  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-4">About This Application</h2>

      <p className="mb-4">
        The <strong>Library Application</strong> is a full-stack project developed
        as part of the <strong>Milestone 2 Project</strong> for the Web
        Programming course. Its main purpose is to provide a simple, efficient
        system for managing authors and books, including full CRUD functionality
        (Create, Read, Update, Delete) with validation and search capabilities.
      </p>

      <h3 className="text-xl font-semibold mt-4 mb-2">Team Members</h3>
      <ul className="list-disc list-inside mb-4">
        <li><strong>Eduardo Goncalves</strong></li>
        <li><strong>Dylan Pelletier</strong></li>
      </ul>

      <h3 className="text-xl font-semibold mt-4 mb-2">Project Features</h3>
      <ul className="list-disc list-inside mb-4">
        <li>Manage authors (add, edit, delete)</li>
        <li>Manage books (add, edit, delete)</li>
        <li>Search and filter functionality</li>
        <li>Pagination for large datasets</li>
        <li>Modals for clean data input</li>
        <li>Fully responsive UI</li>
      </ul>

      <h3 className="text-xl font-semibold mt-4 mb-2">Technologies Used</h3>
      <ul className="list-disc list-inside mb-4">
        <li><strong>Spring Boot</strong> — Backend (running on port 8081)</li>
        <li><strong>React + Vite</strong> — Frontend (running on port 5173)</li>
        <li>TypeScript (optional depending on your components)</li>
        <li>REST API communication</li>
        <li>Axios for HTTP requests</li>
        <li>CSS (custom styling)</li>
      </ul>

      <h3 className="text-xl font-semibold mt-4 mb-2">Backend Overview</h3>
      <p className="mb-4">
        The backend is built with Spring Boot and exposes REST endpoints for
        managing authors and books. It supports standard CRUD operations and
        returns JSON responses consumed by the frontend.
      </p>

      <h3 className="text-xl font-semibold mt-4 mb-2">Frontend Overview</h3>
      <p className="mb-4">
        The frontend is built using React and Vite. It features reusable
        components, custom modals, tables, pagination controls, and form
        validation. All data is fetched from the Spring Boot API using Axios.
      </p>

      <h3 className="text-xl font-semibold mt-4 mb-2">Purpose</h3>
      <p className="mb-2">
        This project demonstrates:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Understanding of full-stack development</li>
        <li>State management in React</li>
        <li>API integration</li>
        <li>Component reusability</li>
        <li>Clean UI/UX design principles</li>
      </ul>

      <p className="mt-6 font-semibold text-center">
        Thank you for reviewing our project!
      </p>
    </div>
  );
}
