
/*const baseUrl = 'http://localhost:5000';*/
import { baseUrl } from '../utils/constatns';

class ApiAdmin {
    url = `${baseUrl}`;

    constructor() { }

    async getAllBrands() {
        return await fetch(`${this.url}/api/brand`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(this.checkStatus)
            .then(this.parseJSON);
    }
    async getOneBrand(id) {
        return await fetch(`${this.url}/api/brand/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(this.checkStatus)
            .then(this.parseJSON);
    }


    async getAllMaterials() {
        return await fetch(`${this.url}/api/material`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(this.checkStatus)
            .then(this.parseJSON);
    }

    async getOneMaterial(id) {
        return await fetch(`${this.url}/api/material/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(this.checkStatus)
            .then(this.parseJSON);
    }

    async getAllTypes(value) {
        return await fetch(`${this.url}/api/type`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(this.checkStatus)
            .then(this.parseJSON);
    }
    async getOneType(id) {
        return await fetch(`${this.url}/api/type/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(this.checkStatus)
            .then(this.parseJSON);
    }


    async createBrand(value) {
        return await fetch(`${this.url}/api/brand`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: value
            })

        }).then(this.checkStatus)
            .then(this.parseJSON);
    }

    async createType(value) {
        return await fetch(`${this.url}/api/type`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: value
            })

        }).then(this.checkStatus)
            .then(this.parseJSON);
    }

    async createMaterial(value) {
        return await fetch(`${this.url}/api/material`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: value
            })

        }).then(this.checkStatus)
            .then(this.parseJSON);
    }

    async createProduct(data) {
        return await fetch(`${this.url}/api/product`, {
            method: 'POST',
            /*body: JSON.stringify({
                name: product.name,
                price: product.price,
                brandId: product.brandId,
                typeId: product.typeId,
                img: product.img,
                description: product.description
            })*/
            body: data

        }).then(this.checkStatus)
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

const apiAdmin = new ApiAdmin()
export default apiAdmin

