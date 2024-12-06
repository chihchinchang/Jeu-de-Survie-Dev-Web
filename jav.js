let niveauOx = 100;
let niveauEau = 100;
let niveauSante = 100;
const tauxOx = 1 / 100;
const tauxEau = 1 / 500; 
const tauxSante = 1 / 1000; 

let timer = 0;
let gameTimer = setInterval(function () {
  timer++;
  document.getElementById("timer").textContent = `Temps de jeu : ${timer} secondes`;
}, 1000);

function jaugeajour() {
  niveauOx -= 100 * tauxOx;
  niveauEau -= 100 * tauxEau;
  niveauSante -= 100 * tauxSante;

  document.getElementById("oxygen").textContent = `OXYGENE : ${niveauOx.toFixed(1)}%`;
  document.getElementById("hydration").textContent = `HYDRATATION : ${niveauEau.toFixed(1)}%`;
  document.getElementById("health").textContent = `SANTE : ${niveauSante.toFixed(1)}%`;

  document.getElementById("oxygen").style.color = "white";
  document.getElementById("hydration").style.color = "white";
  document.getElementById("health").style.color = "white";

  document.getElementById("oxygen-jauge").style.width = `${niveauOx}%`;
  document.getElementById("hydration-jauge").style.width = `${niveauEau}%`;
  document.getElementById("health-jauge").style.width = `${niveauSante}%`;

  var oxyjauge = document.getElementById("oxygen-jauge");
  var hydjauge = document.getElementById("hydration-jauge");
  var healthjauge = document.getElementById("health-jauge");

  if (niveauOx <= 40) {
    oxyjauge.style.backgroundColor = "red";
  } else if (niveauOx <= 70) {
    oxyjauge.style.backgroundColor = "orange";
  } else {
    oxyjauge.style.backgroundColor = "seagreen";
  }

  if (niveauEau <= 40) {
    hydjauge.style.backgroundColor = "red";
  } else if (niveauEau <= 70) {
    hydjauge.style.backgroundColor = "orange";
  } else {
    hydjauge.style.backgroundColor = "seagreen";
  }

  if (niveauSante <= 40) {
    healthjauge.style.backgroundColor = "red";
  } else if (niveauSante <= 70) {
    healthjauge.style.backgroundColor = "orange";
  } else {
    healthjauge.style.backgroundColor = "seagreen";
  }

  if (niveauOx <= 0 || niveauEau <= 0 || niveauSante <= 0) {
    clearInterval(gameTimer);
    alert("Game Over!");
  }
}




if (niveauOx <= 0 || niveauEau <= 0 || niveauSante <= 0) {
  clearInterval(interval);
  alert("Game Over!");
}


const interval = setInterval(jaugeajour, 1000);

const stock = {
  glace: 0,
  fer: 0,
  magnesium: 0,
  silicium: 0,
  titane: 0,
  cobalt: 0,
  eau: 0,
  bombonne: 0,
  habitacle: 0,
  lampe: 0,
  foreuse: 0,
  radiateur: 0,
  plantation: 0,
  graine: 0,

};

let resourcesCollect = {
  glace: false,
  fer: false,
  magnesium: false,
  silicium: false,
  titane: false,
  cobalt: false,
  graine: false
};

let sedeplacer = false;


function collectResource(resource) {

  if (!resourcesCollect[resource]) {
    stock[resource]++;


    const stockTable = document.getElementById("stock");
    let resourceRow = stockTable.querySelector(`tr[data-resource="${resource}"]`);
    if (!resourceRow) {
      resourceRow = document.createElement("tr");
      resourceRow.setAttribute("data-resource", resource);
      stockTable.appendChild(resourceRow);
    }
    updateStockTable();

    resourcesCollect[resource] = true;
  
    peutCollect = false;

  }
}


function collectGrass(resource) {
  if (stock.lampe >= 1) {
    if (!resourcesCollect[resource]) {
      stock[resource]++;


      const stockTable = document.getElementById("stock");
      let resourceRow = stockTable.querySelector(`tr[data-resource="${resource}"]`);
      if (!resourceRow) {
        resourceRow = document.createElement("tr");
        resourceRow.setAttribute("data-resource", resource);
        stockTable.appendChild(resourceRow);
      }
    updateStockTable();


      resourcesCollect[resource] = true;
    }
  } else {
    alert("Vous avez besoin d'une lampe pour récolter des graines.");
  }
}


