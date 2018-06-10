import React, { Component, Fragment } from 'react';
import proptypes from 'prop-types';

class Comments extends Component {
  render() {
    const { comments, className } = this.props;
    console.log(comments);
    return (
      <div className={className}>
        <div className="pt-3">
          <span className="font-weight-bold pl-3">Kommentare</span>
          {comments.map(comment => {
            if (comment.name) {
              return (
                <div>
                  <span className="pl-4">
                    {comment.name}:{' '}
                    <div className="pl-5">{comment.comment}</div>
                  </span>
                </div>
              );
            }
            console.log(comment);
            return (
              <div>
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
