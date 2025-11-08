import { Card } from "@/components/ui/card";
import { CourseCard } from "./CourseCard";
import { EmptySlot } from "./EmptySlot";
import { JOURS_SEMAINE } from "@/utils/constants.js";

export const ScheduleGrid = ({
  cours = [],
  creneaux = [],
  onCoursClick,
  onEmptySlotClick,
}) => {
  const getCoursForSlot = (jour, creneauId) => {
    return cours.find((c) => c.jour === jour && c.creneauId === creneauId);
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

  return (
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

                // Cours existant
                if (coursSlot) {
                  return (
                    <td key={jour} className="border p-2">
                      <CourseCard cours={coursSlot} onClick={onCoursClick} />
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
  );
};
