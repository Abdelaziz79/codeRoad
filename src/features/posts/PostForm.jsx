import MarkdownEditor from "../explanation/MarkdownEditor";

export default function PostForm({ content, setContent, isLoading }) {
  return (
    <>
      <label htmlFor="content" className="form-label fs-4">
        Content
      </label>
      <MarkdownEditor areaId="content" setMarkdown={setContent} />
      <textarea
        maxLength={1000}
        className="form-control"
        type="text"
        disabled={isLoading}
        name="content"
        id="content"
        cols="30"
        rows="10"
        value={content}
        required
        placeholder="content here"
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
    </>
  );
}
