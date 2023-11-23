const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const app = express();

// Autorisations CORS
app.use(cors());
const port = 3006;
// Configuration de la connexion à la base de données MySQL
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "gestion_paiement",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Middleware pour analyser le corps des requêtes
app.use(express.json());

// Créer un nouveau poste
app.post("/postes", async (req, res) => {
  const nouveauPoste = req.body;

  try {
    const connection = await db.getConnection();

    const insertQuery = "INSERT INTO poste SET ?";
    const [result] = await connection.query(insertQuery, nouveauPoste);

    connection.release();

    res.status(201).json({ message: "Poste créé avec succès", id: result.insertId });
  } catch (error) {
    console.error("Erreur lors de la création du poste:", error);
    res.status(500).json({ message: "Erreur lors de la création du poste" });
  }
});

// Obtenir la liste de tous les postes
app.get("/postes", async (req, res) => {
  try {
    const connection = await db.getConnection();

    const selectQuery = "SELECT * FROM poste";
    const [result] = await connection.query(selectQuery);

    connection.release();

    res.status(200).json(result);
  } catch (error) {
    console.error("Erreur lors de la récupération des postes:", error);
    res.status(500).json({ message: "Erreur lors de la récupération des postes" });
  }
});
// Obtenir un poste par son ID
app.get("/postes/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const connection = await db.getConnection();

    const selectQuery = "SELECT * FROM poste WHERE idPoste = ?";
    const [result] = await connection.query(selectQuery, [postId]);

    connection.release();

    if (result.length === 0) {
      return res.status(404).json({ message: "Le poste n'a pas été trouvé" });
    }

    res.status(200).json(result[0]);
  } catch (error) {
    console.error("Erreur lors de la récupération du poste par ID:", error);
    res.status(500).json({ message: "Erreur lors de la récupération du poste par ID" });
  }
});


// Mettre à jour un poste par son ID
app.put("/postes/:id", async (req, res) => {
  const idPoste = req.params.id;
  const miseAJour = req.body;

  try {
    const connection = await db.getConnection();

    const updateQuery = "UPDATE poste SET ? WHERE idPoste = ?";
    const [result] = await connection.query(updateQuery, [miseAJour, idPoste]);

    connection.release();

    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Poste non trouvé" });
    } else {
      res.status(200).json({ message: "Poste mis à jour avec succès" });
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour du poste:", error);
    res.status(500).json({ message: "Erreur lors de la mise à jour du poste" });
  }
});

// Supprimer un poste par son ID
app.delete("/postes/:id", async (req, res) => {
  const idPoste = req.params.id;

  try {
    const connection = await db.getConnection();

    const deleteQuery = "DELETE FROM poste WHERE idPoste = ?";
    const [result] = await connection.query(deleteQuery, [idPoste]);

    connection.release();

    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Poste non trouvé" });
    } else {
      res.status(200).json({ message: "Poste supprimé avec succès" });
    }
  } catch (error) {
    console.error("Erreur lors de la suppression du poste:", error);
    res.status(500).json({ message: "Erreur lors de la suppression du poste" });
  }
});


// Créer un nouveau contrat
app.post("/contrats", async (req, res) => {
  const nouveauContrat = req.body;

  try {
    const connection = await db.getConnection();

    const insertQuery = "INSERT INTO contrat SET ?";
    const [result] = await connection.query(insertQuery, nouveauContrat);

    connection.release();

    res.status(201).json({ message: "Contrat créé avec succès", id: result.insertId });
  } catch (error) {
    console.error("Erreur lors de la création du contrat:", error);
    res.status(500).json({ message: "Erreur lors de la création du contrat" });
  }
});

// Obtenir la liste de tous les contrats
app.get("/contrats", async (req, res) => {
  try {
    const connection = await db.getConnection();

    const selectQuery = "SELECT * FROM contrat";
    const [result] = await connection.query(selectQuery);

    connection.release();

    res.status(200).json(result);
  } catch (error) {
    console.error("Erreur lors de la récupération des contrats:", error);
    res.status(500).json({ message: "Erreur lors de la récupération des contrats" });
  }
});

