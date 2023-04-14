/*
    It takes props as input, which include an object called "input" containing information about the input field,
     such as its name, value, type, placeholder, and whether it is required. The component renders an HTML input 
     element with these properties, along with a label showing the input field's name. When the value of the input 
     field changes, the handleChange function is called. This component is meant to be reusable for multiple input 
     fields in a form.
*/

const InputField = (props) => {
  return (
    <div className="form__group">
      <p>{props.input.name}</p>
      <input
        className={props.input.className}
        type={props.input.typeText}
        name={props.input.name}
        value={props.input.value}
        onChange={props.handleChange}
        placeholder={props.input.placeholder}
        required={props.input.required}
      />
    </div>
  );
};

export default InputField;
