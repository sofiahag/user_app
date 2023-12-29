
import {getUsers} from './getUsers.js';

getUsers().then(async (users) => {

    const user_container = document.getElementById('container');

    for (const user of users.keys()) {
        const result = await fetch(`https://reqres.in/api/users/${user + 1}`);
        const data = await result.json();
        if (data.data) {
            const { id, email, first_name, last_name, avatar } = data.data;
            user_container.innerHTML += create_user_container(id, email, first_name, last_name, avatar);
        }
    }
    document.querySelectorAll('.user-card').forEach(card => {
        card.addEventListener('click', () => {
            const user_id = card.dataset.userId;
            display_user_modal(user_id);
        });
    });

});

const create_user_container = (id, email, first_name, last_name, avatar) => {
    return `
            <div class="user-card" data-user-id="${id}">
                <img class="avatar" src="${avatar}" alt="User Avatar">
                <h3>${first_name} ${last_name}</h3>
                <p>E-mail: ${email}</p>
            </div>
    `;
}

async function display_user_modal(user_id) {

    const modal = document.getElementById('user-modal');
    const close_button = document.getElementById('close-button');
    const modal_avatar = document.getElementById('modal-avatar');
    const modal_email = document.getElementById('modal-email');

    const result = await fetch(`https://reqres.in/api/users/${user_id}`);
    const user_data = await result.json();

    if (user_data.data) {

        const { email, avatar } = user_data.data;

        modal_avatar.src = avatar;
        modal_email.textContent = `Contact: ${email}`;
        modal_email.href = 'mailto:' + `${email}`;
        modal.style.display = 'flex';

        close_button.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
}

