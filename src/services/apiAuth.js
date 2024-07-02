import axios from "axios";

const backendUrl = "https://localhost:7088/";

export async function singup({
  firstName,
  lastName,
  username,
  email,
  password,
}) {
  const { data } = await axios
    .post(
      `${backendUrl}api/Auth/Register `,
      {
        firstName,
        lastName,
        username,
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    .catch((error) => {
      console.error(error);
    });
  return data;
}

export async function login({ email, password }) {
  const { data } = await axios.post(`${backendUrl}api/Auth/Login `, {
    email,
    password,
  });
  window.localStorage.setItem("token", data.token);
  window.localStorage.setItem("user", JSON.stringify(data.user));
  return data;
}

export async function getCurrentUser() {
  const token = window.localStorage.getItem("token");
  if (!token) return null;
  const { data } = await axios.get(`${backendUrl}api/Auth/GetCurrentUser`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}

export async function logout() {
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("user");
}

export async function updateUserName(username) {
  const token = window.localStorage.getItem("token");

  const { data } = await axios
    .put(
      `${backendUrl}api/Auth/UpdateUserName?userName=${username}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .catch((error) => {
      console.error(error);
      throw new Error(error.message);
    });
  return data;
}

export async function updatePassword({ oldPassword, newPassword, email }) {
  const { data } = await axios
    .put(
      `${backendUrl}api/Auth/UpdatePassword`,
      {
        gmail: email,
        oldPassword: oldPassword,
        newPassword: newPassword,
        confirmNewPassword: newPassword,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      }
    )
    .catch((error) => {
      console.error(error);
      throw new Error(error.message);
    });
  return data;
}

export async function updateUserImage(image) {
  const { avatar } = image;
  const formData = new FormData();
  formData.append("image", avatar);
  const token = window.localStorage.getItem("token");
  const { data } = await axios
    .post(`${backendUrl}api/User/UpdateUserImage`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((error) => {
      console.error(error);
      throw new Error(error.message);
    });
  return data;
}

export async function deleteUser() {
  const token = window.localStorage.getItem("token");
  const { data } = await axios
    .delete(`${backendUrl}api/Auth/DeleteUser`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((error) => {
      throw new Error(error.message);
    });

  return data;
}

export async function updateUserQuizs({ lessonId, degree }) {
  const { data } = await axios
    .post(
      `${backendUrl}api/User/FinishNewLesson?lessonId=${Number(
        lessonId
      )}&degree=${Number(degree)}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .catch((err) => {
      throw new Error(err.message);
    });

  return data;
}

export async function getUserImage(id) {
  const { data } = await axios
    .get(`${backendUrl}api/User/GetUserImage?userId=${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .catch((error) => {
      console.error(error);
      throw new Error(error.message);
    });
  return data;
}

export async function getAllUsers() {
  const { data } = await axios
    .get(`${backendUrl}api/Auth/GetAllUsers`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .catch((error) => {
      console.error(error);
      throw new Error(error.message);
    });
  return data;
}

export async function getUserQuizs() {
  const { data } = await axios
    .get(`${backendUrl}api/User/GetFinishedLessonsForSpecificUser`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .catch((err) => {
      throw new Error(err.message);
    });
  return data;
}

export async function addAdmin(userEmail) {
  const { data } = await axios
    .post(
      `${backendUrl}api/Auth/AddUserToRole`,
      {
        userEmail,
        role: "Admin",
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    )
    .catch((err) => {
      throw new Error(err.message);
    });
  return data;
}

export async function deleteUserByAdmin(userEmail) {
  const token = window.localStorage.getItem("token");
  const { data } = await axios
    .delete(`${backendUrl}api/Auth/AdminDeleteUser?userEmail=${userEmail}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((err) => {
      throw new Error(err.message);
    });
  return data;
}

export async function getUserActiveDays() {
  const { data } = await axios
    .get(`${backendUrl}api/User/getUSerActiveDays`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .catch((err) => {
      throw new Error(err.message);
    });
  return data;
}
export async function loginWithGithub() {
  throw new Error("not implemented");
}

export async function loginWithGoogle() {
  throw new Error("not implemented");
}
export async function updateSavedPosts(savedPosts) {
  throw new Error("not implemented");
}

export async function updateUserLikes(likes) {
  throw new Error("not implemented");
}

export async function updateUserDislikes(dislikes) {
  throw new Error("not implemented");
}

export async function updateCurrentUser(user) {
  throw new Error("not implemented");
}
