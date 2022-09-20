import React, { useMemo } from "react";
import { nanoid } from "nanoid";

import { componentLookup } from "../../base-components/index.js";

import "./FormBuilder.css";

function FormBuilder(props) {
  const { formTree } = props;

  if (!formTree) {
    return (
      <h3 className="no-form">
        Please type JSON in the editor then hit "Create Form" in order to see
        the result!
      </h3>
    );
  }

  function createComponentTree(componentConfig) {
    const { children, type, id, ...props } = componentConfig;

    const Component = componentLookup(type);
    const genericId = nanoid();
    const componentsRequireType = ["Input", "Button"];

    const enhancedProps = {
      ...props,
      ...(componentsRequireType.includes(Component.name) ? { type } : null),
      ...(id ? { id } : { id: genericId }),
      key: genericId,
    };

    return React.createElement(
      Component,
      enhancedProps,
      children &&
        children.map((child) => {
          if (typeof child === "string") return child;

          return createComponentTree(child);
        })
    );
  }

  const memoizedForm = useMemo(() => createComponentTree(formTree), [formTree]);

  return <div>{memoizedForm}</div>;
}

export default FormBuilder;
