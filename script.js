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
    let query = encodeURIComponent(`[_type == "workshop" && dateTime(now()) < dateTime(when)]{${workshopProjection}} | order(when asc)[0]`);
    sanityApiCall(query).then(res => {
        console.log(res);
        
        var featuredWorkshop = document.getElementById('featured-workshop');
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
    })
}



function artisanCall() {
    let query = encodeURIComponent(`[_type == "artisan"]{${artisanProjection}} | order(name asc)`);
    sanityApiCall(query).then(res => {
        console.log(res);
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

            var ticketUrl = document.createElement("a");
            ticketUrl.setAttribute("class", "hollow-gold-button");
            ticketUrl.setAttribute("href", artisan.shopLink);
            ticketUrl.innerHTML = "Shop Online"
            topBlock.append(ticketUrl)

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
        console.log(res);
        var workshopRowWrap = document.getElementById("workshop-row-wrap")
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
    })
}