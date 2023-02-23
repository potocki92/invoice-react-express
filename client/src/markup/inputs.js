const markup = (item, handleChange) => {
  return (
    <div className="form__group">
      <p>{item.inputName}</p>
      <input
        type={item.type}
        name={item.name}
        value={item.value}
        onChange={handleChange}
        placeholder={item.placeholder}
      ></input>
    </div>
  );
};

export default markup;
