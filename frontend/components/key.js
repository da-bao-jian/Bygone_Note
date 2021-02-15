const production = {
    url: {
        API_ROOT: 'https://bygone-note.herokuapp.com/',
        API_WS_ROOT: 'wss://bygone-note.herokuapp.com/cable'
    }
};

const development = {
    url: {
        API_ROOT: 'http://localhost:3000/?#/',
        API_WS_ROOT: 'ws://localhost:3000/cable'
    }
};

export const API_WS = process.env.NODE_ENV === 'development' ? development.url.API_WS_ROOT : production.url.API_WS_ROOT;