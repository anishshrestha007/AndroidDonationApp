export class donationModel {
	id: number;
	client_id: string;
	approximate_value: string;
	pickup_datetime: string;
	expiration_datetime: string;
	description: string;
	posted_by: number;
	posted_date: string;
	address: string;
	created_by: number;
	donation_type_id: number;
	donnar_type_id: number;
	full_name:string;
    contact_number:string;
	email:string;
	firebase_uid:string;
}