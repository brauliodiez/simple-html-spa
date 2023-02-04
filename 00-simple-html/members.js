const membersList = document.getElementById("members");

fetch("https://api.github.com/orgs/Microsoft/members")
  .then((response) => response.json())
  .then((members) => {
    members.forEach((member) => {
      const memberItem = document.createElement("li");
      const memberLink = document.createElement("a");
      memberLink.href = `./member.html?login=${member.login}`;
      memberLink.textContent = member.login;
      memberItem.appendChild(memberLink);
      membersList.appendChild(memberItem);
    });
  });
