document.addEventListener('DOMContentLoaded', function(){
    const watchlist = localStorage.getItem('watchlist');
    const watchlistJSON = JSON.parse(watchlist);
    document.getElementById('movie-container').innerHTML = renderMovies(watchlistJSON);  
    
    document.addEventListener('click', function(event){
        const imdbID = event.target.dataset.imdbid;
        if (imdbID != null){
            clearButton(imdbID);
        }
    })
})

function renderMovies(movieArray){
    let thisMovie = movieArray.map(function(currentMovie){
     return `<div class="card mx-5 mb-3 bg-dark text-light">
                 <img class="card-img-top" src="${currentMovie.Poster}" alt="Card image cap">
                 <div class="card-body">
                     <h5 class="card-title">${currentMovie.Title}</h5>
                     <p class="card-text"><small class="text-muted">${currentMovie.Year}</small></p>
                     <button class="btn-sm btn-outline-danger btn-dark remove-button" data-imdbid="${currentMovie.imdbID}">Remove</button>
                 </div>
             </div>`
         
    });
    return thisMovie.join('');
 }

function clearButton(movieID){
    let watchlistJSON = localStorage.getItem('watchlist');
    let watchlist = JSON.parse(watchlistJSON);
    let movie = watchlist.find(function(currentMovie){
        return currentMovie.imdbID == movieID;
    })
    let indexMovie = watchlist.indexOf(movie);

    watchlist.splice(indexMovie, 1);
    watchlistJSON = JSON.stringify(watchlist);
    localStorage.setItem('watchlist', watchlistJSON);
    
    let div = document.getElementById('movie-container'); 
    div.removeChild(div.children[indexMovie]);
}
