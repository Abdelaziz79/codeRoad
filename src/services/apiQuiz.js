import axios from "axios";
const backendUrl = "https://localhost:7088/";

export async function getQuiz(id) {
  const allQuizes = await axios
    .get(`${backendUrl}api/Quiz/GetAllQuizzes`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .catch((err) => {
      throw new Error(err.message);
    });

  const quiz = allQuizes?.data?.quizzes?.filter(
    (q) => q.lessonId === Number(id)
  );
  return quiz;
}

export async function createQuiz({ quiz, name }) {
  const lessons = await axios
    .get(`${backendUrl}api/Lesson/GetListOfLessons`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .catch((err) => {
      throw new Error(err.message);
    });
  const lessonId = lessons.data.find((l) => l.name === name).id;
  const newQuiz = {
    lessonId,
    questions: quiz,
    lesson: name,
  };
  const { data } = await axios
    .post(`${backendUrl}api/Quiz/CreateQuiz`, newQuiz, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
    .catch((err) => {
      throw new Error(err.message);
    });

  return data;
}
