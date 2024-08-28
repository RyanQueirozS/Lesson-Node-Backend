export interface ICondominiumModel {
    id: string;
    cnpj: string;
    name: string;
    addres: string;
    logoPath: string;
}

export class CondominiumModel {
    private _id: string;
    private _cnpj: string;
    private _name: string;
    private _addres: string;
    private _logoPath: string;

    constructor(props: ICondominiumModel) {
        this._id = props.id;
        this._cnpj = props.cnpj;
        this._name = props.name;
        this._addres = props.addres;
        this._logoPath = props.logoPath;
    }

    get getID() { return this._id; }
    get getCNPJ() { return this._cnpj; }
    get getName() { return this._name; }
    get getAddress() { return this._addres; }
    get getLogoPath() { return this._logoPath; }
}
