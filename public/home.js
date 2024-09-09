async function fetchUsername() {
  const response = await fetch("/getUsername");
  if (response.ok) {
    const data = await response.json();
    if (data.username) {
      document.getElementById(
        "welcome-message"
      ).innerText = `Bem-vindo(a), ${data.username}`;
    } else {
      window.location.href = "login.html";
    }
  } else {
    window.location.href = "login.html";
  }
}

document.addEventListener("DOMContentLoaded", fetchUsername);

function navigateTo(page) {
  window.location.href = page;
}

function logout() {
  window.location.href = "/logout";
}
