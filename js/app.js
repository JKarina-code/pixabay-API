const result = document.querySelector("#result");
const formPixa = document.querySelector("#formPixa");
const paginationDiv = document.querySelector("#pagination");

let registrePage = 40;
let actualPage = 1;
let totalPages;
let iterator;
window.onload = () => {
  formPixa.addEventListener("submit", validateForm);
};

function validateForm(e) {
  e.preventDefault();

  const termSearch = document.querySelector("#term").value;

  if (termSearch === "") {
    showAlert("Please add a search term");
    return;
  }
  searchImages();
}

function showAlert(message) {
  const existAlert = document.querySelector(".alert");
  if (!existAlert) {
    const alert = document.createElement("P");
    alert.classList.add(
      "bg-red-100",
      "border-red-400",
      "text-red-700",
      "px-4",
      "py-3",
      "rounded",
      "max-w-md",
      "m-auto",
      "mt-6",
      "alert"
    );

    alert.innerHTML = `
    <strong class="font-bold">Error!</strong>
    <span class="block sm:inline">${message}</span>
`;

    formPixa.appendChild(alert);

    setTimeout(() => {
      alert.remove();
    }, 3000);
  }
}

async function searchImages() {
  const termSearch = document.querySelector("#term").value;
  const key = "36301233-bbb99c791a41aa0581d1dbb44";
  const url = `https://pixabay.com/api/?key=${key}&q=${termSearch}&per_page=${registrePage}&page=${actualPage}`;

  try {
    const response = await fetch(url);
    const result = await response.json();
    totalPages = numberPages(result.totalHits);
    showImages(result.hits);
  } catch (error) {
    showAlert(error);
  }
}

function* createPaginator(total) {
  for (let i = 1; i <= total; i++) {
    yield i;
  }
}
function showImages(images) {
  while (result.firstChild) {
    result.removeChild(result.firstChild);
  }
  const heading = document.createElement("H2");
  heading.classList.add(
    "text-center",
    "text-white",
    "mx-auto",
    "mt-10",
    "font-bold",
    "justify-center",
    "text-3xl"
  );
  heading.textContent = images.length
    ? ""
    : "No Results, please adding a new term";
  result.appendChild(heading);

  images.forEach((image) => {
    const { likes, views, previewURL, largeImageURL } = image;

    result.innerHTML += `
    <div class="w-1/2 md:w-1/3 lg:w-1/4 mb-4 p-3">
        <div class="bg-white ">
                <img class="w-full" src=${previewURL} alt={tags} />
            <div class="p-4">
                <p class="card-text">${likes} ❤ </p>
                <p  class="card-text">${views} <img src="./images/view.png" alt="view" class="h-5 inline"></p> 
                <a href=${largeImageURL}  rel="noopener noreferrer" target="_blank" class="bg-blue-500 w-full p-1 block mt-5 rounded text-center font-bold  hover:bg-blue-500 text-white">View Image</a>
            </div>
        </div>
    </div>
`;
  });

  while (paginationDiv.firstChild) {
    paginationDiv.removeChild(paginationDiv.firstChild);
  }
  printPaginator();
}
function numberPages(total) {
  return parseInt(Math.ceil(total / 30));
}
function printPaginator() {
  iterator = createPaginator(totalPages);

  while (true) {
    const { value, done } = iterator.next();
    if (done) return;

    // Create button
    const buttonNext = document.createElement("a");
    buttonNext.href = "#";
    buttonNext.dataset.page = value;
    buttonNext.textContent = value;
    buttonNext.classList.add(
      "next",
      "bg-yellow-400",
      "px-4",
      "py-1",
      "mr-2",
      "mb-10",
      "font-bold",
      "rounded"
    );
    buttonNext.onclick = () => {
      actualPage = value;
      searchImages();
    };
    paginationDiv.appendChild(buttonNext);
  }
}
