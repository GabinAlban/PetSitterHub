; // URL del backend
const API_URL = "https://petsitterhub-production.up.railway.app/api";
// Funzione per cercare i pet sitter in base alla città e alla data selezionata
function cercaSitters() {
    // leggere la barra di ricerca
    const citta = document.getElementById('cercaCitta').value;
    if (!citta) {
        alert("Per favore, inserire una città.");
        return;
    }
    // Effettua una richiesta GET al backend tramite API per ottenere i sitter
    fetch(API_URL + '/sitter')
        .then(function (response){
            return response.json();
        })
        .then(function(sitters){
            // Aggiorna l'interfaccia con i risultati
           mostraSitters(sitters);
        })
        .catch(function(err)  {
            console.log("Errore durante la ricerca dei sitter:", error);
        });

}
function mostraSitters(sitters) {
    const lista = document.getElementById('listaSitters');
    if (sitters.length === 0) {
        lista.innerHTML = '<div class="text-center"><p class="text-muted">Nessun sitter trovato per la città selezionata!</p></div>';
        return;
    }
    // creazione dell'html per ogni sitter
    let html = '';
    sitters.forEach(function(sitter) {
         
       html += '<div class="col-md-4 mb-4">';
       html += '<div class="card shadow-sm h-100">';
       html += '<div class="card-body">';
       html += '<h5>' + sitter.nome + '</h5>';
       html += '<p>' + sitter.descrizione + '</p>';
       html += '</div></div></div>';
                   
    });
    // aggiorna la lista dei sitter nella pagina
    lista.innerHTML = html;
}
// Funzione Login
function login(event) {
    event.preventDefault();
    // prende i valori inseriti dall'utente
    var email= document.getElementById('email').value;
    var password= document.getElementById('password').value;
    // va chiamato l'api di login
    fetch(API_URL + '/auth/login',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email:email, password: password})   
        })
        .then(function(r){return r.json();})
        .then(function(d){
            if(d.errore){
                alert('Errore: ' + d.errore);
            }else{
                alert('Login effettuato !');
                window.location.href='index.html';
            }
    })
    .catch(function(e){
       alert('Errore connessione');
    });
}
// Registrazione Utente
function register(event){
    event.preventDefault();
    // recupera i valori dal form
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const ruolo = document.getElementById('ruolo').value;
    const citta = document.getElementById('citta').value;
    // chiamata dell'api di registrazione 
    fetch(API_URL + '/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome: nome,
            email: email,
            password: password,
            ruolo: ruolo,
            citta: citta
        })
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        if (data.errore) {
            document.getElementById('errore').style.display = 'block';
            document.getElementById('errore').innerText = data.errore;
        } else {
            document.getElementById('successo').style.display = 'block';
            document.getElementById('successo').innerText = 'Registrazione completata!';
            setTimeout(function() {
                window.location.href = 'login.html';
            }, 1000);
        }
    })
    .catch(function(err) {
        document.getElementById('errore').style.display = 'block';
        document.getElementById('errore').innerText = 'Errore di connessione al server!';
    });
}

