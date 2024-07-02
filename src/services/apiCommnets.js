import axios from "axios";

const backendUrl = "https://localhost:7088/";

export async function createComment(comment) {
  const token = window.localStorage.getItem("token");
  const { data } = await axios
    .post(
      `${backendUrl}api/Comment/AddComment?postId=${comment.postId}&content=${comment.content}`,
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

export async function getCommentsOnPost(postId) {
  const { data } = await axios
    .get(`${backendUrl}api/Comment/CommentsForPost/${postId}`, {
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

export async function voteComment(id, vote) {
  const token = window.localStorage.getItem("token");
  const { data } = await axios
    .post(
      `${backendUrl}api/Comment/Vote?commentId=${id}&vote=${vote}`,
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

export async function deleteComment(id) {
  throw new Error("not implemented");
}
