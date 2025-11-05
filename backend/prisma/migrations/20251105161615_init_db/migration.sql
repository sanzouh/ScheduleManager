-- CreateTable
CREATE TABLE "Matiere" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "couleur" TEXT NOT NULL DEFAULT '#3B82F6',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Professeur" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "email" TEXT,
    "telephone" TEXT,
    "statut" TEXT NOT NULL DEFAULT 'permanent',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Classe" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "niveau" TEXT NOT NULL,
    "parcours" TEXT,
    "groupe" INTEGER NOT NULL DEFAULT 1,
    "nombreEleves" INTEGER NOT NULL DEFAULT 50,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Salle" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "numero" TEXT NOT NULL,
    "capacite" INTEGER NOT NULL DEFAULT 80,
    "type" TEXT NOT NULL DEFAULT 'standard',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Creneau" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nom" TEXT NOT NULL,
    "heureDebut" TEXT NOT NULL,
    "heureFin" TEXT NOT NULL,
    "ordre" INTEGER NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'cours',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Cours" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "matiereId" TEXT NOT NULL,
    "professeurId" TEXT NOT NULL,
    "classeId" TEXT NOT NULL,
    "salleId" TEXT NOT NULL,
    "creneauId" TEXT NOT NULL,
    "jour" TEXT NOT NULL,
    "semestre" TEXT NOT NULL DEFAULT 'S1',
    "typeSeance" TEXT NOT NULL DEFAULT 'CM',
    "notes" TEXT,
    "estAnnule" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Cours_matiereId_fkey" FOREIGN KEY ("matiereId") REFERENCES "Matiere" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Cours_professeurId_fkey" FOREIGN KEY ("professeurId") REFERENCES "Professeur" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Cours_classeId_fkey" FOREIGN KEY ("classeId") REFERENCES "Classe" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Cours_salleId_fkey" FOREIGN KEY ("salleId") REFERENCES "Salle" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Cours_creneauId_fkey" FOREIGN KEY ("creneauId") REFERENCES "Creneau" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Utilisateur" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "motDePasse" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'editeur',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Matiere_code_key" ON "Matiere"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Professeur_email_key" ON "Professeur"("email");

-- CreateIndex
CREATE INDEX "Professeur_nom_prenom_idx" ON "Professeur"("nom", "prenom");

-- CreateIndex
CREATE UNIQUE INDEX "Classe_code_key" ON "Classe"("code");

-- CreateIndex
CREATE INDEX "Classe_niveau_parcours_idx" ON "Classe"("niveau", "parcours");

-- CreateIndex
CREATE UNIQUE INDEX "Salle_numero_key" ON "Salle"("numero");

-- CreateIndex
CREATE INDEX "Salle_numero_idx" ON "Salle"("numero");

-- CreateIndex
CREATE INDEX "Creneau_ordre_idx" ON "Creneau"("ordre");

-- CreateIndex
CREATE UNIQUE INDEX "Creneau_heureDebut_heureFin_key" ON "Creneau"("heureDebut", "heureFin");

-- CreateIndex
CREATE INDEX "Cours_jour_creneauId_idx" ON "Cours"("jour", "creneauId");

-- CreateIndex
CREATE INDEX "Cours_professeurId_jour_creneauId_idx" ON "Cours"("professeurId", "jour", "creneauId");

-- CreateIndex
CREATE INDEX "Cours_salleId_jour_creneauId_idx" ON "Cours"("salleId", "jour", "creneauId");

-- CreateIndex
CREATE INDEX "Cours_classeId_semestre_idx" ON "Cours"("classeId", "semestre");

-- CreateIndex
CREATE UNIQUE INDEX "Cours_classeId_jour_creneauId_semestre_key" ON "Cours"("classeId", "jour", "creneauId", "semestre");

-- CreateIndex
CREATE UNIQUE INDEX "Utilisateur_email_key" ON "Utilisateur"("email");

-- CreateIndex
CREATE INDEX "Utilisateur_email_idx" ON "Utilisateur"("email");
