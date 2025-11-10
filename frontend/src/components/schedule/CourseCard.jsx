export const CourseCard = ({ cours, onClick, showClasse = false }) => {
  return (
    <div
      className="min-h-24 cursor-pointer rounded-lg p-3 text-white transition-all hover:opacity-90 hover:shadow-lg"
      style={{ backgroundColor: cours.matiere?.couleur || "#3B82F6" }}
      onClick={() => onClick?.(cours)}
    >
      {/* Nom de la matière */}
      <div className="font-semibold text-sm leading-tight mb-1">
        {cours.matiere?.nom || "Matière"}
      </div>

      {/* Professeur */}
      <div className="text-xs opacity-90">
        {cours.professeur?.prenom?.[0]}. {cours.professeur?.nom}
      </div>

      {/* Salle */}
      <div className="text-xs opacity-90">Salle {cours.salle?.numero}</div>

      {/* ← AJOUTÉ : Afficher la classe si demandé */}
      {showClasse && cours.classe && (
        <div className="text-xs font-medium opacity-95 mb-1 bg-white/20 rounded px-1.5 py-0.5 inline-block">
          {cours.classe.nom}
        </div>
      )}
    </div>
  );
};