function caricaSitter() {
    var urlparams = new URLSearchParams(window.location.search);
    var sitterId = urlparams.get('id');
    if (!sitterId) {
        window.location.href = 'indexedDB.html';
        return;
    }
    fetch(API_URL + '/sitter/' + sitterId)
    .then(function(r) {
        return r.json();
    })
    .then(function(sitter) {
        document.getElementById('nomeSitter').innerText = 'sitter #' + sitter.id;
        document.getElementById('descrizioneSitter').innerText = sitter.descrizione || 'Nessuna descrizione';
        document.getElementById('tariffaSitter').innerText = '€ ' + sitter.tariffa_ora + '/ora';
    })
    .catch(function(e) {
        console.log('Errore:', e);
    });
}
// Prenota un sitter 
function prenota(event) {
    event.preventDefault();
    var utente = JSON.parse(localStorage.getItem('utente'));
    if(!utente){
        alert('Devi registrarti per prenotare un servizio !');
        window.location.href = 'login.html';
        return;
    }
    var urlParams = new URLLSearchParams(window.location.search);
    var sitterId = urlParams.get('id');
    var servizio = document.getElementById('servizio').value;
    var dataInizio = document.getElementById('dataInizio').value;
    var dataFine = document.getElementById('dataFine').value;
    fetch(API_URL + '/prenotazioni', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({
            proprietario_id: utente.id,
            sitter_id: sitterId,
            servizio_id:1,
            dataInizio: dataInizio,
            dataFine: dataFine,
            prezzo_totale: 0
        })
    })
    .then(function(r){ return r.json();})
    .then(function(d){
        if(d.errore){
            alert('Errore: ' + d.errore);
        }else{
            alert('Prenotazione Effettuata Con Successo !');
            window.location.href = 'Pagamento .html?prezz0=' + d.prezzo_totale + '&servizio=' + servizio;
        }
    })
    .catch(function(e){
        alert('Errore di COnnessione !');
    })
}
function caricaDashboard(){
    var utente=JSON.parse(localStorage.getItem('utente'));
    if(!utente){
        window.location.href = 'login.html';
        return;
    }
    document.getElementById('nomeUtente').innerText= 'Salve '+ utente.nome + '!';
    caricaPrenotazioni(utente.id);
    caricaMessaggi(utente.id);
    caricaRecensioni(utente.id);
}
function caricaPrenotazioni(utenteIdId){
    fetch(API_URL + '/prenotazioni')
    .then(function(r) {
        return r.json();
    })
    .then(function(prenotazioni){
        var lista = document.getElementById('listaPrenotazioni');
        document.getElementById('totalePrenotazioni').innerText = prenotazioni.length;
        var inAttesa = prenotazioni.filter(function(p) {
            return p.stato === 'in_attesa';});
        var Accettate = prenotazioni.filter(function(p) {return p.stato==='accettata';});
        Document.getElementById('prenotazioniAttesa').innerText = inAttesa.length;
        document.getElementById('prenotazioniAccettate').innerText= Accettate.length;
        if(prenotazioni.length===0){
            lista.innerHTML= '<p class="text-muted">Nessuna prenotazine</p>';
            return;
        }
        var html='';
        prenotazioni.forEach(function(p){
            var badgecolor = p.stato==='in_attesa' ? 'warning' : p.stato === 'accettata' ? 'succes' : 'danger';
            html += '<div class=d-flex justify-content-between align-items-center border-bottom py-2">';
            html += '<div>';
            html += '<strong> Prenotazione # ' + p.id + '</strong>';
            html += '<p class="mb-0 text-muted small">' + p.data_inizio + '_' + p.data_fine + '</p>';
            html += '</div>';
            html += '<div>';
            html += '<span class="badge bg-' + badgeColor + '">' + p.stato + '</span';
            if(p.stato === 'in_attesa'){
                html += ' <botton class="btn btn-sm btn-success ms-2" onclick="aggiornaPrenotazione(' + p.id + ',\'accetta\')">Accettata</button>';
                html += ' <botton class="btn btn-sm btn-danger ms-1" onclick="aggiornaPrenotazione(' + p.id + ', \'rifiutata \')">Rifiutata</button>';
            }
            html += '</div></div>';
        });
        lista.innerHTML=html;
    })
    .catch(function(e) {
        console.log('Errore:',e); });

       }
       // Agiorna stato prenotazione 
       function aggiornaPrenotazione (id, stato) {
        fetch(API_URL + '/prenotazioni/' + id, {
           method:'PUT',
           headers:{'Content-Type': 'application/json'},
           body: JSON.stringify({stato: stato}) 
        })
        .then(function(r) {return r.json(); })
        .then(function(d) {
            alert('prenotazione ' + stato + '!');
            caricaDashboard();
        })
        .catch(function(e){
            alert('ERrore !');  });

}
// Carica messaggi
function caricaMessaggi(utenteId){
    fetch (API_URL + '/messaggi/' + utente.Id)
        .then(function(r) {return r.json(); })
        .then(function(messaggi){
            var lista =document.getElementById('listaMessaggi');
            if(messaggi.length === 0){
                lista.innerHTML='<p class="text-muted">Nessun messaggio</p>';
                return ;
            }
            var html='';
            messaggi.forEach(function(m){
                html += '<div class="border-bottom py-2>';
                html +='<strong> Da utente #' +m.mittente_id + '</strong>';
                html +='<p class="mb-0">' + m.testo + '</p>';
                html +='</div>';
            });
            lista.innerHTML = html;
        })
        .catch(function(e){ console.log('Errore:', e); });

    }
    //Inviare messaggio
    function inviaMessaggio(){
        var utente = JSON.parse(localStorage.getItem('utente'));
        var destinatario = document.getElementById('detinatarioId').value;
        var testo= document.getElementById('testoMessaggio').value;
        if(!destinatario){
            alert('Compila destinatario !')
            return;
        }
        if(!testo){
            alert('Compila il testo !')
            return;
        }
        fetch(API_URL + '/messaggi', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
                mittente_id: utente.id,
                destinatario_id: destinatario,
                testo: testo
            })
        })
        .then(function(r){return r.json();})
        .then(function(d){
            alert('Messaggio inviato!');
            document.getElementById('testoMessaggio').value='';
            caricaMessaggi(utente.id);
        })
        .catch(function(e){ alert('Errore!'); });
    }
    //caricamento recensioni 
    function caricaRecensioni (sitterId){
        fetch(API_URL + '/recensioni/' + sitterId)
        .then(function(r) {return r.json();})
        .then(function(recensioni){
            var lista = document.getElementById('listaRecensioni');
            document.getElementById('totaleRecensioni').innerText= recensioni.length;
            if(recensioni.length===0){
                lista.innerHTML = '<p class= "text-muted">Nessuna recensione</p>';
                return;
            }
            var html = '';
            recensioni.forEach(function(r){
                html += '<div class="border-bottom py-2>';
                html += '<strong> ' + p.voto + '/5</strong>';
                html += '<p class=mb-0">' + r.commento + '</p>';
                html += '</div>';
            });
            lista.innerHTML= html;
        })
        .catch(function (e){ console.log('Errore:', e); });
            
        }
        // logout
        function logout(){
            localStorage.removeItem('utente');
            window.location.href= 'index.html';
    }
    function effettuaPagamento(event){
        event.preventDefault();
        var numero= document.getElementById('numeroCarta').value;
        var cvv= document.getElementById('cvv').value;
        if (numero.length<16){
            document.getElementById('errore').style.display= 'block';
            document.getElementById('errore').innerText = 'numero carta non valida';
            return;
        }
        document.querySelector('button[type="submit"]').innerText = 'Elaborazione...';
        document.querySelector('button[type="submit"]').disabled = true;
        setTimeout(function(){
            document.getElementById('successo').style.display = 'block';
            document.getElementById('successo').innerText = 'pagamento Effettuato con successo !';
            document.querySelector('button[type=submit"]').style.display = 'none';
            setTimeout(function(){
            window.location.href = 'dashboard.html';

        }, 2000);
    }, 2000);

}

