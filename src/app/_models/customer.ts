import { Witel }		from './witel';
import { Am }			from './am';
import { Account }			from './account';

export class Customer {
	ID: string;
	NAME: string;

	witel: Witel;
	ams: Am[];
	accounts: Account[];
}
