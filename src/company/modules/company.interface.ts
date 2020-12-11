import { UserI } from "src/user/modules/user.interface";

export interface CompanyI {
    id: string;
    name: string;
    address: string;
    serviceOfActivity: string;
    numberOfEmployees: number;
    description: string;
    type: string;
    user?: UserI[];
}