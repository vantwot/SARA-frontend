
async function checkTokenInDjango() {
    const jwt_on_local_storage = localStorage.getItem('jwt')
    const requestOptions = {
        mode: "cors",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            'jwt': jwt_on_local_storage,
        }),
    };
    //console.log(requestOptions);
    let response
    try {
        response = await fetch('http://127.0.0.1:8000/checkToken/', requestOptions).catch((error) => { return false });
    }
    catch {
        return false
    }

    const data = await response.json();

    if (data === "Token válido") {
        return true
    }
    else {
        return false
    }
}

export default checkTokenInDjango;