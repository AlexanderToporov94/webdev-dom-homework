import {gettingCommentFromApi, userComments, sendingCommentFromApi} from "./api.js";
import { renderComments } from "./render.js";
import { renderLogin } from "./renderLogin.js";
const app = document.querySelector('.container');
gettingCommentFromApi();

const buttonNewComment = document.querySelector('.add-form-button');
const comment = document.querySelector('.comment');
const boxComments = document.querySelector('.comments');
const inputName = document.querySelector('.add-form-name');
const textAreaComment = document.querySelector('.add-form-text');
// const boxCommentsTexts = boxComments.querySelectorAll('.comment');
const formBox = document.querySelector('.add-form');
let loader = document.createElement('p');
let now = new Date();
export {app, buttonNewComment, comment, boxComments, inputName, textAreaComment, formBox, now};

const addLike = (e) => {
  const comment = userComments[e.target.dataset.id];
  comment.likes++;
  comment.Iliked = true;
}

const delLike = (e) => {
  const comment = userComments[e.target.dataset.id];
  comment.likes--;
  comment.Iliked = false;
}
    
const initLikeClick = () => {
  const likeClickElems = document.querySelectorAll('.likes');
  for (const likeClickElem of likeClickElems) {
    likeClickElem.addEventListener('click', (e) => {
      e.stopPropagation();
      (userComments[e.target.dataset.id].Iliked) ? delLike(e) : addLike(e);
      renderComments();
    })
  }
}
export {initLikeClick};

function addComment() {
  const container = document.querySelector('.container');
  formBox.classList.add('hidden');
  loader.className = "loader";
  loader.textContent = 'Комментарии загружаются...';
  container.appendChild(loader);

  gettingCommentFromApi();
  sendingCommentFromApi();
  renderComments();
  answerComment();
  inputName.value = '';
  textAreaComment.value = '';
}
export {loader};


const answerComment = () => {
  const boxCommentsTexts = document.querySelectorAll('.comment');
  boxCommentsTexts.forEach((comment) => {
    comment.addEventListener('click', () => {
      const author = comment.querySelector('.comment-header div:first-child').textContent;
      const text = comment.querySelector('.comment-text').textContent;
      textAreaComment.value = `@${author} \n\n > ${text}, `;
    });
  });
}
export {answerComment};

export function clickButtoNewComment () {
  buttonNewComment.addEventListener('click', function () {

    if (inputName.value === '') {
      inputName.classList.add('error');
      return;
    } if (textAreaComment.value === '') {
      textAreaComment.classList.add('error');
      return;
    } else {
      gettingCommentFromApi();
      addComment();
      inputName.classList.remove('error');
      textAreaComment.classList.remove('error');
    }
  });
}




