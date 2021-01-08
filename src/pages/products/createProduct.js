import React, { Component } from 'react';

import { CollectionsPage } from '../../components/collectionsPage'
import { createProduct } from '../../api/api'

class CreateProduct extends Component {
  state = { action: '新增' }
  render() {
    return (
      <CollectionsPage
        {...this.props}
        action={this.state.action}
        actionApi={createProduct} 
      />
    );
  }
}

export default CreateProduct;