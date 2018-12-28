import React from 'react';
import { css } from 'react-emotion';
import { HashLoader, PacmanLoader } from 'react-spinners';

const override = css`
    display: block;
    margin: 0 auto;
`;

// http://www.davidhu.io/react-spinners/
class Spinner extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          loading: props.loading
        }
    }

    componentWillReceiveProps({loading}) {
        this.setState({
            loading: loading
        });

        this.forceUpdate();
    }

    render() {
        return (
            <div className='sweet-loading'>
              {/*<PacmanLoader*/}
                  {/*className={override}*/}
                  {/*color={'#007bff'}*/}
                  {/*size={25}*/}
                  {/*margin={2}*/}
              {/*/>*/}
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
