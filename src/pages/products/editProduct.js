import React, { Component } from 'react';

import { CollectionsPage } from '../../components/collectionsPage'
import { editProduct } from '../../api/api'

class EditProduct extends Component {
  state = { action: '编辑' }
  render() {
    return (
      <CollectionsPage
        {...this.props}
        action={this.state.action}
        actionApi={editProduct} 
      />
    );
  }
}

export default EditProduct;