import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { formSchema } from '../form/form.schema';
import { evaluateEligibility, Answers } from '../form/eligibility.evaluator';

@Injectable()
export class SessionService {
  constructor(private prisma: PrismaService) {}

  async startSession() {
    const session = await this.prisma.session.create({
      data: { status: 'in_progress' },
    });

    return {
      sessionId: session.id,
      screen: formSchema[0],
    };
  }

  async getSession(id: string) {
    const session = await this.prisma.session.findUnique({
      where: { id },
      include: { answers: true },
    });

    if (!session) throw new NotFoundException('Session not found');

    return {
      sessionId: session.id,
      status: session.status,
      answers: session.answers,
    };
  }

  async saveAnswer(sessionId: string, screen: number, value: any) {
    const session = await this.prisma.session.findUnique({
      where: { id: sessionId },
      include: { answers: true },
    });

    if (!session) throw new NotFoundException('Session not found');

    await this.prisma.answer.create({
      data: { sessionId, screen, value },
    });

    const allAnswers = [...session.answers, { screen, value }];
    const nextScreenNumber = this.getNextScreen(screen, value, allAnswers);

    if (typeof nextScreenNumber === 'string') {
      return { result: nextScreenNumber };
    }

    if (nextScreenNumber === 15) {
      const answers = this.mapAnswers(allAnswers);
      const result = evaluateEligibility(answers);
      return { result };
    }

    const nextScreen = formSchema.find(s => s.screen === nextScreenNumber);
    if (!nextScreen) throw new NotFoundException(`Screen ${nextScreenNumber} not found`);
    return { nextScreen };
  }

  private getNextScreen(screen: number, value: any, allAnswers: any[]): number | string {
    const getAnswer = (s: number) => allAnswers.find(a => a.screen === s)?.value;

    switch (screen) {
      case 1:
        if (value < 18) return 'ineligible';
        if (value > 75) return 'clinical_review';
        return 2;
      case 2: return 3;
      case 3: return 4;
      case 4: {
        const weight = getAnswer(2);
        const height = getAnswer(3);
        const bmi = weight / Math.pow(height / 100, 2);
        if (bmi < 25) return 'ineligible';
        if (bmi >= 40) return 'clinical_review';
        return 5;
      }
      case 5:
        if (value === true) return 'ineligible';
        return 6;
      case 6: return 7;
      case 7:
        if (value === true) return 8;
        return 9;
      case 8:
        if (value > 9.0) return 'ineligible';
        return 9;
      case 9: return 10;
      case 10:
        if (Array.isArray(value) && value.includes('GLP-1 receptor agonist')) return 'ineligible';
        return 11;
      case 11: return 12;
      case 12: return 13;
      case 13: return 14;
      case 14: return 15;
      default: return 15;
    }
  }

  private mapAnswers(allAnswers: any[]): Answers {
    const getAnswer = (s: number) => allAnswers.find(a => a.screen === s)?.value;

    return {
      age: Number(getAnswer(1)),
      weight: Number(getAnswer(2)),
      height: Number(getAnswer(3)),
      pregnant: getAnswer(5),
      comorbidities: getAnswer(6) ?? [],
      hasDiabetes: getAnswer(7),
      hba1c: getAnswer(8) ? Number(getAnswer(8)) : undefined,
      bloodPressure: getAnswer(9) ?? [],
      medications: getAnswer(10) ?? [],
      smoking: getAnswer(11),
      alcohol: getAnswer(12),
      activityLevel: getAnswer(13),
      diet: getAnswer(14) ?? [],
    };
  }
}