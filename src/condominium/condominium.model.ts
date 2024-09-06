import { ICondominiumParams } from "./interfaces/icondominium-params";

export class CondominiumModel {
    private _id: string;
    private _cnpj: string;
    private _name: string;
    private _address: string;
    private _logoPath: string;

    constructor(props: ICondominiumParams) {
        if (
            !props.id ||
            !props.cnpj ||
            !props.name ||
            !props.address ||
            !props.logoPath
        ) {
            return null;
        }

        this._id = props.id;
        this._cnpj = props.cnpj;
        this._name = props.name;
        this._address = props.address;
        this._logoPath = props.logoPath;
    }

    get getID() {
        return this._id;
    }
    get getCNPJ() {
        return this._cnpj;
    }
    get getName() {
        return this._name;
    }
    get getAddress() {
        return this._address;
    }
    get getLogoPath() {
        return this._logoPath;
    }
}
