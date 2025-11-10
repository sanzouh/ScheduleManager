export const CompactCourseCard = ({ cours, onClick, showClasse = false }) => {
  return (
    <div
      className="min-h-[60px] cursor-pointer rounded-md p-2 text-white transition-all hover:opacity-90 hover:shadow-md text-xs"
      style={{ backgroundColor: cours.matiere?.couleur || "#3B82F6" }}
      onClick={() => onClick?.(cours)}
    >
      {/* Matière - plus petit */}
      <div className="font-semibold text-xs leading-tight mb-0.5 truncate">
        {cours.matiere?.nom || "Matière"}
      </div>

      {/* Infos condensées */}
      <div className="text-[10px] opacity-90 truncate">
        {cours.professeur?.prenom?.[0]}. {cours.professeur?.nom}
      </div>
      <div className="text-[10px] opacity-90">S. {cours.salle?.numero}</div>

      {/* Badge classe - plus compact */}
      {showClasse && cours.classe && (
        <div className="text-[10px] font-medium opacity-95 mb-0.5 bg-white/25 rounded px-1 py-0.5 inline-block truncate max-w-full">
          {cours.classe.nom}
        </div>
      )}
    </div>
  );
};
