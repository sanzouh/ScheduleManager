import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CoursForm } from "../forms/CoursForm.jsx";

export const CoursModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null,
  defaultSlot = null,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "MODIFIER LE COURS" : "NOUVEAU COURS"}
          </DialogTitle>
          <DialogDescription>
            {initialData
              ? "Modifiez les informations du cours existant"
              : "Remplissez les informations pour créer un nouveau cours"}
          </DialogDescription>
        </DialogHeader>

        <CoursForm
          onSubmit={onSubmit}
          onCancel={onClose}
          initialData={initialData}
          defaultSlot={defaultSlot}
        />
      </DialogContent>
    </Dialog>
  );
};
