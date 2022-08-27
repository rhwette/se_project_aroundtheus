class Api {
    constructor({ baseUrl, authToken}) {
        this._baseUrl = baseUrl;
        this._authToken = authToken;
    }

// get all cards from server   
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

// get user info from server
// GET //https://around.nomoreparties.co/v!/group-12/users/me"
getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
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

// put new user info to the server
// PATCH //https://around.nomoreparties.co/v!/group-12/users/me"
addUserInfo( {name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
        method: "PATCH",
        headers: {
            authorization: this._authToken,
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            name,
            about
        })
    })
    
    .then(res =>  res.ok ? res.json() : Promise.reject(`Error: ${res.status}`) 
    )
    .catch((err) => {
        console.log(err)
    });
}

// add new card to display using 'new place' popup form
// POST //https://around.nomoreparties.co/v!/group-12/cards"
addCard( { name, link } ) {
    return fetch(`${this._baseUrl}/cards`, {
        method: "POST",
        headers: {
            authorization: this._authToken,
            "Content-type": "application/json",
        },
        body: JSON.stringify( {
            name,
            link
      } )
    })
    .then(res =>  res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)  )
    .catch((err) => {
        console.log(err)
    });
}

// delete card from display using 'garbage can'
// POST //https://around.nomoreparties.co/v!/group-12/cards/cardId"
removeCard( _id ) {
    return fetch(`${this._baseUrl}/cards/${_id}`, {
        method: "DELETE",
        headers: {
            authorization: this._authToken,
            "Content-type": "application/json",
        },

    })
    .then(res =>  res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)  )
    .catch((err) => {
        console.log(err) // log the error to the console
    });
}


}


export default Api;

