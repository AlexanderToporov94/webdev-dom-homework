import {getApi, userComments, fetchPromise} from "./api.js";
import { renderComments } from "./render.js";
const buttonNewComment = document.querySelector('.add-form-button');
const comment = document.querySelector('.comment');
const boxComments = document.querySelector('.comments');
const inputName = document.querySelector('.add-form-name');
const textAreaComment = document.querySelector('.add-form-text');
const boxCommentsTexts = boxComments.querySelectorAll('.comment');
const formBox = document.querySelector('.add-form');
let loader = document.createElement('p');
let now = new Date();
export {buttonNewComment, comment, boxComments, inputName, textAreaComment, boxCommentsTexts, formBox, now};


// let userComments = [];

// function getApi() {
//   return fetch("https://webdev-hw-api.vercel.app/api/v1/alex-toporov/comments", {
//     method: "GET"
//   })

//   .then((response) => {
//     return response.json();
//   })

//   .then((responseData) => {
//     const appComments = responseData.comments.map((comment) => {
//       return {
//         name: comment.author.name,
//         date: new Date(comment.date).toLocaleString().slice(0,-3),
//         text: comment.text,
//         likes: comment.likes,
//         isLiked: false,
//       };
//     });
//     userComments = appComments;
//     console.log(userComments);
//     renderComments();
//   })
// }

getApi();

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
initLikeClick();
export {initLikeClick};

const answerComment = () => {
  const boxCommentsTexts = document.querySelectorAll('.comment');
  boxCommentsTexts.forEach((comment) => {
    comment.addEventListener('click', (e) => {
      const author = comment.querySelector('.comment-header div:first-child').textContent;
      const text = comment.querySelector('.comment-text').textContent;
      textAreaComment.value = `@${author} \n\n > ${text}, `;
    });
  });
}
answerComment();
export {answerComment};

// const renderComments = () => {
//   const commentHtml = userComments.map((comment,index) => {
//     (comment.Iliked) ? Iliked = '-active-like' : Iliked = '';
//     return `<li class="comment">
//       <div class="comment-header">
//         <div class="comment-user-name">${comment.name}</div>
//         <div class="comment-date">${comment.date}</div>
//       </div>
//       <div class="comment-body">
//         <div class="comment-text">
//           ${comment.text}
//         </div>
//       </div>
//       <div class="comment-footer">
//         <div class="likes">
//           <span class="likes-counter">${comment.likes}</span>
//           <button class="like-button ${Iliked}" data-id='${index}'></button>
//         </div>
//       </div>
//     </li>`;
//   }).join('');

//   boxComments.innerHTML = commentHtml;
//   initLikeClick();
//   answerComment();
// }

renderComments();

function addComment() {
  const container = document.querySelector('.container')
  formBox.classList.add('hidden');
  // let loader = document.createElement('p');
  loader.className = "loader";
  loader.textContent = 'Комментарии загружаются...';
  container.appendChild(loader);

  // const fetchPromise = fetch("https://webdev-hw-api.vercel.app/api/v1/alex-toporov/comments", {
  //   method: "POST",
  //   body: JSON.stringify({
  //     id: 1,
  //     date: `${now.toLocaleString().slice(0,-3)}`,
  //     likes: 0,
  //     isLiked: false,
  //     text: `${textAreaComment.value
  //     .replaceAll('<', '&lt;')
  //     .replaceAll('<', '&gt;')}`,
  //     name: inputName.value
  //     .replaceAll('<', '&lt;')
  //     .replaceAll('<', '&gt;'),
  //     forceError: false, 
  //     })
  //   })

  //   .then((response) => {
  //     if (response.status === 400) {
  //       alert('Введите больше трех символов');
  //       inputName.value = shortName;
  //       textAreaComment.value = shortComment;
  //     } else if (response.status === 500) {
  //       throw new Error('Сервер упал');
  //     } else {
  //       return response.json();
  //     }
  //   })

  //   .then((responseData) => {
  //     return userComments = responseData.comments;
  //   })

  //   .then(() => {
  //     return getApi();
  //     return renderComments();
  //   })

  //   .catch((error) => {
  //     if (error.message === 'Сервер упал') {
  //       alert('Сервер сломался, попробуйте позже');
  //     } else {
  //       alert('Кажется, у вас сломался интернет, попробуйте позже');
  //     }
  //     inputName.value = shortName;
  //     textAreaComment.value = shortComment;
  //   })

  //   .then((data) => {
  //     loader.classList.add('hidden');
  //     formBox.classList.remove('hidden');
  //   });
  fetchPromise();
  getApi();
  renderComments();
  answerComment();
  inputName.value = '';
  textAreaComment.value = '';
}
export {loader};

addComment();

buttonNewComment.addEventListener('click', function () {
  // let oldComments = boxComments.innerHTML;

  if (inputName.value === '') {
    inputName.classList.add('error');
    return;
  } if (textAreaComment.value === '') {
    textAreaComment.classList.add('error');
    return;
  } else {
    getApi();
    addComment();
    inputName.classList.remove('error');
    textAreaComment.classList.remove('error');
  }
});
