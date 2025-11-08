import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ViewSelector } from "./ViewSelector";
import { SEMESTRES } from "@/utils/constants";

export const FilterBar = ({
  selectedView,
  onViewChange,
  selectedClasse,
  onClasseChange,
  selectedSemestre,
  onSemestreChange,
  classes = [],
}) => {
  return (
    <div className="border-b bg-muted/30">
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Sélecteur de vue */}
          <ViewSelector
            selectedView={selectedView}
            onViewChange={onViewChange}
          />

          {/* Dropdowns */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Classe */}
            <Select value={selectedClasse} onValueChange={onClasseChange}>
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="Sélectionner une classe" />
              </SelectTrigger>
              <SelectContent>
                {classes.map((classe) => (
                  <SelectItem key={classe.id} value={classe.id}>
                    {classe.nom}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Semestre */}
            <Select value={selectedSemestre} onValueChange={onSemestreChange}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Semestre" />
              </SelectTrigger>
              <SelectContent>
                {SEMESTRES.map(
                  (
                    semestre // ← MODIFIÉ
                  ) => (
                    <SelectItem key={semestre} value={semestre}>
                      Semestre {semestre.replace("S", "")}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};
