// penghubung antara ui html dengan model user
document.addEventListener("DOMContentLoaded", function () {
  const taskForm = document.getElementById("taskForm");
  const usernameLogout = document.getElementById("logoutBtn");
  const getUsername = localStorage.getItem("userLogin");
  const taskManager = new Task();

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  taskForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const result = taskManager.saveTask({
      taskName: document.getElementById("taskName").value,
      taskPriority: document.getElementById("taskPriority").value,
      createdAt: `${year}-${month}-${day}`,
    });

    if (result.success) {
      alert(result.message);
      window.location.href = "/";
    }
  });

  if (!getUsername) {
    window.location.href = "../signin.html";
  }

  usernameLogout.addEventListener("click", function () {
    alert("Successful logout!");
    localStorage.removeItem("userLogin");
  });
});
