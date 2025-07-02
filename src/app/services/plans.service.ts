import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, API } from 'src/app/shared/services';

export interface Plan {
    id: string;
    name: string;
    description: string;
    status: string;
    policyId: string;
    [key: string]: any;
}

@Injectable({
    providedIn: 'root'
})
export class PlansService {

    constructor(private service: ApiService) { }

    getPlansForPolicy(policyId: string): Observable<any> {
        return this.service.getAll(`${API.SERVICE}policies/${policyId}/plans`);
    }

    getPlan(planId: string): Observable<any> {
        return this.service.getAll(`${API.SERVICE}plan/${planId}`);
    }

    updatePlan(planId: string, data: any): Observable<any> {
        return this.service.updateToUrl(`${API.SERVICE}plan/${planId}`, data);
    }

    deletePlan(planId: string): Observable<any> {
        return this.service.delete(`${API.SERVICE}plan/${planId}`);
    }
} 