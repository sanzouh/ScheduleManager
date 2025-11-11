import { useState } from "react";
import { Card } from "@/components/ui/card";
import { CourseCard } from "./CourseCard";
import { CompactCourseCard } from "./CompactCourseCard";
import { EmptySlot } from "./EmptySlot";
import { CoursListModal } from "../modals/CoursListModal";
import { CoursDetailsModal } from "../modals/CoursDetailsModal";
import { DeleteConfirmDialog } from "../modals/DeleteConfirmDialog";
import { ContextMenu } from "../common/ContextMenu";
import { Pencil, Copy, Trash2, Eye } from "lucide-react";
import { JOURS_SEMAINE } from "@/utils/constants.js";

export const ScheduleGrid = ({
  cours = [],
  creneaux = [],
  onCoursClick,
  onEmptySlotClick,
  onCoursDelete,
  onCoursDuplicate,
  viewMode = "global", // Savoir si vue filtrée ou globale
}) => {
  // État pour le modal "voir plus"
  const [modalListOpen, setModalListOpen] = useState(false);
  // const [selectedSlotCours, setSelectedSlotCours] = useState([]); ← RETIRÉ
  const [selectedSlotInfo, setSelectedSlotInfo] = useState(null); // On garde juste les critères

  // État pour le menu contextuel
  const [contextMenu, setContextMenu] = useState(null);

  // État pour le dialog de confirmation
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [coursToDelete, setCoursToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // ← AJOUTÉ : État pour le modal détails
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedCoursDetails, setSelectedCoursDetails] = useState(null);

  const getCoursForSlot = (jour, creneauId) => {
    return cours.filter((c) => c.jour === jour && c.creneauId === creneauId);
  };

  // Handler pour ouvrir le modal liste: Ne plus passer coursList, juste les critères
  const handleShowMore = (coursList, jour, creneau) => {
    // setSelectedSlotCours(coursList);
    setSelectedSlotInfo({ jour, creneau });
    setModalListOpen(true);
  };

  // Handler clic droit sur une carte
  const handleContextMenu = (e, cours) => {
    e.preventDefault();
    e.stopPropagation();

    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      cours,
    });
  };

  // ← MODIFIÉ : Handler pour ouvrir le modal détails
  const handleShowDetails = (cours) => {
    setSelectedCoursDetails(cours);
    setDetailsModalOpen(true);
  };

  // Actions du menu contextuel
  const getContextMenuActions = (cours) => [
    {
      label: "Modifier",
      icon: <Pencil className="w-4 h-4" />,
      onClick: () => onCoursClick(cours),
    },
    {
      label: "Dupliquer",
      icon: <Copy className="w-4 h-4" />,
      onClick: () => onCoursDuplicate?.(cours),
    },
    {
      label: "Voir détails",
      icon: <Eye className="w-4 h-4" />,
      onClick: () => handleShowDetails(cours), // ← MODIFIÉ
    },
    {
      label: "Supprimer",
      icon: <Trash2 className="w-4 h-4" />,
      danger: true,
      onClick: () => {
        // Ouvrir le dialog au lieu de l'alert
        setCoursToDelete(cours);
        setDeleteDialogOpen(true);
      },
    },
  ];

  // Handler pour confirmer la suppression
  const handleConfirmDelete = async () => {
    if (!coursToDelete) return;

    setIsDeleting(true);
    await onCoursDelete?.(coursToDelete.id);
    setIsDeleting(false);
    setDeleteDialogOpen(false);
    setCoursToDelete(null);
  };

  if (creneaux.length === 0) {
    return (
      <Card className="p-8">
        <p className="text-center text-muted-foreground">
          Chargement des créneaux...
        </p>
      </Card>
    );
  }

  const MAX_VISIBLE = 1;

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="sticky left-0 z-10 w-32 border bg-background p-3 text-left text-sm font-semibold">
                Horaires
              </th>
              {JOURS_SEMAINE.map((jour) => (
                <th
                  key={jour}
                  className="min-w-[180px] border bg-muted/50 p-3 text-center text-sm font-semibold"
                >
                  {jour}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {creneaux.map((creneau) => (
              <tr key={creneau.id}>
                {/* Colonne horaire */}
                <td className="sticky left-0 z-10 border bg-background p-3">
                  <div className="text-sm">
                    <div className="font-semibold">{creneau.nom}</div>
                    <div className="text-xs text-muted-foreground">
                      {creneau.heureDebut} - {creneau.heureFin}
                    </div>
                  </div>
                </td>

                {/* Cellules cours */}
                {JOURS_SEMAINE.map((jour) => {
                  const coursSlot = getCoursForSlot(jour, creneau.id);

                  // Créneau pause
                  if (creneau.type === "pause") {
                    return (
                      <td
                        key={jour}
                        className="border bg-muted/30 p-2 text-center text-sm text-muted-foreground"
                      >
                        {creneau.nom}
                      </td>
                    );
                  }

                  // Cours existants avec logique Google Agenda
                  if (coursSlot.length > 0) {
                    const isGlobalView = viewMode === "global";
                    const visibleCours = coursSlot.slice(0, MAX_VISIBLE);
                    const hiddenCount = coursSlot.length - MAX_VISIBLE;

                    return (
                      <td key={jour} className="border p-2">
                        <div className="flex flex-col gap-1.5">
                          {/* Cours visibles */}
                          {visibleCours.map((c) =>
                            isGlobalView ? (
                              <CompactCourseCard
                                key={c.id}
                                cours={c}
                                onClick={onCoursClick}
                                onContextMenu={(e) => handleContextMenu(e, c)}
                                showClasse={true}
                              />
                            ) : (
                              <CourseCard
                                key={c.id}
                                cours={c}
                                onClick={onCoursClick}
                                onContextMenu={(e) => handleContextMenu(e, c)}
                                showClasse={false}
                              />
                            )
                          )}

                          {/* Bouton "+X autres" */}
                          {hiddenCount > 0 && (
                            <button
                              onClick={() =>
                                handleShowMore(coursSlot, jour, creneau)
                              }
                              className="text-xs text-center py-2 rounded-md bg-muted/80 hover:bg-primary/10 border border-border hover:border-primary/30 transition-all font-medium text-foreground hover:text-primary"
                            >
                              +{hiddenCount} autre{hiddenCount > 1 ? "s" : ""}
                            </button>
                          )}
                        </div>
                      </td>
                    );
                  }

                  // Créneau vide
                  return (
                    <td key={jour} className="border p-2">
                      <EmptySlot
                        jour={jour}
                        creneau={creneau}
                        onClick={onEmptySlotClick}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ← MODIFIÉ : Passer tous les cours + critères de filtrage */}
      <CoursListModal
        isOpen={modalListOpen}
        onClose={() => setModalListOpen(false)}
        // coursList={selectedSlotCours}
        allCours={cours} // ← AJOUTÉ : Tous les cours (état global)
        jour={selectedSlotInfo?.jour}
        creneau={selectedSlotInfo?.creneau}
        onCoursClick={onCoursClick}
        onCoursDelete={onCoursDelete}
      />

      {/* ← AJOUTÉ : Modal détails */}
      <CoursDetailsModal
        isOpen={detailsModalOpen}
        onClose={() => {
          setDetailsModalOpen(false);
          setSelectedCoursDetails(null);
        }}
        cours={selectedCoursDetails}
      />

      {/* Menu contextuel */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          actions={getContextMenuActions(contextMenu.cours)}
        />
      )}

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
