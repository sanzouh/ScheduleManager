// src/server.js
import app from "./app.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("🚀 ================================");
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  console.log(`🚀 Environnement: ${process.env.NODE_ENV || "development"}`);
  console.log(`🚀 API disponible sur http://localhost:${PORT}/api`);
  console.log("🚀 ================================");
});
