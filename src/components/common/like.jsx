import React from "react";

const Like = props => {
  let classes='';
  const pressedLike = "fas fa-heart";
  const unPressedLike = "far fa-heart";

  if (props.liked) classes = pressedLike;
  else classes = unPressedLike;

  return (
    <i
      onClick={props.onLike}
      style={{ cursor: "pointer" }}
      className={classes}
      aria-hidden="true"
    />
  );
};

export default Like;
