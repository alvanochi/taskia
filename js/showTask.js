document.addEventListener("DOMContentLoaded", function () {
  const myTasks = new Task();
  const existingTasks = myTasks.getTasks();
  const taskWrapper = document.getElementById("taskWrapper");
  const taskWrapperEmpty = document.getElementById("taskWrapperEmpty");
  const usernameLogin = document.getElementById("usernameLogin");
  const usernameLogout = document.getElementById("logoutBtn");
  const getUsername = localStorage.getItem("userLogin");
  const searchInput = document.getElementById("search-input");
  const searchForm = document.getElementById("search-form");

  searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    myTasks.searchTask(searchInput.value);
  });

  usernameLogin.innerHTML = getUsername;

  const formatDate = (userFriendlyDate) => {
    const date = new Date(userFriendlyDate);

    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };

    return date.toLocaleDateString("en-GB", options);
  };

  function displayAllTasks(tasks = existingTasks) {
    if (tasks.length === 0) {
      taskWrapperEmpty.classList.remove("hidden");
      taskWrapper.classList.add("hidden");
    } else {
      taskWrapper.innerHTML = "";
      taskWrapperEmpty.classList.add("hidden");

      tasks.forEach((task) => {
        const userFriendlyDate = formatDate(task.createdAt);

        const itemTask = document.createElement("div");

        itemTask.className =
          "flex justify-between bg-white p-5 w-full rounded-xl";

        itemTask.innerHTML = `
      <div class="task-card flex flex-col gap-5">
          <div class="flex gap-3 items-center">
              <div
                  class="w-[50px] h-[50px] flex shrink-0 items-center justify-center bg-[#BDEBFF] rounded-full">
                  <img src="img/icons/ghost.svg" alt="icon">
              </div>
              <div class="flex flex-col">
                  <p class="font-bold text-lg leading-[27px]">${
                    task.taskName
                  }</p>
                  <p class="text-sm leading-[21px] text-taskia-grey">Created at ${userFriendlyDate}</p>
              </div>
          </div>
          <div class="flex gap-4 font-semibold text-sm leading-[21px]">
              <div class="flex gap-1 items-center">
                  <div class="flex shrink-0 w-5 h-5">
                      <img src="img/icons/layer.svg" alt="icon">
                  </div>
                  <p>${task.taskPriority}</p>
              </div>
              ${
                task.isComplete === true
                  ? `<div class="flex gap-1 items-center text-taskia-green">
              <div class="flex shrink-0 w-5 h-5">
                  <svg width="20" height="21" viewBox="0 0 20 21" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.29163 2.16663V18.8333" stroke="currentColor" stroke-width="2"
                          stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                      <path
                          d="M4.29163 3.83337H13.625C15.875 3.83337 16.375 5.08337 14.7916 6.66671L13.7916 7.66671C13.125 8.33337 13.125 9.41671 13.7916 10L14.7916 11C16.375 12.5834 15.7916 13.8334 13.625 13.8334H4.29163"
                          stroke="currentColor" stroke-width="2" stroke-miterlimit="10"
                          stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
              </div>
              <p>Completed</p>
            </div>`
                  : `<div class="flex gap-1 items-center">
            <div class="flex shrink-0 w-5 h-5">
                <svg width="20" height="21" viewBox="0 0 20 21" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.29163 2.16663V18.8333" stroke="currentColor" stroke-width="2"
                        stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
                    <path
                        d="M4.29163 3.83337H13.625C15.875 3.83337 16.375 5.08337 14.7916 6.66671L13.7916 7.66671C13.125 8.33337 13.125 9.41671 13.7916 10L14.7916 11C16.375 12.5834 15.7916 13.8334 13.625 13.8334H4.29163"
                        stroke="currentColor" stroke-width="2" stroke-miterlimit="10"
                        stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>
            <p>In Progress</p>
            </div>`
              }
          </div>
      </div>
      <div class="flex flex-row items-center gap-x-3">
          <a href="#" id='delete-${task.id}'
              class="my-auto font-semibold text-taskia-red border border-taskia-red p-[12px_20px] h-12 rounded-full">Delete</a>
          ${
            task.isComplete === false
              ? `<a href="#" id='complete-${task.id}'
          class="flex gap-[10px] justify-center items-center text-white p-[12px_20px] h-12 font-semibold bg-gradient-to-b from-[#977FFF] to-[#6F4FFF] rounded-full w-full border border-taskia-background-grey">Complete</a>`
              : `<a href="#" id = 'complete-${task.id}' class='hidden'</a>`
          }
      </div>`;

        taskWrapper.appendChild(itemTask);

        itemTask
          .querySelector(`#complete-${task.id}`)
          .addEventListener("click", function (e) {
            e.preventDefault();
            myTasks.completeTask(task.id);
            const updateTasks = myTasks.getTasks();
            displayAllTasks(updateTasks);
          });

        itemTask
          .querySelector(`#delete-${task.id}`)
          .addEventListener("click", function (e) {
            e.preventDefault();
            myTasks.deleteTask(task.id);
            const updateTasks = myTasks.getTasks();
            displayAllTasks(updateTasks);
          });
      });
    }
  }

  displayAllTasks();

  if (!getUsername) {
    window.location.href = "../signin.html";
  }

  usernameLogout.addEventListener("click", function () {
    alert("Successful logout!");
    localStorage.removeItem("userLogin");
  });
});
