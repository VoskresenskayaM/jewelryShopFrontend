
/*const baseUrl = 'http://localhost:5000';*/
import { baseUrl } from '../utils/constatns';

class ApiMain {
    url = `${baseUrl}`;

    constructor() { }

    async getAllProduct(params) {
        return await fetch(`${this.url}/api/product/?${params}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(this.checkStatus)
            .then(this.parseJSON);
    }

    async getProductAll() {
        return await fetch(`${this.url}/api/product/all`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(this.checkStatus)
            .then(this.parseJSON);
    }

    async addRating(data) {
        return await fetch(`${this.url}/api/product/rating`, {
            method: 'PUT',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: data
        })
            .then(this.checkStatus)
            .then(this.parseJSON);
    }

    async getUserRating(id) {
        return await fetch(`${this.url}/api/product/${id}/rating`, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(this.checkStatus)
            .then(this.parseJSON);
    }
     
    async getProductById(id){
        return await fetch(`${this.url}/api/product/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(this.checkStatus)
            .then(this.parseJSON);
    }

    async setLike(params){
        return await fetch(`${this.url}/api/user/like/?${params}`, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
        })
            .then(this.checkStatus)
            .then(this.parseJSON);
    }

    async deleteLike(params){
        console.log(params)
        return await fetch(`${this.url}/api/user/deleteLike/?${params}`, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
        })
            .then(this.checkStatus)
            .then(this.parseJSON);
    }

     async getAllUserLikes(params){
        return await fetch(`${this.url}/api/user/allUserLike/?${params}`, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
        })
            .then(this.checkStatus)
            .then(this.parseJSON);
     }

     async getAllProductRating(id){
        return await fetch(`${this.url}/api/product/${id}/rating`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(this.checkStatus)
            .then(this.parseJSON);
     }

     async createBasketProduct(data){
        return await fetch(`${this.url}/api/basket`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: data
        })
            .then(this.checkStatus)
            .then(this.parseJSON);
     }

     async getAllBasketProduct(id){
        return await fetch(`${this.url}/api/basket/${id}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            
        })
            .then(this.checkStatus)
            .then(this.parseJSON);
     }

     async changeCountBasketProduct(params){
        return await fetch(`${this.url}/api/basket/count/?${params}`, {
            method:"PUT",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
        })
            .then(this.checkStatus)
            .then(this.parseJSON);
     }

     async deleteBasketProduct(params){
        console.log(params)
        return await fetch(`${this.url}/api/basket/delete/?${params}`, {
            method:"DELETE",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            
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

    parseJSON(response) {
        return response.json();
    }
}

const apiMain = new ApiMain()
export default apiMain