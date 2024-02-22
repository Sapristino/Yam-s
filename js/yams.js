// Ouverture/fermeture regles 

const voirRegles = document.querySelector('.voir-regle');
const overlay = document.querySelector('.overlay');
const regles = document.querySelector('.regles');

voirRegles.addEventListener('click', function() {
    // Supprimer la classe display-none de la div regles
    regles.classList.remove('display-none');
    // Supprimer la classe display-none de la div overlay
    overlay.classList.remove('display-none');
});

const jouerDiv = document.querySelector('.jouer');
const reglesDiv = document.querySelector('.regles');
const overlayDiv = document.querySelector('.overlay');

// Ajouter un gestionnaire d'événement de clic à la div "jouer"
jouerDiv.addEventListener('click', function() {
    // Ajouter la classe display-none à la div "regles"
    reglesDiv.classList.add('display-none');
    // Ajouter la classe display-none à la div "overlay"
    overlayDiv.classList.add('display-none');
});

// Ouverture / fermeture Aide-Tableau

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

// Fonction pour calculer le total
function calculerTotal() {
    // Sélectionner toutes les cellules de total ayant la classe "total-result"
    const tdTotalResults = document.querySelectorAll('tfoot tr.total td.total-result');
    tdTotalResults.forEach(function(tdTotal) {
        let total = 0; // Initialiser le total à 0

        // Récupérer la classe de la cellule pour identifier la colonne correspondante
        const celluleClass = tdTotal.classList[0];

        // Sélectionner toutes les cellules du corps du tableau ayant la même classe
        const tdBodyCells = document.querySelectorAll('tbody td.' + celluleClass + ' span.result');

        // Ajouter les valeurs de chaque cellule au total
        tdBodyCells.forEach(function(tdBody) {
            total += parseInt(tdBody.textContent.split(":")[1].trim());
        });

        // Mettre à jour le texte de la balise <span> dans la cellule de total
        tdTotal.textContent = "Résultat: " + total;
    });
}

// Fonction pour afficher le nom du joueur dans la span 

function AfficherNom() {
    // Sélectionner tous les éléments input correspondant aux noms des joueurs
    const inputsNomsJoueurs = document.querySelectorAll('.conteneur-joueur input');

    // Parcourir chaque input pour afficher le nom du joueur dans la cellule de l'en-tête
    inputsNomsJoueurs.forEach(function(input) {
        // Récupérer le nom du joueur depuis l'input
        const nomJoueur = input.value;
        console.log(nomJoueur);

        // Récupérer l'index de la colonne associée à ce joueur
        const colonneIndex = Array.from(input.parentNode.parentNode.children).indexOf(input.parentNode) + 2;
        console.log(colonneIndex);

        // Sélectionner la cellule d'en-tête correspondante à cette colonne
        const celluleEnTete = document.querySelector('thead th:nth-child(' + colonneIndex + ')');
        console.log(celluleEnTete);

        // Mettre à jour le texte de la balise span dans cette cellule d'en-tête avec le nom du joueur
        celluleEnTete.textContent = nomJoueur;
    });
}


// Fonction pour afficher le total dans le preset
function calculerTotalPreset() {
    //Sélectionner toutes les cellules de total ayant la class "score-joueur"
    const tdTotalPreset = document.querySelectorAll("div.score-joueur");
    tdTotalPreset.forEach(function(tdTotal) {
        let total = 0; //Initialiser le total à 0

    // Récupérer la classe de la cellule pour identifier la colonne correspondante
    const celluleClass = tdTotal.classList[1];

    //Sélectionner toutes les cellules du corps du tableau ayant la même class
    const tdBodyCells = document.querySelectorAll('tbody td.' + celluleClass + ' span.result');

    //Ajouter les valeurs de chaque cellule au total
    tdBodyCells.forEach(function(tdBody) {
        total += parseInt(tdBody.textContent.split(":")[1].trim());
    });

    tdTotal.textContent = "Score: " + total;
    })

}

