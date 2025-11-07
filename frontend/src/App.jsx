// src/App.jsx
import { useCours } from "./hooks/useCours";
import { useReferenceData } from "./hooks/useReferenceData";
import { LoadingSkeleton } from "./components/common/LoadingSkeleton";
import { ErrorMessage } from "./components/common/ErrorMessage";

function App() {
  const {
    cours,
    loading: coursLoading,
    error: coursError,
  } = useCours({
    semestre: "S1",
  });

  const {
    professeurs,
    classes,
    matieres,
    loading: refLoading,
    error: refError,
  } = useReferenceData();

  if (coursLoading || refLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <LoadingSkeleton />
      </div>
    );
  }

  if (coursError || refError) {
    return (
      <div className="min-h-screen bg-gray-50">
        <ErrorMessage
          message={coursError || refError}
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            ✅ Connexion API réussie !
          </h1>
          <p className="text-gray-600">Backend connecté et données chargées</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Statistiques */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2">📚 Matières</h3>
            <p className="text-3xl font-bold text-indigo-600">
              {matieres.length}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2">👨‍🏫 Professeurs</h3>
            <p className="text-3xl font-bold text-green-600">
              {professeurs.length}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2">🎓 Classes</h3>
            <p className="text-3xl font-bold text-purple-600">
              {classes.length}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mt-6">
          <h3 className="text-lg font-semibold mb-4">📅 Cours chargés</h3>
          <p className="text-gray-600">
            {cours.length} cours trouvés pour le semestre S1
          </p>

          {cours.length > 0 && (
            <div className="mt-4">
              <pre className="bg-gray-50 p-4 rounded text-xs overflow-auto">
                {JSON.stringify(cours[0], null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
