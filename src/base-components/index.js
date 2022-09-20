import Input from "./Input.jsx";
import Button from "./Button.jsx";
import Label from "./Label.jsx";
import Form from "./Form.jsx";
import TextArea from "./TextArea.jsx";

export function componentLookup(component) {
  switch (component) {
    case "form":
      return Form;
    case "textarea":
      return TextArea;
    case "button":
    case "submit":
    case "reset":
      return Button;
    case "label":
      return Label;
    case "number":
    case "text":
    case "date":
    case "radio":
    case "checkbox":
      return Input;
    default:
      throw new Error(`component type [${component}] is not available`);
  }
}
