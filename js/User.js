// pengelola data seperti create read update delete
class User {
  constructor() {
    this.user = this.getUser();
  }

  saveUser(userData) {
    const newUser = {
      id: Date.now(),
      ...userData,
    };

    if (this.user.length < 1) {
      this.user.push(newUser);
    } else {
      this.user.fill(newUser);
    }

    localStorage.setItem("user", JSON.stringify(this.user));
    return {
      success: true,
      message: "Username created Successfully!",
    };
  }

  signinUser(usernameByInput) {
    const userExist = this.user.some(
      (e) => e.username === usernameByInput.username
    );

    if (userExist) {
      return {
        success: true,
        message: "Successful signin!",
      };
    } else {
      return {
        success: false,
        message: "Username not found",
      };
    }
  }

  getUser() {
    return JSON.parse(localStorage.getItem("user")) || [];
  }
}
