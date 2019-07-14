import { func, object, string } from "prop-types";
import React, { Fragment } from "react";
import uuid4 from "uuid4";
import { Comment, Hero } from "../../types";

interface CommentsProps {
  hero: Hero;
  updateHero: (hero: Hero) => void;
  className: string;
}

const Comments = (props: CommentsProps) => {
  const { hero, updateHero, className } = props;
  const { converted } = hero;
  let comments = converted.comments || [];
  const save = () => {
    const form = document.getElementById("create-comment-form");
    if (form) {
      const nameInput = form.getElementsByTagName("input")[0];
      const commentTextarea = form.getElementsByTagName("textarea")[0];
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
    }
  };

  const removeComment = (comment: Comment) => {
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
            Kommentar: <textarea style={{ width: "100%" }} />
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
                  {comment.name}:{" "}
                  {comment.added ? (
                    <span
                      className="btn btn-secondary btn-remove-hero float-right mr-3"
                      onClick={() => removeComment(comment)}
                    >
                      X
                    </span>
                  ) : null}
                  <div className="pl-5">{comment.comment}</div>
                </span>
              </div>
            );
          }
          let key = "";
          if (comment.specialAbilityName) {
            key += comment.specialAbilityName + comment.specialAbility;
          }
          return (
            <div key={key}>
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
  updateHero: func,
  hero: object,
  className: string
};

export default Comments;
