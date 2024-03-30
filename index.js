// const url = "https://imdb-top-100-movies.p.rapidapi.com/";
// const options = {
//     method: "GET",
//     headers: {
//         "X-RapidAPI-Key": "359a5c330amsh939633a6222da26p1359b3jsn667516f6c4f6",
//         "X-RapidAPI-Host": "imdb-top-100-movies.p.rapidapi.com",
//     },
// };

// const url = 'https://imdb-top-100-movies.p.rapidapi.com/';
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': 'ac6af92933msh6026b4a74090875p138966jsn830f675447cc',
// 		'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
// 	}
// };

// const url = 'https://imdb-top-100-movies.p.rapidapi.com/';
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '1d61a541b0msh11b566c73a24610p1526b3jsn9f5deed52710',
// 		'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
// 	}
// };

const url = 'https://imdb-top-100-movies.p.rapidapi.com/';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '6c589db793msh563546083ef0f49p171f5djsn8ada960bfdc0',
		'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
	}
};


let imdb_watchlist=document.getElementsByClassName("imdb-watchlist")
imdb_watchlist[0].addEventListener("click",()=>{
  window.location.assign("./watchlist.html")
})


fetch(url, options)
    .then((res) => {
        return res.json();
    })
    .then((movieobj) => {
        console.log(movieobj);

let moviesperpage = 10;
let totalPages = 10;

function displayMovies(page) {
  let startindex = (page - 1) * moviesperpage;
  let endindex = startindex + moviesperpage;
  let data = movieobj.slice(startindex, endindex);

  let maindiv = document.getElementById("maindiv");

  let content = "";
  console.log(data);

  for (let i = 0; i < data.length; i++) {
    content += `<div class="main_pg">
                       <div class="container-img" id="${data[i]["id"]}">
                       <img src="${data[i]["image"]}" alt="img" />
                       </div>
                       <div class="title_details">
                           <div class="title"  id="${data[i]["id"]}">
                               <h1>${data[i]["rank"] + "."}<span>${data[i]["title"]}</span></h1>
                           </div>
                           <div class="release_year" >
                                <p>${data[i]["year"]}</p>
                                <p>${data[i]["genre"].join(" , ")}</p>
                            </div>
                            <div class="rating" >
                                <img src="./star.png" alt="" /><span>${data[i]["rating"]}</span>
                             </div>
                             <div class="watchlist" id="${data[i]["id"]}">
                                <button>Add To Watchlist</button>
                            </div>
                             
                      </div>
                      <div class="info" id="${data[i]["id"]}" data-toggle="modal" data-target="#movieModal" >
                      <img src="./info.png" alt="" />
                      </div>
                  </div>
               <div class="discrption">
                     <span>${data[i]["description"]}</span>
              </div>
              <div class="border"></div>`;
  }
  maindiv.innerHTML = content;

  let infoelements = document.querySelectorAll(".info");
  infoelements.forEach((element) => {
    element.addEventListener("click", () => {
      let movieid = element.getAttribute("id");
      console.log(movieid);
      showmodal(movieid);
    });
  });

  let containerimg = document.querySelectorAll(".container-img");

  containerimg.forEach((element) => {
    element.addEventListener("click", () => {
      let movieid = element.getAttribute("id");
      console.log(movieid);
      singlemoviedetails(movieid);
    });
  });

  let title = document.querySelectorAll(".title");
  title.forEach((element) => {
    element.addEventListener("click", () => {
      let movieid = element.getAttribute("id");
      console.log(movieid);
      singlemoviedetails(movieid);
    });
  });

  let watchlistbutton=document.querySelectorAll(".watchlist")
  // console.log(watchlistbutton);
  watchlistbutton.forEach((ele)=>{
    ele.addEventListener("click",()=>{
      let movieid=ele.getAttribute("id")
      console.log(movieid);
      addToWatchlist(movieid);
    })
  })

}

let searchinput = document.getElementById("search-input");
searchinput.addEventListener("input", function () {
  let searchvalue = searchinput.value.trim();
  displaysearchmovies(searchvalue);
});




let search_user = document.getElementById("search-user");

function displaysearchmovies(searchvalue) {
  if (searchvalue == "") {
    search_user.innerHTML = "";
    search_user.style.display = "none";
  } else {
    let filtermovies = movieobj.filter((movie) => {

      return movie.title.toLowerCase().includes(searchvalue.toLowerCase());
    
    });

    let searchcontent = "";

    filtermovies.forEach((movie) => {
      let { title, year, genre, image, id } = movie;

      searchcontent += `
        <div class="searchcontainer" id="${id}">
          <div class="searchcard">
            <img src="${image}" alt="">
          </div>
          <div class="searchdetails">
            <h2>${title}</h2>
            <p>${genre}</p>
            <p>${year}</p>
          </div> 
        </div>
      `;
      

    search_user.innerHTML = searchcontent;
    search_user.style.display = "block";

    let searchcontainer = document.querySelectorAll(".searchcontainer");

    searchcontainer.forEach((element) => {
      element.addEventListener("click", () => {
        let movieid = element.getAttribute("id");
        console.log(movieid);
        search_user.style.display = "none";
        searchvalue=""
        singlemoviedetails(movieid);
      });
    });
  });
  }
}




let pagenumber = document.getElementById("pagenumber");

function buttons() {
  for (let i = 1; i <= totalPages; i++) {
    let pagebtn = document.createElement("a");
    pagebtn.setAttribute("href", "#");
    pagebtn.textContent = i;
    pagebtn.classList.add("page");
    if (i == 1) pagebtn.classList.add("active");
    pagebtn.addEventListener("click", () => {
      let pageno = document.querySelectorAll(".page");
      pageno.forEach((btn)=> {
        btn.classList.remove("active")
      });
      pagebtn.classList.add("active");
      displayMovies(i);
      console.log(i);
    });
    pagenumber.appendChild(pagebtn);
  }
}

buttons();
displayMovies(1);

});



