import { useState } from "react";
import { Card } from "@/components/ui/card";
import { CourseCard } from "./CourseCard";
import { CompactCourseCard } from "./CompactCourseCard";
import { EmptySlot } from "./EmptySlot";
import { CoursListModal } from "../modals/CoursListModal";
import { JOURS_SEMAINE } from "@/utils/constants.js";

export const ScheduleGrid = ({
  cours = [],
  creneaux = [],
  onCoursClick,
  onEmptySlotClick,
  viewMode = "global", // ← AJOUTÉ : Savoir si vue filtrée ou globale
}) => {
  // ← AJOUTÉ : État pour le modal "voir plus"
  const [modalListOpen, setModalListOpen] = useState(false);
  const [selectedSlotCours, setSelectedSlotCours] = useState([]);
  const [selectedSlotInfo, setSelectedSlotInfo] = useState(null);

  const getCoursForSlot = (jour, creneauId) => {
    return cours.filter((c) => c.jour === jour && c.creneauId === creneauId);
  };

  // ← AJOUTÉ : Handler pour ouvrir le modal liste
  const handleShowMore = (coursList, jour, creneau) => {
    setSelectedSlotCours(coursList);
    setSelectedSlotInfo({ jour, creneau });
    setModalListOpen(true);
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

                  // ← MODIFIÉ : Cours existants avec logique Google Agenda
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
                                showClasse={true}
                              />
                            ) : (
                              <CourseCard
                                key={c.id}
                                cours={c}
                                onClick={onCoursClick}
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
                              className="text-xs text-center py-2 rounded-md bg-muted hover:bg-muted/80 transition-colors font-medium text-muted-foreground"
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

      {/* ← AJOUTÉ : Modal liste complète */}
      <CoursListModal
        isOpen={modalListOpen}
        onClose={() => setModalListOpen(false)}
        coursList={selectedSlotCours}
        jour={selectedSlotInfo?.jour}
        creneau={selectedSlotInfo?.creneau}
        onCoursClick={onCoursClick} // ← AJOUTÉ : Passer le handler
      />
    </>
  );
};
