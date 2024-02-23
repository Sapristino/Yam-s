//********** MISE EN FORME INPUT TEXT **********//

function MiseEnFormeInput(input) {
    input.value = input.value.charAt(0).toUpperCase() + input.value.slice(1).toLowerCase();
}

//********** OUVERTURE / FERMETURE REGLES **********//

const voirRegles = document.querySelector('.voir-regle');
const overlay = document.querySelector('.overlay');
const regles = document.querySelector('.regles');
const okDiv = document.querySelector('.ok');

voirRegles.addEventListener('click', function() {
    regles.classList.remove('display-none');
    overlay.classList.remove('display-none');
});

okDiv.addEventListener('click', function() {
    regles.classList.add('display-none');
    overlay.classList.add('display-none');
});

//********** OUVERTURE / FERMETURE INFO **********//

const circleInfos = document.querySelectorAll('#info');

    circleInfos.forEach(function(circleInfo) {
        circleInfo.addEventListener('click', function(event) {
            event.stopPropagation(); // Arrêter la propagation de l'événement pour éviter la fermeture immédiate de l'élément cliqué
            const allPAides = document.querySelectorAll('p.aide');
        
            allPAides.forEach(function(pAide) {
                pAide.classList.add('display-none');
            });

            const pAide = this.closest('td').querySelector('p.aide');
            pAide.classList.remove('display-none');
        });
    });
    // Ajouter un écouteur d'événements au document pour masquer les p.aide lorsque vous cliquez en dehors d'eux
    document.addEventListener('click', function(event) {
        const clickedElement = event.target;
        if (!clickedElement.closest('.info')) {
            const allPAides = document.querySelectorAll('p.aide');
            allPAides.forEach(function(pAide) {
                pAide.classList.add('display-none');
            });
        }
    });

 //********** FONCTION INITIALISER PARTIE **********//

 /* Fonction de désactivation du bouton jouer */
 let jouerButton;
function checkInputs() {
    const inputs = document.querySelectorAll('.nom-joueur');
    let allFilled = true;

    inputs.forEach(function(input) {
        if (input.value === '') {
            allFilled = false;
        }
    });
    jouerButton.disabled = !allFilled;
}

/* Appel de la fonction dès qu'un inputText est saisi */
function addInputEventListeners() {
    const inputs = document.querySelectorAll('.nom-joueur');
    inputs.forEach(function(input) {
        input.addEventListener('input', checkInputs);
    });
}

/* Fonction de création des inputs en fonction du nombre de joueur sélectionné */
function ajouterInputNom(nombreDeJoueurs) {
    const modalNomJoueur = document.querySelector(".modal-nomJoueurInput");
    modalNomJoueur.innerHTML = "";

    for (let i = 0; i < nombreDeJoueurs; i++) {
        const inputJoueur = document.createElement("input");
        inputJoueur.type = "text";
        inputJoueur.placeholder = `Joueur ${i + 1}`;
        inputJoueur.maxLength = "9";
        inputJoueur.pattern = "[a-z]*"
        inputJoueur.addEventListener('input', () => MiseEnFormeInput(inputJoueur));
        inputJoueur.classList.add("nom-joueur", "cellule-" + (i + 1));
        inputJoueur.addEventListener('input', checkInputs);
        const divJoueur = document.createElement('div');
        divJoueur.classList.add('conteneur-joueur');
        divJoueur.classList.add("cellule-" + (i + 1));
        divJoueur.appendChild(inputJoueur);
        modalNomJoueur.appendChild(divJoueur);
    }

    /* Appel de la fonction checkInputs (vérification de saisi des inputs) une fois les inputs ajoutés */
    checkInputs();
}

    /* Fonction de création des éléments de score lorsque les joueurs sont sélectionnés */
