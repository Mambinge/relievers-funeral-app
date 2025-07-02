import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, API } from 'src/app/shared/services';

export interface Policy {
    id: string;
    name: string;
    description: string;
    status: string;
    [key: string]: any;
}

@Injectable({
    providedIn: 'root'
})
export class PolicyService {

    constructor(private service: ApiService) { }

    getPolicies(page: number, size: number, sortField: string, sortOrder: string, search: string | null): Observable<any> {
        let url = `${API.SERVICE}policies?page=${page}&size=${size}&sort=${sortField},${sortOrder}`;
        if (search) {
            url += `&search=${search}`;
        }
        return this.service.getAll(url);
    }

    getPolicy(policyId: string): Observable<any> {
        return this.service.getAll(`${API.SERVICE}policies/${policyId}`);
    }

    updatePolicy(policyId: string, data: any): Observable<any> {
        return this.service.updateToUrl(`${API.SERVICE}policies/${policyId}`, data);
    }

    deletePolicy(policyId: string): Observable<any> {
        return this.service.delete(`${API.SERVICE}policies/${policyId}`);
    }
} 