// Fonction pour calculer le bonus
function calculerBonus() {
    const tdBonusResults = document.querySelectorAll('tbody tr.scorebonus td.bonus-result');
    tdBonusResults.forEach(function(tdBonus) {
        let bonus = 0; // Initialiser le bonus à 0

        // Supposons que chaque td.bonus-result ait une classe unique pour identifier la colonne
        const celluleClass = tdBonus.classList[0];

        // Corriger le sélecteur pour inclure un espace correct avant 'span.result'
        // et assurer que la concaténation forme un sélecteur valide
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

//////// CELLULES BONUS /////////

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

//////// CELLULES MULT /////////

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

//////// CELLULES VAL /////////
    
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

//////// CELLULES CHANCE /////////

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

//////// LIGNE TOTAL /////////

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
///// PRESET /////

function ajouterJoueursEtScores(nombreDeJoueurs) {
    const container = document.getElementById('Preset');
    container.innerHTML = '';
    let numeroCellule = 1;
    const boutons = [];

    for (let i = 0; i < nombreDeJoueurs; i++) {
        const inputJoueur = document.createElement('input');
        inputJoueur.type = 'text';
        inputJoueur.placeholder = `Joueur ${i + 1}`;
        inputJoueur.classList.add('nom-joueur', 'cellule-' + numeroCellule);

        const divScore = document.createElement('div');
        divScore.classList.add('score-joueur', 'cellule-' + numeroCellule);

        const bouton = document.createElement('button');
        bouton.textContent = 'A vous!';
        const boutonClass = 'cellule-' + numeroCellule;
        bouton.classList.add('action-joueur', boutonClass);

        bouton.addEventListener('click', function() {
            // Vérifier si le champ inputJoueur est rempli
            const joueurRempli = inputJoueur.value.trim() !== ''; // trim() est utilisé pour supprimer les espaces vides au début et à la fin
        
            // Si le champ inputJoueur est vide, ajouter une bordure rouge
            if (!joueurRempli) {
                inputJoueur.style.border = '3px solid red';
            } else {
                // Si le champ inputJoueur est rempli, retirer la bordure rouge s'il y en a une
                inputJoueur.style.border = ''; // Remettre la bordure à sa valeur par défaut
            }

            if (joueurRempli) {
                boutons.forEach(function(bouton) {
                    bouton.classList.remove('active');
                    bouton.textContent = "A vous!"
                    bouton.style.backgroundColor = '';
                    bouton.style.color = '';
                });
    
                // Ajouter la classe active au bouton actuel
                bouton.classList.add('active');
                bouton.textContent = "";
                bouton.style.backgroundColor = 'white';
                bouton.style.color = 'black';
            }
        
            // Si le champ inputJoueur est rempli, exécuter le reste du code
            if (joueurRempli) {
                // Cacher tous les éléments du tableau qui n'ont pas la classe cellule-n et qui n'ont pas la classe 'visible'
                document.querySelectorAll('#scoreTable td:not(.' + boutonClass + '):not(.visible)').forEach(function(element) {
                    element.classList.add('display-none');
                });
                document.querySelectorAll('#scoreTable th:not(.' + boutonClass + '):not(.visible)').forEach(function(element) {
                    element.classList.add('display-none');
                });
        
                AfficherNom();
        
                // Afficher tous les éléments qui ont la classe cellule-n en retirant 'display-none'
                document.querySelectorAll('#scoreTable td.' + boutonClass).forEach(function(element) {
                    element.classList.remove('display-none');
                });
                document.querySelectorAll('#scoreTable th.' + boutonClass).forEach(function(element) {
                    element.classList.remove('display-none');
                });
            }
        });

        boutons.push(bouton);

        numeroCellule++; // Incrémenter pour la prochaine itération

        // La création du conteneur du joueur et l'ajout des éléments...
        const divJoueur = document.createElement('div');
        divJoueur.classList.add('conteneur-joueur');
        divJoueur.appendChild(inputJoueur);
        divJoueur.appendChild(divScore);
        divJoueur.appendChild(bouton);

        container.appendChild(divJoueur);
    }
}

// Fonction d'initialisation
function initialiser() {
    const playerButtons = document.querySelectorAll('.player-btn');
    const modal = document.getElementById('modal');
    const scoreTable = document.getElementById('scoreTable');
    const ancreScore = document.querySelector(".ancre");

    playerButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const numberOfPlayers = parseInt(button.value);
            // Cacher la modal et afficher la table
            modal.style.display = 'none';
            scoreTable.classList.remove('display-none');
            ancreScore.classList.remove("display-none");

            // Ajouter des colonnes à la tr de thead
            ajouterColonnes(numberOfPlayers);
            // Ajouter des cellules aux lignes ayant l'id "mult"
            ajouterCellulesMult(numberOfPlayers);
            // Ajouter des cellules aux lignes ayant l'id "val"
            ajouterCellulesVal(numberOfPlayers);
            // Ajouter des cellules aux lignes ayant l'id "chance"
            ajouterCellulesChance(numberOfPlayers);
            // Ajouter des cellules aux lignes de total
            ajouterCellulesTotal(numberOfPlayers);
            //Ajouter des cellules à la ligne Bonus
            ajouterCellulesBonus(numberOfPlayers);
            //Ajouter preset jeu
            ajouterJoueursEtScores(numberOfPlayers);
            // Appeler la fonction de calcul du résultat total
            calculerTotal();
            calculerBonus();
            calculerTotalPreset();
            AfficherNom();
        });
    });

    // Sélectionner tous les boutons "A votre tour !"
    const aVotreTourButtons = document.querySelectorAll('.action-joueur');

    // Ajouter un gestionnaire d'événements à chaque bouton "A votre tour !"
    aVotreTourButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            // Récupérer l'élément parent contenant le prénom du joueur
            const parentDiv = button.parentElement;
            // Récupérer l'élément input correspondant au prénom du joueur
            const inputJoueur = parentDiv.querySelector('.nom-joueur input');
            // Récupérer l'index de la colonne associée à ce joueur
            const colonneIndex = Array.from(parentDiv.parentNode.children).indexOf(parentDiv) + 1;
            // Sélectionner la span correspondante dans l'en-tête
            const spanEnTete = document.querySelector('thead th:nth-child(' + colonneIndex + ') span');
            // Mettre à jour le texte de la span avec le prénom du joueur
            spanEnTete.textContent = inputJoueur.value;
        });
    });
}

// Appeler la fonction d'initialisation une fois que le DOM est chargé
document.addEventListener('DOMContentLoaded', initialiser);

