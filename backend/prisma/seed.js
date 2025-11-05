import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Début du seed...");

  // ==================== CRÉNEAUX HORAIRES ====================
  console.log("📅 Création des créneaux...");

  const creneaux = await prisma.creneau.createMany({
    data: [
      {
        nom: "08h00-10h00",
        heureDebut: "08:00",
        heureFin: "10:00",
        ordre: 1,
        type: "cours",
      },
      {
        nom: "10h00-12h00",
        heureDebut: "10h00",
        heureFin: "12:00",
        ordre: 2,
        type: "cours",
      },
      {
        nom: "Pause déjeuner",
        heureDebut: "12:00",
        heureFin: "14:00",
        ordre: 3,
        type: "pause",
      },
      {
        nom: "14h00-16h00",
        heureDebut: "14:00",
        heureFin: "16:00",
        ordre: 4,
        type: "cours",
      },
      {
        nom: "16h00-18h00",
        heureDebut: "16:00",
        heureFin: "18:00",
        ordre: 5,
        type: "cours",
      },
    ],
    skipDuplicates: true,
  });
  console.log(`✅ ${creneaux.count()} créneaux créés`);

  // ==================== SALLES ====================
  console.log("🏫 Création des salles...");

  const salles = await prisma.salle.createMany({
    data: [
      { numero: "001", capacite: 150, type: "grande-salle" },
      { numero: "004", capacite: 100, type: "standard" },
      { numero: "006", capacite: 115, type: "standard" },
      { numero: "007", capacite: 105, type: "standard" },
      { numero: "008", capacite: 100, type: "standard" },
      { numero: "010", capacite: 120, type: "standard" },
      { numero: "012", capacite: 125, type: "standard" },
      { numero: "101", capacite: 140, type: "standard" },
      { numero: "102", capacite: 110, type: "standard" },
      { numero: "103", capacite: 100, type: "standard" },
      { numero: "106", capacite: 95, type: "standard" },
      { numero: "107", capacite: 95, type: "standard" },
      { numero: "108", capacite: 135, type: "standard" },
      { numero: "109", capacite: 135, type: "standard" },
      { numero: "110", capacite: 130, type: "standard" },
      { numero: "210", capacite: 50, type: "labo" },
    ],
    skipDuplicates: true,
  });
  console.log(`✅ ${salles.count} salles créées`);

  // ==================== PROFESSEURS ====================
  console.log("👨‍🏫 Création des professeurs...");

  const professeurs = await prisma.professeur.createMany({
    data: [
      {
        nom: "MAHATODY",
        prenom: "Thomas",
        email: "mahatody@eni.mg",
        statut: "permanent",
      },
      {
        nom: "RABETAFIKA",
        prenom: "Louis Haja",
        email: "rabetafika@eni.mg",
        statut: "permanent",
      },
      {
        nom: "RALAIVAO",
        prenom: "Jean Christian",
        email: "ralaivao@eni.mg",
        statut: "permanent",
      },
      {
        nom: "GILANTE",
        prenom: "Gesazafy",
        email: "gilante@eni.mg",
        statut: "permanent",
      },
      {
        nom: "ALIX",
        prenom: "Mathurin",
        email: "alix@eni.mg",
        statut: "vacataire",
      },
      {
        nom: "RATIANANTITRA",
        prenom: "Volatiana Marielle",
        email: "ratianantitra@eni.mg",
        statut: "permanent",
      },
      {
        nom: "RAZAFIMAHATRATRA",
        prenom: "Hajarisena",
        email: "razafimahatratra@eni.mg",
        statut: "permanent",
      },
      {
        nom: "DIMBISOA",
        prenom: "William Germain",
        email: "dimbisoa@eni.mg",
        statut: "permanent",
      },
      {
        nom: "RATIARSON",
        prenom: "Venot",
        email: "ratiarson@eni.mg",
        statut: "permanent",
      },
      {
        nom: "RAFAMANTANANTSOA",
        prenom: "Fontaine",
        email: "rafamantanantsoa@eni.mg",
        statut: "permanent",
      },
      {
        nom: "RAKOTOASIMBAHOAKA",
        prenom: "Cyprien Robert",
        email: "rakotoasimbahoaka@eni.mg",
        statut: "permanent",
      },
      {
        nom: "BERTIN",
        prenom: "Andry",
        email: "bertin@eni.mg",
        statut: "vacataire",
      },
    ],
    skipDuplicates: true,
  });
  console.log(`✅ ${professeurs.count} professeurs créés`);

  // ==================== MATIÈRES ====================
  console.log("📚 Création des matières...");

  const matieres = await prisma.matiere.createMany({
    data: [
      {
        code: "ALGO",
        nom: "Algorithmique et structure de données",
        couleur: "#3B82F6",
      },
      { code: "BDD", nom: "Base de données", couleur: "#8B5CF6" },
      { code: "PROG-C", nom: "Programmation en C", couleur: "#06B6D4" },
      { code: "PROG-JAVA", nom: "Programmation Java", couleur: "#F59E0B" },
      { code: "PROG-PYTHON", nom: "Programmation Python", couleur: "#10B981" },
      { code: "WEB", nom: "Développement Web", couleur: "#EC4899" },
      { code: "RESEAU", nom: "Réseaux informatiques", couleur: "#EF4444" },
      { code: "SYS", nom: "Systèmes d'exploitation", couleur: "#6366F1" },
      {
        code: "PROG-CPP",
        nom: "Programmation objet en C++",
        couleur: "#14B8A6",
      },
      { code: "GLOG", nom: "Génie Logiciel", couleur: "#F97316" },
      { code: "IA", nom: "Intelligence Artificielle", couleur: "#A855F7" },
      { code: "CYBER-SEC", nom: "Cybersécurité", couleur: "#DC2626" },
      { code: "ANGLAIS", nom: "Anglais", couleur: "#059669" },
    ],
    skipDuplicates: true,
  });
  console.log(`✅ ${matieres.count} matières créées`);

  // ==================== CLASSES ====================
  console.log("🎓 Création des classes...");

  const classes = await prisma.classe.createMany({
    data: [
      // L1
      {
        code: "L1-PRO-G1",
        nom: "L1 Pro Groupe 1",
        niveau: "L1",
        parcours: "PRO",
        groupe: 1,
        nombreEleves: 100,
      },
      {
        code: "L1-PRO-G2",
        nom: "L1 Pro Groupe 2",
        niveau: "L1",
        parcours: "PRO",
        groupe: 2,
        nombreEleves: 100,
      },
      {
        code: "L1-IG-G1",
        nom: "L1 IG Groupe 1",
        niveau: "L1",
        parcours: "IG",
        groupe: 1,
        nombreEleves: 100,
      },
      {
        code: "L1-IG-G2",
        nom: "L1 IG Groupe 2",
        niveau: "L1",
        parcours: "IG",
        groupe: 2,
        nombreEleves: 100,
      },

      // L2
      {
        code: "L2-GB-G1",
        nom: "L2 GB Groupe 1",
        niveau: "L2",
        parcours: "GB",
        groupe: 1,
        nombreEleves: 90,
      },
      {
        code: "L2-GB-G2",
        nom: "L2 GB Groupe 2",
        niveau: "L2",
        parcours: "GB",
        groupe: 2,
        nombreEleves: 90,
      },
      {
        code: "L2-ASR-G1",
        nom: "L2 ASR Groupe 1",
        niveau: "L2",
        parcours: "ASR",
        groupe: 1,
        nombreEleves: 35,
      },
      {
        code: "L2-ASR-G2",
        nom: "L2 ASR Groupe 2",
        niveau: "L2",
        parcours: "ASR",
        groupe: 2,
        nombreEleves: 33,
      },
      {
        code: "L2-IG-G1",
        nom: "L2 IG Groupe 1",
        niveau: "L2",
        parcours: "IG",
        groupe: 1,
        nombreEleves: 110,
      },

      // L3
      {
        code: "L3-GB-G1",
        nom: "L3 GB Groupe 1",
        niveau: "L3",
        parcours: "GB",
        groupe: 1,
        nombreEleves: 95,
      },
      {
        code: "L3-ASR-G1",
        nom: "L3 ASR Groupe 1",
        niveau: "L3",
        parcours: "ASR",
        groupe: 1,
        nombreEleves: 50,
      },
      {
        code: "L3-IG-G1",
        nom: "L3 IG Groupe 1",
        niveau: "L3",
        parcours: "IG",
        groupe: 1,
        nombreEleves: 128,
      },

      // M1
      {
        code: "M1-GB-G1",
        nom: "M1 GB Groupe 1",
        niveau: "M1",
        parcours: "GB",
        groupe: 1,
        nombreEleves: 115,
      },
      {
        code: "M1-ASR-G1",
        nom: "M1 ASR Groupe 1",
        niveau: "M1",
        parcours: "ASR",
        groupe: 1,
        nombreEleves: 72,
      },
      {
        code: "M1-IG-G1",
        nom: "M1 IG Groupe 1",
        niveau: "M1",
        parcours: "IG",
        groupe: 1,
        nombreEleves: 105,
      },
      {
        code: "M1-GID-G1",
        nom: "M1 GID Groupe 1",
        niveau: "M1",
        parcours: "GID",
        groupe: 1,
        nombreEleves: 80,
      },
      {
        code: "M1-OCC-G1",
        nom: "M1 OCC Groupe 1",
        niveau: "M1",
        parcours: "OCC",
        groupe: 1,
        nombreEleves: 75,
      },

      // M2
      {
        code: "M2-GB-G1",
        nom: "M2 GB Groupe 1",
        niveau: "M2",
        parcours: "GB",
        groupe: 1,
        nombreEleves: 90,
      },
      {
        code: "M2-ASR-G1",
        nom: "M2 ASR Groupe 1",
        niveau: "M2",
        parcours: "ASR",
        groupe: 1,
        nombreEleves: 68,
      },
      {
        code: "M2-GID-G1",
        nom: "M2 GID Groupe 1",
        niveau: "M2",
        parcours: "GID",
        groupe: 1,
        nombreEleves: 55,
      },
      {
        code: "M2-OCC-G1",
        nom: "M2 OCC Groupe 1",
        niveau: "M2",
        parcours: "OCC",
        groupe: 1,
        nombreEleves: 112,
      },
    ],
    skipDuplicates: true,
  });
  console.log(`✅ ${classes.count} classes créées`);

  console.log("✅ Seed terminé avec succès !");
}

main()
  .catch((e) => {
    console.error("❌ Erreur lors du seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
