import { BadRequestException } from '@nestjs/common'

export class BusinessRuleException extends BadRequestException {
    constructor(message: string, code: string) {
        console.log('[BusinessRuleException]', code, message)

        super({
            code
        })
    }
}
