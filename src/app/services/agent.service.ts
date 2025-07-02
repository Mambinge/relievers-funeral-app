import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, API } from 'src/app/shared/services';

export interface Agent {
    id: string;
    agentId: string;
    name: string;
    surname: string;
    nationalId: string;
    phoneNumber: string;
    [key: string]: any;
}

@Injectable({
    providedIn: 'root'
})
export class AgentService {

    constructor(private service: ApiService) { }

    getAgents(page: number, size: number, sortField: string, sortOrder: string, search: string | null): Observable<any> {
        let url = `${API.CLIENTS}agents?page=${page}&size=${size}&sort=${sortField},${sortOrder}`;
        if (search) {
            url += `&search=${search}`;
        }
        return this.service.getAll(url);
    }

    getAgent(agentId: string): Observable<any> {
        return this.service.getAll(`${API.CLIENTS}agents/${agentId}`);
    }

    updateAgent(agentId: string, data: any): Observable<any> {
        return this.service.updateToUrl(`${API.CLIENTS}agents/${agentId}`, data);
    }

    deleteAgent(agentId: string): Observable<any> {
        return this.service.delete(`${API.CLIENTS}agents/${agentId}`);
    }
} 