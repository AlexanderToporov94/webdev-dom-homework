import { renderComments } from "./render.js";
import { formBox } from "./script.js";
import { inputName, textAreaComment } from "./script.js";
import { now } from "./script.js";
import { loader } from "./script.js";
import { app } from "./script.js";

let userComments = [];
export {userComments};

export let user = [];

const host = "https://webdev-hw-api.vercel.app/api/v2/alex-toporov/comments";
const loginHost = "https://wedev-api.sky.pro/api/user/login";

export function gettingCommentFromApi() {
  return fetch(host, {
    method: "GET",
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

gettingCommentFromApi();

export function fetchLogin(login,password) {
  return fetch(loginHost, {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    return response.json();
  })
  
  .then((responseData) => {
    return user = responseData.user;
  });
}

export function sendingCommentFromApi() {
  let shortName = inputName.value;
  let shortComment = textAreaComment.value;

  return fetch(host, {
    method: "POST",
    body: JSON.stringify({
      id: 1,
      date: `${now.toLocaleString().slice(0,-3)}`,
      likes: 0,
      isLiked: false,
      text: `${textAreaComment.value
      .replaceAll('<', '&lt;')
      .replaceAll('<', '&gt;')}`,
      name: inputName.value
      .replaceAll('<', '&lt;')
      .replaceAll('<', '&gt;'),
      forceError: false, 
    })
  })

    .then((response) => {
      if (response.status === 400) {
        alert('Введите больше трех символов');
        inputName.value = shortName;
        textAreaComment.value = shortComment;
      } else if (response.status === 500) {
        throw new Error('Сервер упал');
      } else {
        return response.json();
      }
    })

    .then((responseData) => {
      return userComments = responseData.comments;
    })

    .then(() => {
      return gettingCommentFromApi();
    })

    .then(() => {
      return renderComments();
    })

    .catch((error) => {
      if (error.message === 'Сервер упал') {
        alert('Сервер сломался, попробуйте позже');
      } else {
        alert('Кажется, у вас сломался интернет, попробуйте позже');
      }
      inputName.value = shortName;
      textAreaComment.value = shortComment;
    })

    .then((data) => {
      loader.classList.add('hidden');
      formBox.classList.remove('hidden');
    });
}



