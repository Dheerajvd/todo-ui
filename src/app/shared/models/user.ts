export class User {
    user_id: string;
    email: string;
    authToken: string;
    userName: string;
    role: number;

    constructor(jsonObj: any) {
        this.user_id = jsonObj?._id || "";
        this.email = jsonObj?.email || "";
        this.authToken = jsonObj?.authToken || "";
        this.userName = jsonObj?.username || "";
        this.role = jsonObj?.role || 0;;
    }
}