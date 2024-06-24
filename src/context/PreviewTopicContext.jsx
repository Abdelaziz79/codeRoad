import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const PreviewTopicContext = createContext();

export default function PreviewTopicProvider({ children }) {
  const [newTpoic, setNewTopic] = useState();
  return (
    <PreviewTopicContext.Provider value={{ newTpoic, setNewTopic }}>
      {children}
    </PreviewTopicContext.Provider>
  );
}

export function usePreviewTopic() {
  const context = useContext(PreviewTopicContext);
  if (context === undefined) {
    throw new Error(
      "usePreviewTopic must be used within a PreviewTopicProvider"
    );
  }
  return context;
}
