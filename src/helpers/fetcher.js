import config from "../config.js";

const fetcher = {};

const request = async (endpoint, params, method = "get", body = null ) => 
{
    const url = config.api.url + endpoint;
    const options = 
    {
        method,
        credentials : "include",
        headers: 
        {
            Authorization: config.api.authorization,
            "content-type": "application/json",
        },
        ...params
    }
    if (body && method !== "get") options.body = JSON.stringify(body);
    try
    {
        const resp = await fetch(url, options);
        const json = await resp.json();
        return json;
    }
    catch (error)
    {
        return {data: null, result: false, message: error};
    }
}


fetcher.get= async (endpoint, params = {}) => 
{
    return await request(endpoint, params);
}

fetcher.post= async (endpoint, body = {} , params = {}) => 
{
    return await request(endpoint, params, "post", body);
}

fetcher.put= async (endpoint, body = {} ,params = {}) => 
{
    return await request(endpoint, params, "put", body);
}

fetcher.patch= async (endpoint, body = {} ,params = {}) => 
{
    return await request(endpoint, params, "patch", body);
}

fetcher.delete= async (endpoint, body = {} ,params = {}) => 
{
    return await request(endpoint, params, "delete", body);
}

export default fetcher;
