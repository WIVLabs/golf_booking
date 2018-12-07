import React from 'react';
import { css } from 'react-emotion';
import { HashLoader } from 'react-spinners';

const override = css`
    display: block;
    margin: 0 auto;
`;

// http://www.davidhu.io/react-spinners/
class Spinner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }
  render() {
    return (
      <div className='sweet-loading'>
          <HashLoader
              loading={this.state.loading}
              className={override}
              color={'#007bff'}
              size={50}
          />
      </div>
    )
  }
}

export default Spinner;
