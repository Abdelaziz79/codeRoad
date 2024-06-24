import MarkDown from "../../ui/MarkDown";

export default function Explanation({ explanation }) {
  return (
    <>
      <div className="" style={{ height: "670px" }}>
        <MarkDown markdown={explanation} />
      </div>
    </>
  );
}
