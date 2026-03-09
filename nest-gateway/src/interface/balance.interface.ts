import { Observable } from "rxjs";

export interface BalanceService {
    getBalance(data: {userId: string}) : Observable<any>;
} 