import bot from "./assets/bot.svg";
import user from "./assets/user.svg";

//targeting element..
const form = document.querySelector("form");
const chatContainer = document.querySelector("#chat_container");

console.log(form);

let loadInterval;

//loader while CodeY is thinking...
function loader(element) {
  element.textContent = "";

  //here below i added a 3 dots loading at interval of 300ms...
  loadInterval = setInterval(() => {
    element.textContent += ".";

    if (element.textContent === "....") {
      element.textContent = "";
    }
  }, 300);
}

//letter by letter typing function..
function typeText(element, text) {
  let index = 0;
  let inteval = setInterval(() => {
    if (index < text.length) {
      //it means we are still typing...
      element.innerHTML += text.charAt(index);
      index++;
    } else {
      clearInterval(inteval);
    }
  }, 20);
}

function generateUniqueId() {
  //alway use current time and a random functions
  const timeStamp = Date.now();
  const randomNum = Math.random();
  const hexadecimalString = randomNum.toString(16);
  return `id-${timeStamp}-${hexadecimalString} `;
}

function chatStripe(isAI, value, uniqueId) {
  return `
    <div class="wrapper ${isAI && "ai"}">
      <div class="chat">
        <div class="profile>
          <img src="${isAI ? bot : user}" alt="${isAI ? "bot" : "user"}"/>
        </div>
        <div class="message" id=${uniqueId}>${value}</div>
      </div>
    </div> 
    `;
}

const handleSubmit = async (e) => {
  e.preventDefault();
  const data = new FormData(form);
  console.log(data);
  //user chat-stripe
  chatContainer.innerHTML += chatStripe(false, data.get("prompt"));

  form.reset(); //resseting form

  //bots chatStrip...
  const uniqueId = generateUniqueId();
  console.log(uniqueId);
  chatContainer.innerHTML += chatStripe(true, " ", uniqueId);
  console.log(chatContainer);
  //as we get typed message we want to scroll down...
  chatContainer.scrollTop = chatContainer.scrollHeight;

  //err...below
  // const messageDiv = document.querySelector(`${uniqueId}`);
  console.log(messageDiv);
  loader(messageDiv);
};

form.addEventListener("submit", handleSubmit);

form.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    //code for enter key
    handleSubmit(e);
  }
});
