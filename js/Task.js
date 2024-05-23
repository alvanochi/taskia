class Task {
  constructor() {
    this.tasks = this.getTasks();
  }

  saveTask(taskData) {
    const newTask = {
      id: Date.now(),
      isComplete: false,
      ...taskData,
    };
    const sameName = this.tasks.find(
      (task) => task.taskName === taskData.taskName
    );
    if (sameName) {
      alert("Task already exist!");
      return;
    }

    this.tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
    return {
      success: true,
      message: "Task has been added!",
    };
  }

  getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  }

  completeTask(taskId) {
    const index = this.tasks.findIndex((task) => task.id === taskId);

    if (index !== -1) {
      this.tasks[index].isComplete = true;
      this.updateLocalStorage();
    }
  }

  deleteTask(taskId) {
    const index = this.tasks.findIndex((task) => task.id === taskId);

    if (index !== -1) {
      alert("Task deleted Successfully!");
      this.tasks.splice(index, 1);
      this.updateLocalStorage();
    }
  }

  searchTask(taskName) {
    const searchTask = this.tasks.find((task) => taskName === task.taskName);
    localStorage.setItem("searchTask", JSON.stringify(searchTask));
    return setTimeout(() => {
      if (searchTask) {
        alert("Found it!");
        window.location.href = "../tasks.html";
      } else {
        alert("Task not found.");
      }
    }, 1000);
  }

  getTaskBySearch() {
    return JSON.parse(localStorage.getItem("searchTask"));
  }

  updateLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }
}
