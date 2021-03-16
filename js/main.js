const tarjetas = [
  [1, 2, 3, 4, 10, 11, 12, 13, 19, 20, 21, 22, 28, 29, 30, 31],
  [6, 7, 8, 9, 15, 16, 17, 18, 24, 25, 26, 27, 33, 34, 35, 36],
  [2, 3, 4, 5, 7, 8, 9, 10, 12, 13, 14, 15, 17, 18, 19, 20]
];
const nombres = [ "foo",
  "El gallo", "El diablito", "La dama", "El catrín", "El paraguas", "La sirena", "La escalera",
  "La botella", "El barril", "El árbol", "El Melon", "El valiente", "El gorrito", "La muerte",
  "La pera", "La bandera", "El bandolón", "El violoncello", "La garza", "El pajaro", "La mano",
  "La bota", "La luna", "El cotorro", "El borracho", "El negrito", "El corazón", "La sandía",
  "El tambor", "El camarón", "Las jaras", "El músico", "La araña", "El soldado", "La estrella",
  "El cazo", "El mundo", "El apache", "El nopal", "El alacrán", "La rosa", "La calavera",
  "La campana", "El cantarito", "El venado", "El sol", "La corona", "La chalupa", "El pino",
  "El pescado", "La palma", "La maceta", "El arpa", "La rana"
];
let nums = []
let randomNums = [];
let stopBool = false;
var repate = "";
var p = 0;
for(var i = 1; i < 55; i++)
  nums.push(i);

for (var i = nums.length; i > 0; i--) {
  var random = Math.floor(Math.random() * i);
  randomNums.push(nums[random]);
  nums.splice(random, 1);
}

function lockTarjeta() {
  document.getElementById("tabla").style.display = "block";
  document.getElementById("Seleccion").style.display = "none";
  document.getElementById("advertencia").style.display = "none";
}
function getTarjeta() {
  const subfix = "card";
  let select = document.getElementById("seleccionarTarjeta");
  for (let i = 0; i < select.options.length; i++) {
    if(select.options[i].selected)
      var number = select.options[i].value;
  }
  if(number != "") {
    for (var i = 0; i < 16; i++) {
      document.getElementById(subfix + i).src = "img/cards/" + tarjetas[number-1][i] + ".jpg";
      document.getElementById(subfix + i).alt = nombres[tarjetas[number-1][i]];
      document.getElementById(subfix + i).setAttribute("cardId", tarjetas[number-1][i]);
    }
    document.getElementById("tabla").style.display = "block";
    document.getElementById("advertencia").style.display = "none";
  }

}

function check(obj) {
  if(obj.className != "check") {
    let check = obj.nextElementSibling;
    check.style.display = "block";
  }
  else {
    obj.style.display = "none";
  }
}

function updateResult(num) {
  document.getElementById("actualCard").src = "img/cards/"+ num + ".jpg";
}
function startInterval(obj) {
  console.log(randomNums.length);
  obj.previousElementSibling.style.display = "block";
  obj.style.display = "none";
  repate = setInterval(function () {
    updateResult(randomNums[p]);
    p++;
  }, 1500);
  setTimeout(function () {
    clearInterval(repate);
    if(!stopBool)
      alert("Perdiste, no diste basta y se acabo la baraja.")
  }, 1500*randomNums.length+1);
}
function stopInterval() {
  clearInterval(repate);
  stopBool = true;
  for (var i = p; i < randomNums.length; i++) {
    for (var j = 0; j < 16; j++) {
      var actual = document.getElementById("card"+j);
      if(actual.getAttribute("cardId") == randomNums[i]){
        alert("Perdiste, aun quedaba "+nombres[randomNums[i]]+" por salir");
        return;
      }
    }
  }
  alert("Ganastes!");
}
