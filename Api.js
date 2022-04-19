export const fetchAPI = (url, method, bodyObject) => {
    bodyObject = JSON.stringify(bodyObject)

    const fetchObject = {
        method: method,
        headers: {
            'Content-type': 'application/json'
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

