/**********************************************************
  This class represents a modal window component that displays a form for adding a new product to a list. 
  The form includes fields for the product name and price, as well as checkboxes for selecting the applicable tax rate. 
  The component also includes event handlers for handling form submission and checkbox selection, 
  and manages the state of the selected tax rate.
**********************************************************/
import React from "react";
import "./ProductForm.css";
import InputField from "../InputField/InputField";
import { productFormInput } from "./productFormInputs";

class ProductForm extends React.Component {
  state = {
    checked: false,
    selectedTaxIndex: -1,
  };

  /*
    This function is triggered when the user selects or unselects a tax rate checkbox. 
    It gets the index of the checkbox that was changed and its corresponding value. 
    Then, based on the current state of selectedTaxIndex, it either sets the value of 
    selectedTaxIndex to the clicked checkbox index or resets it to -1. 
    Finally, it calls the handleVatChange function with the event and the selected index.
  */
  handleCheckboxChange = (event) => {
    console.log(event);
    const index = parseInt(event.target.value);
    const value = this.props.taxRate[index];
    console.table(value);

    if (this.state.selectedTaxIndex === index) {
      this.setState({ selectedTaxIndex: -1 });
      this.props.handleVatChange(event, -1);
    } else {
      this.setState({ selectedTaxIndex: index });
      this.props.handleVatChange(event, index);
    }
  };
  /*
    This function is triggered when the user submits the form. 
    It prevents the default form submission behavior, 
    calls the handleClick function passed down as a prop, 
    and resets the state of selectedTaxIndex and checked to their default values.
  */
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.handleClick(event);
    this.setState({ selectedTaxIndex: -1, checked: false });
  };

  render() {
    return (
      <div className="container-product">
        <form className="details__box" onSubmit={this.handleSubmit}>
          <div className="form__group">
            <p>Product Name</p>
            <input
              type={"text"}
              name={"productsName"}
              value={this.props.newProduct.productsName}
              onChange={this.props.handleChange}
              className="input"
              placeholder={"Product name"}
              required
            />
          </div>
          <div className="form__group">
            <p>Product Price</p>
            <input
              type={"number"}
              name={"productsPrice"}
              value={this.props.newProduct.productsPrice}
              onChange={this.props.handleChange}
              className="input"
              placeholder={"Product price"}
              required
            />
          </div>
          <div className="form__group ">
            <p>Tax</p>
            <div className="checkbox__container">
              {this.props.taxRate.map((tax, index) => (
                <div className="checkbox__card" key={index}>
                  <input
                    className="input-checkbox"
                    name={"productsTax"}
                    type="checkbox"
                    value={index}
                    checked={this.state.selectedTaxIndex === index}
                    onChange={this.handleCheckboxChange}
                  />
                  <p className="checkbox__text">{tax.name}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="form__group ">
            <p>Tax</p>
            <div className="checkbox__container">
              {this.props.taxRate.map((tax, index) => (
                <div className="checkbox__card" key={index}>
                  <input
                    className="input-checkbox"
                    name={"productsTax"}
                    type="checkbox"
                    value={index}
                    checked={this.state.selectedTaxIndex === index}
                    onChange={this.handleCheckboxChange}
                  />
                  <p className="checkbox__text">{tax.name}</p>
                </div>
              ))}
            </div>
          </div>
          <button className="button" type="submit">
            Add
          </button>
        </form>
      </div>
    );
  }
}

export { ProductForm };
