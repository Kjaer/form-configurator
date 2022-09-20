import "./App.css";

function ErrorFallback(props) {
  const { error, resetErrorBoundary } = props;

  return (
    <div className="error-section">
      <h4>An error occurred:</h4>
      <pre>{error.message}</pre>

      <button className="error-button" onClick={resetErrorBoundary}>
        <img
          src="https://icongr.am/fontawesome/arrow-left.svg?size=16&color=ffffff"
          alt="go back"
          className="button-icon"
        />
        Return to Editor
      </button>
    </div>
  );
}

export default ErrorFallback;
