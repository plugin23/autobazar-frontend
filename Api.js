fetchAPI = (url, method, bodyObject, token) => {
    bodyObject = JSON.stringify(bodyObject)

    const fetchObject = {
        method: method,
        headers: {
            'Content-type': 'application/json',
            'access-token': token
        },
        body: bodyObject
    }

    if(method == 'GET') delete fetchObject.body

    return new Promise(resolve => {
        fetch('https://fiit-autobazar-backend.herokuapp.com/' + url, fetchObject).then(response => response.json()).then(response => {
            resolve(response)
        })
    })
}

module.exports = {
    fetchAPI
}