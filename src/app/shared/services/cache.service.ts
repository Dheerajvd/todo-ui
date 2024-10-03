import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class Cache {
    user!: User;
    constructor() {
        this.getUserInfo();
        console.info("cache loaded", this.user);
    }
    getUserInfo() {
        let user_info = this.getToken("user_info");
        if (user_info === "token_not_found") {
            this.user = new User(null);
        } else {
            user_info = JSON.parse(user_info);
            this.user = new User(user_info)
        }
    }

    updateCache() {
        let user_info = JSON.stringify(this.user);
        this.setToken("user_info", user_info)
    }

    clearUserInfo(){
        sessionStorage.removeItem("user_info");
    }

    getToken(key: string): string {
        return sessionStorage.getItem(key) || "token_not_found";
    }

    setToken(key: string, value: string): void {
        sessionStorage.setItem(key, value)
    }

}