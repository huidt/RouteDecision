
export const $hPost = async function (api, data) {
    try {
        const url = `http://yapi.smart-xwork.cn/mock/86498/api/${api}`
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'user-agent': 'Chrome',
                'Content-Type': 'application/json'
            })
        })
        const res = await response.json();
        return res;
    } catch (err) {
        console.log(err);

    }
}

export const $hGet = async function (api, params) {
    try {
        let url = `http://yapi.smart-xwork.cn/mock/86498/api/${api}`
        await fetch(url, {
            body: JSON.stringify(params),
            headers: {
                'user-agent': 'Chrome',
                'content-type': 'application/json'
            },
            method: 'GET',
        }).then(function (res) {
            if (!res.ok) {
                throw new Error('HTTP error, status = ' + res.status);
            }
            return res.json();
        })
    } catch (err) {
        console.log(err);
    }
}
