import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { SessionService } from './session.service';

@Controller('session')
export class SessionController {
    constructor(private sessionService: SessionService) {}

    @Post('start')
    start() {
        return this.sessionService.startSession();
    }

    @Get(':id')
    getSession(@Param('id') id: string) {
        return this.sessionService.getSession(id);
    }

    @Post('answer')
    saveAnswer(@Body() body: { sessionId: string, screen: number, value: any}) {
        return this.sessionService.saveAnswer(body.sessionId, body.screen, body.value);
    }
}