function regenerateResources() {

  setTimeout(function () {
    resourcesCollect = {
      glace: false,
      fer: false,
      magnesium: false,
      silicium: false,
      titane: false,
      cobalt: false,
      graine: false
    };
  }, 10000); 

  const resourceImages = document.getElementsByClassName("resource-image");
  const container = document.getElementById("caracteristiques");
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;

  const usedPositions = new Set();

  for (let i = 0; i < resourceImages.length; i++) {
    const img = resourceImages[i];
    let randomTop, randomLeft;
    let positionKey;

    do {
      randomTop = Math.floor(Math.random() * (containerHeight - img.height));
      randomLeft = Math.floor(Math.random() * (containerWidth - img.width));
      positionKey = `${randomTop}-${randomLeft}`;
    } while (usedPositions.has(positionKey));

    usedPositions.add(positionKey);

    img.parentNode.style.position = "relative";
    img.parentNode.style.top = randomTop + "px";
    img.parentNode.style.left = randomLeft + "px";
    img.parentNode.style.opacity = "0.3";
    img.parentNode.style.display = "block";
    img.parentNode.margin = "10px";
    img.parentNode.border = "10px";
  }

  setTimeout(function () {
    // Remettre opacité normale des images
    for (let i = 0; i < resourceImages.length; i++) {
      const img = resourceImages[i];
      img.parentNode.style.opacity = "1";
    }

    console.log("Les ressources se régénèrent.");
  }, 10000);

  sedeplacer = false;
}



let remainingTime = 0;

document.getElementById("deplacer").addEventListener("click", function () {
  if (!sedeplacer) {
    sedeplacer = true;
    regenerateResources();

    var button = document.getElementById("deplacer");
    button.disabled = true;
    button.classList.add("button-fill");

    remainingTime = 10;
    updateRemainingTime();

    var countdownTimer = setInterval(function () {
      remainingTime--;
      updateRemainingTime();

      if (remainingTime <= 0) {
        clearInterval(countdownTimer);
        button.disabled = false;
        sedeplacer = false;
        button.classList.remove("button-fill");
      }
    }, 1000);
  }
});

function updateRemainingTime() {
  var countdown = document.getElementById("countdown");
  countdown.textContent = ` ${remainingTime}`;
}




function craftWater() {
  if (stock.glace >= 1) {
    stock.glace--;
    stock.eau++;
    updateStockTable();
  } else {
    alert("Récolter 1 glace pour fabriquer l'eau.");
  }
}

function craftOxygenTank() {
  if (stock.cobalt >= 2) {
    stock.cobalt -= 2;
    stock.bombonne++;
    updateStockTable();
  } else {
    alert("Récolter 2 cobalts pour fabriquer une bonbonne");
  }
}

function craftSurvivalHabitat() {
  if (stock.fer >= 2 && stock.titane >= 1) {
    stock.fer -= 2;
    stock.titane--;
    stock.habitacle++;
    updateStockTable();
  } else {
    alert("Récolter 2 fer et 1 titane pour fabriquer votre habitacle.");
  }
}

function craftForeuse() {
  if (stock.fer >= 1 && stock.titane >= 1) {
    stock.fer--;
    stock.titane--;
    stock.foreuse++;
    updateStockTable();
  } else {
    alert("Récolter 1 fer et 1 titane pour fabriquer votre foreuse.");
  }
}

function craftRadiateur() {
  if (stock.fer >= 1 && stock.silicium >= 1) {
    stock.fer--;
    stock.silicium--;
    stock.radiateur++;
    updateStockTable();
  } else {
    alert("Récolter 1 fer et 1 silicium pour fabriquer un radiateur.");
  }
}

