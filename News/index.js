let container = document.querySelector(".container"),
  pro = document.querySelector(".progresses"),
  over = document.querySelector(".over"),
  nav = document.querySelectorAll(".nav-link"),
  navbar = document.querySelector(".navbar-nav"),
  onc = true,
  page = 1,
  fil = "India",
  arr = [],
  gon = [],
  li = [],
  api = "999243fc6067409c935c7d9b6cef1989";
// 4d29114effe7421087a8804d9d79f125

function crtC(iSrc, title, desc, link, date, author) {
  let card = crt("DIV", "card m-3", "", container);
  let span = crt(
    "SPAN",
    "position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger",
    date,
    card
  );
  let img = crt("IMG", "card-img-top", "", card);
  img.setAttribute("src", iSrc);
  let cardBody = crt("DIV", "card-body", "", card);
  let h5 = crt("H5", "card-title", title, cardBody);
  let p = crt("P", "card-text", desc, cardBody);
  let a = crt("a", "btn btn-primary", "Read More..", cardBody);
  a.setAttribute("href", link);
  a.setAttribute("target", "_blank");
  let btn = crt("BUTTON", "btn author", author, cardBody);
}

function crt(div, cls, val, app) {
  let d = document.createElement(div);
  let clsA = cls.split(" ");
  for (let i = 0; i < clsA.length; i++) {
    d.classList.add(clsA[i]);
  }
  d.innerText = val;
  return app.appendChild(d);
}

async function getapi(fil, val) {
  onc = false;
  pro.style.display = "block";
  resetP();
  setTimeout(() => {
    setP(10);
  }, 100);
  setTimeout(() => {
    setP(70);
  }, 600);
  let url =
    `https://newsapi.org/v2/everything?q=${fil}&page=${val}&pagesize=50&language=en` +
    `&apiKey=${api}`;
  if (fil == "India") {
    url =
      `https://newsapi.org/v2/top-headlines?country=in&page=${val}&pagesize=50&language=en` +
      `&apiKey=${api}`;
  }
  const response = await fetch(url);
  if (response) {
    setP(90);
    const data = await response.json();
    setP(100);
    let num = find(fil);
    console.log(data);
    st(data.articles, num);
    pro.style.display = "none";
    onc = true;
    setapi(data.articles);
  }
}

function setapi(data) {
  if (!(page > 1)) container.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    if (
      data[i].title != "" &&
      data[i].url != "" &&
      data[i].urlToImage != "" &&
      data[i].description != "" &&
      data[i].publishedAt != ""
    ) {
      let title = data[i].title.substring(0, 90) + "...",
        link = data[i].url,
        iSrc = data[i].urlToImage,
        desc = data[i].description.substring(0, 105) + "...",
        date = data[i].publishedAt.split("T")[0];
      author = data[i].author;
      if (iSrc == null) iSrc = "news.png";
      crtC(iSrc, title, desc, link, date, author);
    }
  }
}

function setP(val) {
  over.style.width = 100 - val + "%";
}

function resetP() {
  over.style.width = 100 + "%";
}

function stLi() {
  for (let j = 0; j < nav.length; j++) {
    li.push(nav[j].innerText);
    gon.push(false);
    arr.push("");
  }
}

function remv() {
  for (let j = 0; j < nav.length; j++) {
    nav[j].classList.remove("active");
    page = 1;
  }
}

function find(val) {
  for (let a = 0; a < arr.length; a++) {
    if (li[a] == val) return a;
  }
}

function st(val, num) {
  if (!(page > 1)) arr[num] = val;
  else {
    let temp = arr[num];
    arr[num] = [...temp, ...val];
  }
}

for (let j = 0; j < nav.length; j++) {
  nav[j].onclick = () => {
    remv();
    nav[j].classList.add("active");
    fil = nav[j].innerText;
    if (gon[j]) {
      setapi(arr[j]);
    } else {
      gon[j] = true;
      getapi(fil, page);
    }
  };
}

stLi();
remv();
getapi(fil, page);
gon[0] = true;
nav[0].classList.add("active");

window.onscroll = () => {
  let sy = document.documentElement.scrollTop || document.body.scrollTop || 0;
  let dy = document.body.clientHeight;
  let p = (sy / dy) * 100;
  if (p > 85 && onc && page <= 1) {
    page++;
    getapi(fil, page);
  }
};
