import axios from "axios";
const backendUrl = "https://localhost:7088/";

export async function getPosts() {
  const { data } = await axios
    .get(`${backendUrl}api/Post`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .catch((err) => {
      throw new Error(err.message);
    });
  return data;
}

export async function createPost(post) {
  const formData = new FormData();
  formData.append("UserId", post.UserId);
  formData.append("Content", post.Content);

  const { data } = await axios
    .post(`${backendUrl}api/Post/CreatePost`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
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
    .put(`${backendUrl}api/Post/${post.id}`, formData, {
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

export async function getUserPosts(userId) {
  const { data } = await axios
    .get(`${backendUrl}/api/Post/userPosts/${userId}`, {
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

export async function getPost(id) {
  const { data } = await axios
    .get(`${backendUrl}api/Post/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .catch((error) => {
      console.error(error);
      throw new Error(error.message);
    });
  console.log(data);
  return data;
}

export async function deletePost(id) {
  const { data } = await axios
    .delete(`${backendUrl}api/Post?id=${id}`, {
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

export async function votePost(id, vote) {
  const { data } = await axios
    .post(
      `${backendUrl}api/Post/Vote?postId=${id}&vote=${vote}`,
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

export async function reportPost(id) {
  throw new Error("Not implemented");
}

export async function unreportPost(id) {
  throw new Error("Not implemented");
}
