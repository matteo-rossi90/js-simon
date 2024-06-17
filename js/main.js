/*Visualizzare in pagina 5 numeri casuali.
Da lì parte un timer di 30 secondi.
Dopo 30 secondi i numeri scompaiono e l’utente deve inserire, uno alla volta, 
i numeri che ha visto precedentemente, tramite il prompt().
Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali 
dei numeri da indovinare sono stati individuati.*/

////////////////////////////////////////////////////////////////////////////////////////////////

//selezionare il contenitore dei numeri da visualizzare
const guessNumber = document.getElementById("number-line");

//selezionare il contenitore del conteggio
const count = document.getElementById("count");

//creare un array con 5 numeri casuali
const numberArr = randomRange(1, 100, 5);

console.log(numberArr);

//estrarre i 5 numeri
for(let i = 0; i < numberArr.length; i++){

    let number = numberArr[i];

    //visualizzare 5 numeri casuali in DOM
    guessNumber.innerHTML += `<h2>${number}</h2>`;

    
}

// Impostare il countdown a 30 secondi
let seconds = 0;
count.innerHTML = `Tempo rimanente: ${seconds} secondi`;

// Aggiornare il timing ogni secondo
const countInterval = setInterval(

    function () {
        
        //incrementare i secondi del timing
        seconds++;
        console.log(seconds);
        count.innerHTML = `Tempo rimanente: ${seconds} secondi`;

        // Quando il countdown arriva a 30 secondi
        if (seconds === 30) {
        clearInterval(countInterval); // Fermare il countdown

        // Far scomparire i numeri
        guessNumber.style.display = "none";
        count.innerHTML = "";

        // Chiedere all'utente quanti numeri ricorda della sequenza visualizzata, uno alla volta
        let userNumbers = [];
        for (let i = 0; i < 5; i++) {
            let userNumber = parseInt(prompt(`Inserisci il numero ${i + 1}:`));
            userNumbers.push(userNumber);
        };

        // Confrontare i numeri immessi dall'utente con la sequenza originale
        let correctNumbers = [];
        for (let i = 0; i < userNumbers.length; i++) {
            if (numberArr.includes(userNumbers[i])) {
                correctNumbers.push(userNumbers[i]);
            }
        }

        // Comunicare quanti e quali numeri della sequenza sono stati individuati
        let correctCount = correctNumbers.length;
        alert(
            `Numeri ricordati correttamente: ${correctCount}\n` +
            `Numeri della stringa riconosciuti: ${correctNumbers.join(', ')}`
        );

    }
    
}, 1000);




//FUNZIONI//

//funzione per generare un numero random entro un range definito
    function randomNum(numMin, numMax) {

        return Math.floor(Math.random() * (numMax - numMin + 1) + numMin)

};

//funzione che genera un array con numeri randomici
function randomRange(min, max, length) {

    //creare un array vuoto per accogliere la sequenza di numeri
    const newArr = [];

    // generare una sequenza di numeri fino a un massimo
    while (newArr.length < length) {

        //generare un range di numeri
        let newRange = randomNum(min, max);

        //creare condizioni per evitare che il numero si raddoppi
        if ((newArr.includes(newRange) === false)) {

            //aggiungere il numero all'array
            newArr.push(newRange);
        }
    }

    return newArr

}
