class Api {
    constructor({ baseUrl, authToken}) {
        this._baseUrl = baseUrl;
        this._authToken = authToken;
    }

// GET all cards from server   
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

// GET user info from server
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

// PATCH new user info to the server
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

// POST new card to display using 'new place' popup form
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
// POST change to the server
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

// add a like to a card
// PUT https://around.nomoreparties.co/v1/groupId/cards/likes/cardId 
addLike(_id) {
    const myName = document.querySelector('.intro__name');
    const myAbout = document.querySelector('.intro__occupation');
    const myAvatar = document.querySelector('.intro__image');
    const myCohort = "12";
    const myOwnerId = "3f769460ee50cd15e754d8b8";
    console.log('id=', _id);
    return fetch(`${this._baseUrl}/cards/likes/${_id}`, {
        method: "PUT",
        headers: {
            authorization: this._authToken,
            "Content-type": "application/json",
        },
    })
    
    .then(res =>  {
        console.log('res=', res);
        res.ok ? res.json() : Promise.reject(`Error: ${res.status}`) 
    }
    )
    .catch((err) => {
        console.log(err)
    })
}

// remove a like from a card
// DELETE https://around.nomoreparties.co/v1/groupId/cards/likes/cardId 
removeLike(_id, name) {
    console.log('id=', _id);
    console.log('name=', name);
    return fetch(`${this._baseUrl}/cards/likes/${_id}`, {
        method: "DELETE",
        headers: {
            authorization: this._authToken,
            "Content-type": "application/json",
        },
    })
    
    .then(res =>  res.ok ? res.json() : Promise.reject(`Error: ${res.status}`) 
    )
    .catch((err) => {
        console.log(err)
    })
}

// add new avatar
// PATCH https://around.nomoreparties.co/v1/groupId/users/me/avatar 

addAvatar( {avatarLink} ) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: {
            authorization: this._authToken,
            "Content-type": "application/json",
        },
        body: JSON.stringify( {
            avatar: avatarLink
      })
    })
    .then(res =>  res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)  )
    .catch((err) => {
        console.log(err)
    });
}
}
export default Api;

