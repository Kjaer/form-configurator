function Label(props) {
  const { labelText, ...restProps } = props;
  return (
    <label {...restProps}>
      <span>{labelText}</span>
      {props.children}
    </label>
  );
}

export default Label;