function initialiser() {
    const playerButtons = document.querySelectorAll('.player-btn');
    const modal = document.getElementById('modal');
    const InputNomJoueur = document.querySelector(".nomJoueur");
    const preset = document.getElementById("Preset");
    const overlay = document.querySelector(".overlay");
    const premierTour = document.querySelector(".modal-premierTour");
    jouerButton = document.querySelector(".bouton-jouer");

    /* Fonction pour ajouter la class "selected" quand le player-btn est cliqué */
    playerButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        playerButtons.forEach(function(btn) {
            btn.classList.remove('selected');
        });
                button.classList.add('selected');
    });
});

    /* Former le tableau avec les fonctions d'ajout de cellules */
    playerButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const numberOfPlayers = parseInt(button.value);
            InputNomJoueur.classList.remove("display-none");

            ajouterInputNom(numberOfPlayers);
            ajouterColonnes(numberOfPlayers);
            ajouterCellulesMult(numberOfPlayers);
            ajouterCellulesVal(numberOfPlayers);
            ajouterCellulesChance(numberOfPlayers);
            ajouterCellulesTotal(numberOfPlayers);
            ajouterCellulesBonus(numberOfPlayers);
            ajouterJoueursEtScores(numberOfPlayers);

            AfficherNom();

            calculerTotal();
            calculerBonus();
            calculerTotalPreset();

        });
    });
    /* Apparition des éléments lors de l'appui du bouton jouer */
    jouerButton.addEventListener("click", function() {
        if (jouerButton.disabled) {
            const divsJoueur = document.querySelectorAll('.conteneur-joueur');
            divsJoueur.forEach(function(div) {
            div.classList.add('bordure-rouge');
            });
        } else {

            ajouterJoueursEtScores(parseInt(document.querySelector('.player-btn.selected').value));
            const TableauxScores = document.querySelectorAll(".TableauScore-joueur");

            premierTour.classList.remove("display-none");
            overlay.classList.remove("display-none");
            TableauxScores.forEach(TableauScore => TableauScore.classList.remove("display-none"));
            modal.style.display = 'none';
            //scoreTable.classList.remove('display-none');
            //ancreScore.classList.remove("display-none");
            InputNomJoueur.classList.add("display-none");
            preset.classList.remove("display-none");
        }
    });

    addInputEventListeners();
}

initialiser();

//********** FONCTION MODALE PREMIER TOUR ET SUIVANT **********//

jouerButton.addEventListener("click", function() {
    const premierJoueurInput = document.querySelector('.nom-joueur.cellule-1');
    const tourPremierJoueurDiv = document.querySelector('.TourPremierJoueur');
    const prenomPremierJoueur = premierJoueurInput.value;
    tourPremierJoueurDiv.textContent = prenomPremierJoueur;
});

const boutonOKTour1 = document.querySelector(".modal-premierTour .bouton-ok");
    boutonOKTour1.addEventListener("click", function() {
    const premierTour = document.querySelector(".modal-premierTour");
    const overlay = document.querySelector(".overlay");
    const scoreTable = document.getElementById('scoreTable');
    const ancreScore = document.querySelector(".ancre");

    premierTour.classList.add("display-none");
    overlay.classList.add("display-none");
    scoreTable.classList.remove("display-none");
    ancreScore.classList.remove("display-none");
})

/** faire fonction : click sur bouton-ok = modal display-none, overlay display-none, remove display-none table */

//********** FONCTIONS POUR TABLEAU DE SCORE (NOM+SCORE+TOUR) **********//***A REVOIR*/

function ajouterJoueursEtScores(nombreDeJoueurs) {
    const container = document.getElementById('Preset');
    container.innerHTML = '';
    let numeroCellule = 1;

    for (let i = 0; i < nombreDeJoueurs; i++) {
        const inputJoueur = document.querySelector('.conteneur-joueur.cellule-' + numeroCellule + ' input');
        const divNomJoueur = document.createElement('div');
        divNomJoueur.classList.add('nom-joueur', 'cellule-' + numeroCellule);

        const ScoreElement = document.createElement("div");
        ScoreElement.textContent = "Score: ";
        ScoreElement.classList.add("score-joueur");

        if (inputJoueur) {
            divNomJoueur.textContent = inputJoueur.value;
        }
        
        const divScore = document.createElement('div');
        divScore.classList.add('score-joueur', 'cellule-' + numeroCellule);

        const divJoueur = document.createElement("div");
        divJoueur.classList.add("TableauScore-joueur");
        divJoueur.classList.add("display-none");
        divJoueur.appendChild(divNomJoueur);
        divJoueur.appendChild(ScoreElement);
        container.appendChild(divJoueur);

        numeroCellule++;
    }
}
    
