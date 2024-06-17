/*Visualizzare in pagina 5 numeri casuali.
Da lì parte un timer di 30 secondi.
Dopo 30 secondi i numeri scompaiono e l’utente deve inserire, uno alla volta, 
i numeri che ha visto precedentemente, tramite il prompt().
Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali 
dei numeri da indovinare sono stati individuati.*/

////////////////////////////////////////////////////////////////////////////////////////////////

// Selezionare gli elementi dal DOM
const guessNumber = document.getElementById("number-line");
const count = document.getElementById("count");
const currentNumber = document.getElementById("current-number");
const message = document.getElementById("text-message");
const inputNum = document.getElementById("input-text");
const addButton = document.getElementById("btn-send");

// Creare un array con 5 numeri casuali
const numberArr = randomRange(1, 100, 5);

// Memorizza la sequenza originale per il confronto
let originalSequence = numberArr.slice();

// Estrarre i 5 numeri e visualizzarli nel DOM con un ciclo for
for (let i = 0; i < numberArr.length; i++) {
    let number = numberArr[i];
    guessNumber.innerHTML += `<h2 id="num-${i}" class="circle">${number}</h2>`;
}

// Impostare il conteggio a 30 secondi
let seconds = 0;
count.innerHTML = `${seconds} secondi`;

// Avviare il conteggio ogni secondo
const countdownInterval = setInterval(function () {
    seconds++;
    count.innerHTML = `${seconds} secondi`;

    // Quando il conteggio arriva a zero
    if (seconds === 30) {
        clearInterval(countdownInterval); // Fermare il countdown

        // Far scomparire i numeri
        guessNumber.style.display = "none";
        count.innerHTML = "";

        // Abilitare l'input dell'utente
        inputNum.disabled = false;
        addButton.disabled = false;

        // Visualizzare l'indicazione per l'utente
        currentNumber.innerHTML = 
        `<h3>Inserisci i numeri che ricordi della sequenza</h3>` + 
        `<h3>Inserisci il numero 1:</h3>`;
    }
}, 1000);

// Funzione per gestire l'input dei numeri ricordati dall'utente
let currentIndex = 0; // Indice del numero corrente che l'utente sta immettendo
let correctCount = 0; // Contatore dei numeri corretti

addButton.addEventListener('click', function () {
    // Leggi il numero inserito dall'utente
    let userNumber = parseInt(inputNum.value);

    // Confronta il numero con la sequenza originale
    if (originalSequence[currentIndex] === userNumber) {
        correctCount++;
    }

    // Passa al numero successivo se ci sono ancora numeri da inserire
    currentIndex++;
    if (currentIndex < originalSequence.length) {
        currentNumber.innerHTML = 
        `<h3>Inserisci i numeri che ricordi della sequenza</h3>` + 
        `<h3>Inserisci il numero ${currentIndex + 1}:</h3>`;
    } else {
        // Se tutti i numeri sono stati inseriti, mostrare il messaggio finale
        currentNumber.innerHTML = `<h3>Hai inserito tutti i numeri!</h3>`;
        message.innerHTML = `<h2>Hai indovinato ${correctCount} numeri su ${originalSequence.length}.</h2>`;

        // Disabilitare l'input e il pulsante
        inputNum.disabled = true;
        addButton.disabled = true;
    }

    // Pulisci l'input
    inputNum.value = '';
});


//FUNZIONI//
// Funzione per generare un numero random entro un range definito
function randomNum(numMin, numMax) {
    return Math.floor(Math.random() * (numMax - numMin + 1) + numMin);
}

// Funzione che genera un array con numeri randomici
function randomRange(min, max, length) {

    const newArr = [];

    while (newArr.length < length) {

        let newRange = randomNum(min, max);

        if (!newArr.includes(newRange)) {

            newArr.push(newRange);
        }
    }

    return newArr;
}