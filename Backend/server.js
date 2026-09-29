const express = require("express");
const cors = require("cors");
const db = require("./database.js");
// Importa tutte le route dell'applicazione
const authRoutes = require("./routes/auth");
const sitterRoutes = require("./routes/sitter");
const prenotazioniRoutes = require("./routes/prenotazioni");
const recensioniRoutes = require("./routes/recensioni");
const messaggiRoutes = require("./routes/messaggi");
// creazione dell'applicazione express
const app = express();
// definiamo la porta del server
const PORT = process.env.PORT || 3000;

// abilita CORS per consentire la comunicazione tra il frontend e il backend
app.use(cors());
//il server va abilitato a leggere il body delle richieste in formato JSON
app.use(express.json());

// Routes : definisce i percorsi delle application programming interface (API) per gestire le richieste HTTP
app.use('/api/auth', authRoutes);
app.use('/api/sitter', sitterRoutes);
app.use('/api/prenotazioni', prenotazioniRoutes);
app.use('/api/recensioni', recensioniRoutes);
app.use('/api/messaggi', messaggiRoutes);

//pagina principale
app.get('/', (req, res) => {
  res.send('Benvenuto nel progetto PetSitterHub!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server avviato e in ascolto sulla porta ${PORT}`);
});


