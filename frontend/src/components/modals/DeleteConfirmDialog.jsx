// src/components/modals/DeleteConfirmDialog.jsx

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertTriangle } from "lucide-react";

export const DeleteConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  cours,
  isDeleting = false,
}) => {
  if (!cours) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="sm:max-w-[500px]">
        <AlertDialogHeader>
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100 animate-pulse">
              <AlertTriangle className="h-7 w-7 text-red-600" />
            </div>
            <div className="flex-1">
              <AlertDialogTitle className="text-xl">
                Supprimer le cours ?
              </AlertDialogTitle>
              <AlertDialogDescription className="mt-1">
                Cette action est{" "}
                <span className="font-semibold text-red-600">irréversible</span>
              </AlertDialogDescription>
            </div>
          </div>
        </AlertDialogHeader>

        <div className="my-4 rounded-lg border-2 border-red-200 bg-red-50 p-4 space-y-2">
          <div className="font-semibold text-base text-red-900">
            {cours.matiere?.nom || "Matière"}
          </div>
          <div className="text-sm text-red-700 space-y-1">
            <div>
              • {cours.professeur?.prenom} {cours.professeur?.nom}
            </div>
            <div>
              • {cours.jour} - {cours.creneau?.nom}
            </div>
            <div>• Salle {cours.salle?.numero}</div>
            <div>• {cours.classe?.nom}</div>
          </div>
        </div>

        <AlertDialogDescription>
          ⚠️ Êtes-vous sûr de vouloir supprimer ce cours ? Cette action ne peut
          pas être annulée
        </AlertDialogDescription>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Annuler</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              onConfirm();
            }}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
          >
            {isDeleting ? "Suppression..." : "Supprimer"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
