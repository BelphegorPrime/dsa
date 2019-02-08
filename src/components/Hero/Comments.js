/* eslint-disable no-undef */
import React, { Fragment } from 'react';
import proptypes from 'prop-types';
import uuid4 from 'uuid4';

const Comments = props => {
  const { hero, updateHero, className } = props;
  const { converted } = hero;
  let comments = converted.comments || [];
  const save = () => {
    const nameInput = document
      .getElementById('create-comment-form')
      .getElementsByTagName('input')[0];
    const commentTextarea = document
      .getElementById('create-comment-form')
      .getElementsByTagName('textarea')[0];
    comments = [
      {
        id: uuid4(),
        name: nameInput.value,
        comment: commentTextarea.value,
        added: true
      },
      ...comments
    ];
    updateHero(hero);
  };

  const removeComment = comment => {
    comments = comments.filter(c => c.id !== comment.id);
    updateHero(hero);
  };

  return (
    <div className={className}>
      <div className="pt-2">
        <span className="font-weight-bold pl-2">Kommentare</span>
        <div id="create-comment-form" className="p-2 pl-4 pr-4">
          <div>
            Name: <input />
          </div>
          <div>
            Kommentar: <textarea style={{ width: '100%' }} />
          </div>
          <div className="btn btn-primary" onClick={save}>
            Speichern
          </div>
        </div>
        {comments.map((comment, index) => {
          if (comment.name) {
            return (
              <div key={index + comment.name + comment.comment}>
                <span className="pl-4">
                  {comment.name}:{' '}
                  {comment.added ? (
                    <span
                      className="btn btn-secondary btn-remove-hero float-right mr-3"
                      onClick={() => removeComment(comment)}>
                      X
                    </span>
                  ) : null}
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
};

Comments.propTypes = {
  updateHero: proptypes.func,
  hero: proptypes.object,
  className: proptypes.string
};

export default Comments;
