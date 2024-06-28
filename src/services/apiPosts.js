import axios from "axios";
import { POST_SIZE } from "../helper/constans";
import supabase from "./supabase";
const backendUrl = "https://localhost:7088/";

export async function getPosts({ page }) {
  let query = supabase
    .from("posts")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .eq("is_deleted", false);

  if (page) {
    const from = (page - 1) * POST_SIZE;
    const to = from + POST_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return { data, count };
}

export async function createPost(post) {
  console.log(post);
  const formData = new FormData();
  formData.append("UserId", post.UserId);
  formData.append("Content", post.Content);

  const { data } = await axios
    .post(`${backendUrl}api/Post/CreatePost`, formData)
    .catch((error) => {
      console.error(error);
      throw new Error(error.message);
    });

  return data;
}

export async function updatePost(post) {
  console.log(post);
  const formData = new FormData();
  formData.append("UserId", post.UserId);
  formData.append("Content", post.Content);
  const { data } = await axios
    .put(`${backendUrl}api/Post/${post.id}`, formData)
    .catch((error) => {
      console.error(error);
      throw new Error(error.message);
    });

  return data;
}

export async function getUserPosts(userId) {
  const { data } = await axios
    .get(`${backendUrl}/api/Post/userPosts/${userId}`)
    .catch((error) => {
      console.error(error);
      throw new Error(error.message);
    });

  return data;
}

export async function getPost(id) {
  const { data } = await axios
    .get(`${backendUrl}api/Post/${id}`)
    .catch((error) => {
      console.error(error);
      throw new Error(error.message);
    });

  return data;
}

export async function reportPost(id) {
  const { data, error } = await supabase
    .from("posts")
    .update({ is_reported: true })
    .eq("id", id)
    .select();
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}

export async function deletePost(id) {
  const { data } = await axios
    .delete(`${backendUrl}api/Post?id=${id}`)
    .catch((error) => {
      console.error(error);
      throw new Error(error.message);
    });

  return data;
}

export async function increasePostUp(id) {
  const { data: postData, error: postError } = await supabase
    .from("posts")
    .select("up")
    .eq("id", id)
    .single();

  if (postError) {
    console.error(postError);
    throw new Error(postError.message);
  }

  if (!postData) {
    throw new Error("Post not found");
  }

  const currentUpvotes = postData.up * 1;
  const updatedUpvotes = currentUpvotes + 1;

  const { data, error } = await supabase
    .from("posts")
    .update({ up: updatedUpvotes })
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}

export async function decreasePostUp(id) {
  const { data: postData, error: postError } = await supabase
    .from("posts")
    .select("up")
    .eq("id", id)
    .single();

  if (postError) {
    console.error(postError);
    throw new Error(postError.message);
  }

  if (!postData) {
    throw new Error("Post not found");
  }

  const currentUpvotes = postData.up * 1;
  const updatedUpvotes = currentUpvotes - 1;

  const { data, error } = await supabase
    .from("posts")
    .update({ up: updatedUpvotes })
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}

export async function increasePostDown(id) {
  const { data: postData, error: postError } = await supabase
    .from("posts")
    .select("down")
    .eq("id", id)
    .single();

  if (postError) {
    console.error(postError);
    throw new Error(postError.message);
  }

  if (!postData) {
    throw new Error("Post not found");
  }

  const currentPostDown = postData.down * 1;
  const updatePostDown = currentPostDown + 1;

  const { data, error } = await supabase
    .from("posts")
    .update({ down: updatePostDown })
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}

export async function decreasePostDown(id) {
  const { data: postData, error: postError } = await supabase
    .from("posts")
    .select("down")
    .eq("id", id)
    .single();

  if (postError) {
    console.error(postError);
    throw new Error(postError.message);
  }

  if (!postData) {
    throw new Error("Post not found");
  }

  const currentPostDown = postData.down * 1;
  const updatePostDown = currentPostDown - 1;

  const { data, error } = await supabase
    .from("posts")
    .update({ down: updatePostDown })
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}

export async function getReportedPost() {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("is_reported", true)
    .eq("is_deleted", false);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}

export async function unreportPost(id) {
  const { data, error } = await supabase
    .from("posts")
    .update({ is_reported: false })
    .eq("id", id)
    .select();
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return data;
}
