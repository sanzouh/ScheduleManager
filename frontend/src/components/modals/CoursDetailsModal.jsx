import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Clock,
  User,
  MapPin,
  BookOpen,
  Calendar,
  Users,
  Building,
  FileText,
  Tag,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

export const CoursDetailsModal = ({ isOpen, onClose, cours }) => {
  if (!cours) return null;

  const InfoRow = ({ icon: Icon, label, value, className = "" }) => (
    <div className="flex items-start gap-3 py-3 border-b last:border-0">
      <div className="shrink-0 mt-0.5">
        <Icon className="w-5 h-5 text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <p className={`text-base font-semibold ${className}`}>{value}</p>
      </div>
    </div>
  );

  const SectionTitle = ({ children }) => (
    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 mt-6 first:mt-0">
      {children}
    </h3>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start gap-4">
            {/* Barre de couleur */}
            <div
              className="w-2 h-16 rounded-full"
              style={{ backgroundColor: cours.matiere?.couleur || "#3B82F6" }}
            />

            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold mb-2">
                {cours.matiere?.nom}
              </DialogTitle>
              <div className="flex items-center gap-2">
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: cours.matiere?.couleur || "#3B82F6",
                    color: "white",
                  }}
                >
                  {cours.matiere?.code}
                </span>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-muted">
                  {cours.typeSeance}
                </span>
                {cours.estAnnule && (
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                    Annulé
                  </span>
                )}
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Section Planning */}
          <div>
            <SectionTitle>📅 Planning</SectionTitle>
            <div className="bg-muted/30 rounded-lg p-4 space-y-1">
              <InfoRow
                icon={Calendar}
                label="Jour"
                value={cours.jour}
                className="text-lg"
              />
              <InfoRow
                icon={Clock}
                label="Horaire"
                value={`${cours.creneau?.heureDebut} - ${cours.creneau?.heureFin} (${cours.creneau?.nom})`}
              />
              <InfoRow
                icon={BookOpen}
                label="Semestre"
                value={`Semestre ${cours.semestre.replace("S", "")}`}
              />
            </div>
          </div>

          {/* Section Intervenants */}
          <div>
            <SectionTitle>👥 Intervenants</SectionTitle>
            <div className="bg-muted/30 rounded-lg p-4">
              <InfoRow
                icon={User}
                label="Professeur"
                value={`${cours.professeur?.prenom} ${cours.professeur?.nom}`}
              />
              {cours.professeur?.email && (
                <div className="pl-8 pt-1">
                  <a
                    href={`mailto:${cours.professeur.email}`}
                    className="text-sm text-primary hover:underline"
                  >
                    {cours.professeur.email}
                  </a>
                </div>
              )}
              <div className="pl-8 pt-1">
                <span className="text-xs text-muted-foreground">
                  {cours.professeur?.statut === "permanent"
                    ? "Enseignant permanent"
                    : "Enseignant vacataire"}
                </span>
              </div>
            </div>
          </div>

          {/* Section Classe */}
          <div>
            <SectionTitle>🎓 Classe</SectionTitle>
            <div className="bg-muted/30 rounded-lg p-4">
              <InfoRow
                icon={Users}
                label="Classe"
                value={cours.classe?.nom}
                className="text-lg"
              />
              <InfoRow
                icon={Users}
                label="Effectif"
                value={`${cours.classe?.nombreEleves} étudiants`}
              />
              <div className="grid grid-cols-3 gap-4 mt-3 pl-8">
                <div>
                  <p className="text-xs text-muted-foreground">Niveau</p>
                  <p className="font-semibold">{cours.classe?.niveau}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Parcours</p>
                  <p className="font-semibold">{cours.classe?.parcours}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Groupe</p>
                  <p className="font-semibold">Groupe {cours.classe?.groupe}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section Salle */}
          <div>
            <SectionTitle>🏫 Salle</SectionTitle>
            <div className="bg-muted/30 rounded-lg p-4">
              <InfoRow
                icon={Building}
                label="Numéro"
                value={`Salle ${cours.salle?.numero}`}
                className="text-lg"
              />
              <InfoRow
                icon={MapPin}
                label="Capacité"
                value={`${cours.salle?.capacite} places`}
              />
              <InfoRow
                icon={Tag}
                label="Type"
                value={
                  cours.salle?.type === "standard"
                    ? "Salle standard"
                    : cours.salle?.type === "labo"
                    ? "Laboratoire"
                    : cours.salle?.type === "amphi"
                    ? "Amphithéâtre"
                    : cours.salle?.type
                }
              />
            </div>
          </div>

          {/* Section Notes */}
          {cours.notes && (
            <div>
              <SectionTitle>📝 Notes</SectionTitle>
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                  <p className="text-sm leading-relaxed">{cours.notes}</p>
                </div>
              </div>
            </div>
          )}

          {/* Section Métadonnées */}
          <div>
            <SectionTitle>ℹ️ Informations techniques</SectionTitle>
            <div className="bg-muted/30 rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Statut du cours</span>
                <span className="flex items-center gap-1.5 font-medium">
                  {cours.estAnnule ? (
                    <>
                      <XCircle className="w-4 h-4 text-red-500" />
                      <span className="text-red-700">Annulé</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span className="text-green-700">Actif</span>
                    </>
                  )}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Créé le</span>
                <span className="font-medium">
                  {new Date(cours.createdAt).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Dernière modification
                </span>
                <span className="font-medium">
                  {formatDistanceToNow(new Date(cours.updatedAt), {
                    addSuffix: true,
                    locale: fr,
                  })}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm pt-2 border-t">
                <span className="text-muted-foreground">ID du cours</span>
                <span className="font-mono text-xs text-muted-foreground">
                  {cours.id.slice(0, 8)}...
                </span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
