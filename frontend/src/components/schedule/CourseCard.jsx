export const CourseCard = ({ cours, onClick }) => {
  return (
    <div
      className="h-24 cursor-pointer rounded-lg p-3 text-white transition-all hover:opacity-90 hover:shadow-lg"
      style={{ backgroundColor: cours.matiere?.couleur || "#3B82F6" }}
      onClick={() => onClick?.(cours)}
    >
      <div className="font-semibold text-sm leading-tight">
        {cours.matiere?.nom || "Matière"}
      </div>
      <div className="mt-1 text-xs opacity-90">
        {cours.professeur?.prenom?.[0]}. {cours.professeur?.nom}
      </div>
      <div className="text-xs opacity-90">Salle {cours.salle?.numero}</div>
    </div>
  );
};