function singlemoviedetails(movieid) {

  fetch(`https://imdb-top-100-movies.p.rapidapi.com/${movieid}`,options)
  .then((res)=>{
    return res.json();
  })
  .then((movieobj)=>{
  
  let hero_section = document.getElementById("hero_section");
  let singlemoviedetails = document.getElementsByClassName( "singlemovie-details");
  let pagess = document.getElementsByClassName("pages");

  hero_section.style.display = "none";
  singlemoviedetails[0].style.display = "block";
  pagess[0].style.display = "none";

 
  // localStorage.setItem("singlemovie",JSON.stringify(movieobj))

  let {id,title,rating, year,big_image,description,trailer_embed_link,genre,director,writers} = movieobj;

  let singlemovie = document.getElementById("singlemovie");

  let genrearr = "";
  genre.forEach((item) => {
    genrearr += `<div class="genre-btn"><p>${item}</p></div>`;
  });

  let singlemoviecontent = ` <div class="singlemovie-titledetails">
<div class="singlemovie-title">
    <h1>${title}</h1>
    <p>${year}</p>
</div>
<div class="singlemovie-rating">
    <p>IMDb RATING</p>
    <img src="./star.png" alt="" width="100"/><span>${rating}</span><span> / 10</span>
</div>
</div>
<div class="singlemovie-img-details">
<img src="${big_image}" alt="">
<iframe src="${trailer_embed_link}" frameborder="0"></iframe>
</div>
<div class="singlemovie-genre">
${genrearr}
</div>
<div class="singlemovie-rest-details">
<div class="singlemovie-cont-1">
<div class="singlemovie-description">
<p>${description}</p>
</div>
<hr style="background-color:rgba(255, 255, 255, 0.4)">
<div class="singlemovie-director">
<span>Director</span><span>${director}</span>
</div>
<hr style="background-color:rgba(255, 255, 255, 0.4)">
<div class="singlemovie-writers" >
<span>Writers</span>
<p>${writers}</p>
</div>
<hr style="background-color:rgba(255, 255, 255, 0.4) ; margin-top: 0px;">
</div>
<div class="singlemovie-watchlist">
<button class="addwatch" id="${id}"><img class="singlemovie-plusimg" src="./blackadd.png" alt="" />Add to Watchlist</button>
</div>
</div>`;

  singlemovie.innerHTML = singlemoviecontent;

  let addwatch=document.querySelectorAll(".addwatch")
  addwatch.forEach((ele)=>{
    ele.addEventListener("click",()=>{
      let movieid=ele.getAttribute("id")
      console.log(movieid);
      addToWatchlist(movieid);
    })
  });
});
}

