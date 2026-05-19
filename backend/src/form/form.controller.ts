import { Controller, Get } from '@nestjs/common';
import { formSchema } from './form.schema';

@Controller('form')
export class FormController{

    @Get('schema')
    getSchema() {
        return formSchema;
    }
}