import { Request, Reponse } from 'exporess'

export interface CondominiumUseCase {
    execute(req: Request, res: Response): Promise<void>
}
