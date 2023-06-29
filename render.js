import { comment, initLikeClick } from "./script.js";
import { answerComment } from "./script.js";
import { userComments } from "./api.js";
import { clickButtoNewComment } from "./script.js";
import { renderLogin } from "./renderLogin.js";
import { app } from "./script.js";
import { token } from "./renderLogin.js";


const renderComments = () => {

    if (!token) {
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
    } else {
        const commentHtml = userComments.map((comment,index) => {
            let Iliked = '';
            (comment.Iliked) ? Iliked = '-active-like' : Iliked = '';
            return `
            <li class="comment" style="margin-top: 20px">
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
    
        const addForm = document.createElement('div');
    
        const addFormHtml = `
        <div class="add-form">
            <input
            type="text"
            class="add-form-name"
            placeholder="Введите ваше имя"
            />
            <textarea
            type="textarea"
            class="add-form-text"
            placeholder="Введите ваш коментарий"
            rows="4"
            ></textarea>
            <div class="add-form-row">
                <button class="add-form-button">Написать</button>
            </div>
        </div>`;
    
        app.innerHTML = commentHtml;
        addForm.innerHTML = addFormHtml;
        app.appendChild(addForm);

        
        const inputName = document.querySelector('.add-form-name');
        const textAreaComment = document.querySelector('.add-form-text');

        clickButtoNewComment(inputName, textAreaComment);

    };

    initLikeClick();
    answerComment();
}

export {renderComments};

