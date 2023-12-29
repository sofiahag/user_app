
const USER_LIST = [];

export const getUsers = async () => {
    const result = await fetch('https://reqres.in/api/users/');
    const data = await result.json();
    for (const [key, val] of Object.entries(data)){
        USER_LIST.push(val);
    }
    return USER_LIST;
}