// Mettre à jour un contrat par son ID
app.put("/contrats/:id", async (req, res) => {
  const idContrat = req.params.id;
  const miseAJour = req.body;

  try {
    const connection = await db.getConnection();

    const updateQuery = "UPDATE contrat SET ? WHERE idContrat = ?";
    const [result] = await connection.query(updateQuery, [miseAJour, idContrat]);

    connection.release();

    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Contrat non trouvé" });
    } else {
      res.status(200).json({ message: "Contrat mis à jour avec succès" });
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour du contrat:", error);
    res.status(500).json({ message: "Erreur lors de la mise à jour du contrat" });
  }
});


// Supprimer un contrat par son ID
app.delete("/contrats/:id", async (req, res) => {
  const idContrat = req.params.id;

  try {
    const connection = await db.getConnection();

    const deleteQuery = "DELETE FROM contrat WHERE idContrat = ?";
    const [result] = await connection.query(deleteQuery, [idContrat]);

    connection.release();

    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Contrat non trouvé" });
    } else {
      res.status(200).json({ message: "Contrat supprimé avec succès" });
    }
  } catch (error) {
    console.error("Erreur lors de la suppression du contrat:", error);
    res.status(500).json({ message: "Erreur lors de la suppression du contrat" });
  }
});


// Créer une nouvelle déclaration
app.post("/declarations", async (req, res) => {
  const nouvelleDeclaration = req.body;

  try {
    const connection = await db.getConnection();

    const insertQuery = "INSERT INTO declaration SET ?";
    const [result] = await connection.query(insertQuery, nouvelleDeclaration);

    connection.release();

    res.status(201).json({
      message: "Déclaration créée avec succès",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Erreur lors de la création de la déclaration:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la création de la déclaration" });
  }
});

// Obtenir la liste de toutes les déclarations
app.get("/declarations", async (req, res) => {
  try {
    const connection = await db.getConnection();

    const selectQuery = "SELECT * FROM declaration";
    const [result] = await connection.query(selectQuery);

    connection.release();

    res.status(200).json(result);
  } catch (error) {
    console.error("Erreur lors de la récupération des déclarations:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des déclarations" });
  }
});

// Obtenir une déclaration par son ID
app.get("/declarations/:id", async (req, res) => {
  const idDeclaration = req.params.id;

  try {
    const connection = await db.getConnection();

    const selectQuery = "SELECT * FROM declaration WHERE idDeclaration = ?";
    const [result] = await connection.query(selectQuery, [idDeclaration]);

    connection.release();

    if (result.length === 0) {
      res.status(404).json({ message: "Déclaration non trouvée" });
    } else {
      res.status(200).json(result[0]);
    }
  } catch (error) {
    console.error("Erreur lors de la récupération de la déclaration:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération de la déclaration" });
  }
});

// Mettre à jour une déclaration par son ID
app.put("/declarations/:id", async (req, res) => {
  const idDeclaration = req.params.id;
  const miseAJour = req.body;

  try {
    const connection = await db.getConnection();

    const updateQuery = "UPDATE declaration SET ? WHERE idDeclaration = ?";
    const [result] = await connection.query(updateQuery, [miseAJour, idDeclaration]);

    connection.release();

    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Déclaration non trouvée" });
    } else {
      res.status(200).json({ message: "Déclaration mise à jour avec succès" });
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la déclaration:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour de la déclaration" });
  }
});

