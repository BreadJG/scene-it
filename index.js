document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('click', function(event){
        const imdbID = event.target.dataset.imdbid;
        if (imdbID != null){
         saveToWatchlist(imdbID);
        }
    })
    });

    
function renderMovies(movieArray){
   let thisMovie = movieArray.map(function(currentMovie){
    return `<div class="card mx-5 mb-3 bg-dark text-light">
                <img class="card-img-top" src="${currentMovie.Poster}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${currentMovie.Title}</h5>
                    <p class="card-text"><small class="text-muted">${currentMovie.Year}</small></p>
                    <button class="btn-sm btn-outline-danger btn-dark add-button" data-imdbid="${currentMovie.imdbID}">Add</button>
                </div>
            </div>`
        
   });
   return thisMovie.join('');
}

const myForm = document.getElementById('search-form');
myForm.addEventListener('submit', async function(e){
    e.preventDefault();
    const searchString = document.getElementById('searchBar').value;
    const urlString = encodeURIComponent(searchString);
    fetch("http://www.omdbapi.com/?apikey=59354c85&s=" + urlString)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            document.getElementById('movieContainer').innerHTML = renderMovies(data.Search);
            movieData = data.Search;
        })
})

function saveToWatchlist(movieID){
    const movie = movieData.find(function(currentMovie){
        return currentMovie.imdbID == movieID;
    });
    let watchlistJSON = localStorage.getItem('watchlist');
    let watchlist = JSON.parse(watchlistJSON);
    let output = [];

    for (let i = 0; i < watchlist.length; i++) {
        output.push(watchlist[i].Title)
    }
    console.log(output);
    
    if (!output.includes(movie.Title)) {
        if (watchlist === null) {
            watchlist = [];
        
        }
        watchlist.push(movie);
        watchlistJSON = JSON.stringify(watchlist);
        localStorage.setItem('watchlist', watchlistJSON);
    } else {
        alert('Already Added');
    }
}

