

export const userService = {
    login,
    logout
};

function data(username, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (username === "test" && password === "test") {
                resolve({ ok: true, text: () => Promise.resolve(username) });
            } else {
                reject('Username or password is incorrect');
            }
            return;
        }, 100);
    });
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text;
        if (!response.ok) {
            const error = (data)
            return Promise.reject(error);
        }
        return Promise.resolve(data);
    });
}

function login(username, password) {
    return new Promise((resolve, reject) => {
        data(username, password).then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', user);
            return resolve(user);
        }, err=> {
            return reject(err);
        });
    });
}

function logout() {
    localStorage.removeItem('user');
}