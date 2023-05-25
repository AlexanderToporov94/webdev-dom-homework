import { initLikeClick } from "./script";
import { answerComment } from "./script";
import { userComments } from "./script";
import { boxComments } from "./script";


const renderComments = () => {
    const commentHtml = userComments.map((comment,index) => {
        (comment.Iliked) ? Iliked = '-active-like' : Iliked = '';
        return `<li class="comment">
        <div class="comment-header">
            <div class="comment-user-name">${comment.name}</div>
            <div class="comment-date">${comment.date}</div>
        </div>
        <div class="comment-body">
            <div class="comment-text">
            ${comment.text}
            </div>
        </div>
        <div class="comment-footer">
            <div class="likes">
            <span class="likes-counter">${comment.likes}</span>
            <button class="like-button ${Iliked}" data-id='${index}'></button>
            </div>
        </div>
        </li>`;
    }).join('');

    boxComments.innerHTML = commentHtml;
    initLikeClick();
    answerComment();
}

export {renderComments};