// Supprimer une déclaration par son ID
app.delete("/declarations/:id", async (req, res) => {
  const idDeclaration = req.params.id;

  try {
    const connection = await db.getConnection();

    const deleteQuery = "DELETE FROM declaration WHERE idDeclaration = ?";
    const [result] = await connection.query(deleteQuery, [idDeclaration]);

    connection.release();

    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Déclaration non trouvée" });
    } else {
      res.status(200).json({ message: "Déclaration supprimée avec succès" });
    }
  } catch (error) {
    console.error("Erreur lors de la suppression de la déclaration:",erro)}})

// Créer une nouvelle entreprise
app.post("/entreprises", (req, res) => {
  const nouvelleEntreprise = req.body;
  db.query(
    "INSERT INTO entreprise SET ?",
    nouvelleEntreprise,
    (err, result) => {
      if (err) {
        console.error("Erreur lors de la création de l'entreprise:", err);
        res
          .status(500)
          .json({ message: "Erreur lors de la création de l'entreprise" });
      } else {
        res
          .status(201)
          .json({
            message: "Entreprise créée avec succès",
            id: result.insertId,
          });
      }
    }
  );
});

// Obtenir la liste de toutes les entreprises
app.get("/entreprises",async (req, res) => {
  try {
    const connection = await db.getConnection();

    const selectQuery = "SELECT * FROM entreprise";
    const [result] = await connection.query(selectQuery);

    connection.release();

    res.status(200).json(result);
  } catch (error) {
    console.error("Erreur lors de la récupération des indemnités:", error);
    res.status(500).json({ message: "Erreur lors de la récupération des indemnités" });
  }
});

// Obtenir une entreprise par son ID
app.get("/entreprises/:id", (req, res) => {
  const idEntreprise = req.params.id;
  db.query(
    "SELECT * FROM entreprise WHERE idEntreprise = ?",
    [idEntreprise],
    (err, result) => {
      if (err) {
        console.error("Erreur lors de la récupération de l'entreprise:", err);
        res
          .status(500)
          .json({ message: "Erreur lors de la récupération de l'entreprise" });
      } else {
        if (result.length === 0) {
          res.status(404).json({ message: "Entreprise non trouvée" });
        } else {
          res.status(200).json(result[0]);
        }
      }
    }
  );
});

// Mettre à jour une entreprise par son ID
app.put("/entreprises/:id", (req, res) => {
  const idEntreprise = req.params.id;
  const miseAJour = req.body;
  db.query(
    "UPDATE entreprise SET ? WHERE idEntreprise = ?",
    [miseAJour, idEntreprise],
    (err, result) => {
      if (err) {
        console.error("Erreur lors de la mise à jour de l'entreprise:", err);
        res
          .status(500)
          .json({ message: "Erreur lors de la mise à jour de l'entreprise" });
      } else {
        if (result.affectedRows === 0) {
          res.status(404).json({ message: "Entreprise non trouvée" });
        } else {
          res
            .status(200)
            .json({ message: "Entreprise mise à jour avec succès" });
        }
      }
    }
  );
});


