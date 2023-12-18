//Importera API:n
import {getUsers} from './getUsers.js';

//Extrahera relevanta fält från användardatan och formattera 
getUsers().then(async (users) => {

    const user_container = document.getElementById('container');

    for (const user of users.values()) {
        const result = await fetch(`https://reqres.in/api/users/${user}`);
        const data = await result.json();
        //Om data.data inte är undefined
        if (data.data) {
            const { id, email, first_name, last_name, avatar } = data.data;
            user_container.innerHTML += create_user_container(id, email, first_name, last_name, avatar);
        }
    }
    //Lyssna efter klick på user cards och kalla på funktion for att visa modal med användarid:t
    document.querySelectorAll('.user-card').forEach(card => {
        card.addEventListener('click', () => {
            const user_id = card.dataset.userId;
            display_user_modal(user_id);
        });
    });

});

//Skapa användarcontainern
const create_user_container = (id, email, first_name, last_name, avatar) => {
    return `
            <div class="user-card" data-user-id="${id}">
                <img class="avatar" src="${avatar}" alt="User Avatar">
                <h3>${first_name} ${last_name}</h3>
                <p>Email: ${email}</p>
            </div>
    `;
}

// Gör API-anrop till https://reqres.in/api/users/ANVÄNDARID och skapa modalen
async function display_user_modal(user_id) {

    const modal = document.getElementById('user-modal');
    const close_button = document.getElementById('close-button');
    const modal_avatar = document.getElementById('modal-avatar');
    const modal_name = document.getElementById('modal-name');
    const modal_email = document.getElementById('modal-email');

    const result = await fetch(`https://reqres.in/api/users/${user_id}`);
    const user_data = await result.json();

    //Dubbelkolla att datan finns
    if (user_data.data) {

        const { first_name, last_name, email, avatar } = user_data.data;

        //Skapa modalen
        modal_avatar.src = avatar;
        modal_name.textContent = `${first_name} ${last_name}`;
        modal_email.textContent = `Email: ${email}`;
        //Gör det till en flexbox
        modal.style.display = 'flex';
        //Göm modal när closeknapp klickas
        close_button.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }
}