//********** FONCTION CALCUL POINTS **********//

/*** Fonction pour calculer le total et l'afficher dans le TFOOT ***/
function calculerTotal() {
    const tdTotalResults = document.querySelectorAll('tfoot tr.total td.total-result');
    tdTotalResults.forEach(function(tdTotal) {
        let total = 0; // Initialiser le total à 0
        const celluleClass = tdTotal.classList[0];
        const tdBodyCells = document.querySelectorAll('tbody td.' + celluleClass + ' span.result');
        // Ajouter les valeurs de chaque cellule au total
        tdBodyCells.forEach(function(tdBody) {
            total += parseInt(tdBody.textContent.split(":")[1].trim());
        });
        // Mettre à jour le texte de la balise <span> dans la cellule de total
        tdTotal.textContent = "Résultat: " + total;
    });
}

/*** Fonction pour calculer le total et l'afficher dans le PRESET ***/
function calculerTotalPreset() {
    const tdTotalPreset = document.querySelectorAll("div.score-joueur");
    tdTotalPreset.forEach(function(tdTotal) {
        let total = 0; //Initialiser le total à 0
    const celluleClass = tdTotal.classList[1];
    const tdBodyCells = document.querySelectorAll('tbody td.' + celluleClass + ' span.result');
    //Ajouter les valeurs de chaque cellule au total
    tdBodyCells.forEach(function(tdBody) {
        total += parseInt(tdBody.textContent.split(":")[1].trim());
    });
    // Mettre à jour le texte de la balise <span> dans la cellule de total
    tdTotal.textContent = "Score: " + total;
    })

}

/*** Fonction pour calculer le bonus et l'afficher dans la cellule BONUS ***/

function calculerBonus() {
    const tdBonusResults = document.querySelectorAll('tbody tr.scorebonus td.bonus-result');
    tdBonusResults.forEach(function(tdBonus) {
        let bonus = 0; // Initialiser le bonus à 0
        const celluleClass = tdBonus.classList[0];
        const tdBodyCells = document.querySelectorAll(`tbody tr.bonus .${celluleClass} span.result`);
        tdBodyCells.forEach(function(tdBody) {
            bonus += parseInt(tdBody.textContent.split(":")[1].trim());
        });

        if (bonus > 62) {
            bonus = 35;
        } else {
            bonus = 0;
        }
        // Mettre à jour le texte de la balise <span> dans la cellule de bonus avec la valeur correcte
        tdBonus.querySelector('span').textContent = "Bonus : " + bonus;
        calculerTotal();
    });
}


//********** FONCTION AFFICHER NOM **********//***A REVOIR*/

/*** Fonction pour afficher le nom du joueur dans la span ***/

