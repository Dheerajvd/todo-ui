import { Injectable } from "@angular/core";
import { ApiService } from "../shared/services/api.service";
import { Endpoints } from "../shared/enums/endpoints.enum";

@Injectable({
    providedIn: 'root'
})

export class CustomerService {
    private endPoints: typeof Endpoints = Endpoints;
    constructor(private apiService: ApiService) {

    }

    loginUser(postData: any) {
        return new Promise((resolve, reject) => {
            let url = this.endPoints.USER_LOGIN;
            this.apiService.post(url, postData).then((resp) => {
                resolve(resp)
            }, (error) => {
                reject(error)
            })
        })
    }

    signUpUser(postData: any) {
        return new Promise((resolve, reject) => {
            let url = this.endPoints.USER_SIGNUP;
            this.apiService.post(url, postData).then((resp) => {
                resolve(resp)
            }, (error) => {
                reject(error)
            })
        })
    }

    getTodoList() {
        return new Promise((resolve, reject) => {
            let url = this.endPoints.TODO_BASIC;
            this.apiService.get(url).then((resp) => {
                resolve(resp);
            }, (error) => {
                reject(error)
            })
        })
    }

    createTodoItem(postData: any) {
        return new Promise((resolve, reject) => {
            let url = this.endPoints.TODO_BASIC;
            this.apiService.post(url, postData).then((resp) => {
                resolve(resp)
            }, (error) => {
                reject(error)
            })
        })
    }

    updateTodoItem(postData: any, id: string) {
        return new Promise((resolve, reject) => {
            let url = `${this.endPoints.TODO_BASIC_TWO}${id}`;
            this.apiService.put(url, postData).then((resp) => {
                resolve(resp)
            }, (error) => {
                reject(error)
            })
        })
    }

    getTodoItem(id: string) {
        return new Promise((resolve, reject) => {
            let url = `${this.endPoints.TODO_BASIC_TWO}${id}`;
            this.apiService.get(url).then((resp) => {
                resolve(resp)
            }, (error) => {
                reject(error)
            })
        })
    }

    deleteTodoItem(id: string) {
        return new Promise((resolve, reject) => {
            let url = `${this.endPoints.TODO_BASIC_TWO}${id}`;
            this.apiService.delete(url).then((resp) => {
                resolve(resp)
            }, (error) => {
                reject(error)
            })
        })
    }
}