import { Calendar, Plus, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header = ({ onNewCours, onExportPDF }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        {/* Logo + Titre */}
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white p-1 shadow-md">
            <img
              src="/eni_logo-57x57.png"
              alt="Logo ENI"
              className="h-full w-full object-contain"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold">ENI Schedule Manager</h1>
            <p className="text-sm text-muted-foreground">
              Gestion d'emploi du temps
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button variant="outline" size="lg" onClick={onExportPDF}>
            <Download className="mr-2 h-4 w-4" />
            Exporter PDF
          </Button>
          <Button size="lg" onClick={onNewCours}>
            <Plus className="mr-2 h-5 w-5" />
            Nouveau cours
          </Button>
        </div>
      </div>
    </header>
  );
};
