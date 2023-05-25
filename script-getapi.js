import { renderComments } from "./render";

import { userComments } from "./script";

export function getApi () {
  return fetch("https://webdev-hw-api.vercel.app/api/v1/alex-toporov/comments", {
    method: "GET"
  })

  .then((response) => {
    return response.json();
  })

  .then((responseData) => {
    const appComments = responseData.comments.map((comment) => {
      return {
        name: comment.author.name,
        date: new Date(comment.date).toLocaleString().slice(0,-3),
        text: comment.text,
        likes: comment.likes,
        isLiked: false,
      };
    });
    userComments = appComments;
    console.log(userComments);
    renderComments();
  })
}

getApi();