import { Treg }		from './treg';
import { Customer }	from './customer';
import { Am }	from './am';

export class Witel {
	ID: string;
	NAME: string;

	treg: Treg;
	customers: Customer[];
	ams: Am[];
}