function AfficherNom() {
    const inputsNomsJoueurs = document.querySelectorAll('.conteneur-joueur input');
    // Parcourir chaque input pour afficher le nom du joueur dans la cellule de l'en-tête
    inputsNomsJoueurs.forEach(function(input) {
        // Récupérer le nom du joueur depuis l'input
        const nomJoueur = input.value;

        // Récupérer l'index de la colonne associée à ce joueur
        const colonneIndex = Array.from(input.parentNode.parentNode.children).indexOf(input.parentNode) + 2;

        // Sélectionner la cellule d'en-tête correspondante à cette colonne
        const celluleEnTete = document.querySelector('thead th:nth-child(' + colonneIndex + ')');

        // Mettre à jour le texte de la balise span dans cette cellule d'en-tête avec le nom du joueur
        celluleEnTete.textContent = nomJoueur;
    });
}







        //bouton.addEventListener('click', function() {
            // Vérifier si le champ inputJoueur est rempli
            //const joueurRempli = inputJoueur.value.trim() !== ''; // trim() est utilisé pour supprimer les espaces vides au début et à la fin
        
            // Si le champ inputJoueur est vide, ajouter une bordure rouge
            //if (!joueurRempli) {
                //inputJoueur.style.border = '3px solid red';
            //} else {
                // Si le champ inputJoueur est rempli, retirer la bordure rouge s'il y en a une
                //inputJoueur.style.border = ''; // Remettre la bordure à sa valeur par défaut
            //}

            //if (joueurRempli) {
                //boutons.forEach(function(bouton) {
                    //bouton.classList.remove('active');
                    //bouton.textContent = "A vous!"
                    //bouton.style.backgroundColor = '';
                    //bouton.style.color = '';
                //});
    
                // Ajouter la classe active au bouton actuel
                //bouton.classList.add('active');
                //bouton.textContent = "";
                //bouton.style.backgroundColor = 'white';
                //bouton.style.color = 'black';
            //}
        
            // Si le champ inputJoueur est rempli, exécuter le reste du code
            //if (joueurRempli) {
                // Cacher tous les éléments du tableau qui n'ont pas la classe cellule-n et qui n'ont pas la classe 'visible'
                //document.querySelectorAll('#scoreTable td:not(.' + boutonClass + '):not(.visible)').forEach(function(element) {
                    //element.classList.add('display-none');
                //});
                //document.querySelectorAll('#scoreTable th:not(.' + boutonClass + '):not(.visible)').forEach(function(element) {
                    //element.classList.add('display-none');
                //});
        
                //AfficherNom();
        
                // Afficher tous les éléments qui ont la classe cellule-n en retirant 'display-none'
                //document.querySelectorAll('#scoreTable td.' + boutonClass).forEach(function(element) {
                    //element.classList.remove('display-none');
                //});
                //document.querySelectorAll('#scoreTable th.' + boutonClass).forEach(function(element) {
                    //element.classList.remove('display-none');
                //});
            //}
        //});

        //boutons.push(bouton);

        //numeroCellule++; // Incrémenter pour la prochaine itération

        // La création du conteneur du joueur et l'ajout des éléments...
        //const divJoueur = document.createElement('div');
        //divJoueur.classList.add('conteneur-joueur');
        //divJoueur.appendChild(inputJoueur);
        //divJoueur.appendChild(divScore);
        //divJoueur.appendChild(bouton);

        //container.appendChild(divJoueur);
    //}
//}

//********** FONCTIONS AJOUTER CELLULES **********//***OK*/

/*** Fonction pour ajouter des cellules dans le THEAD ***/

function ajouterColonnes(nombreDeColonnes) {
    // Sélectionner la tr de thead
    const trThead = document.querySelector('thead tr');
    let numeroCellule = 1; // Initialiser le numéro de la cellule à 1

    // Ajouter le nombre approprié de colonnes
    for (let i = 0; i < nombreDeColonnes; i++) {
        // Créer une nouvelle colonne
        const th = document.createElement('th');
        // Créer un input de type texte
        const input = document.createElement('span');
        // Attribution de la classe à la colonne
        th.classList.add("nom-joueur");
        th.classList.add('cellule-' + numeroCellule);
        th.classList.add("display-none");
        numeroCellule++; // Incrémenter le numéro de la cellule
        // Ajouter l'input à la colonne
        th.appendChild(input);
        // Ajouter la colonne à la tr de thead
        trThead.appendChild(th);
    }
}

/*** Fonction pour ajouter des cellules dans la TR BONUS ***/

