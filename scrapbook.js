// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest();
// new markdown converter
var converter = new showdown.Converter();

//setup widget
const app = document.getElementById('scrapbook');
const container = document.createElement('div');

container.setAttribute('class', 'container');
app.appendChild(container);

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'https://scrapbook.hackclub.com/api/users/RaleighWise/', true);



request.onload = function () {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  //console.log(data);
  

  if (request.status >= 200 && request.status < 400) {
    //console.log(data.posts[0].text);
    let post = data.posts[0];

    // Create a div with a card class
    const card = document.createElement('div');
    card.setAttribute('class', 'card');

    // Create an h1 and set the text content to the film's title
    const h1 = document.createElement('h1');
    h1.innerHTML = converter.makeHtml(post.text);

    // Create a p and set the text content to the film's description
    const img = document.createElement('img');
     // Limit to 300 chars
    img.src = post.attachments[0].thumbnails.large.url; // End with an ellipses
    console.log(post.attachments[0].thumbnails.large.url);
    // Append the cards to the container element
    container.appendChild(card);

    // Each card will contain an h1 and a p
    card.appendChild(h1);
    card.appendChild(img);

  } else {
    console.log('error');
  }

}

// Send request
request.send();

