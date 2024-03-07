document.getElementById("searchButton").addEventListener("click", searchMovies);
let api_key = "cc569c048221c110579b2ceb941d8196";
let urlBase = "https://api.themoviedb.org/3/search/movie";
let urlImg = "https://image.tmdb.org/t/p/w500";
let resultContainer = document.getElementById("results");

function searchMovies() {
  let loading = document.createElement("img");
  loading.src =
    "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2w1eGxnemhqdHE4Z3JsamZpaG1qazNvcHY1OGVhbGtyM3Jjam85bSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/52qtwCtj9OLTi/giphy.gif";
  resultContainer.appendChild(loading);

  let searchInput = document.getElementById("searchInput").value;
  fetch(`${urlBase}?query=${searchInput}&api_key=${api_key}`)
    .then((res) => res.json())
    .then((json) => displayMovies(json.results));
}

function displayMovies(movies) {
  resultContainer.innerHTML = "";
  if (movies.lenght === 0) {
    resultContainer.innerHTML =
      "<p>No se encontraron resultados en la búsqueda</p>";
    return;
  }

  movies.forEach((movie) => {
    let movieDiv = document.createElement("div");
    movieDiv.classList.add("movie");

    let title = document.createElement("h2");
    title.textContent = movie.title;

    let releaseDate = document.createElement("p");
    releaseDate.textContent = "Fecha de lanzamiento: " + movie.release_date;

    let overview = document.createElement("p");
    overview.textContent = movie.overview;

    let posterPath = urlImg + movie.poster_path;
    let poster = document.createElement("img");
    poster.src = posterPath;

    movieDiv.appendChild(poster);
    movieDiv.appendChild(title);
    movieDiv.appendChild(releaseDate);
    movieDiv.appendChild(overview);

    resultContainer.appendChild(movieDiv);
  });
}
