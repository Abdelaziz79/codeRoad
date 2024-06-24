import { useState } from "react";
import {
  GoBold,
  GoChecklist,
  GoCode,
  GoCodeSquare,
  GoHorizontalRule,
  GoImage,
  GoItalic,
  GoLink,
  GoListOrdered,
  GoListUnordered,
  GoQuote,
  GoStrikethrough,
  GoTable,
  GoTrash,
} from "react-icons/go";
import { useDarkMode } from "../../context/DarkModeContext";

export default function MarkdownEditor({ setMarkdown, areaId }) {
  const [heading] = useState("Heading");
  const [rows, setRows] = useState(1);
  const [columns, setColumns] = useState(1);
  const { darkMode } = useDarkMode();

  function addHeading(e) {
    e.preventDefault();
    let newText = "";
    let pos = 3;
    if (e.target.value === "H1") {
      newText = "\n# ";
    } else if (e.target.value === "H2") {
      newText = "\n## ";
      pos = 4;
    } else if (e.target.value === "H3") {
      newText = "\n### ";
      pos = 5;
    } else if (e.target.value === "H4") {
      newText = "\n#### ";
      pos = 6;
    } else if (e.target.value === "H5") {
      newText = "\n##### ";
      pos = 7;
    } else if (e.target.value === "H6") {
      newText = "\n###### ";
      pos = 8;
    }
    const textarea = document.getElementById(areaId); // Replace 'yourTextareaId' with the actual id of your textarea element
    const currentPosition = textarea.selectionStart;
    const updatedText =
      textarea.value.substring(0, currentPosition) +
      newText +
      textarea.value.substring(currentPosition);
    textarea.value = updatedText;
    textarea.setSelectionRange(currentPosition + pos, currentPosition + pos); // Place the cursor between the two sets of asterisks
    textarea.focus();
  }

  function addLink(e) {
    e.preventDefault();
    const textarea = document.getElementById(areaId); // Replace 'yourTextareaId' with the actual id of your textarea element
    const currentPosition = textarea.selectionStart;
    const newText = `[]()`;
    const updatedText =
      textarea.value.substring(0, currentPosition) +
      newText +
      textarea.value.substring(currentPosition);
    textarea.value = updatedText;
    textarea.setSelectionRange(currentPosition + 1, currentPosition + 1); // Place the cursor after the link text
    textarea.focus(); // Optional: bring focus back to the textarea
  }

  function addImage(e, url) {
    e.preventDefault();
    const textarea = document.getElementById(areaId); // Replace 'yourTextareaId' with the actual id of your textarea element
    const currentPosition = textarea.selectionStart;
    const newText = `![image description](image url)`;
    const updatedText =
      textarea.value.substring(0, currentPosition) +
      newText +
      textarea.value.substring(currentPosition);
    textarea.value = updatedText;
    textarea.setSelectionRange(currentPosition + 1, currentPosition + 1); // Place the cursor after the link text
    textarea.focus();
  }

  function clearText(e) {
    e.preventDefault();
    setMarkdown("");
  }

  function addBold(e) {
    e.preventDefault();
    const textarea = document.getElementById(areaId); // Replace 'yourTextareaId' with the actual id of your textarea element
    const currentPosition = textarea.selectionStart;
    const newText = `****`;
    const updatedText =
      textarea.value.substring(0, currentPosition) +
      newText +
      textarea.value.substring(currentPosition);
    textarea.value = updatedText;
    textarea.setSelectionRange(currentPosition + 2, currentPosition + 2); // Place the cursor between the two sets of asterisks
    textarea.focus();
  }

  function addItalic(e) {
    e.preventDefault();
    const textarea = document.getElementById(areaId); // Replace 'yourTextareaId' with the actual id of your textarea element
    const currentPosition = textarea.selectionStart;
    const newText = `**`;
    const updatedText =
      textarea.value.substring(0, currentPosition) +
      newText +
      textarea.value.substring(currentPosition);
    textarea.value = updatedText;
    textarea.setSelectionRange(currentPosition + 1, currentPosition + 1); // Place the cursor between the two asterisks
    textarea.focus(); // Optional: bring focus back to the textarea
  }

  function addStrike(e) {
    e.preventDefault();
    const textarea = document.getElementById(areaId); // Replace 'yourTextareaId' with the actual id of your textarea element
    const currentPosition = textarea.selectionStart;
    const newText = `~~~~`;
    const updatedText =
      textarea.value.substring(0, currentPosition) +
      newText +
      textarea.value.substring(currentPosition);
    textarea.value = updatedText;
    textarea.setSelectionRange(currentPosition + 2, currentPosition + 2); // Place the cursor between the two tildes
    textarea.focus(); // Optional: bring focus back to the textarea
  }

  function addCodeBlock(e) {
    e.preventDefault();
    const textarea = document.getElementById(areaId); // Replace 'yourTextareaId' with the actual id of your textarea element
    const currentPosition = textarea.selectionStart;
    const newText = `\n\`\`\`\n\n\`\`\``;
    const updatedText =
      textarea.value.substring(0, currentPosition) +
      newText +
      textarea.value.substring(currentPosition);
    textarea.value = updatedText;
    textarea.setSelectionRange(currentPosition + 4, currentPosition + 4); // Place the cursor after the first three backticks
    textarea.focus(); // Optional: bring focus back to the textarea
  }

  function addTodo(e) {
    e.preventDefault();
    const textarea = document.getElementById(areaId); // Replace 'yourTextareaId' with the actual id of your textarea element
    const currentPosition = textarea.selectionStart;
    const newText = `\n- [ ] `;
    const updatedText =
      textarea.value.substring(0, currentPosition) +
      newText +
      textarea.value.substring(currentPosition);
    textarea.value = updatedText;
    textarea.setSelectionRange(currentPosition + 8, currentPosition + 8); // Place the cursor after the [ ]
    textarea.focus(); // Optional: bring focus back to the textarea
  }

  function addUnorderedList(e) {
    e.preventDefault();
    const textarea = document.getElementById(areaId); // Replace 'yourTextareaId' with the actual id of your textarea element
    const currentPosition = textarea.selectionStart;
    const newText = `\n- `;
    const updatedText =
      textarea.value.substring(0, currentPosition) +
      newText +
      textarea.value.substring(currentPosition);
    textarea.value = updatedText;
    textarea.setSelectionRange(currentPosition + 3, currentPosition + 3); // Place the cursor after the dash
    textarea.focus(); // Optional: bring focus back to the textarea
  }

  function addOrderedList(e) {
    e.preventDefault();
    const textarea = document.getElementById(areaId); // Replace 'yourTextareaId' with the actual id of your textarea element
    const currentPosition = textarea.selectionStart;
    const newText = `\n1. `;
    const updatedText =
      textarea.value.substring(0, currentPosition) +
      newText +
      textarea.value.substring(currentPosition);
    textarea.value = updatedText;
    textarea.setSelectionRange(currentPosition + 4, currentPosition + 4); // Place the cursor after the number and dot
    textarea.focus(); // Optional: bring focus back to the textarea
  }

  function addQuote(e) {
    e.preventDefault();
    const textarea = document.getElementById(areaId); // Replace 'yourTextareaId' with the actual id of your textarea element
    const currentPosition = textarea.selectionStart;
    const newText = `\n> `;
    const updatedText =
      textarea.value.substring(0, currentPosition) +
      newText +
      textarea.value.substring(currentPosition);
    textarea.value = updatedText;
    textarea.setSelectionRange(currentPosition + 3, currentPosition + 3); // Place the cursor after the greater than symbol
    textarea.focus(); // Optional: bring focus back to the textarea
  }

  function addLineBreak(e) {
    e.preventDefault();
    const textarea = document.getElementById(areaId); // Replace 'yourTextareaId' with the actual id of your textarea element
    const currentPosition = textarea.selectionStart;
    const newText = `\n---\n`;
    const updatedText =
      textarea.value.substring(0, currentPosition) +
      newText +
      textarea.value.substring(currentPosition);
    textarea.value = updatedText;
    textarea.setSelectionRange(currentPosition + 7, currentPosition + 7); // Place the cursor after the line break
    textarea.focus(); // Optional: bring focus back to the textarea
  }

  function addInlineCode(e) {
    e.preventDefault();
    const textarea = document.getElementById(areaId); // Replace 'yourTextareaId' with the actual id of your textarea element
    const currentPosition = textarea.selectionStart;
    const newText = `\`\``;
    const updatedText =
      textarea.value.substring(0, currentPosition) +
      newText +
      textarea.value.substring(currentPosition);
    textarea.value = updatedText;
    textarea.setSelectionRange(currentPosition + 1, currentPosition + 1); // Place the cursor between the backticks
    textarea.focus(); // Optional: bring focus back to the textarea
  }

  function addTable(e) {
    e.preventDefault();
    const textarea = document.getElementById(areaId); // Replace 'yourTextareaId' with the actual id of your textarea element
    const currentPosition = textarea.selectionStart;
    let tableText = "|";
    for (let i = 0; i < columns; i++) {
      tableText += " Column Header |";
    }
    tableText += "\n|";
    for (let i = 0; i < columns; i++) {
      tableText += " -------------- |";
    }
    for (let i = 0; i < rows; i++) {
      tableText += "\n|";
      for (let j = 0; j < columns; j++) {
        tableText += ` r ${i + 1} c ${j + 1} |`;
      }
    }
    const updatedText =
      textarea.value.substring(0, currentPosition) +
      tableText +
      textarea.value.substring(currentPosition);
    textarea.value = updatedText;
    textarea.setSelectionRange(currentPosition + 2, currentPosition + 2); // Place the cursor at the beginning of the first row's first cell
    textarea.focus(); // Optional: bring focus back to the textarea
  }

  return (
    <div
      className={`d-flex py-2 editor  ${
        darkMode ? "editor-dark" : "editor-light"
      }`}
    >
      <form>
        <select
          className=""
          style={{
            width: "100px",
            height: "30px",
            borderRadius: "5px",
            border: darkMode ? "" : "1px solid #75757528",
          }}
          id="heading"
          name="heading"
          value={heading}
          onChange={addHeading}
        >
          <option value="Heading" hidden>
            Heading
          </option>
          <option value="H1">H1</option>
          <option value="H2">H2</option>
          <option value="H3">H3</option>
          <option value="H4">H4</option>
          <option value="H5">H5</option>
          <option value="H6">H6</option>
        </select>
        <span onClick={addBold}>
          <GoBold size={20} />
        </span>
        <span onClick={addItalic}>
          <GoItalic size={20} />
        </span>
        <span onClick={addInlineCode}>
          <GoCode size={20} />
        </span>
        <span onClick={addCodeBlock}>
          <GoCodeSquare size={20} />
        </span>
        <span onClick={addStrike}>
          <GoStrikethrough size={20} />
        </span>
        <span onClick={addTodo}>
          <GoChecklist size={20} />
        </span>
        <span onClick={addUnorderedList}>
          <GoListUnordered size={20} />
        </span>
        <span onClick={addOrderedList}>
          <GoListOrdered size={20} />
        </span>
        <span onClick={addQuote}>
          <GoQuote size={20} />
        </span>
        <span onClick={addLineBreak}>
          <GoHorizontalRule size={20} />
        </span>

        <span onClick={addLink}>
          <GoLink size={20} />
        </span>
        <span onClick={addImage}>
          <GoImage size={20} />
        </span>
        <span onClick={clearText}>
          <GoTrash size={20} />
        </span>
        <div className="d-flex gap-2 align-items-center   ">
          <input
            type="number"
            id="rows"
            name="rows"
            min={1}
            max={10}
            value={rows}
            onChange={(e) => setRows(e.target.value)}
            placeholder="rows"
            style={{
              width: "100px",
              height: "30px",
              borderRadius: "5px",
              border: darkMode ? "" : "1px solid #75757528",
            }}
          />
          <input
            type="number"
            id="cols"
            name="cols"
            min={1}
            max={10}
            value={columns}
            onChange={(e) => setColumns(e.target.value)}
            placeholder="cols"
            style={{
              width: "100px",
              height: "30px",
              borderRadius: "5px",
              border: darkMode ? "" : "1px solid #75757528",
            }}
          />
          <button onClick={addTable} className="btn ">
            <div className="d-flex align-items-center gap-1">
              Add Table <GoTable size={20} />
            </div>
          </button>
        </div>
      </form>
    </div>
  );
}
