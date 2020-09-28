import React, { Component } from "react";
import PreviewCollection from "../../components/preview-collection/PreviewCollection.component";

import shopData from "./shop.data";

class ShopPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collections: shopData,
    };
  }

  render() {
    const { collections } = this.state;
    return (
      <div className="shop-page">
        {collections.map(({ id, ...collectionProps }) => (
          <PreviewCollection key={id} {...collectionProps} />
        ))}
      </div>
    );
  }
}

export default ShopPage;