function ajouterCellulesBonus(nombreDeJoueurs) {
    // Sélectionner toutes les lignes du tbody ayant la classe "scorebonus"
    const trBonuses = document.querySelectorAll('tbody tr.scorebonus');
    trBonuses.forEach(function(tr) {
        let numeroCellule = 1; // Variable pour suivre le numéro de la cellule

        // Ajouter une cellule pour chaque joueur
        for (let i = 0; i < nombreDeJoueurs; i++) {
            const td = document.createElement('td');
            td.classList.add('cellule-' + numeroCellule); // Attribution de la classe à la cellule
            td.classList.add("display-none");
            td.classList.add("bonus-result");
            numeroCellule++; // Incrémenter le numéro de la cellule

            // Ajouter une span pour afficher le résultat du bonus
            const resultatSpan = document.createElement('span');
            resultatSpan.textContent = "bonus: 0"; // Valeur initiale
            resultatSpan.classList.add('cellule-' + numeroCellule);
            resultatSpan.classList.add('result');
            td.appendChild(resultatSpan);

            // Ajouter la cellule à la ligne
            tr.appendChild(td);
        }
    });
}

/*** Fonction pour ajouter des cellules dans les TR MULT ***/

function ajouterCellulesMult(nombreDeJoueurs) {
    // Sélectionner toutes les lignes du tbody ayant l'id "mult"
    const trMults = document.querySelectorAll('tbody tr.mult');
    trMults.forEach(function(tr) {
        let numeroCellule = 1; // Variable pour suivre le numéro de la cellule
        // Ajouter une cellule pour chaque joueur
        for (let i = 0; i < nombreDeJoueurs; i++) {
            const td = document.createElement('td');
            td.classList.add('cellule-' + numeroCellule); // Attribution de la classe à la cellule
            td.classList.add("display-none");
            numeroCellule++; // Incrémenter le numéro de la cellule
            // Créer un élément select avec des options de 0 à 6
            const selectElement = document.createElement('select');
            // Ajouter une option vide par défaut
            const optionVide = document.createElement('option');
            optionVide.value = ""; // Valeur vide
            optionVide.textContent = ""; // Texte vide
            selectElement.appendChild(optionVide);
            // Ajouter des options numériques de 0 à 6
            for (let j = 0; j < 7; j++) {
                const optionElement = document.createElement('option');
                optionElement.value = j;
                optionElement.textContent = j;
                selectElement.appendChild(optionElement);
            }
            // Définir la valeur par défaut à vide
            selectElement.value = "";
            td.appendChild(selectElement);
            // Ajouter un élément pour afficher le résultat de la multiplication avec la classe "result"
            const resultatMultiplication = document.createElement('span');
            resultatMultiplication.textContent = "Résultat: 0"; // Valeur initiale
            resultatMultiplication.classList.add('result'); // Ajout de la classe "result"
            // Ajouter la classe de la cellule parente à la balise <span>
            const celluleParentClass = td.classList[0];
            resultatMultiplication.classList.add(celluleParentClass);
            td.appendChild(resultatMultiplication);
            selectElement.addEventListener('change', function() {
                // Calculer et mettre à jour le résultat de la multiplication
                const valeurLigne = parseInt(tr.classList[0]); // Récupérer la valeur de la classe de la ligne
                let resultat = 0;
                const selectedValue = selectElement.value;
                if (selectedValue !== "") { // Vérifier si une option valide est sélectionnée
                    resultat = parseInt(selectedValue) * valeurLigne;
                }
                resultatMultiplication.textContent = "Résultat: " + resultat; // Mettre à jour le résultat de la multiplication
                // Ajouter ou supprimer la classe de style gris sur le select en fonction de l'option sélectionnée
                if (selectedValue !== "") {
                    selectElement.classList.add('select-grise'); // Ajouter la classe si une option est sélectionnée
                } else {
                    selectElement.classList.remove('select-grise'); // Supprimer la classe si aucune option n'est sélectionnée
                }
                // Mettre à jour le total après chaque changement
                calculerTotal();
                calculerBonus();
                calculerTotalPreset();
            
                // Réinitialiser le style du select lorsque la valeur sélectionnée est vide
                if (selectedValue === "") {
                    selectElement.style.backgroundColor = ""; // Réinitialiser la couleur de fond
                }
            });
            // Ajouter la cellule à la ligne
            tr.appendChild(td);
        }
    });
}

