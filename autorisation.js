import { boxComments } from "./script.js";
let autorisationLinkBox = document.createElement('div');

const autor = `
<div>
    <p>Чтобы оствлять комментарии необходимо авторизоваться</p>
    <a class = 'autoris-link'>Авторизация</a>
</div>
`;

autorisationLinkBox.innerHTML = autor;

export function autorization() {
    document.querySelector('.add-form').classList.add('hidden');
    const container = document.querySelector('.container');
    container.appendChild(autorisationLinkBox);

    const autorisLink = document.querySelector('.autoris-link');

    autorisLink.addEventListener('click', () => {
        boxComments.classList.add('hidden');

        const a = `<div class="comment-header">
        <div class="comment-user-name">Глеб Фокин</div>
        <div class="comment-date">12.02.22 12:18</div>
        </div>
        <div class="comment-body">
            <div class="comment-text">
            Это будет первый комментарий на этой странице
            </div>
        </div>
        <div class="comment-footer">
            <div class="likes">
            <span class="likes-counter">3</span>
            <button data-like="0" class="like-button"></button>
            </div>
        </div>`

        container.innerHTML = a;
    });
}

