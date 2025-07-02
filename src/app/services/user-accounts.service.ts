import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, API } from '../shared/services';

// Define the structure of a user
export interface User {
    id: string;
    username: string;
    phoneNumber: string;
    department: any;
    otpEnabled: string;
    status: 'ACTIVE' | 'INACTIVE';
    roles: any[];
}

@Injectable({
    providedIn: 'root'
})
export class UserAccountsService {

    constructor(private service: ApiService) { }

    getUsers(page: number, size: number, sortField: string, sortOrder: string, search: string | null, status: 'ACTIVE' | 'INACTIVE' | null): Observable<any> {
        let url = `${API.AUTH}users?page=${page}&size=${size}&sort=${sortField},${sortOrder}`;
        if (search) {
            url += `&search=${search}`;
        }
        if (status) {
            url += `&status=${status}`;
        }
        return this.service.getAll(url);
    }

    deleteUser(userId: string): Observable<any> {
        return this.service.delete(`${API.AUTH}users/${userId}`);
    }

    updateUser(userId: string, data: any): Observable<any> {
        return this.service.updateToUrl(`${API.AUTH}users/${userId}`, data);
    }

    getRoles(): Observable<any> {
        return this.service.getAll(`${API.AUTH}roles?page=0&size=100`);
    }
} 