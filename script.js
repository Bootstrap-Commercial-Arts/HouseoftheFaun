const workshopProjection = `'when': when, description, name, price, teacher, ticketLink, 'image': image.asset->url`;
const artisanProjection = `description, name, location, shopLink, 'image': image.asset->url`;

function truncate(str, length) {
    if (str.length > length) {
      return str.slice(0, length);
    } else return str;
  }

function sanityApiCall(query) {
        return fetch(`https://dpxaxkqe.api.sanity.io/v2022-01-01/data/query/production?query=*${query}`)
    .then(res => res.json())
  }
  
function homeWorkshopCall() {
    var featuredWorkshop = document.getElementById('featured-workshop');
    let query = encodeURIComponent(`[_type == "workshop" && dateTime(now()) < dateTime(when)]{${workshopProjection}} | order(when asc)[0]`);
    sanityApiCall(query).then(res => {
        if(res.result) {
          let img = document.getElementById('home-thumb');
          img.setAttribute('src', res.result.image);
          
          let description  = document.createElement("p");
          description.innerHTML = res.result.description;
          featuredWorkshop.append(description);

          var topBlock = document.getElementById("top-block");
          var title = document.createElement("h5");
          title.innerHTML = res.result.name;
          topBlock.append(title);

          var teacher = document.createElement("h6");
          teacher.innerHTML = res.result.teacher;
          teacher.setAttribute("id", "teacher")
          topBlock.append(teacher);

          var whenString = document.createElement("p");
          var when = new Date(res.result.when);
          const options = {
                  month: "short",
                  day: "numeric",
                  year: "numeric"
                };
              whenString.innerHTML = `$${res.result.price}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${truncate(when.toLocaleTimeString('en-US'),4)} ${when.toLocaleTimeString('en-US').slice(7)},  ${when.toLocaleDateString('en-US', options)}`;
              topBlock.append(whenString);

          var ticketUrl = document.getElementById("ticket-URL");
          ticketUrl.setAttribute("href", res.result.ticketLink);
        } else {
          var emptyMessage = document.createElement('div');
          emptyMessage.className = 'empty-workshop';
          emptyMessage.innerHTML = '<h3>Sorry...</h3><p>No workshops are scheduled right now, check back later or <a href="http://eepurl.com/ij_y8L" target="_blank">sign up for our mailing list</a> to be notified as new classes are added.</p>';
          featuredWorkshop.append(emptyMessage);
          var buttons = document.getElementById('workshop-buttons');
          buttons.style = 'display: none';
        }
    })
}



function artisanCall() {
    let query = encodeURIComponent(`[_type == "artisan"]{${artisanProjection}} | order(name asc)`);
    sanityApiCall(query).then(res => {
        var artisanRowWrap = document.getElementById("artisan-row-wrap")
        res.result.forEach(artisan => {
            
            var card = document.createElement("div");
            card.setAttribute("class","card grid-item")
            
            var topBlockWrapper = document.createElement("div");
            topBlockWrapper.setAttribute("class","top-block-wrapper");
            card.append(topBlockWrapper);

            var topBlock = document.createElement("div");
            topBlock.setAttribute("class", "top-block");
            topBlockWrapper.append(topBlock);

            let img = document.createElement('img');
            img.setAttribute('class', 'thumbnail')
            img.setAttribute('src', artisan.image);
            topBlockWrapper.prepend(img);
            
            let description  = document.createElement("p");
            description.innerHTML = artisan.description;
            card.append(description);

            var title = document.createElement("h5");
            title.innerHTML = artisan.name;
            topBlock.append(title);

            var location = document.createElement("h6");
            location.innerHTML = artisan.location;
            location.setAttribute("class", "location")
            topBlock.append(location);

            if(artisan.shopLink){
              var ticketUrl = document.createElement("a");
              ticketUrl.setAttribute("class", "hollow-gold-button");
              ticketUrl.setAttribute("href", artisan.shopLink);
              ticketUrl.innerHTML = "Shop Online"
              topBlock.append(ticketUrl);
            }

            var divider = document.createElement("img");
            divider.setAttribute("src","/images/home-divider-4.png");
            card.append(divider);
            artisanRowWrap.append(card)
        });
    })
      
}

function workshopCall() {
    let query = encodeURIComponent(`[_type == "workshop" && dateTime(now()) < dateTime(when)]{${workshopProjection}} | order(when asc)`);
    sanityApiCall(query).then(res => {
        var workshopRowWrap = document.getElementById("workshop-row-wrap");
        if(res.result.length > 0){
          console.log(res.result.length);
          res.result.forEach(workshop => {
              
              var card = document.createElement("div");
              card.setAttribute("class","card")
              
              var topBlockWrapper = document.createElement("div");
              topBlockWrapper.setAttribute("class","top-block-wrapper");
              card.append(topBlockWrapper);

              var topBlock = document.createElement("div");
              topBlock.setAttribute("class", "top-block");
              topBlockWrapper.append(topBlock);

              let img = document.createElement('img');
              img.setAttribute('class', 'thumbnail')
              img.setAttribute('src', workshop.image);
              topBlockWrapper.prepend(img);
              
              let description  = document.createElement("p");
              description.innerHTML = workshop.description;
              card.append(description);

              var title = document.createElement("h5");
              title.innerHTML = workshop.name;
              topBlock.append(title);

              var teacher = document.createElement("h6");
              teacher.innerHTML = workshop.teacher;
              teacher.setAttribute("class", "teacher")
              topBlock.append(teacher);

              var whenString = document.createElement("p");
              var when = new Date(workshop.when);
              const options = {
                  month: "short",
                  day: "numeric",
                  year: "numeric"
                };
              whenString.innerHTML = `$${workshop.price}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${truncate(when.toLocaleTimeString('en-US'),4)} ${when.toLocaleTimeString('en-US').slice(7)},  ${when.toLocaleDateString('en-US', options)}`;
              topBlock.append(whenString);

              var ticketUrl = document.createElement("a");
              ticketUrl.setAttribute("class", "gold-button");
              ticketUrl.setAttribute("href", workshop.ticketLink);
              ticketUrl.innerHTML = "Buy Tickets"
              card.append(ticketUrl)

              var divider = document.createElement("img");
              divider.setAttribute("src","/images/home-divider-4.png");
              card.append(divider);
              workshopRowWrap.append(card)
          });
        } else {
          var emptyMessage = document.createElement('div');
          emptyMessage.className = 'empty-workshop';
          emptyMessage.innerHTML = '<h3>Sorry...</h3><p>No workshops are scheduled right now, check back later or <a href="http://eepurl.com/ij_y8L" target="_blank">sign up for our mailing list</a> to be notified as new classes are added.</p>';
          workshopRowWrap.append(emptyMessage);
          workshopRowWrap.style = ('columns: 1')
        }
    })
}
