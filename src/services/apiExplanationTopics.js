import axios from "axios";
const backendUrl = "https://localhost:7088/";
export async function getExplanationTopics() {
  throw new Error("not implemented");
}

export async function getExplanationTopicById(id) {
  const { data } = await axios
    .get(`${backendUrl}api/Lesson/GetLessonById?id=${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .catch((err) => {
      throw new Error(err.message);
    });
  return data;
}

export async function createExplanation(topic) {
  const { data } = await axios
    .post(`${backendUrl}api/Lesson/AddLesson`, topic, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .catch((err) => {
      throw new Error(err.message);
    });
  return data;
}

export async function updateExplanation(topic) {
  console.log(topic);

  // const formData = new FormData();
  // formData.append("Name", topic.Name);
  // formData.append("Level", topic.Level);
  // formData.append("TopicName", topic.TopicName);
  // formData.append("Explanation", topic.Explanation);

  const { data } = await axios
    .patch(`${backendUrl}api/Lesson/EditLesson/${topic.id}`, topic, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .catch((err) => {
      throw new Error(err.message);
    });
  return data;
}

export async function deleteExplanation(id) {
  const { data } = await axios
    .delete(`${backendUrl}api/Lesson/DeleteLesson/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .catch((err) => {
      throw new Error(err.message);
    });

  return data;
}

export async function getUserTopics(userId) {
  const { data } = await axios
    .get(`${backendUrl}api/Lesson/GetLessonsByUser?userId=${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .catch((err) => {
      throw new Error(err.message);
    });
  return data;
}

export async function getVerifiedTopics() {
  const search = window.location.search;
  const topic = new URLSearchParams(search).get("topic");
  const level = new URLSearchParams(search).get("level");
  let returnedData = null;

  const { data } = await axios
    .get(`${backendUrl}api/Lesson/GetListOfLessons`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .catch((err) => {
      throw new Error(err.message);
    });

  returnedData = data;
  if (topic && topic !== "all") {
    returnedData = returnedData.filter((e) => e.topic === topic);
  }
  if (level && level !== "all") {
    returnedData = returnedData.filter((e) => e.level === level);
  }

  return returnedData;
}

export async function addTopicName(topicName) {
  const { data } = await axios
    .post(
      `${backendUrl}api/Topic/AddTopic/${topicName}`,
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

export async function getTopicsNames() {
  const { data } = await axios
    .get(`${backendUrl}api/Topic`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .catch((err) => {
      throw new Error(err.message);
    });

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
