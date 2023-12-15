import { baseUrl } from '../utils/constatns';
import jwt_decode from "jwt-decode";
/*const baseUrl = 'http://localhost:5000';*/

class ApiAuth {
    url = `${baseUrl}`;
    constructor() { }

    async registration(email, password) {
        return await fetch(`${this.url}/api/user/registration`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, role: 'User' })
        })
            .then(this.checkStatus)
            .then(this.parseJSON);
    }

    async login(email, password) {
        return await fetch(`${this.url}/api/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        })
            .then(this.checkStatus)
            .then(this.parseJSON);
    }

    async check(token) {
        return await fetch(`${this.url}/api/user/auth`, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        })
            .then(this.checkStatus)
            .then(this.parseJSON);
    }

    async getCurrentUser(token) {
        return await fetch(`${this.url}/api/user/me`, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            }
        })
            .then(this.checkStatus)
            .then(this.parseJSON);
    }

    checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
          
            const httpErrorInfo = {
                status: response.status,
                statusText: response.statusText,
                url: response.url,
                message: response.message
            };
            console.log(
                `logging http details for debugging: ${JSON.stringify(httpErrorInfo)}`
            );

            let errorMessage = httpErrorInfo.message
            throw new Error(errorMessage);
        }
    }

    decode(response) {
        console.log(response.token)
        localStorage.setItem('token', response.token)
        return jwt_decode(response.token)
    }

    parseJSON(response) {
        return response.json();
    }
}

const apiAuth = new ApiAuth()
export default apiAuth