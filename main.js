$('document').ready( () => {
    $('.form-group').on('input', () => {
        let searchQuery = $('.form-control').val()
        if(searchQuery.length == 0){
            // alert('ha')
            // $('#title-container h1').hide()
        }
        getMovie(searchQuery)
    })
})


function getMovie(movie){
    axios.get(`https://www.omdbapi.com/?s=${movie}&apikey=cbfd8621`).then( res => {
    let movies = res.data.Search;
    let moviesContainer = $('#movies-container .row');
    moviesContainer.empty();
    if(movies){
        $('#title-container h1').hide()
    }
    else{
        $('#title-container h1').show()
    }
    let output = ''
    $.each(movies, (i,movie) => {
        output += `
        <div class="col-lg-3 col-md-4">
        <div class="well text-center text-white">
            <img src="${movie.Poster}" class="img-fluid" onclick="getSingleMovie('${movie.imdbID}')" alt="" width="100%" height="100%">
            <h3 class="text-truncate" id="movie-title">${movie.Title}</h3>
            <a class="btn btn-primary btn-lg details mx-auto" style="min-width:200px" onclick="getSingleMovie('${movie.imdbID}')">details</a>
        </div>
        </div>
        `
    })
    moviesContainer.append(output)

    
    })
}

function getSingleMovie(movieId){
    sessionStorage.setItem('movie-id',movieId)
    window.location = 'movie.html'
}

function showSingleMovie(){
    let movieId = sessionStorage.getItem('movie-id');
    axios.get(`https://www.omdbapi.com/?i=${movieId}&apikey=cbfd8621`).then( res => {
        let movie = res.data;
        console.log(movie);
        let output = `
        <div class="jumbtron">
        <div class="row text-white">
            <div class="col-lg-4 col-sm-6 col-md-6">
                <img id="single-movie-img" src='${movie.Poster}' width='100%' height='100%' alt="${movie.Title}">
            </div>
            <div class="col-lg-8 col-sm-6 col-md-6 text-center" style='margin-top:40px'>
                <div><span>Genre : </span>${movie.Genre}</div>
                <div><span>Director : </span>${movie.Director}</div>
                <div><span>Rated : </span>${movie.Rated}</div>
                <div><span>Imdb-Rating : </span>${movie.imdbRating}</div>
                <div><span>Actors : </span>${movie.Actors}</div>
                <div><span>Awards : </span>${movie.Awards}</div>
                <div><span>Year : </span>${movie.Year}</div>
                `
        if(movie.Type == 'series'){
            output += `<div><span>Seasons : </span>${movie.totalSeasons}</div>`
            output += `<div><span>Episode-time : </span>${movie.Runtime}</div>`
        }
        output += `
        <div style="margin-top:50px"><span>Plot : </span>${movie.Plot}</div>
        <div style="margin-bottom:50px; margin-top:20px">               
            <a class="btn btn-primary btn-lg" href="https://www.imdb.com/title/${movieId}/?ref_=nv_sr_srsg_3">imdb</a>
            <a class="btn btn-danger btn-lg" href="index.html">Back to search</a>      
        </div>
        
        </div>

        </div>
        </div>
        `
        $('.container-fluid').append(output)
    })
}

