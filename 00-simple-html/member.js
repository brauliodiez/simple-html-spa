const memberName = document.getElementById("member-name");

const memberAvatar = document.getElementById("member-avatar");

const memberBio = document.getElementById("member-bio");

const urlParams = new URLSearchParams(window.location.search);

const login = urlParams.get("login");

fetch(`https://api.github.com/users/${login}`)
  .then((response) => response.json())
  .then((member) => {
    memberName.textContent = member.name;
    memberAvatar.src = member.avatar_url;
    memberBio.textContent = member.bio;
  });