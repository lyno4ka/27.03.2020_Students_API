const ajax = {
    get(endpoint) {
        return fetch(endpoint).then(response => response.json());
    },
    post() {},
    put() {},
    delete(endpoint) {
        return fetch(endpoint, { method: 'DELETE' }).then(response => response.json());
    }
};

export default ajax;