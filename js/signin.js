// penghubung antara ui html dengan model user
document.addEventListener("DOMContentLoaded", function () {
  const userForm = document.getElementById("userForm");
  const userManager = new User();

  userForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const result = userManager.signinUser({ username });

    if (result.success) {
      alert(result.message);
      localStorage.setItem("userLogin", username);
      window.location.href = "/";
    } else {
      alert(result.message);
    }
  });
});
