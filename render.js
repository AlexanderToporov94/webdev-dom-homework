import { comment, initLikeClick } from "./script.js";
import { answerComment } from "./script.js";
import { userComments } from "./api.js";
import { boxComments } from "./script.js";
import { renderLogin } from "./renderLogin.js";
import { app } from "./script.js";


let token = "Bearer ksdfsksdfjfsdjk";

token = null;


const renderComments = () => {

    const commentHtml = userComments.map((comment,index) => {
        let Iliked = '';
        (comment.Iliked) ? Iliked = '-active-like' : Iliked = '';
        return `
        <li class="comment">
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

    const linkLogin = document.createElement('div');

    const appHtml = `
    <div class='form-loading' style="margin-top: 20px">
        Что бы добавить комментарий, <a href='#' id='go-to-login' href="">Авторизуйтесь</a>
    </div>`;

    app.innerHTML = commentHtml;
    linkLogin.innerHTML = appHtml;
    app.appendChild(linkLogin);

    const authLink = document.getElementById('go-to-login');
    authLink.addEventListener('click', () => {
    renderLogin();
    });

    initLikeClick();
    answerComment();
}

export {renderComments};

