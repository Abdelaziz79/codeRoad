import AppLayout from "./ui/AppLayout";
import Login from "./features/authentication/Login";
import Register from "./features/authentication/Register";
import UserPage from "./pages/UserPage";
import Posts from "./pages/Posts";
import SliderToggleProvider from "./context/SliderToggleContext";
import Topics from "./pages/Topics";
import Dashboard from "./pages/Dashboard";
import Preview from "./pages/Preview";
import PreviewTopicProvider from "./context/PreviewTopicContext";
import AddPost from "./features/posts/AddPost";
import UserUpdate from "./features/authentication/UserUpdate";
import AddExplanation from "./features/explanation/AddExplanation";
import UserInfo from "./features/authentication/UserInfo";
import TheExplanationPage from "./features/topics/TheExplanationPage";
import UpdateTopic from "./features/topics/UpdateTopic";
import QuizPage from "./pages/QuizPage";

import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import { useDarkMode } from "./context/DarkModeContext";
import ProtectedRoute from "./ui/ProtectedRoute";
import PostPage from "./features/posts/PostPage";
import UpdatePost from "./features/posts/UpdatePost";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {},
  },
});

function App() {
  const { darkMode } = useDarkMode();

  return (
    <SliderToggleProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <PreviewTopicProvider>
                    <AppLayout />
                  </PreviewTopicProvider>
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="user" element={<UserPage />}>
                <Route path="account" index element={<UserInfo />} />
                <Route path="addpost" element={<AddPost />} />
                <Route path="update" element={<UserUpdate />} />
                <Route path="addtopic" element={<AddExplanation />} />
              </Route>
              <Route path="topics" element={<Topics />} />
              <Route path="topics/:id" element={<TheExplanationPage />} />
              <Route path="topics/edit/:id" element={<UpdateTopic />} />
              <Route path="posts" element={<Posts />} />
              <Route path="posts/edit/:id" element={<UpdatePost />} />
              <Route path="post/:id" element={<PostPage />} />
              <Route path="preview" element={<Preview />} />
              <Route path="*" element={<h1> Page Not Found</h1>} />
              <Route path="/quiz/:id" element={<QuizPage />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer
          autoClose={3000}
          position="top-center"
          theme={darkMode ? "dark" : "light"}
        />
      </QueryClientProvider>
    </SliderToggleProvider>
  );
}

export default App;
