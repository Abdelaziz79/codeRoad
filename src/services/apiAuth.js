import axios from "axios";
import supabase from "./supabase";

const backendUrl = "https://localhost:7088/";

export async function loginWithGithub() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
  });
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}

export async function loginWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}

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

export async function updateCurrentUser(user) {
  // const { data } = await axios
  //   .put(`${backendUrl}api/User/UpdateUser`, user, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //     throw new Error(error.message);
  //   });
  // return data;
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

export async function deleteUser(email) {
  const token = window.localStorage.getItem("token");
  const { data } = await axios
    .delete(`${backendUrl}api/Auth/DeleteUser`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((error) => {
      console.log(error);
      throw new Error(error.message);
    });

  return data;
}

export async function updateUserQuizs(quizs) {
  const updateDate = {
    data: {
      quizs,
    },
  };

  const { error, data } = await supabase.auth.updateUser(updateDate);
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}

export async function updateSavedPosts(savedPosts) {
  const updateDate = {
    data: {
      saved_posts: savedPosts,
    },
  };
  const { data, error } = await supabase.auth.updateUser(updateDate);
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}

export async function updateUserLikes(likes) {
  const updateDate = {
    data: {
      likes,
    },
  };
  const { data, error } = await supabase.auth.updateUser(updateDate);
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}

export async function updateUserDislikes(dislikes) {
  const updateDate = {
    data: {
      dislikes,
    },
  };
  const { data, error } = await supabase.auth.updateUser(updateDate);
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}
export async function getUserImage(id) {
  const { data } = await axios
    .get(`${backendUrl}api/User/GetUserImage?userId=${id}`)
    .catch((error) => {
      console.error(error);
      throw new Error(error.message);
    });
  return data;
}
