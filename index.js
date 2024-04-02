const body = document.querySelector("body");
const form = document.querySelector("form");
const input = document.querySelector("#text");
const ul = document.querySelector("ul");

// modification : il faut ajouter une clé de type booléen
const series = [
  {
    name: "Breaking Bad",
    seen: false,
    edit: false,
  },
  {
    name: "The Wire",
    seen: true,
    edit: false,
  },
];

const image = [
  "the shield",
  "the walking dead",
  "better call saul",
  "black mirror",
  "breaking bad",
  "broadchurch",
  "bureau des legendes",
  "game of thrones",
  "homeland",
  "lost",
  "mad men",
  "narcos",
  "sex education",
  "peaky blinders",
  "rectify",
  "sherlock",
  "sons of anarchy",
  "soprano",
  "stranger things",
  "the wire",
  "vikings",
];

const divImg = document.createElement("div");
divImg.classList.add("div-img");

body.append(divImg);

// const displayImage = () => {
//   const imageNode = image.map((m, i) => {
//     return createMediaElement(m);
//   });
//   divImg.append(...imageNode);
// };

form.addEventListener("submit", (e) => {
  e.preventDefault();
  e.stopPropagation();

  const value = input.value;

  let formVerifDejaPresent = false;
  let formVerifVide = false;

  const seriesNode = series.map((serie, index) => {
    if (serie.name.toLowerCase() === input.value.toLowerCase()) {
      formVerifDejaPresent = true;
    } else if (input.value === "") {
      formVerifVide = true;
    }
  });

  if (formVerifDejaPresent === true) {
    document.querySelector(".erreur").innerHTML = "";

    const alert = document.createElement("p");
    alert.classList.add("red");
    alert.innerText = "Cette série existe déjà";

    document.querySelector(".erreur").append(alert);
    input.value = "";
  } else if (formVerifVide === true) {
    document.querySelector(".erreur").innerHTML = "";

    const alert = document.createElement("p");
    alert.classList.add("red");
    alert.innerText = "Aucune saisie";

    document.querySelector(".erreur").append(alert);
    input.value = "";
  } else {
    input.value = "";
    addSerie(value);

    document.querySelector(".erreur").innerHTML = "";
  }
  const myInterval = setInterval(() => {
    document.querySelector(".erreur").innerHTML = "";
    clearInterval(myInterval);
  }, 3000);
});

const displaySerie = () => {
  const seriesNode = series.map((serie, index) => {
    // placer une condition selon l'état de la nouvelle clé
    if (serie.edit === true) {
      return modifSerie(serie, index);
    }

    return createSerie(serie, index);
  });
  ul.innerHTML = "";
  ul.append(...seriesNode);
};
// créer une méthode qui affiche un input avec le nom de la série et 2 boutons cancel et save

const modifSerie = (serie, index) => {
  const li = document.querySelector("li");
  li.classList.add("none");

  const liEditeur = document.createElement("li");

  const inputEdit = document.createElement("input");
  inputEdit.getAttribute("barre_edit");
  inputEdit.value = `${serie.name}`;

  const btnCancel = document.createElement("button");
  btnCancel.innerText = "Cancel";

  btnCancel.addEventListener("click", () => {
    EditSerie(index);
  });

  const btnSave = document.createElement("button");
  btnSave.innerText = "Save";

  const divEdit = document.createElement("div");
  divEdit.classList.add("erreurEdit");
  divEdit.innerHTML = "";

  const alertEdit = document.createElement("p");
  alertEdit.classList.add("red");

  divEdit.append(alertEdit);

  btnSave.addEventListener("click", () => {
    let editVerifDejaPresent = false;

    let editVerifVide = false;

    const seriesNode = series.map((serie, index) => {
      if (serie.name.toLowerCase() === inputEdit.value.toLowerCase()) {
        editVerifDejaPresent = true;
      } else if (inputEdit.value === "") {
        editVerifVide = true;
      }
    });

    if (editVerifDejaPresent === true) {
      alertEdit.innerText = "Cette série existe déjà";
    } else if (editVerifVide === true) {
      alertEdit.innerText = "Aucune saisie";
    } else {
      NewName(index, inputEdit.value);
      EditSerie(index);
    }
  });

  liEditeur.append(inputEdit, btnCancel, btnSave, divEdit);

  return liEditeur;
};

const createSerie = (serie, index) => {
  const li = document.createElement("li");

  li.addEventListener("mouseout", () => {
    divImg.style.backgroundImage = `url("img/streaming.jpg")`;
  });

  const span = document.createElement("span");
  span.classList.add("todo");
  span.classList.add("done");

  if (serie.seen === false) {
    span.classList.remove("done");
  } else {
    span.classList.add("done");
  }

  span.addEventListener("click", () => {
    toggleSpan(index);
  });

  const parag = document.createElement("p");
  parag.innerText = serie.name;

  li.addEventListener("mouseover", () => {
    divImg.style.backgroundImage = `url("img/${parag.innerText
      .toLowerCase()
      .trim()}.jpg")`;
  });

  const btn = document.createElement("button");
  btn.innerText = "Editer";

  btn.addEventListener("click", () => {
    EditSerie(index);
  });

  const btn2 = document.createElement("button");
  btn2.classList.add("delete");
  btn2.innerText = "Supprimer";

  btn2.addEventListener("click", () => {
    suppSerie(index);
  });

  const vu = document.querySelector(".vu");
  vu.addEventListener("click", () => {
    if (series[index].seen === false) {
      li.classList.add("none");
    } else if (series[index].seen === true) {
      li.classList.remove("none");
    }
  });

  const notSeen = document.querySelector(".notSeen");
  notSeen.addEventListener("click", () => {
    if (series[index].seen === true) {
      li.classList.add("none");
    } else if (series[index].seen === false) {
      li.classList.remove("none");
    }
  });

  const all = document.querySelector(".all");
  all.addEventListener("click", () => {
    li.classList.remove("none");
  });

  li.append(span, parag, btn, btn2);

  return li;
};

// création de la méthode pour ajouter
const addSerie = (value) => {
  series.push({ name: value, seen: false });
  // on relance l'affichage avec invocation de la méthode principale
  displaySerie();
};

const suppSerie = (index) => {
  series.splice(index, 1);
  displaySerie();
};

const toggleSpan = (index) => {
  series[index].seen = !series[index].seen;
  displaySerie();
};

// modification
// Créer une méthode qui switch la nouvelle clé du tableau : voir juste ci-dessus

const EditSerie = (index) => {
  series[index].edit = !series[index].edit;
  displaySerie();
  console.log(series);
};

// Créer une méthode qui va prendre en charge la modification
// modifier le nom

const NewName = (index, value) => {
  series[index].name = value;
  displaySerie();
};

displaySerie();
