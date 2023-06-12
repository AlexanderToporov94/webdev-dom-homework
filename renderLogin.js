import { fetchLogin } from "./api.js";
import { renderComments } from "./render.js";
import { user } from "./api.js";
import { app } from "./script.js";

export let token = '';

export const renderLogin = () => {
    const auth = `
    <div class="add-form">
        <h3 class="title">Форма входа</h3>
        <input
            type="text"
            class="add-form-name add-form-login"
            placeholder="Введите логин"
            id="login"
        />
        <input
            type="password"
            class="add-form-name"
            placeholder="Введите пароль"
            id="password"
            style="margin-top: 20px"
        />

        <button id="auth-button" class="auth-button add-form-button">
        Войти
        </button>

        <button id="auth-toggle-button" class="auth-button add-form-button auth-toggle">
        Зарегестрироваться
        </button>
    </div>`;

    app.innerHTML = auth;

    const authButton = document.getElementById('auth-button');
    authButton.addEventListener('click', () => {
        const login = document.getElementById('login').value;
        const password = document.getElementById('password').value;
        fetchLogin(login,password).then((responseData) => {
            let newToken = `Bearer ${user.token} `;
            token = newToken;
            renderComments(app, responseData);
        });
    });
};





