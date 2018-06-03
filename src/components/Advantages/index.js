import React, { Component } from 'react';
import proptypes from 'prop-types';
import RecursiveComponent from "../RecursiveComponent";

class App extends Component {
  render() {
    const { advantages } = this.props;
    return (
      <div className="col-md-12">
        <RecursiveComponent node={advantages} wrapper={'span'} />
        {/*{advantages.children.map(advantage => (*/}
          {/*<span key={advantage.attributes.name}>*/}
            {/*{advantage.attributes.name}*/}
            {/*{advantage.attributes.value*/}
              {/*? ` (${advantage.attributes.value})`*/}
              {/*: ''}*/}
          {/*</span>*/}
        {/*))}*/}
      </div>
    );
  }
}

App.propTypes = {
  advantages: proptypes.object
};

export default App;
