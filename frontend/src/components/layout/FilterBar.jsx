import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ViewSelector } from "./ViewSelector";
import { SEMESTRES, VUES } from "@/utils/constants";

export const FilterBar = ({
  selectedView,
  onViewChange,
  selectedClasse,
  onClasseChange,
  selectedProfesseur,
  onProfesseurChange,
  selectedSalle,
  onSalleChange,
  selectedSemestre,
  onSemestreChange,
  classes = [],
  professeurs = [],
  salles = [],
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
            {/* ← MODIFIÉ : Dropdown conditionnel selon la vue */}

            {/* Vue Classe */}
            {selectedView === VUES.CLASSE && (
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
            )}

            {/* Vue Professeur */}
            {selectedView === VUES.PROFESSEUR && (
              <Select
                value={selectedProfesseur}
                onValueChange={onProfesseurChange}
              >
                <SelectTrigger className="w-[220px]">
                  <SelectValue placeholder="Sélectionner un professeur" />
                </SelectTrigger>
                <SelectContent>
                  {professeurs.map((prof) => (
                    <SelectItem key={prof.id} value={prof.id}>
                      {prof.prenom} {prof.nom}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {/* Vue Salle */}
            {selectedView === VUES.SALLE && (
              <Select value={selectedSalle} onValueChange={onSalleChange}>
                <SelectTrigger className="w-[220px]">
                  <SelectValue placeholder="Sélectionner une salle" />
                </SelectTrigger>
                <SelectContent>
                  {salles.map((salle) => (
                    <SelectItem key={salle.id} value={salle.id}>
                      Salle {salle.numero}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {/* Semestre - Toujours visible */}
            <Select value={selectedSemestre} onValueChange={onSemestreChange}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Semestre" />
              </SelectTrigger>
              <SelectContent>
                {SEMESTRES.map((semestre) => (
                  <SelectItem key={semestre} value={semestre}>
                    Semestre {semestre.replace("S", "")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};
