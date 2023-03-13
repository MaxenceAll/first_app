const config = 
{
    dev : 
    {
        api: 
        {
            url : "http://localhost:5000/",
            authorization : "eyJhbGciOiJIUzI1NiJ9.IU1sX01PQVVHOFgpa1RrYmt1RjZdSmt5UkFPL1NELUs.6wuklfS6qogS2a4x9p5e_c17bqfMaGVNa-x5GxtQVJ4"
        }

    },
    prod : 
    {
        api:
        {
            url: "",
            authorization: "",
        }
    }
}

export default config[process.env.REACT_APP_ENV];