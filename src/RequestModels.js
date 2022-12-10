
export function fetchGetReq(url, queryParams = null, headers = null) {
    const fetchData = async () => {
        if (queryParams) {
            url = url + '?' + new URLSearchParams(queryParams)
        }
        const response = await fetch(url);
        const respJson = await response.json();
        if (response.status !== 200) {
            throw new Error(respJson)
        }
        return respJson;
    };
    return fetchData().then(response => {
        return response
    })
}

export function sendPostReq(url, payload = {}, headers = null) {
    const sendData = async () => {
        const response = await fetch(url, {
            method: 'POST', body: JSON.stringify(payload), headers: {
                'Content-Type': 'application/json;charset=utf-8', headers
            }
        });
        const respJson = await response.json();
        if (response.status !== 200) {
            throw new Error(respJson)
        }
        return respJson;
    };
    return sendData().then(response => {
        return response
    })
}

export function sendPutReq(url, payload = {}, queryParams=null, headers = null) {
    const sendData = async () => {
        if (queryParams){
            url = url + '?' + new URLSearchParams(queryParams)
        }
        const response = await fetch(url, {
            method: 'PUT', body: JSON.stringify(payload), headers: {
                'Content-Type': 'application/json;charset=utf-8', headers
            }
        });
        const respJson = await response.json();
        if (response.status !== 200) {
            throw new Error(respJson)
        }
        return respJson;
    };
    return sendData().then(response => {
        return response
    })
}