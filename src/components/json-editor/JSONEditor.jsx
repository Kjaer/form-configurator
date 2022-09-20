import { useRef, useState } from "react";

import Editor from "@monaco-editor/react";

import "./JSONEditor.css";

import exampleFrom from "../../exampleForm.json";
import "./useWorker";

function JSONEditor(props) {
  const [isValid, setValidState] = useState(true);
  const editorRef = useRef(null);
  const monacoRef = useRef(null);
  debugger;
  const { retrieveEditorValue, defaultFormConfig } = props;

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    monacoRef.current = monaco;
  }

  function render() {
    if (isValid) {
      retrieveEditorValue(editorRef.current.getValue());
    } else {
      retrieveEditorValue(null);
    }
  }

  function handleEditorValidation(markers) {
    // log errors in the console.
    markers.forEach((marker) => console.log("onValidate:", marker.message));

    setValidState(markers.length === 0);
  }

  return (
    <>
      <aside className="create-form-button-wrapper">
        <button
          type="button"
          className="create-form-button"
          onClick={render}
          disabled={!isValid}
        >
          CREATE FORM
          <img
            src="https://icongr.am/octicons/play.svg?size=24&color=ffffff"
            alt="render form"
            hspace="10"
          />
        </button>
      </aside>

      <Editor
        height="600px"
        width="100%"
        defaultLanguage="json"
        theme="vs-dark"
        options={{
          fontSize: 14,
        }}
        defaultValue={defaultFormConfig || ""}
        onMount={handleEditorDidMount}
        onValidate={handleEditorValidation}
      />
    </>
  );
}

export default JSONEditor;
