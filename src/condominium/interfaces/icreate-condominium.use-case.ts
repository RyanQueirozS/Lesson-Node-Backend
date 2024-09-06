import { CondominiumModel, ICondominiumParams } from "../condominium.model";


export interface ICreateCondominiumUseCase {
    execute(condominium: ICondominiumParams): Promise<CondominiumModel>;
}
