import axios from "axios";
import supabase from "./supabase";

const backendUrl = "https://coderoad.bsite.net";
let userData = null;
export async function singup({
  firstName,
  lastName,
  username,
  email,
  password,
}) {
  console.log({ firstName, lastName, username, email, password });
  const data = await axios
    .post(
      `${backendUrl}/api/Auth/Register `,
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
      throw new Error(error.message);
    });
  console.log(data);
  return data;
}

export async function login({ email, password }) {
  console.log({ email, password });
  const data = await axios.post(`${backendUrl}/api/Auth/Login `, {
    email,
    password,
  });
  userData = data.data;
  console.log(userData);
  return data;
}
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

export async function getCurrentUser() {
  if (userData === null) {
    return null;
  }

  return userData;
  // const { data: session } = await supabase.auth.getSession();
  // if (!session) return null;
  // const { data, error } = await supabase.auth.getUser();
  // if (error) {
  //   console.error(error);
  //   throw new Error(error.message);
  // }
  // return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

export async function updateCurrentUser({ password, fullName }) {
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { full_name: fullName } };

  const { error, data } = await supabase.auth.updateUser(updateData);
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
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
