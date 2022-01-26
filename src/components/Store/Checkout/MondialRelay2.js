import React, { createRef, useEffect, useRef } from 'react';
import $ from 'jquery';
import { Button } from '@material-ui/core';

class MondialRelay2 extends React.Component {
  componentDidMount() {
    try {
      this.$el = $(this.el);
      window.MR_jQuery();
      window.$('#Zone_Widget').MR_ParcelShopPicker({
        Target: '#ParcelShopCode',
        Brand: 'BDTEST  ',
        Country: 'FR',
        OnParcelShopSelected: (data) => {
          console.log('data', data);
        },
      });
    } catch (err) {
      console.log('err', err);
    }
  }

  render() {
    return (
      <div>
        {/* <Button variant='contained' onClick={call}>
        Call
      </Button> */}
        <div id='Zone_Widget' ref={(el) => (this.el = el)}></div>
        <div id='ParcelShopCode' ref={(el) => (this.el2 = el)}></div>
      </div>
    );
  }
}

export default MondialRelay2;
