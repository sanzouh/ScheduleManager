import { useEffect, useRef } from "react";
import { Pencil, Copy, Trash2, Eye, X } from "lucide-react";

export const ContextMenu = ({ x, y, onClose, actions }) => {
  const menuRef = useRef(null);

  // Fermer au clic extérieur
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };

    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="fixed z-9999 bg-background border border-border rounded-lg shadow-xl py-1 min-w-[180px] animate-in fade-in-0 zoom-in-95"
      style={{
        top: `${y}px`,
        left: `${x}px`,
      }}
    >
      {actions.map((action, idx) => (
        <button
          key={idx}
          onClick={() => {
            action.onClick();
            onClose();
          }}
          disabled={action.disabled}
          className={`w-full px-3 py-2 text-left text-sm flex items-center gap-2 hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
            action.danger ? "text-red-600 hover:bg-red-50" : ""
          }`}
        >
          {action.icon}
          <span>{action.label}</span>
        </button>
      ))}
    </div>
  );
};
