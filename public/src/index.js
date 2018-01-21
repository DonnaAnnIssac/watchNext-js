let searchMovie = document.getElementById('getInfo')
let input = document.getElementById('mTitle')
let resultDiv = document.getElementById('results')
let searchBtn = document.getElementById('searchBy')
let genreBtn = document.getElementById('genres')
let releaseBtn = document.getElementById('releaseYear')
let ratingBtn = document.getElementById('topRated')
let popularityBtn = document.getElementById('popular')
let optSearch = document.getElementById('searchByOpt')

const displayMovieResults = arr => {
  arr.map(result => {
    let obj = document.createElement('div')
    obj.setAttribute('id', result['tconst'])
    let title = document.createElement('div')
    title.innerText = result['primary_title']
    obj.appendChild(title)
    let release = document.createElement('div')
    release.innerText = '(' + result['start_year'] + ')'
    obj.appendChild(release)
    let duration = document.createElement('div')
    duration.innerText = result['runtime_mins'] + ' mins'
    obj.appendChild(duration)
    let rating = document.createElement('div')
    rating.innerText = result['average_rating']
    obj.appendChild(rating)
    resultDiv.appendChild(obj)
  })
}

const searchByGenre = (genre) => {
  let xhr = new XMLHttpRequest()
  xhr.open('GET', 'http://localhost:9191/movie/genre?genre=' + genre.toLowerCase())
  xhr.send()
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      displayMovieResults(JSON.parse(xhr.responseText))
    }
  }
}

const createGenreTypes = genreList => {
  let genres = ['drama', 'action', 'romance', 'crime', 'adventure', 'sciFi', 'thriller']
  genres.map((genre) => {
    let opt = document.createElement('div')
    opt.setAttribute('id', genre)
    opt.innerText = genre.toUpperCase()
    opt.addEventListener('click', event => {
      event.stopPropagation()
      optSearch.style.display = 'none'
      document.getElementById('dropdownList').classList.toggle('show')
      searchByGenre(opt.innerText)
    })
    genreList.appendChild(opt)
  })
  return genreList
}

genreBtn.addEventListener('click', () => {
  optSearch.style.display = 'block'
  let genreList = document.createElement('div')
  genreList.setAttribute('id', 'genreList')
  genreList.setAttribute('class', 'genre-types')
  optSearch.appendChild(createGenreTypes(genreList))
})

releaseBtn.addEventListener('click', () => {
  document.getElementById('dropdownList').classList.toggle('show')
  let xhr = new XMLHttpRequest()
  xhr.open('GET', 'http://localhost:9191/movie/release')
  xhr.send()
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) displayMovieResults(JSON.parse(xhr.responseText))    }
})

ratingBtn.addEventListener('click', () => {
  document.getElementById('dropdownList').classList.toggle('show')
  let xhr = new XMLHttpRequest()
  xhr.open('GET', 'http://localhost:9191/movie/rating')
  xhr.send()
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) displayMovieResults(JSON.parse(xhr.responseText))
  }
})

popularityBtn.addEventListener('click', () => {
  document.getElementById('dropdownList').classList.toggle('show')
  let xhr = new XMLHttpRequest()
  xhr.open('GET', 'http://localhost:9191/movie/popular')
  xhr.send()
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) displayMovieResults(JSON.parse(xhr.responseText))
  }
})

searchMovie.addEventListener('click', () => {
  let value = (/(\s)+/g).test(input.value) ? input.value.replace(/(\s)+/g, '+') : input.value
  let xhr = new XMLHttpRequest()
  xhr.open('GET', 'http://localhost:9191/movie?title=' + value)
  xhr.send()
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) displayMovieResults(JSON.parse(xhr.responseText))
  }
})

searchBtn.addEventListener('click', () => {
  optSearch.style.display = 'none'
  document.getElementById('dropdownList').classList.toggle('show')
})

window.addEventListener = ('click', (event) => {
  if (!event.target.matches('.dropbtn')) {
    let dropdowns = document.getElementsByClassName('dropdown-content')
    for (let i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i]
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show')
      }
    }
  }
})
