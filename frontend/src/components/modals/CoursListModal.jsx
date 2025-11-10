import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Clock, User, MapPin, BookOpen, Pencil } from "lucide-react";

export const CoursListModal = ({
  isOpen,
  onClose,
  coursList,
  jour,
  creneau,
  onCoursClick, // ← AJOUTÉ : Handler pour ouvrir modal édition
}) => {
  if (!coursList || coursList.length === 0) return null;

  // ← AJOUTÉ : Handler qui ferme le modal liste ET ouvre modal édition
  const handleCoursClick = (cours) => {
    onClose(); // Fermer ce modal
    onCoursClick?.(cours); // Ouvrir le modal d'édition
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Cours du {jour} - {creneau?.nom}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3 mt-4">
          {coursList.map((cours) => (
            <div
              key={cours.id}
              className="border rounded-lg p-4 hover:bg-muted/50 hover:border-primary/50 transition-all cursor-pointer group"
              onClick={() => handleCoursClick(cours)} // ← MODIFIÉ : Appeler le handler
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
                  {/* Matière */}
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-lg flex-1">
                      {cours.matiere?.nom || "Matière"}
                    </h3>

                    {/* ← AJOUTÉ : Badge classe + bouton modifier */}
                    <div className="flex items-center gap-2">
                      <span
                        className="text-xs font-medium px-2 py-1 rounded"
                        style={{
                          backgroundColor: cours.matiere?.couleur || "#3B82F6",
                          color: "white",
                        }}
                      >
                        {cours.classe?.nom}
                      </span>

                      {/* Bouton modifier (visible au hover) */}
                      <button
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded hover:bg-primary/10"
                        onClick={(e) => {
                          e.stopPropagation(); // Éviter de déclencher le clic du parent
                          handleCoursClick(cours);
                        }}
                      >
                        <Pencil className="w-4 h-4 text-primary" />
                      </button>
                    </div>
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
  );
};
