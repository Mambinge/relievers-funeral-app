import { Plan } from "../../accounts/model/accounts";

export interface Dependent {
        policyHolderId: number,
        name: string,
        surname: string,
        idNumber: string,
        relationshipToMember: string,
        plan: Plan
}