import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, Loader2 } from "lucide-react";
import { useReferenceData } from "@/hooks/useReferenceData";
import { coursApi } from "@/api/coursApi";
import { JOURS_SEMAINE } from "@/utils/constants";

export const CoursForm = ({
  onSubmit,
  onCancel,
  initialData = null,
  defaultSlot = null,
}) => {
  const { matieres, professeurs, classes, salles, creneaux } =
    useReferenceData();

  // État du formulaire
  const [formData, setFormData] = useState({
    matiereId: initialData?.matiereId || "",
    professeurId: initialData?.professeurId || "",
    classeId: initialData?.classeId || "",
    salleId: initialData?.salleId || "",
    creneauId: initialData?.creneauId || defaultSlot?.creneauId || "",
    jour: initialData?.jour || defaultSlot?.jour || "Lundi",
    semestre: initialData?.semestre || "S1",
    notes: initialData?.notes || "",
  });

  const [errors, setErrors] = useState({});
  const [validating, setValidating] = useState(false);
  const [conflits, setConflits] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  // Validation en temps réel (débounce)
  useEffect(() => {
    if (
      !formData.matiereId ||
      !formData.professeurId ||
      !formData.classeId ||
      !formData.salleId ||
      !formData.creneauId
    ) {
      setConflits([]);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setValidating(true);
      try {
        const result = await coursApi.validate(formData);
        setConflits(result.valide ? [] : result.conflits || []);
      } catch (error) {
        console.error("Erreur validation:", error);
      } finally {
        setValidating(false);
      }
    }, 500); // 500ms de délai

    return () => clearTimeout(timeoutId);
  }, [
    formData.professeurId,
    formData.classeId,
    formData.salleId,
    formData.creneauId,
    formData.jour,
  ]);

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.matiereId) newErrors.matiereId = "Matière requise";
    if (!formData.professeurId) newErrors.professeurId = "Professeur requis";
    if (!formData.classeId) newErrors.classeId = "Classe requise";
    if (!formData.salleId) newErrors.salleId = "Salle requise";
    if (!formData.creneauId) newErrors.creneauId = "Créneau requis";
    if (!formData.jour) newErrors.jour = "Jour requis";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    if (conflits.length > 0) return; // Bloquer si conflits

    setSubmitting(true);
    await onSubmit(formData);
    setSubmitting(false);
  };

  const hasConflits = conflits.length > 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Matière */}
      <div>
        <Label htmlFor="matiere">Matière *</Label>
        <Select
          value={formData.matiereId}
          onValueChange={(value) => handleChange("matiereId", value)}
        >
          <SelectTrigger className={errors.matiereId ? "border-red-500" : ""}>
            <SelectValue placeholder="Sélectionner une matière" />
          </SelectTrigger>
          <SelectContent>
            {matieres.map((m) => (
              <SelectItem key={m.id} value={m.id}>
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: m.couleur }}
                  />
                  {m.nom}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.matiereId && (
          <p className="text-xs text-red-500 mt-1">{errors.matiereId}</p>
        )}
      </div>

      {/* Professeur */}
      <div>
        <Label htmlFor="professeur">Professeur *</Label>
        <Select
          value={formData.professeurId}
          onValueChange={(value) => handleChange("professeurId", value)}
        >
          <SelectTrigger
            className={errors.professeurId ? "border-red-500" : ""}
          >
            <SelectValue placeholder="Sélectionner un professeur" />
          </SelectTrigger>
          <SelectContent>
            {professeurs.map((p) => (
              <SelectItem key={p.id} value={p.id}>
                {p.prenom} {p.nom}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.professeurId && (
          <p className="text-xs text-red-500 mt-1">{errors.professeurId}</p>
        )}
      </div>

      {/* Classe */}
      <div>
        <Label htmlFor="classe">Classe *</Label>
        <Select
          value={formData.classeId}
          onValueChange={(value) => handleChange("classeId", value)}
        >
          <SelectTrigger className={errors.classeId ? "border-red-500" : ""}>
            <SelectValue placeholder="Sélectionner une classe" />
          </SelectTrigger>
          <SelectContent>
            {classes.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.nom}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.classeId && (
          <p className="text-xs text-red-500 mt-1">{errors.classeId}</p>
        )}
      </div>

      {/* Salle */}
      <div>
        <Label htmlFor="salle">Salle *</Label>
        <Select
          value={formData.salleId}
          onValueChange={(value) => handleChange("salleId", value)}
        >
          <SelectTrigger className={errors.salleId ? "border-red-500" : ""}>
            <SelectValue placeholder="Sélectionner une salle" />
          </SelectTrigger>
          <SelectContent>
            {salles.map((s) => (
              <SelectItem key={s.id} value={s.id}>
                Salle {s.numero} (Capacité: {s.capacite})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.salleId && (
          <p className="text-xs text-red-500 mt-1">{errors.salleId}</p>
        )}
      </div>

      {/* Jour + Créneau */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="jour">Jour *</Label>
          <Select
            value={formData.jour}
            onValueChange={(value) => handleChange("jour", value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {JOURS_SEMAINE.map((jour) => (
                <SelectItem key={jour} value={jour}>
                  {jour}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="creneau">Créneau *</Label>
          <Select
            value={formData.creneauId}
            onValueChange={(value) => handleChange("creneauId", value)}
          >
            <SelectTrigger className={errors.creneauId ? "border-red-500" : ""}>
              <SelectValue placeholder="Sélectionner" />
            </SelectTrigger>
            <SelectContent>
              {creneaux
                .filter((c) => c.type === "cours")
                .map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.nom}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
          {errors.creneauId && (
            <p className="text-xs text-red-500 mt-1">{errors.creneauId}</p>
          )}
        </div>
      </div>

      {/* Semestre */}
      <div>
        <Label htmlFor="semestre">Semestre *</Label>
        <Select
          value={formData.semestre}
          onValueChange={(value) => handleChange("semestre", value)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="S1">Semestre 1</SelectItem>
            <SelectItem value="S2">Semestre 2</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Notes */}
      <div>
        <Label htmlFor="notes">Notes (optionnel)</Label>
        <Textarea
          value={formData.notes}
          onChange={(e) => handleChange("notes", e.target.value)}
          placeholder="Remarques particulières..."
          rows={3}
        />
      </div>

      {/* Conflits */}
      {validating && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Vérification des conflits...
        </div>
      )}

      {hasConflits && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-semibold text-red-900 mb-2">
                Conflits détectés
              </h4>
              <ul className="space-y-1">
                {conflits.map((conflit, idx) => (
                  <li key={idx} className="text-sm text-red-700">
                    • {conflit.message}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Boutons */}
      <div className="flex gap-3 justify-end pt-4 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={submitting}
        >
          Annuler
        </Button>
        <Button
          type="submit"
          disabled={submitting || validating || hasConflits}
        >
          {submitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {initialData ? "Modification..." : "Création..."}
            </>
          ) : initialData ? (
            "Modifier"
          ) : (
            "Créer le cours"
          )}
        </Button>
      </div>
    </form>
  );
};
