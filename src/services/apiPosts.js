import axios from "axios";
const backendUrl = "https://localhost:7088/";

export async function getPosts() {
  const { data } = await axios.get(`${backendUrl}api/Post`).catch((err) => {
    console.log(err);
    throw new Error(err.message);
  });
  console.log(data);
  return data;
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
  throw new Error("Not implemented");
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
  const { data } = await axios
    .put(`${backendUrl}api/Post/IncreaseUpvote/${id}`)
    .catch((err) => {
      console.log(err);
      throw new Error(err.message);
    });
  console.log(data);
  return data;
}

export async function decreasePostUp(id) {
  throw new Error("Not implemented");
}

export async function increasePostDown(id) {
  throw new Error("Not implemented");
}

export async function decreasePostDown(id) {
  throw new Error("Not implemented");
}

export async function getReportedPost() {
  throw new Error("Not implemented");
}

export async function unreportPost(id) {
  throw new Error("Not implemented");
}
