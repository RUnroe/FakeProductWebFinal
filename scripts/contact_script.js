var quotediv = document.getElementById("quote");
var imgdiv = document.getElementById("quoteimg");
var QOD = document.getElementById("QOD");
var author = document.getElementById("author");

const sample_data = {
  background: "images/blueprints.jpg",
  quote: "The cake is a lie",
  author: "Aperture Science"
};

const tabOption = (evt, tabOption) => {
  QOD.style.display = 'none';
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace("active", "");
  }
  document.getElementById(tabOption).style.display = "block";
  evt.currentTarget.className += "active";
};

const handleQuote = q => {
  console.log(q.quote);
  console.log(q.background);
  quotediv.innerText = `${q.quote}`;
  author.innerHTML = `${q.author}`;
  imgdiv.src = `${q.background}`;
};

fetch("http://quotes.rest/qod.json")
  .then(response => response.json())
  .then(data => {
    console.log(data);
    if (data.success) {
      handleQuote(data.contents.quotes[0]);
    } else {
      handleQuote(sample_data);
    }
  });