// Créer une nouvelle indemnité
app.post("/indemnites", async (req, res) => {
  const nouvelleIndemnite = req.body;

  try {
    const connection = await db.getConnection();

    const insertQuery = "INSERT INTO indemnite SET ?";
    const [result] = await connection.query(insertQuery, nouvelleIndemnite);

    connection.release();

    res.status(201).json({
      message: "Indemnité créée avec succès",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Erreur lors de la création de l'indemnité:", error);
    res.status(500).json({ message: "Erreur lors de la création de l'indemnité" });
  }
});

// Obtenir la liste de toutes les indemnités
app.get("/indemnites", async (req, res) => {
  try {
    const connection = await db.getConnection();

    const selectQuery = "SELECT * FROM indemnite";
    const [result] = await connection.query(selectQuery);

    connection.release();

    res.status(200).json(result);
  } catch (error) {
    console.error("Erreur lors de la récupération des indemnités:", error);
    res.status(500).json({ message: "Erreur lors de la récupération des indemnités" });
  }
});

// Obtenir une indemnité par son ID
app.get("/indemnites/:id", async (req, res) => {
  const idIndemnite = req.params.id;

  try {
    const connection = await db.getConnection();

    const selectQuery = "SELECT * FROM indemnite WHERE idIndemnite = ?";
    const [result] = await connection.query(selectQuery, [idIndemnite]);

    connection.release();

    if (result.length === 0) {
      res.status(404).json({ message: "Indemnité non trouvée" });
    } else {
      res.status(200).json(result[0]);
    }
  } catch (error) {
    console.error("Erreur lors de la récupération de l'indemnité:", error);
    res.status(500).json({ message: "Erreur lors de la récupération de l'indemnité" });
  }
});

// Mettre à jour une indemnité par son ID
app.put("/indemnites/:id", async (req, res) => {
  const idIndemnite = req.params.id;
  const miseAJour = req.body;

  try {
    const connection = await db.getConnection();

    const updateQuery = "UPDATE indemnite SET ? WHERE idIndemnite = ?";
    const [result] = await connection.query(updateQuery, [miseAJour, idIndemnite]);

    connection.release();

    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Indemnité non trouvée" });
    } else {
      res.status(200).json({ message: "Indemnité mise à jour avec succès" });
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'indemnité:", error);
    res.status(500).json({ message: "Erreur lors de la mise à jour de l'indemnité" });
  }
});

// Supprimer une indemnité par son ID
app.delete("/indemnites/:id", async (req, res) => {
  const idIndemnite = req.params.id;

  try {
    const connection = await db.getConnection();

    const deleteQuery = "DELETE FROM indemnite WHERE idIndemnite = ?";
    const [result] = await connection.query(deleteQuery, [idIndemnite]);

    connection.release();

    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Indemnité non trouvée" });
    } else {
      res.status(200).json({ message: "Indemnité supprimée avec succès" });
    }
  } catch (error) {
    console.error("Erreur lors de la suppression de l'indemnité:", error);
    res.status(500).json({ message: "Erreur lors de la suppression de l'indemnité" });
  }
});


// Créer un nouveau paiement
app.post("/paiements", async (req, res) => {
  const nouveauPaiement = req.body;

  try {
    const connection = await db.getConnection();

    const insertQuery = "INSERT INTO paiement SET ?";
    const [result] = await connection.query(insertQuery, nouveauPaiement);

    connection.release();

    res.status(201).json({
      message: "Paiement créé avec succès",
      id: result.insertId,
    });
  } catch (error) {
    console.error("Erreur lors de la création du paiement:", error);
    res.status(500).json({ message: "Erreur lors de la création du paiement" });
  }
});

// Obtenir la liste de tous les paiements
app.get("/paiements", async (req, res) => {
  try {
    const connection = await db.getConnection();

    const selectQuery = "SELECT *,salarie.nomSalarie,poste.nomPoste FROM `paiement` join salarie on salarie.idSalarie=paiement.idSalarie join poste on poste.idPoste=salarie.idPoste";
    const [result] = await connection.query(selectQuery);

    connection.release();

    res.status(200).json(result);
  } catch (error) {
    console.error("Erreur lors de la récupération des paiements:", error);
    res.status(500).json({ message: "Erreur lors de la récupération des paiements" });
  }
});

// Obtenir un paiement par son ID
app.get("/paiements/:id", async (req, res) => {
  const idPaiement = req.params.id;

  try {
    const connection = await db.getConnection();

    const selectQuery = "SELECT *,salarie.nomSalarie,poste.nomPoste FROM `paiement` join salarie on salarie.idSalarie=paiement.idSalarie join poste on poste.idPoste=salarie.idPoste WHERE idPaiement=?";
    const [result] = await connection.query(selectQuery, [idPaiement]);

    connection.release();

    if (result.length === 0) {
      res.status(404).json({ message: "Paiement non trouvé" });
    } else {
      res.status(200).json(result[0]);
    }
  } catch (error) {
    console.error("Erreur lors de la récupération du paiement:", error);
    res.status(500).json({ message: "Erreur lors de la récupération du paiement" });
  }
});


//ajout salarie
app.post("/salaries", async (req, res) => {
  try {
    const {
      idIndemnite = [],
      idDeclaration = [],
      ...salarieData
    } = req.body;

    const connection = await db.getConnection();

    try {
      await connection.beginTransaction();

      const { insertId: salarieId } = await insertSalarie(connection, salarieData);

      await insertSalarieIndemnites(connection, salarieId, idIndemnite);
      await insertSalarieDeclarations(connection, salarieId, idDeclaration);

      await connection.commit();

      res.status(201).json({ message: "Salarie added successfully", salarieId });
    } catch (error) {
      await connection.rollback();
      console.error(error);
      res.status(500).send("Error while processing the request");
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error while processing the request");
  }
});

async function insertSalarie(connection, salarieData) {
  const insertQuery = `
    INSERT INTO salarie (
      nomSalarie,
      dateDebut,
      adresse,
      email,
      numero,
      idPoste,
      idContrat,
      salaire,
      Banque,
      caisse,
      qualification
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const result = await connection.query(insertQuery, Object.values(salarieData));
  return result[0];
}

async function insertSalarieIndemnites(connection, salarieId, idIndemniteArray) {
  const insertQuery = `
    INSERT INTO salarie_indemnite (salarie_id, indemnite_id) VALUES (?, ?)
  `;

  for (const indemniteId of idIndemniteArray) {
    await connection.query(insertQuery, [salarieId, indemniteId]);
  }
}

async function insertSalarieDeclarations(connection, salarieId, idDeclarationArray) {
  const insertQuery = `
    INSERT INTO salarie_declaration (salarie_id, declaration_id) VALUES (?, ?)
  `;

  for (const declarationId of idDeclarationArray) {
    await connection.query(insertQuery, [salarieId, declarationId]);
  }
}


// Obtenir la liste de tous les salariés avec leurs indemnités et déclarations
app.get("/salaries", async (req, res) => {
  try {
    const connection = await db.getConnection();

    const query = `
      SELECT 
        s.*,
        GROUP_CONCAT(DISTINCT i.idIndemnite) AS indemnites,
        GROUP_CONCAT(DISTINCT d.idDeclaration) AS declarations
      FROM salarie s
      LEFT JOIN salarie_indemnite si ON s.idSalarie = si.salarie_id
      LEFT JOIN salarie_declaration sd ON s.idSalarie = sd.salarie_id
      LEFT JOIN indemnite i ON si.indemnite_id = i.idIndemnite
      LEFT JOIN declaration d ON sd.declaration_id = d.idDeclaration
      GROUP BY s.idSalarie
    `;

    const [results] = await connection.query(query);

    connection.release();

    const formattedResults = results.map((row) => ({
      ...row,
      idIndemnite: row.indemnites ? row.indemnites.split(",").map(Number) : [],
      idDeclaration: row.declarations
        ? row.declarations.split(",").map(Number)
        : [],
    }));

    res.status(200).json(formattedResults);
  } catch (error) {
    console.error("Error retrieving employees:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});
// Obtenir les détails d'un salarié par son ID
app.get("/salaries/:id", async (req, res) => {
  try {
    const idSalarie = req.params.id;
    const connection = await db.getConnection();

    const query = `
      SELECT 
        s.*,
        GROUP_CONCAT(DISTINCT i.idIndemnite) AS indemnites,
        GROUP_CONCAT(DISTINCT d.idDeclaration) AS declarations
      FROM salarie s
      LEFT JOIN salarie_indemnite si ON s.idSalarie = si.salarie_id
      LEFT JOIN salarie_declaration sd ON s.idSalarie = sd.salarie_id
      LEFT JOIN indemnite i ON si.indemnite_id = i.idIndemnite
      LEFT JOIN declaration d ON sd.declaration_id = d.idDeclaration
      WHERE s.idSalarie = ?
      GROUP BY s.idSalarie
    `;

    const [results] = await connection.query(query, [idSalarie]);

    connection.release();

    if (results.length === 0) {
      res.status(404).json({ message: "Salarié non trouvé" });
    } else {
      const formattedResult = {
        ...results[0],
        idIndemnite: results[0].indemnites
          ? results[0].indemnites.split(",").map(Number)
          : [],
        idDeclaration: results[0].declarations
          ? results[0].declarations.split(",").map(Number)
          : [],
      };
      res.status(200).json(formattedResult);
    }
  } catch (error) {
    console.error("Error retrieving employee details:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

//modifier salarié

app.put("/salaries/:id", async (req, res) => {
  const idSalarie = req.params.id;
  const miseAJour = req.body;
  const idIndemniteArray = miseAJour.idIndemnite || [];
  const idDeclarationArray = miseAJour.idDeclaration || [];

  try {
    const connection = await db.getConnection();

    await connection.beginTransaction();

    const updateResult = await updateSalarie(connection, idSalarie, miseAJour);

    // Mettre à jour les relations salarie_indemnite
    await updateSalarieIndemnites(connection, idSalarie, idIndemniteArray);

    // Mettre à jour les relations salarie_declaration
    await updateSalarieDeclarations(connection, idSalarie, idDeclarationArray);

    await connection.commit();
    connection.release();

    if (updateResult.affectedRows === 0) {
      res.status(404).json({ message: "Salarié non trouvé" });
    } else {
      res.status(200).json({ message: "Salarié mis à jour avec succès" });
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour du salarié:", error);
    res.status(500).json({ message: "Erreur lors de la mise à jour du salarié" });
  }
});

async function updateSalarie(connection, idSalarie, miseAJour) {
  const updateQuery = `
    UPDATE salarie SET ? WHERE idSalarie = ?
  `;

  const [result] = await connection.query(updateQuery, [miseAJour, idSalarie]);
  return result;
}

async function updateSalarieIndemnites(connection, idSalarie, idIndemniteArray) {
  // Supprimer les relations existantes
  const deleteQuery = `
    DELETE FROM salarie_indemnite WHERE salarie_id = ?
  `;
  await connection.query(deleteQuery, [idSalarie]);

  // Insérer les nouvelles relations
  const insertQuery = `
    INSERT INTO salarie_indemnite (salarie_id, indemnite_id) VALUES (?, ?)
  `;
  for (const indemniteId of idIndemniteArray) {
    await connection.query(insertQuery, [idSalarie, indemniteId]);
  }
}

async function updateSalarieDeclarations(connection, idSalarie, idDeclarationArray) {
  // Supprimer les relations existantes
  const deleteQuery = `
    DELETE FROM salarie_declaration WHERE salarie_id = ?
  `;
  await connection.query(deleteQuery, [idSalarie]);

  // Insérer les nouvelles relations
  const insertQuery = `
    INSERT INTO salarie_declaration (salarie_id, declaration_id) VALUES (?, ?)
  `;
  for (const declarationId of idDeclarationArray) {
    await connection.query(insertQuery, [idSalarie, declarationId]);
  }
}


// Supprimer un salarié par son ID
app.delete("/salaries/:id", (req, res) => {
  const idSalarie = req.params.id;
  db.query(
    "DELETE FROM salarie WHERE idSalarie = ?",
    [idSalarie],
    (err, result) => {
      if (err) {
        console.error("Erreur lors de la suppression du salarié:", err);
        res
          .status(500)
          .json({ message: "Erreur lors de la suppression du salarié" });
      } else {
        if (result.affectedRows === 0) {
          res.status(404).json({ message: "Salarié non trouvé" });
        } else {
          res.status(200).json({ message: "Salarié supprimé avec succès" });
        }
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Serveur Express en écoute sur le port ${port}`);
});
