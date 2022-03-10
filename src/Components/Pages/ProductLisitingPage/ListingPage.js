import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { controlFilter } from '../../../Redux/PLP/listingPage';
import ProductCard from './ProductCard';
import './plp.css';

const mapDispatchToProps = () => ({
  controlFilter,

});

class ListingPage extends Component {
  filterAction(value) {
    const { controlFilter } = this.props;
    controlFilter(value);
  }

  render() {
    const { products } = this.props;
    const filteredData = products.filter((product) => product.selected === true);

    const filterBtn = products.reduce((acc, value) => {
      if (!acc.includes(value.name)) {
        acc.push(value.name);
      }
      return acc;
    }, ['all']);

    return (
      <section className="listing-page d-flex f-col a-center j-center">
        <div className="category-header d-flex a-center">
          {
            filteredData.length > 0
              ? <h1 className="category-name">{filteredData[0].name}</h1>
              : <h1 className="category-name">{products[0].name}</h1>
          }
          <select className="category-filter" onChange={(e) => this.filterAction(e.target.value)}>
            {filterBtn.map((btn) => (
              <option value={btn} key={btn}>
                {' '}
                {btn}
              </option>
            ))}
          </select>
        </div>
        <div className="products-cont d-flex a-center">
          {filteredData.length > 0 ? filteredData[0].products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              productName={product.name}
              stock={product.inStock}
              prices={product.prices}
              gallery={product.gallery}
              attribute={product.attributes}
              cart={product.selected}
            />
          )) : products[0].products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              productName={product.name}
              stock={product.inStock}
              prices={product.prices}
              gallery={product.gallery}
              attribute={product.attributes}
              cart={product.selected}
            />
          )) }
        </div>

      </section>
    );
  }
}

ListingPage.propTypes = ({
  products: PropTypes.arrayOf(Object).isRequired,
  controlFilter: PropTypes.func.isRequired,
});

export default connect(null, mapDispatchToProps())(ListingPage);
