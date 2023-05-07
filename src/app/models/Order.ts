export interface Order{
    id?: string;
    user_id: string;
    veznev: string;
    kernev: string;
    tel: string;
    irsz: string;
    varos: string;
    utca_hsz: string;
    product: Array<string>
}