let goback = document.getElementById("goback");
goback.addEventListener("click", () => {
  let hero_section = document.getElementById("hero_section");
  let singlemoviedetails = document.getElementsByClassName("singlemovie-details" );
  let pagess = document.getElementsByClassName("pages");

  hero_section.style.display = "block";
  singlemoviedetails[0].style.display = "none";
  pagess[0].style.display = "block";
});



function showmodal(movieidd){

fetch(`https://imdb-top-100-movies.p.rapidapi.com/${movieidd}`,options)
.then((res)=>{
  return res.json();
})
.then((movieobj)=>{
  console.log(movieobj);

  let modalbody = document.getElementById("modalbody");

  let modalcontent = ` <div class="modal-container">
          <div class="modal-image">
            <img src="${movieobj["image"]}" alt="" />
          </div>
          <div class="modal-title_details">
            <div class="modal-title">
           <span>${movieobj["title"]}<img src="./next.png" alt="" /></span>
            </div>
            <div class="modal-release_year">
                <p>${movieobj["year"]}</p>
                <p>${movieobj["genre"]}</p>
            </div>
            <div class="modal-rating">
             <img src="./star.png" alt="" /><span>${
               movieobj["rating"]
             }</span><span> / 10</span>
            </div>
          </div>
          </div>
          <div class="modal-discrption">
            <span>${movieobj["description"]}</span>
                </div>
          <div class="modal-directors">
             <span>Director</span>
             <span>${movieobj["director"]}</span>
              </div>
          <div class="modal-writers">
              <span>Writers</span><span>${movieobj["writers"].join(" &#183 ")}</span>
          </div>
          <div class="modal-buttons">
            <a href="${
              movieobj["trailer"]
            }"><button><img src="./play.png" alt="" />Trailer</button></a>
            <button class="modaladdwatch" id=${movieobj["id"]}><img class="plus-img" src="./add.png" alt="" />Watchlist</button>
          </div>`;
  
  modalbody.innerHTML = modalcontent;
  
  let modaladdwatch=document.querySelectorAll(".modaladdwatch")
  modaladdwatch.forEach((ele)=>{
    ele.addEventListener("click",()=>{
      let movieid=ele.getAttribute("id")
      console.log(movieid);
      addToWatchlist(movieid);
    })
  });
})
}


function addToWatchlist(movieid) {
  // let movie = movieobj.find((item)=>{
  //   return item.id === movieid
  // });
  fetch(`https://imdb-top-100-movies.p.rapidapi.com/${movieid}`,options)
.then((res)=>{
  return res.json();
})
.then((movieobj)=>{
  // console.log(movieobj);

  let watchlist =JSON.parse(localStorage.getItem("watchlist")) || []; 
   
  let moviefound = watchlist.some((item)=> {
    return item.id === movieobj.id
  });
  if (moviefound) {
    alert(`"${movieobj.title}" is already in your watchlist!`);
  } else {
    watchlist.push(movieobj);
    localStorage.setItem("watchlist", JSON.stringify(watchlist)); 
    alert(`Added "${movieobj.title}" to your watchlist!`);
  }
})
};
 
