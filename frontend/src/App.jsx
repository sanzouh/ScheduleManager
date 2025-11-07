import { useState, useEffect } from "react";
import axios from "./api/axiosConfig";

function App() {
  const [status, setStatus] = useState("Chargement...");

  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await axios.get("/health");
        setStatus(`✅ Connecté : ${response.data.message}`);
      } catch (error) {
        setStatus("❌ Erreur de connexion au backend");
      }
    };

    testConnection();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          ENI Schedule Manager
        </h1>
        <p className="text-gray-600">{status}</p>
      </div>
    </div>
  );
}

export default App;
