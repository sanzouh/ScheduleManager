import { useState } from "react";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { Card, CardContent } from "@/components/ui/card";
import { useCours } from "./hooks/useCours";
import { useReferenceData } from "./hooks/useReferenceData";
import { LoadingSkeleton } from "./components/common/LoadingSkeleton";
import { ErrorMessage } from "./components/common/ErrorMessage";
import { Header } from "./components/layout/Header";
import { FilterBar } from "./components/layout/FilterBar";
import { ScheduleGrid } from "./components/schedule/SheduleGrid.jsx";
import { CoursModal } from "./components/modals/CoursModal.jsx";
import { VUES } from "./utils/constants";

function App() {
  const [selectedView, setSelectedView] = useState(VUES.CLASSE);
  const [selectedClasse, setSelectedClasse] = useState("");
  const [selectedProfesseur, setSelectedProfesseur] = useState("");
  const [selectedSalle, setSelectedSalle] = useState("");
  const [selectedSemestre, setSelectedSemestre] = useState("S1");

  // État modal
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCours, setEditingCours] = useState(null);
  const [defaultSlot, setDefaultSlot] = useState(null);

  const filters = {
    semestre: selectedSemestre,
  };

  if (selectedView === VUES.CLASSE && selectedClasse) {
    filters.classeId = selectedClasse;
  } else if (selectedView === VUES.PROFESSEUR && selectedProfesseur) {
    filters.professeurId = selectedProfesseur;
  } else if (selectedView === VUES.SALLE && selectedSalle) {
    filters.salleId = selectedSalle;
  }

  const {
    cours,
    loading: coursLoading,
    error: coursError,
    createCours,
    updateCours,
    // deleteCours,
  } = useCours(filters);

  const {
    classes,
    professeurs, // ← AJOUTÉ
    salles,
    creneaux,
    loading: refLoading,
    error: refError,
  } = useReferenceData();

  const loading = coursLoading || refLoading;
  const error = coursError || refError;

  // Handlers
  const handleNewCours = () => {
    setEditingCours(null);
    setDefaultSlot(null);
    setModalOpen(true);
  };

  const handleExportPDF = () => {
    toast.success("Fonctionnalité export PDF à venir !");
  };

  const handleCoursClick = (cours) => {
    setEditingCours(cours);
    setDefaultSlot(null);
    setModalOpen(true);
  };

  const handleEmptySlotClick = (slot) => {
    setEditingCours(null);

    // Enrichir defaultSlot avec les filtres actifs
    const enrichedSlot = {
      ...slot,
      classeId: selectedView === VUES.CLASSE ? selectedClasse : undefined,
      professeurId:
        selectedView === VUES.PROFESSEUR ? selectedProfesseur : undefined,
      salleId: selectedView === VUES.SALLE ? selectedSalle : undefined,
      semestre: selectedSemestre,
    };

    setDefaultSlot(enrichedSlot);
    setModalOpen(true);
  };

  const handleSubmitCours = async (formData) => {
    if (editingCours) {
      // Modification
      const result = await updateCours(editingCours.id, formData);
      if (result.success) {
        toast.success("Cours modifié avec succès !");
        setModalOpen(false);
      } else {
        toast.error(result.error || "Erreur lors de la modification");
      }
    } else {
      // Création
      const result = await createCours(formData);
      if (result.success) {
        toast.success("Cours créé avec succès !");
        setModalOpen(false);
      } else {
        toast.error(result.error || "Erreur lors de la création");
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-right" />

      <Header onNewCours={handleNewCours} onExportPDF={handleExportPDF} />

      <FilterBar
        selectedView={selectedView}
        onViewChange={setSelectedView}
        selectedClasse={selectedClasse}
        onClasseChange={setSelectedClasse}
        selectedProfesseur={selectedProfesseur}
        onProfesseurChange={setSelectedProfesseur}
        selectedSalle={selectedSalle}
        onSalleChange={setSelectedSalle}
        selectedSemestre={selectedSemestre}
        onSemestreChange={setSelectedSemestre}
        classes={classes}
        professeurs={professeurs}
        salles={salles}
      />

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
                viewMode={
                  // ← AJOUTÉ : Déterminer le mode d'affichage
                  !selectedClasse && !selectedProfesseur && !selectedSalle
                    ? "global"
                    : "filtered"
                }
              />
            </CardContent>
          </Card>
        )}
      </main>

      {/* Modal création/édition */}
      <CoursModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmitCours}
        initialData={editingCours}
        defaultSlot={defaultSlot}
      />
    </div>
  );
}

export default App;
