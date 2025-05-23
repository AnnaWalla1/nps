
import { getParkData } from "./parkService.mjs";

const parkData = getParkData();
const disclaimer = document.querySelector(".disclaimer > a");
disclaimer.href = parkData.url;
disclaimer.innerHTML = parkData.fullName;
function parkInfoTemplate(info) {
    return `<a href="/" class="hero-banner__title">${info.name}</a>
    <p class="hero-banner__subtitle">
      <span>${info.designation}</span>
      <span>${info.states}</span>
    </p>`;
  }
  function setHeaderInfo(data) {
    // insert data into disclaimer section
    const disclaimer = document.querySelector(".disclaimer > a");
    disclaimer.href = data.url;
    disclaimer.innerHTML = data.fullName;
    // update the title of the site. Notice that we can select things in the head just like in the body with querySelector
    document.querySelector("head > title").textContent = data.fullName;
    // set the banner image
    document.querySelector(".hero-banner > img").src = data.images[0].url;
    // use the template function above to set the rest of the park specific info in the header
    document.querySelector(".hero-banner__content").innerHTML =
      parkInfoTemplate(data);
  }
  const parkInfoLinks = [
    {
      name: "Current Conditions &#x203A;",
      link: "conditions.html",
      image: parkData.images[2].url,
      description:
        "See what conditions to expect in the park before leaving on your trip!"
    },
    {
      name: "Fees and Passes &#x203A;",
      link: "fees.html",
      image: parkData.images[3].url,
      description: "Learn about the fees and passes that are available."
    },
    {
      name: "Visitor Centers &#x203A;",
      link: "visitor_centers.html",
      image: parkData.images[9].url,
      description: "Learn about the visitor centers in the park."
    }
  ];
  function getMailingAddress(addresses) {
    const mailing = addresses.find((address) => address.type === "Mailing");
    return mailing;
  }
  function footerTemplate(info) {
    const mailing = getMailingAddress(info.addresses);
    const voice = getVoicePhone(info.contacts.phoneNumbers)
    
    return `<section class="contact">
    <h3>Contact Info</h3>
    <h4>Mailing Address:</h4>
    <div><p>${mailing.line1}<p>
    <p>${mailing.city}, ${mailing.stateCode} ${mailing.postalCode}</p></div>
    <h4>Phone:</h4>
    <p>${voice}</p>
    </section>`;
  }
  function setHeaderInfo(data) {
    // insert data into disclaimer section
    const disclaimer = document.querySelector(".disclaimer > a");
    disclaimer.href = data.url;
    disclaimer.innerHTML = data.fullName;
    // update the title of the site. Notice that we can select things in the head just like in the body with querySelector
    document.querySelector("head > title").textContent = data.fullName;
    // set the banner image
    document.querySelector(".hero-banner > img").src = data.images[0].url;
    // use the template function above to set the rest of the park specific info in the header
    document.querySelector(".hero-banner__content").innerHTML =
      parkInfoTemplate(data);
  }
  
  function setParkIntro(data) {
    const introEl = document.querySelector(".intro");
    introEl.innerHTML = `<h1>${parkData.fullName}</h1>
    <p>${parkData.description}</p>`;
  }
  
  function setParkInfoLinks(data) {
    const infoEl = document.querySelector(".info");
    const html = data.map(mediaCardTemplate);
    infoEl.innerHTML = html.join("");
  }
  
  function setFooter(data) {
    const footerEl = document.querySelector("#park-footer");
    footerEl.innerHTML = footerTemplate(data);
  }
  
  setHeaderInfo(parkData);
  setParkIntro(parkData);
  setParkInfoLinks(parkInfoLinks);
  setFooter(parkData);

  export async function getParkData() {
    let data = {}
  const response = await fetch(baseUrl + "parks" + "?parkCode=yell");
  // check to make sure the reponse was ok.
  if (response.ok) {
    // convert to JSON
    data = await response.json();
  } else throw new Error("response not ok")
    return data;
  
}
{
    "error": {
      "code": "API_KEY_MISSING",
      "message": "An API key was not provided. Please get one at https://www.nps.gov/subjects/developer/get-started.htm"
    }
  }
  const baseUrl = "https://developer.nps.gov/api/v1/";
const apiKey = import.meta.env.VITE_NPS_API_KEY;
export async function getParkData() {
  const options = {
    method: "GET",
    headers: {
      "X-Api-Key": apiKey
    }
  };
  const data = {};
  const response = await fetch(baseUrl + "parks" + "?parkCode=yell", options);
  // check to make sure the reponse was ok.
  if (response.ok) {
    // convert to JSON
    data = await response.json();
  } else throw new Error("response not ok");
    return data;
  
}

async function init() {
    const parkData = await getParkData();
  
    setHeaderFooter(parkData);
    setParkIntro(parkData);
    setParkInfoLinks(parkInfoLinks);
  }
  
  init();
  {
    data:[{id: "F58C6D24-8D10-4573-9826-65D42B8B83AD", url: "https://www.nps.gov/yell/index.htm",…}]
    limit:"50",
    start:"0",
    total:"1"
}
export async function getParkData() {
    const options = {
      method: "GET",
      headers: {
        "X-Api-Key": apiKey
      }
    };
    let data = {};
    const response = await fetch(baseUrl + "parks" + "?parkCode=yell", options);
    // check to make sure the reponse was ok.
    if (response.ok) {
      // convert to JSON
      data = await response.json();
    } else throw new Error("response not ok");
    // return just the first row of the data object
    return data.data[0];
  }