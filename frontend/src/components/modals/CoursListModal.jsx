import { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Clock,
  User,
  MapPin,
  BookOpen,
  Pencil,
  Trash2,
  Eye,
} from "lucide-react";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog.jsx";
import { CoursDetailsModal } from "./CoursDetailsModal.jsx"; // ← AJOUTÉ

export const CoursListModal = ({
  isOpen,
  onClose,
  allCours, // ← MODIFIÉ : Tous les cours (état global)
  jour,
  creneau,
  onCoursClick, // Handler pour ouvrir modal édition
  onCoursDelete, // Handler pour supprimer
}) => {
  // État pour le modal de confirmation
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [coursToDelete, setCoursToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletedIds, setDeletedIds] = useState([]); // Tracker les IDs supprimés

  // État local pour le modal détails
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedCoursDetails, setSelectedCoursDetails] = useState(null);

  // ← MODIFIÉ : Filtrer depuis allCours en temps réel
  const coursList = useMemo(() => {
    if (!allCours || !jour || !creneau?.id) return [];
    return allCours.filter(
      (c) => c.jour === jour && c.creneauId === creneau.id
    );
  }, [allCours, jour, creneau?.id]);

  // Filtrer les cours supprimés localement
  const visibleCoursList = useMemo(() => {
    return coursList.filter((cours) => !deletedIds.includes(cours.id));
  }, [coursList, deletedIds]);

  // Fermer si plus de cours visibles
  if (!visibleCoursList || visibleCoursList.length === 0) {
    if (isOpen) {
      setTimeout(() => onClose(), 0); // Fermer au prochain tick
    }
    return null;
  }

  // Handler qui ferme le modal liste ET ouvre modal édition
  const handleCoursClick = (cours) => {
    // onClose(); // Fermer ce modal
    onCoursClick?.(cours); // Ouvrir le modal d'édition
  };

  // Handler pour ouvrir le dialog de confirmation
  const handleDeleteClick = (e, cours) => {
    e.stopPropagation(); // Empêcher le clic du parent
    setCoursToDelete(cours);
    setDeleteDialogOpen(true);
  };

  // Handler pour afficher les détails
  const handleShowDetails = (e, cours) => {
    e.stopPropagation();
    //onClose(); // Fermer ce modal: ← RETIRÉ : On garde ce modal ouvert
    setSelectedCoursDetails(cours);
    setDetailsModalOpen(true);
  };

  // Handler pour confirmer la suppression
  const handleConfirmDelete = async () => {
    if (!coursToDelete) return;

    setIsDeleting(true);

    // Marquer comme supprimé localement AVANT l'appel API
    const deletedId = coursToDelete.id;
    setDeletedIds((prev) => [...prev, coursToDelete.id]);

    // Appeler l'API
    const result = await onCoursDelete?.(deletedId);

    setIsDeleting(false);
    setDeleteDialogOpen(false);
    setCoursToDelete(null);

    // Si échec, restaurer (ROLLBACK)
    if (!result?.success) {
      setDeletedIds((prev) => prev.filter((id) => id !== deletedId));
    }

    // Fermer le modal liste si c'était le dernier cours
    if (coursList.length === 1) {
      onClose();
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Cours du {jour} - {creneau?.nom}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-3 mt-4">
            {visibleCoursList.map((cours) => (
              <div
                key={cours.id}
                className="border rounded-lg p-4 hover:bg-muted/50 hover:border-primary/50 transition-all cursor-pointer group"
                onClick={() => handleCoursClick(cours)}
              >
                <div className="flex items-start gap-3">
                  {/* Barre de couleur - s'élargit au hover */}
                  <div
                    className="w-1 group-hover:w-2 transition-all rounded"
                    style={{
                      backgroundColor: cours.matiere?.couleur || "#3B82F6",
                    }}
                  />

                  <div className="flex-1 space-y-2">
                    {/* En-tête avec matière et badge classe */}
                    <div className="flex items-start justify-between gap-3">
                      {/* Matière (gauche) */}
                      <h3 className="font-semibold text-lg flex-1">
                        {cours.matiere?.nom || "Matière"}
                      </h3>

                      {/* Badge classe (droite, autonome) */}
                      <span
                        className="text-xs font-medium px-2 py-1 rounded"
                        style={{
                          backgroundColor: cours.matiere?.couleur || "#3B82F6",
                          color: "white",
                        }}
                      >
                        {cours.classe?.nom}
                      </span>
                    </div>

                    {/* Infos détaillées */}
                    <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>
                          {cours.professeur?.prenom} {cours.professeur?.nom}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>Salle {cours.salle?.numero}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>
                          {creneau?.heureDebut} - {creneau?.heureFin}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        <span>{cours.semestre}</span>
                      </div>
                    </div>

                    {/* Boutons modifier/supprimer (en dessous, séparés du badge) */}
                    <div className="flex items-center gap-2 pt-1">
                      {/* Bouton voir détails */}
                      <button
                        className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 px-3 py-1.5 rounded hover:bg-blue-50 text-sm flex-1"
                        onClick={(e) => handleShowDetails(e, cours)}
                        title="Voir détails"
                      >
                        <Eye className="w-4 h-4 text-blue-600" />
                        <span className="text-blue-600 font-medium">
                          Détails
                        </span>
                      </button>

                      {/* Bouton modifier */}
                      <button
                        className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 px-3 py-1.5 rounded hover:bg-primary/10 text-sm flex-1"
                        onClick={(e) => {
                          e.stopPropagation(); // Éviter de déclencher le clic du parent
                          handleCoursClick(cours);
                        }}
                        title="Modifier"
                      >
                        <Pencil className="w-4 h-4 text-primary" />
                        <span className="text-primary font-medium">
                          Modifier
                        </span>
                      </button>

                      {/* Bouton supprimer */}
                      <button
                        className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 px-3 py-1.5 rounded hover:bg-red-50 text-sm flex-1"
                        onClick={(e) => handleDeleteClick(e, cours)}
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                        <span className="text-red-600 font-medium">
                          Supprimer
                        </span>
                      </button>
                    </div>

                    {/* Notes si présentes */}
                    {cours.notes && (
                      <div className="text-sm text-muted-foreground bg-muted/30 rounded p-2 mt-2">
                        {cours.notes}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* ← AJOUTÉ : Modal détails rendu ici */}
      <CoursDetailsModal
        isOpen={detailsModalOpen}
        onClose={() => {
          setDetailsModalOpen(false);
          setSelectedCoursDetails(null);
        }}
        cours={selectedCoursDetails}
      />

      {/* Dialog de confirmation de suppression */}
      <DeleteConfirmDialog
        isOpen={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);
          setCoursToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        cours={coursToDelete}
        isDeleting={isDeleting}
      />
    </>
  );
};