/*** Fonction pour ajouter des cellules dans les TR VAL ***/
    
function ajouterCellulesVal(nombreDeJoueurs) {
    // Sélectionner toutes les lignes du tbody ayant la classe "val"
    const trVals = document.querySelectorAll('tbody tr.val');
    trVals.forEach(function(tr) {
        let numeroCellule = 1; // Variable pour suivre le numéro de la cellule
        // Pour chaque ligne "val", ajouter une cellule pour chaque joueur
        for (let i = 0; i < nombreDeJoueurs; i++) {
            const td = document.createElement('td');
            td.classList.add('cellule-' + numeroCellule); // Attribution de la classe à la cellule
            td.classList.add("display-none");
            numeroCellule++; // Incrémenter le numéro de la cellule
            // Créer une balise select
            const selectElement = document.createElement('select');
            // Créer une option vide par défaut
            const defaultOption = document.createElement('option');
            defaultOption.value = ''; // Valeur vide par défaut
            defaultOption.textContent = ''; // Texte vide par défaut
            selectElement.appendChild(defaultOption);
            // Créer une option avec "oui"
            const optionOui = document.createElement('option');
            optionOui.value = 'oui';
            optionOui.textContent = 'oui';
            selectElement.appendChild(optionOui);
            // Créer une option avec "non"
            const optionNon = document.createElement('option');
            optionNon.value = 'non';
            optionNon.textContent = 'non';
            selectElement.appendChild(optionNon);
// Ajouter l'événement de changement
selectElement.addEventListener('change', function() {
    const valeurLigne = parseInt(tr.classList[0]); // Récupérer la valeur de la classe de la ligne
    let resultat = 0;
    // Calculer la multiplication en fonction de l'option sélectionnée
    const selectedValue = selectElement.value;
    if (selectedValue === 'oui') {
        resultat = valeurLigne;
    } else if (selectedValue === 'non') {
        resultat = 0;
    }

    // Mettre à jour le résultat de la multiplication
    td.querySelector('span').textContent = "Résultat: " + resultat;
    // Mettre à jour le style du select en fonction de l'option sélectionnée
    if (selectedValue !== "") {
        selectElement.classList.add('select-grise'); // Ajouter la classe si une option est sélectionnée
        selectElement.style.backgroundColor = "lightgrey"; // Changer la couleur de fond
    } else {
        selectElement.classList.remove('select-grise'); // Supprimer la classe si aucune option n'est sélectionnée
        selectElement.style.backgroundColor = ""; // Réinitialiser la couleur de fond
    }
    // Mettre à jour le total après chaque changement
    calculerTotal();
    calculerTotalPreset();
});
            // Ajouter le select à la cellule
            td.appendChild(selectElement);
            // Ajouter un élément pour afficher le résultat de la multiplication
            const resultatMultiplication = document.createElement('span');
            resultatMultiplication.textContent = "Résultat: 0"; // Valeur initiale
            resultatMultiplication.classList.add('result'); // Ajout de la classe "result"
            // Ajouter la classe de la cellule parente à la balise <span>
            const celluleParentClass = td.classList[0];
            resultatMultiplication.classList.add(celluleParentClass);
            td.appendChild(resultatMultiplication);
            // Ajouter la cellule à la ligne
            tr.appendChild(td);
        }
    });
}

/*** Fonction pour ajouter des cellules dans la TR CHANCE ***/

