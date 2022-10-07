
function checkResponse(res) {
    if(res.ok) {
        return res.json();
    }
    return Promise.reject(`Error ${res.status}`);
    }

class Api {
    constructor({ baseUrl, authToken}) {
        this._baseUrl = baseUrl;
        this._authToken = authToken;
        //add definition of headers in the constructor
        //instead of repeating inside each method
        this._headers = {
            authorization: this._authToken,
            "Content-type": "application/json"
        }
    }



// GET all cards from server   
// GET //https://around.nomoreparties.co/v!/group-12/cards"
getCardList() {
    return fetch(`${this._baseUrl}/cards`, {
        method: "GET",
        //use the definition of headers from the constructor
        headers: this._headers
    })
       .then(checkResponse)
    //move catch to index.js
    // console.log('this._headers=', this._headers);
}

// GET user info from server
// GET //https://around.nomoreparties.co/v!/group-12/users/me"
getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
        method: "GET",
        //use the definition of headers from the constructor
        headers: this._headers
    })
       .then(checkResponse)
     //move catch to index.js
}

// PATCH new user info to the server
// PATCH //https://around.nomoreparties.co/v!/group-12/users/me"
async addUserInfo( {name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
        method: "PATCH",
        //use the definition of headers from the constructor
        headers: this._headers,
        body: JSON.stringify({
            name,
            about
        })
    })
    
    .then(checkResponse)
    .catch((err) => {
        console.log(err)
    });
}

// POST new card to display using 'new place' popup form
// POST //https://around.nomoreparties.co/v!/group-12/cards"
addCard( { name, link } ) {
    return fetch(`${this._baseUrl}/cards`, {
        method: "POST",
        //use the definition of headers from the constructor
        headers: this._headers,
        body: JSON.stringify( {
            name,
            link
      } )
    })
     .then(checkResponse)
    //move catch to index.js
}

// delete card from display using 'garbage can'
// POST change to the server
// POST //https://around.nomoreparties.co/v!/group-12/cards/cardId"
removeCard( _id ) {
    return fetch(`${this._baseUrl}/cards/${_id}`, {
        method: "DELETE",
        //use the definition of headers from the constructor
        headers: this._headers
    })
     .then(checkResponse)
    //move catch to card.js using 'try...catch'
}

// add a like to a card
// PUT https://around.nomoreparties.co/v1/groupId/cards/likes/cardId 
addLike(_id) {
    return fetch(`${this._baseUrl}/cards/likes/${_id}`, {
        method: "PUT",
        //use the definition of headers from the constructor
        headers: this._headers
    })
    
      .then(checkResponse)
    //move catch to card.js using 'try...catch'
}

// remove a like from a card
// DELETE https://around.nomoreparties.co/v1/groupId/cards/likes/cardId 
removeLike(_id, name) {
    return fetch(`${this._baseUrl}/cards/likes/${_id}`, {
        method: "DELETE",
        //use the definition of headers from the constructor
        headers: this._headers
    })
    .then(checkResponse)
    //move catch to card.js using 'try...catch'

}

// add new avatar
// PATCH https://around.nomoreparties.co/v1/groupId/users/me/avatar 

addAvatar( {avatarLink} ) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: "PATCH",
        //use the definition of headers from the constructor
        headers: this._headers,
        body: JSON.stringify( {
            avatar: avatarLink
      })
    })
     .then(checkResponse)
        //move catch to index.js
}
}
export default Api;

