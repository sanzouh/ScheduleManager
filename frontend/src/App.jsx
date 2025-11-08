import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useCours } from "./hooks/useCours";
import { useReferenceData } from "./hooks/useReferenceData";
import { LoadingSkeleton } from "./components/common/LoadingSkeleton";
import { ErrorMessage } from "./components/common/ErrorMessage";
import { Header } from "./components/layout/Header";
import { FilterBar } from "./components/layout/FilterBar";
import { ScheduleGrid } from "./components/schedule/SheduleGrid.jsx";
import { VUES } from "./utils/constants";

function App() {
  // État local
  const [selectedView, setSelectedView] = useState(VUES.CLASSE);
  const [selectedClasse, setSelectedClasse] = useState("");
  const [selectedSemestre, setSelectedSemestre] = useState("S1");

  // Données backend
  const {
    cours,
    loading: coursLoading,
    error: coursError,
  } = useCours({
    classeId: selectedClasse,
    semestre: selectedSemestre,
  });

  const {
    classes,
    creneaux,
    loading: refLoading,
    error: refError,
  } = useReferenceData();

  // États combinés
  const loading = coursLoading || refLoading;
  const error = coursError || refError;

  // Handlers
  const handleNewCours = () => {
    console.log("Ouvrir modal création cours");
  };

  const handleExportPDF = () => {
    console.log("Exporter PDF");
  };

  const handleCoursClick = (cours) => {
    console.log("Cours cliqué:", cours);
  };

  const handleEmptySlotClick = (slot) => {
    console.log("Créneau vide cliqué:", slot);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header onNewCours={handleNewCours} onExportPDF={handleExportPDF} />

      {/* Filtres */}
      <FilterBar
        selectedView={selectedView}
        onViewChange={setSelectedView}
        selectedClasse={selectedClasse}
        onClasseChange={setSelectedClasse}
        selectedSemestre={selectedSemestre}
        onSemestreChange={setSelectedSemestre}
        classes={classes}
      />

      {/* Contenu principal */}
      <main className="container mx-auto px-6 py-8">
        {loading && <LoadingSkeleton />}

        {error && (
          <ErrorMessage
            message={error}
            onRetry={() => window.location.reload()}
          />
        )}

        {!loading && !error && (
          <Card>
            <CardContent className="p-6">
              <ScheduleGrid
                cours={cours}
                creneaux={creneaux}
                onCoursClick={handleCoursClick}
                onEmptySlotClick={handleEmptySlotClick}
              />
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}

export default App;
