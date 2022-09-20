import { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";

import JSONEditor from "./components/json-editor/JSONEditor.jsx";
import FormBuilder from "./components/form-builder/FormBuilder.jsx";
import ErrorFallback from "./ErrorFallback.jsx";

import "./App.css";
import exampleFormConfig from "./exampleForm.json";

const Screen = {
  editor: "editor",
  form: "form",
};

function App() {
  const [activeScreen, setToggle] = useState(Screen.editor);
  const [jsonFormConfig, setJsonFormConfig] = useState(null);

  function handleEditorResponse(jsonStringFormconfig) {
    const formConfig = JSON.parse(jsonStringFormconfig);
    setJsonFormConfig(formConfig);
    setToggle(Screen.form);
  }

  function handleTabChange(screen) {
    if (screen === activeScreen) {
      return null;
    }

    setToggle(screen);
  }

  function handleResetError() {
    setJsonFormConfig(null);
    setToggle(Screen.editor);
  }

  return (
    <main className="container">
      <h1>Veeam form configurator</h1>

      <nav className="tabs">
        <a
          href="#"
          onClick={() => handleTabChange("editor")}
          className={activeScreen === "editor" ? "active" : ""}
        >
          Editor
        </a>
        <a
          href="#"
          onClick={() => handleTabChange("form")}
          className={activeScreen === "form" ? "active" : ""}
        >
          Form (Rendered)
        </a>
      </nav>

      <section
        className={`workspace editor ${
          activeScreen === Screen.editor ? "show" : "hide"
        }`}
      >
        <JSONEditor
          retrieveEditorValue={handleEditorResponse}
          defaultFormConfig={JSON.stringify(exampleFormConfig, null, 2)}
        />
      </section>

      <section
        className={`workspace ${
          activeScreen === Screen.form ? "show" : "hide"
        }`}
      >
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={handleResetError}
        >
          <FormBuilder formTree={jsonFormConfig} />
        </ErrorBoundary>
      </section>
    </main>
  );
}

export default App;
