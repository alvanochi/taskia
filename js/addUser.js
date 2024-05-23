// penghubung antara ui html dengan model user
document.addEventListener("DOMContentLoaded", function () {
  const userForm = document.getElementById("userForm");
  const userManager = new User();
  function deleteAllTasks() {
    localStorage.removeItem("tasks") && localStorage.removeItem("searchTask");
  }

  userForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const result = userManager.saveUser({ username });

    if (result.success) {
      alert(result.message);
      deleteAllTasks();
      window.location.href = "../signin.html";
    }
  });
});
