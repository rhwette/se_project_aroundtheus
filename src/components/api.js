class Api {
    constructor({ baseUrl, authToken}) {
        this._baseUrl = baseUrl;
        this._authToken = authToken;
    }
// GET //https://around.nomoreparties.co/v!/group-12/cards"
getCardList() {
    return fetch(`${this._baseUrl}/cards`, {
        method: "GET",
        headers: {
            authorization: this._authToken,
            "Content-type": "application/json",
        }
    })
    .then(res =>  res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)  )
    .catch((err) => {
        console.log(err)
    });
}
}

export default Api;

