// Les données des stagiaires
var datas = [
    { numero: 100, nom: "ALI ALAMI", note: 15, filiere: "DEVWOPS" },
    { numero: 101, nom: "HAFSA STIFA", note: 17, filiere: "DEVWOPS" },
    { numero: 102, nom: "LAMIA MAFATIH", note: 15, filiere: "DEVWOPS" },
    { numero: 103, nom: "SALIM NACIRI", note: 15, filiere: "DEVWOPS" }
];

// Fonction pour afficher les données dans un tableau HTML 
function all(datas) {
    const blocTable = document.querySelector('.blocTable');
    blocTable.innerHTML = ''; // Réinitialiser le tableau avant de le recréer

    const table = document.createElement('table');
    table.className = 'table table-bordered';

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headers = ['ID', 'Numéro', 'Nom', 'Note', 'Filière', 'Actions'];
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        th.className = 'text-center table-light';
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    datas.forEach((data, index) => {
        const row = document.createElement('tr');

        const idCell = document.createElement('td');
        idCell.textContent = index + 1; // ID incrémenté à partir de 1
        idCell.className = 'text-center';
        row.appendChild(idCell);

        Object.values(data).forEach(value => {
            const td = document.createElement('td');
            td.textContent = value;
            td.className = 'text-center';
            row.appendChild(td);
        });

        const actionsCell = document.createElement('td');
        actionsCell.className = 'text-center';

        const editButton = document.createElement('button');
        editButton.className = 'btn btn-warning btn-sm me-2';
        editButton.textContent = 'Modifier';
        editButton.onclick = function () {
            updateStg(index); // Passer l'index ici
        };

        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger btn-sm';
        deleteButton.textContent = 'Supprimer';
        deleteButton.onclick = function () {
            deleteStg(index);
        };

        actionsCell.appendChild(editButton);
        actionsCell.appendChild(deleteButton);
        row.appendChild(actionsCell);
        tbody.appendChild(row);
    });
    table.appendChild(tbody);
    blocTable.appendChild(table);

    // Mettre à jour le total des stagiaires
    updateTotalStagiaires();
}

/// Fonction pour afficher le total des stagiaires

function updateTotalStagiaires() {
    const totalSpan = document.getElementById('totalStagiaires');
    totalSpan.textContent = `Total des stagiaires: ${datas.length}`;
}

// Afficher le tableau lors du chargement de la page
window.onload = function () {
    all(datas);
};

/*-------------------------------------------------------------*/

/// Fonction pour afficher le formulaire d'ajout des stagiaires

function displayStg() {
    document.querySelector('.formAdd').style.display = "block";
}



/*-------------------------------------------------------------*/



/// Fonction pour ajouter un nouveau stagiaire 

function addStg(event) {
    event.preventDefault(); // Empêcher le rechargement de la page

    var numero = document.getElementById('num1').value;
    var nom = document.getElementById('nom').value;
    var note = document.getElementById('note').value;
    var filiere = document.getElementById('filiere').value;

    // Créer un nouvel objet stagiaire
    var newStagiaire = { numero: Number(numero), nom, note: Number(note), filiere };

    // Ajouter le nouveau stagiaire à la liste
    datas.push(newStagiaire);
    
    // Réafficher le tableau avec le nouveau stagiaire
    all(datas);

    // Réinitialiser le formulaire
    document.querySelector('.formAdd form').reset();

    // Masquer le formulaire après l'ajout
    document.querySelector('.formAdd').style.display = "none";

    return false; // Pas nécessaire ici mais peut être laissé
}




/*-------------------------------------------------------------*/



/// Fonction pour modifier un stagiaire

let stagiaireIndex; // Variable pour garder la trace de l'index du stagiaire à modifier

// Fonction pour afficher le formulaire de mise à jour avec les données du stagiaire
function updateStg(index) {
    stagiaireIndex = index; // Enregistrer l'index du stagiaire à modifier
    const stagiaire = datas[index]; // Obtenir les données du stagiaire

    // Remplir le formulaire avec les données existantes
    document.getElementById('numU').value = stagiaire.numero;
    document.getElementById('nomU').value = stagiaire.nom;
    document.getElementById('noteU').value = stagiaire.note;
    document.getElementById('filiereU').value = stagiaire.filiere;

    // Afficher le formulaire de mise à jour
    document.querySelector('.updateForm').style.display = "block"; // Display the update form

    return false; // Empêcher le rechargement de la page
}

// Fonction pour mettre à jour les données du stagiaire

function saveUpdateStg(event) {
    event.preventDefault(); // Empêcher le rechargement de la page

    const numero = document.getElementById('numU').value;
    const nom = document.getElementById('nomU').value;
    const note = document.getElementById('noteU').value;
    const filiere = document.getElementById('filiereU').value;

    // Mettre à jour les données du stagiaire
    datas[stagiaireIndex] = { numero: Number(numero), nom, note: Number(note), filiere };

    // Réafficher le tableau mis à jour
    all(datas);

    // Réinitialiser et cacher le formulaire de mise à jour
    document.querySelector('.updateForm').style.display = "none";
    document.querySelector('.updateForm form').reset();

    return false; // Empêcher le rechargement de la page
}

// Écouter l'événement de soumission pour le formulaire de mise à jour
document.querySelector('.updateForm form').addEventListener('submit', saveUpdateStg);



/*-------------------------------------------------------------*/



/// Fonction pour supprimer un stagiaire

function deleteStg(index) {
    if (confirm("Voulez-vous vraiment supprimer ce stagiaire ?")) {
        datas.splice(index, 1); // Supprimer le stagiaire de la liste
        all(datas); // Mettre à jour le tableau après la suppression
    }
}
