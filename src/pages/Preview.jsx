import React from "react";
import MarkDown from "../ui/MarkDown";

import { usePreviewTopic } from "../context/PreviewTopicContext";

export default function Preview() {
  const { newTpoic } = usePreviewTopic();
  return <MarkDown markdown={newTpoic.explanation} />;
}
