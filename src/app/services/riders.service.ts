import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, API } from 'src/app/shared/services';

export interface Rider {
    id: string;
    ecNumber: string;
    fullName: string;
    username: string;
    phoneNumber: string;
    name: string;
    description: string;
    status: 'ACTIVE' | 'INACTIVE';
}

@Injectable({
    providedIn: 'root'
})
export class RidersService {

    constructor(private service: ApiService) { }

    getRiders(page: number, size: number, sortField: string, sortOrder: string, search: string | null): Observable<any> {
        let url = `${API.SERVICE}riders?page=${page}&size=${size}&sort=${sortField},${sortOrder}`;
        if (search) {
            url += `&search=${search}`;
        }
        return this.service.getAll(url);
    }

    getRider(riderId: string): Observable<any> {
        return this.service.getAll(`${API.SERVICE}riders/${riderId}`);
    }

    updateRider(riderId: string, data: any): Observable<any> {
        return this.service.updateToUrl(`${API.SERVICE}riders/${riderId}`, data);
    }

    deleteRider(riderId: string): Observable<any> {
        return this.service.delete(`${API.SERVICE}riders/${riderId}`);
    }
} 