const BASE_URL = "https://ruangapi.com/api/v1"
export default class API {
    fetchProvince = async() => {
        const response = await fetch(`${BASE_URL}/provinces`, {
            headers : {
                "authorization": process.env.REACT_APP_API_KEY,
                "accept": "application/json",
                "content-type": "application/json"
            },
            method : 'GET',
        })
        return response.json()
    }

    fetchCity = async(provinceID) => {
        const response = await fetch(`${BASE_URL}/cities?province=${provinceID}`, {
            headers : {
                "authorization": process.env.REACT_APP_API_KEY,
                "accept": "application/json",
                "content-type": "application/json"
            },
            method : 'GET',
        })
        return response.json()
    }

    fetchDistrict = async(cityID) => {
        const response = await fetch(`${BASE_URL}/districts?city=${cityID}`, {
            headers : {
                "authorization": process.env.REACT_APP_API_KEY,
                "accept": "application/json",
                "content-type": "application/json"
            },
            method : 'GET',
        })
        return response.json()
    }

    shipping = async(parameters = {}) => {
        const response = await fetch(`${BASE_URL}/shipping`, {
            method : "POST",
            headers : {
                "authorization": process.env.REACT_APP_API_KEY,
                "accept": "application/json",
                "content-type": "application/json"
            },
            body : JSON.stringify(parameters)
        })

        return response.json()
    }

    waybill = async(parameters = {}) => {
        const response = await fetch(`${BASE_URL}/waybill`, {
            method : "POST",
            headers : {
                "authorization": process.env.REACT_APP_API_KEY,
                "accept": "application/json",
                "content-type": "application/json"
            },
            body : JSON.stringify(parameters)
        })

        return response.json()
    }
}