import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export const EmptySlot = ({ jour, creneau, onClick }) => {
  return (
    <Button
      variant="ghost"
      className="h-24 w-full hover:bg-muted"
      onClick={() => onClick?.({ jour, creneauId: creneau.id })}
    >
      <Plus className="h-5 w-5 text-muted-foreground" />
    </Button>
  );
};