function ajouterCellulesChance(nombreDeJoueurs) {
    // Sélectionner toutes les lignes du tbody ayant la classe "total"
    const trChance = document.querySelectorAll('tbody tr.chance');
    trChance.forEach(function(tr) {
        let numeroCellule = 1; // Variable pour suivre le numéro de la cellule
        // Ajouter une cellule pour chaque joueur
        for (let i = 0; i < nombreDeJoueurs; i++) {
            const td = document.createElement('td');
            td.classList.add('cellule-' + numeroCellule); // Attribution de la classe à la cellule
            td.classList.add("display-none");
            numeroCellule++; // Incrémenter le numéro de la cellule
            // Créer 5 selects avec 7 options chacun
            for (let j = 0; j < 5; j++) {
                const selectElement = document.createElement('select');
                // Ajouter une option vide par défaut
                const optionVide = document.createElement('option');
                optionVide.value = ''; // Valeur vide
                selectElement.appendChild(optionVide); // Ajouter l'option vide au select
                // Ajouter les autres options de 1 à 6
                for (let k = 1; k <= 6; k++) {
                    const optionElement = document.createElement('option');
                    optionElement.value = k;
                    optionElement.textContent = k;
                    selectElement.appendChild(optionElement);
                }
// Ajouter l'événement de changement sur le select
selectElement.addEventListener('change', function() {
    let resultat = 0;
    // Calculer la somme des valeurs sélectionnées dans les selects non vides
    td.querySelectorAll('select').forEach(function(select) {
        if (select.value !== '') {
            resultat += parseInt(select.value);
        }
    });
    // Mettre à jour le résultat de l'addition
    td.querySelector('span').textContent = "Résultat: " + (isNaN(resultat) ? 0 : resultat);
    // Mettre à jour le style des selects en fonction de la valeur sélectionnée
    if (selectElement.value !== "") {
        selectElement.classList.add('select-grise'); // Ajouter la classe si une option est sélectionnée
        selectElement.style.backgroundColor = "lightgrey"; // Changer la couleur de fond
    } else {
        selectElement.classList.remove('select-grise'); // Supprimer la classe si aucune option n'est sélectionnée
        selectElement.style.backgroundColor = ""; // Réinitialiser la couleur de fond
    }
    // Mettre à jour le total après chaque changement
    calculerTotal();
    calculerTotalPreset();
});
                // Ajouter le select à la cellule
                td.appendChild(selectElement);
            }
            // Ajouter un élément pour afficher le résultat de l'addition
            const resultatAddition = document.createElement('span');
            resultatAddition.textContent = "Résultat: 0"; // Valeur initiale
            resultatAddition.classList.add('result'); // Ajout de la classe "result"
            // Ajouter la classe de la cellule parente à la balise <span>
            const celluleParentClass = td.classList[0];
            resultatAddition.classList.add(celluleParentClass);
            td.appendChild(resultatAddition);
            // Ajouter la cellule à la ligne
            tr.appendChild(td);
        }
    });
}

/*** Fonction pour ajouter des cellules dans la TR TOTAL du TFOOT ***/

function ajouterCellulesTotal(nombreDeJoueurs) {
    // Sélectionner toutes les lignes du tbody ayant la classe "total"
    const trTotal = document.querySelectorAll('tfoot tr.total');
    trTotal.forEach(function(tr) {
        let numeroCellule = 1; // Initialiser le numéro de la cellule à 1
        // Pour chaque ligne "total", ajouter une cellule pour chaque joueur
        for (let i = 0; i < nombreDeJoueurs; i++) {
            const td = document.createElement('td');
            // Attribution de la classe à la cellule
            td.classList.add('cellule-' + numeroCellule);
            td.classList.add("display-none");
            td.classList.add("total-result");
            numeroCellule++; // Incrémenter le numéro de la cellule
            // Ajouter un élément span pour afficher le résultat de l'addition
            const resultatSpan = document.createElement('span');
            resultatSpan.textContent = "Résultat: 0"; // Valeur initiale
            td.appendChild(resultatSpan);

            // Ajouter la cellule à la ligne
            tr.appendChild(td);
        }
    });
}



// Appeler la fonction d'initialisation une fois que le DOM est chargé
document.addEventListener('DOMContentLoaded', initialiser);

