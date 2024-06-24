import React from "react";
import TheTopicsList from "../features/topics/TheTopicsList";
import AddtButton from "../features/posts/AddButton";

export default function Toipcs() {
  return (
    <div>
      <TheTopicsList />
      <AddtButton name="Topic" to="/user/addtopic" />
    </div>
  );
}
