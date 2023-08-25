const root = document.getElementById("root");
const wrapper = document.querySelector(".wrapper");
const socials = new Map();
socials.set("wwww.facebook.com", "./assets/icons/facebook-f.svg");
socials.set("www.twitter.com", "./assets/icons/twitter.svg");
socials.set("www.instagram.com", "./assets/icons/instagram.svg");

const dataFetched = function getData() {
  fetch("http://127.0.0.1:5500/freshcode-exam-1/data.json")
    .then((response) => response.json())
    .then((data) => {
      data.slice(0, 3).map((actor) => createActorCard(actor));
    })
    .catch((error) => {
      console.log(error);
      root.append("try again !");
    });
};

dataFetched();
function createElement(tagName, options = {}) {
  const element = document.createElement(tagName);

  if (options.text) {
    element.textContent = options.text;
  }

  if (options.className) {
    element.className = options.className;
  }

  if (options.attributes) {
    for (const attribute in options.attributes) {
      element.setAttribute(attribute, options.attributes[attribute]);
    }
  }
  if (options.style) {
    for (const styleProperty in options.style) {
      element.style[styleProperty] = options.style[styleProperty];
    }
  }

  if (options.events) {
    for (const eventName in options.events) {
      element.addEventListener(eventName, options.events[eventName]);
    }
  }
  if (options.appendTo) {
    options.appendTo.appendChild(element);
  }

  return element;
}

createH2();

function stringToColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const color = Math.abs(hash).toString(16).substring(0, 6);

  return "#" + "0".repeat(6 - color.length) + color;
}

function createActorCard({ firstName, lastName, profilePicture, contacts }) {
  console.log(firstName, lastName, profilePicture, contacts);

  const ul = createElement("ul", {
    className: "actors",
    appendTo: root,
  });

  const li = createElement("li", {
    className: "list-style-none card",
    appendTo: ul,
  });
  const imgWrapper = createElement("div", {
    className: "imgWrapper",
    style: { backgroundColor: stringToColor(firstName), color: "#fff" },
    appendTo: li,
  });

  const img = createElement("img", {
    className: "imgCard",
    attributes: { src: profilePicture },
  });

  img.addEventListener("load", () => {
    imgWrapper.appendChild(img);
  });

  img.addEventListener("error", () => {
    const h2Initials = createElement("h2", {
      text: `${firstName[0]}.  ${lastName[0]}.`,
      className: "flex-center",
      appendTo: imgWrapper,
    });
  });

  const h5 = createElement("h5", {
    text: `${firstName} ${lastName}`,
    appendTo: li,
  });
  const socialLinksWrapper = createElement("div", {
    className: "social-links-wrapper",
    appendTo: li,
  });

  const links = contacts.map((contact) => {
    const hostname = new URL(contact).hostname;
    const img = createElement("img", {
      className: "link-social",
      attributes: { src: socials.get(hostname) },
      appendTo: socialLinksWrapper,
    });
    return img;
  });

  let counter = 0;

  function incrementCounter() {
    counter++;
    console.log(`Counter: ${counter}`);
  }
  const divContainer = document.getElementById("divContainer");
  li.addEventListener("click", () => {
    if (counter === 0) {
      incrementCounter();
      const newH5 = createElement("h5", {
        text: `${firstName} ${lastName}`,
        appendTo: li,
      });

      divContainer.appendChild(newH5);
    }
  });
}
