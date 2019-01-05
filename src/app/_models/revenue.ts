import { Customer } 		from './customer';
import { Am } 				from './am';
import { Treg } 			from './treg';
import { Witel } 			from './witel';

export class Revenue {
	ID: number;
	COUNTAM: number;
	TARGET: number;
	REAL: number;
	ACHIEVE: number;
	CATEGORY: string;
	PERIODE: string;

	customer: Customer;
	am: Am;
	treg: Treg;
	witel: Witel;
}
