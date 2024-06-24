import Avatar from "../../ui/Avatar";
import lightImage from "../../../public/1.png";
import darkImage from "../../../public/2.png";

import { useDarkMode } from "../../context/DarkModeContext";
import { FaGithub, FaGoogle } from "react-icons/fa6";
import { useLoginWithGithub } from "./useLoginWithGithub";
import { useLoginWithGoogle } from "./useLoginWithGoogle";

export default function Register() {
  const { darkMode } = useDarkMode();

  const { isLoading: isLoadingWithGithub, login } = useLoginWithGithub();
  const { isLoading: isLoadingWithGoogle, login: loginWithGoogle } =
    useLoginWithGoogle();
  function handleLoginWithGithub(e) {
    e.preventDefault();
    login();
  }

  function handleLoginWithGoogle(e) {
    e.preventDefault();
    loginWithGoogle();
  }

  return (
    <div className={`${darkMode ? "bg-card-dark" : ""} min-vh-100`}>
      <div
        className={`container d-flex justify-content-center align-items-center   `}
      >
        <div
          className={`card shadow-sm p-4 ${darkMode ? "card-dark" : ""} mt-5 `}
          style={{ width: "400px", height: "700px" }}
        >
          <div className="text-center mt-4">
            <Avatar
              src={darkMode ? darkImage : lightImage}
              alt="avatar"
              width={150}
              height={150}
            />
          </div>
          <h3 className="card-title text-center mb-4">Register</h3>
          <div className="d-flex flex-column gap-3 h-100 justify-content-center">
            <button
              className="btn btn-success mt-3"
              onClick={handleLoginWithGoogle}
              disabled={isLoadingWithGoogle}
            >
              <span className="d-flex align-items-center justify-content-center gap-2">
                <FaGoogle size={20} /> Register with Google
              </span>
            </button>
            <button
              className="btn btn-success mt-3"
              onClick={handleLoginWithGithub}
              disabled={isLoadingWithGithub}
            >
              <span className="d-flex align-items-center justify-content-center gap-2">
                <FaGithub size={20} /> Register with Github
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
