import { Badge } from "@/components/ui/badge";
import { VUES } from "@/utils/constants";

const VUES_ARRAY = [
  { id: VUES.CLASSE, label: "Classe" },
  { id: VUES.PROFESSEUR, label: "Professeur" },
  { id: VUES.SALLE, label: "Salle" },
];

export const ViewSelector = ({ selectedView, onViewChange }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-muted-foreground">Vue :</span>
      <div className="flex gap-2">
        {VUES_ARRAY.map((vue) => {
          const isActive = selectedView === vue.id;

          return (
            <Badge
              key={vue.id}
              variant={isActive ? "default" : "outline"}
              className={`cursor-pointer px-4 py-1.5 transition-colors ${
                isActive
                  ? "hover:bg-primary/90" // Actif : fond légèrement plus clair
                  : "hover:bg-muted hover:text-foreground" // Inactif : fond gris
              }`}
              onClick={() => onViewChange(vue.id)}
            >
              {vue.label}
            </Badge>
          );
        })}
      </div>
    </div>
  );
};
