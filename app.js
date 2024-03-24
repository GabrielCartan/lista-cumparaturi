let scrieDenumire = document.querySelector(".scrie-denumire");
let scrieCantitate = document.querySelector(".scrie-cantitate");
let scriePret = document.querySelector(".scrie-pret");
let btnAdaugaDate = document.querySelector(".btn-adauga-date");
let listaCumparaturi = document.querySelector(".lista-cumparaturi");
let linieListaCuparaturi = document.querySelector(".linie-lista-cumparaturi");
let totalLinie = document.querySelector(".total-linie");
let sumaTotala = document.querySelector(".suma-totala");
let btnStergeLista = document.querySelector(".btn-sterge-lista");







function salveazaListaCumparaturi() {
    localStorage.setItem("linieListaCumparaturi", listaCumparaturi.innerHTML);
};
function arataListaCumparaturi() {
    listaCumparaturi.innerHTML = localStorage.getItem("linieListaCumparaturi");
};
arataListaCumparaturi();


function salveazaSumaTotala() {
    localStorage.setItem("sumaTotala", sumaTotala.value);
};
function arataSumaTotala() {
   sumaTotala.value = localStorage.getItem("sumaTotala"); 
};
arataSumaTotala();




btnAdaugaDate.addEventListener("click", function() {
    let denumire = scrieDenumire.value;
    let cantitate = scrieCantitate.value;
        cantitate = Number(cantitate).toFixed(2);
    let pret = scriePret.value;
        pret = Number(pret).toFixed(2);

    // console.log(pret, typeof pret);
    // console.log(cantitate, typeof cantitate);

    let total = cantitate * pret;
        total = Number(total).toFixed(2);
    
    // console.log(total, typeof total);

    
    
    if (denumire && cantitate && pret) {
        linieLista = document.createElement("div");
        linieLista.innerHTML += `
                                        <p class="denumire">${denumire}</p>
                                        <p class="cantitate">${cantitate}</p>
                                        <p class="pret">${pret}</p>
                                        <p class="total-linie">${total}</p>
                                        <span class="sterge-linie">X</span>
                                      `;
        listaCumparaturi.appendChild(linieLista);
        linieLista.className = ("linie-lista-cumparaturi");
        scrieDenumire.value = "";
        scrieCantitate.value = "";
        scriePret.value = "";
        scrieDenumire.focus();  
        
        salveazaListaCumparaturi();
    }
    else {
        alert("Este necesara completarea campurilor !")
    }

    let totalPeLinie = total;
        totalPeLinie = Number(totalPeLinie);
        // console.log(totalPeLinie, typeof totalPeLinie);

    let totalDePlata = sumaTotala.value;
        totalDePlata = Number(totalDePlata);
        // console.log(totalDePlata, typeof totalDePlata);

    let rezultat = totalDePlata + totalPeLinie;
        rezultat = Number(rezultat).toFixed(2);
        // console.log(rezultat, typeof rezultat)
    
    sumaTotala.value = rezultat;

    salveazaSumaTotala();


});

if (listaCumparaturi) {
    listaCumparaturi.addEventListener("click", function(e) {
        if (e.target.tagName === "SPAN") {
            e.target.parentElement.remove();
            salveazaListaCumparaturi();

            let valoare = e.target.previousElementSibling.innerHTML;
                valoare = Number(valoare);
                // console.log(valoare, typeof valoare);

            let dePlata = localStorage.getItem("sumaTotala");
                dePlata = Number(dePlata);
                // console.log(dePlata, typeof dePlata);

            let rez = dePlata - valoare;
                rez = rez.toFixed(2)
                // console.log(rez);

            sumaTotala.value = rez;

            salveazaSumaTotala();
            
        }

    });
};

btnStergeLista.addEventListener("click", function() {
    listaCumparaturi.innerHTML = "";
    salveazaListaCumparaturi();

    sumaTotala.value = "0.00";
    salveazaSumaTotala();
});