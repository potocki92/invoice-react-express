import React from "react";
import "./ModalCard.css";

class ModalCard extends React.Component {

  render() {
    return (
      <div className="container-product">
        <form
          className="details__box"
          onSubmit={(e) => this.props.handleClick(e)}
        >
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
          <div className="form__group">
            <p>Tax</p>
            {this.props.taxRate.length ? (
              <select
                className="custom-select"
                name="productsTax"
                onChange={this.props.handleVatChange}
              >
                <option value={""}>Select the TAX</option>
                {this.props.taxRate.map((vat, index) => (
                  <option key={index} value={index}>
                    {vat.name}
                  </option>
                ))}
              </select>
            ) : (
              <div></div>
            )}
          </div>
          <button className="button" type="submit">
            Add
          </button>
        </form>
      </div>
    );
  }
}

export {ModalCard}