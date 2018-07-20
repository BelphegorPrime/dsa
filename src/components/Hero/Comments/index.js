import React, { Component, Fragment } from 'react';
import proptypes from 'prop-types';

class Comments extends Component {
  render() {
    const { comments, className } = this.props;
    return (
      <div className={className}>
        <div className="pt-2">
          <span className="font-weight-bold pl-2">Kommentare</span>
          {comments.map(comment => {
            if (comment.name) {
              return (
                <div key={comment.name + comment.comment}>
                  <span className="pl-4">
                    {comment.name}:{' '}
                    <div className="pl-5">{comment.comment}</div>
                  </span>
                </div>
              );
            }
            return (
              <div key={comment.specialAbilityName + comment.specialAbility}>
                <span className="pl-4">
                  {comment.specialAbilityName} ({comment.specialAbility})
                  <div className="pl-5">
                    {comment.cost ? (
                      <Fragment>
                        {` Kosten: ${comment.cost}`}
                        <br />
                      </Fragment>
                    ) : null}
                    {comment.duration ? (
                      <Fragment>
                        {` Zauberdauer: ${comment.duration}`}
                        <br />
                      </Fragment>
                    ) : null}
                    {comment.effect ? (
                      <Fragment>
                        {` Effekt: ${comment.effect}`}
                        <br />
                      </Fragment>
                    ) : null}
                  </div>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

Comments.propTypes = {
  comments: proptypes.array,
  className: proptypes.string
};

export default Comments;
