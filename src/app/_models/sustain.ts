import { Customer } 		from './customer';
import { Treg } 			from './treg';
import { Witel } 			from './witel';

export class Sustain {
	REVENUE: number;
	YESTERDAY: number;

	treg: Treg;
	witel: Witel;
	customer: Customer;
}
