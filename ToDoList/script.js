const ul = document.getElementById("list-container");
const input = document.getElementById("input-box");

function addTask() {
  if (input.value === "") {
    alert("write something!");
    return;
  }
  var li = document.createElement("li");
  li.innerHTML = input.value;
  var span = document.createElement("span");
  span.innerHTML = "\u00d7";

  li.appendChild(span);
  ul.appendChild(li);

  input.value = "";
  saveData();
}

ul.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
  } else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
  }
  saveData();
});

document.addEventListener("keypress", (e) => {
  if (e.code === "Enter") {
    addTask();
  }
});

// My stuff

/* Profiles */
const profileList = document.getElementById("profile-list");

function addProfile() {
  var profileCount = Number(localStorage.getItem("profileCount"));
  localStorage.setItem("profileCount", profileCount + 1);
  profileCount = localStorage.getItem("profileCount");

  var profile = document.createElement("button");
  profile.innerHTML = "Profile " + profileCount;
  profile.setAttribute("onclick", "selectProfile(event)");

  var li = document.createElement("li");

  li.appendChild(profile);
  profileList.appendChild(li);

  localStorage.setItem("profiles", profileList.innerHTML);
}

function selectProfile(e) {
  var profiles = profileList.getElementsByTagName("button");
  for (let i = 0; i < profiles.length; i++) {
    profiles[i] === e.target
      ? (e.target.className = "selected")
      : (profiles[i].className = "");
  }
  localStorage.setItem("profiles", profileList.innerHTML);
  showData();
}

function saveData() {
  var selectedProfile = document.getElementsByClassName("selected")[0];
  localStorage.setItem(selectedProfile.textContent, ul.innerHTML);
}

function showData() {
  var selectedProfile = document.getElementsByClassName("selected")[0];
  ul.innerHTML = localStorage.getItem(selectedProfile.textContent);
}

function start() {
  var profileCount = localStorage.getItem("profileCount");
  if (profileCount !== null && Number(profileCount) !== 1) {
    profileList.innerHTML = localStorage.getItem("profiles");
  } else {
    localStorage.setItem("profileCount", 1);
  }
  showData();
}

start();
// clear();
function clearData() {
  localStorage.clear();
  location.reload();
}
/* Clear all tasks */
function clearAll() {
  var tasks = ul.getElementsByTagName("li");
  for (let i = tasks.length - 1; i >= 0; i--) {
    tasks[i].remove();
  }
  saveData();
}
