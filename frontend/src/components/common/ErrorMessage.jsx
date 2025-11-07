// src/components/common/ErrorMessage.jsx
import { AlertCircle } from "lucide-react";

export const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-6">
      <div className="bg-red-50 rounded-full p-4 mb-4">
        <AlertCircle className="w-12 h-12 text-red-500" />
      </div>

      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Une erreur est survenue
      </h3>

      <p className="text-gray-600 mb-6 text-center max-w-md">
        {message || "Impossible de charger les données"}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Réessayer
        </button>
      )}
    </div>
  );
};
