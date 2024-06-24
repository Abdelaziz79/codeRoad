import supabase from "./supabase";

export async function singup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        avatar: "",
        bio: "",
        quizs: [],
        finished_topics: [],
        created_topics: [],
        saved_posts: [],
        created_posts: [],
        likes: [],
        dislikes: [],
        comments: [],
        followings: [],
        followers: [],
        is_admin: false,
      },
    },
  });
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
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
  const { data: session } = await supabase.auth.getSession();
  if (!session) return null;

  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data?.user;
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
