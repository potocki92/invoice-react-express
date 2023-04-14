const productFormInput = (newProduct) => [
  {
    className: "input",
    name: "productsName",
    value: newProduct.productsName,
    placeholder: "Enter Product Name",
    required: true,
  },
  {
    className: "input",
    name: "productsPrice",
    value: newProduct.productsPrice,
    placeholder: "Enter Product Price",
    required: true,
  },
];
export { productFormInput };