function craftLampe() {
  if (stock.magnesium >= 2 && stock.silicium >= 1) {
    stock.magnesium -= 2;
    stock.silicium--;
    stock.lampe++;
    updateStockTable();
  } else {
    alert("Récolter 2 magnésium et 1 silicium pour fabriquer une lampe.");
  }
}

function craftPlantation() {
  if (stock.fer >= 1 && stock.glace >= 1 && stock.graine >= 1) {
    stock.fer--;
    stock.glace--;
    stock.graine--;
    stock.plantation++;
    updateStockTable();
  } else {
    alert("Récolter 1 fer, 1 graine et 1 glace  pour fabriquer une plantation.");
  }
}



function updateStockTable() {
  const stockTable = document.getElementById("stock");
  stockTable.innerHTML = "";

  for (const resource in stock) {
    const quantity = stock[resource];
    const resourceRow = document.createElement("tr");
    resourceRow.innerHTML = `
    <td>${resource}</td>
    <td>${quantity}</td>
    `;
    stockTable.appendChild(resourceRow);
  }
}


document.getElementById("craft-water").addEventListener("click", craftWater);
document.getElementById("craft-oxygen").addEventListener("click", craftOxygenTank);
document.getElementById("fab-habitacle").addEventListener("click", craftSurvivalHabitat);
document.getElementById("fab-torche").addEventListener("click", craftLampe);
document.getElementById("fab-foreuse").addEventListener("click", craftForeuse);
document.getElementById("fab-radiateur").addEventListener("click", craftRadiateur);
document.getElementById("fab-plantation").addEventListener("click", craftPlantation);



function consomEau() {
  if (stock.eau >= 1) {
    stock.eau--;
    niveauEau = 100;
    document.getElementById("hydration").textContent = `HYDRATATION : ${niveauEau.toFixed(1)}%`;
    document.getElementById("hydration-jauge").style.width = `${niveauEau}%`;
    updateStockTable(); 

  } else { alert("Fabriquer d'abord une bonbonne d'eau")
    }
}

function consomOx() {

  if (stock.bombonne >= 1) {
    stock.bombonne--; 
    niveauOx = 100;
    document.getElementById("oxygen").textContent = `OXYGENE: ${niveauOx.toFixed(1)}%`;
    document.getElementById("oxygen-jauge").style.width = `${niveauOx}%`;
    updateStockTable(); 
  } else{alert("Fabriquer d'abord une bonbonne d'oxygène")
        }
}


const stockTable = document.getElementById("stock");


for (const resource in stock) {
  const quantity = stock[resource];
  const resourceRow = document.createElement("tr");
  resourceRow.innerHTML = `
    <td>${resource}</td>
    <td>${quantity}</td>`;
  stockTable.appendChild(resourceRow);
}

document.getElementById("consume-water").addEventListener("click", consomEau);

document.getElementById("consume-oxygen").addEventListener("click", consomOx);

document.getElementById("retour").addEventListener("click", function () {
  if (stock.habitacle >= 1) {
    const indiceTerraformation = timer * (stock.foreuse + stock.radiateur + stock.plantation);
    alert(" Indice de terraformation : " + indiceTerraformation);


    niveauOx = 100;
    niveauEau = 100;
    niveauSante = 100;
    timer = 0;


    resourcesCollect = {
      glace: false,
      fer: false,
      magnesium: false,
      silicium: false,
      titane: false,
      cobalt: false,
      graine: false
    };

   
    for (const resource in stock) {
      stock[resource] = 0;
    }

    updateStockTable(); 

   
    document.getElementById("oxygen").textContent = "OXYGENE : 100%";
    document.getElementById("hydration").textContent = "HYDRATATION : 100%";
    document.getElementById("health").textContent = "SANTE : 100%";
    document.getElementById("oxygen-jauge").style.width = "100%";
    document.getElementById("hydration-jauge").style.width = "100%";
    document.getElementById("health-jauge").style.width = "100%";
    document.getElementById("oxygen-jauge").style.backgroundColor = "seagreen";
    document.getElementById("hydration-jauge").style.backgroundColor = "seagreen";
    document.getElementById("health-jauge").style.backgroundColor = "seagreen";

    regenerateResources(); 
  }
});