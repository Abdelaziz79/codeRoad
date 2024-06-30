import axios from "axios";
const backendUrl = "https://localhost:7088/";
export async function getExplanationTopics() {
  throw new Error("not implemented");
}

export async function getExplanationTopicById(id) {
  const { data } = await axios
    .get(`${backendUrl}api/Lesson/GetLessonById?id=${id}`)
    .catch((err) => {
      console.log(err);
      throw new Error(err.message);
    });
  return data;
}

export async function createExplanation(topic) {
  const { data } = await axios
    .post(`${backendUrl}api/Lesson/AddLesson`, topic, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .catch((err) => {
      console.log(err);
      throw new Error(err.message);
    });

  return data;
}

export async function updateExplanation(topic) {
  console.log(topic);
  const { data } = await axios
    .patch(`${backendUrl}api/Lesson/EditLesson?id=${topic.id}`, topic, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .catch((err) => {
      console.log(err);
      throw new Error(err.message);
    });
  return data;
}

export async function deleteExplanation(id) {
  const { data } = await axios
    .delete(`${backendUrl}api/Lesson/DeleteLesson?id=${id}`)
    .catch((err) => {
      console.log(err);
      throw new Error(err.message);
    });

  return data;
}

export async function getUserTopics(userId) {
  throw new Error("not implemented");
}

export async function getVerifiedTopics() {
  const { data } = await axios
    .get(`${backendUrl}api/Lesson/GetListOfLessons`)
    .catch((err) => {
      console.log(err);
      throw new Error(err.message);
    });
  console.log(data);
  return data;
}

export async function getNotVerifiedTopics() {
  throw new Error("not implemented");
}

export async function verifyTopic(id) {
  throw new Error("not implemented");
}

export async function getAllTopicsNames() {
  throw new Error("not implemented");
}

export async function addTopicName(topicName) {
  const { data } = await axios
    .post(`${backendUrl}api/Topic/AddTopic/${topicName}`)
    .catch((err) => {
      console.log(err);
      throw new Error(err.message);
    });

  return data;
}

export async function getTopicsNames() {
  const { data } = await axios.get(`${backendUrl}api/Topic`).catch((err) => {
    console.log(err);
    throw new Error(err.message);
  });

  return data;
}
