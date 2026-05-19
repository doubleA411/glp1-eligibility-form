import { Test, TestingModule } from '@nestjs/testing';
import { SessionService } from './session.service';
import { PrismaService } from '../prisma.service';

const mockPrismaService = {
  session: {
    create: jest.fn(),
    findUnique: jest.fn(),
  },
  answer: {
    create: jest.fn(),
    findMany: jest.fn(),
  },
};

describe('SessionService', () => {
  let service: SessionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SessionService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<SessionService>(SessionService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('startSession', () => {
    it('should create a session and return sessionId with screen 1', async () => {
      mockPrismaService.session.create.mockResolvedValue({
        id: 'test-uuid',
        status: 'in_progress',
      });

      const result = await service.startSession();

      expect(mockPrismaService.session.create).toHaveBeenCalledWith({
        data: { status: 'in_progress' },
      });
      expect(result.sessionId).toBe('test-uuid');
      expect(result.screen.screen).toBe(1);
    });
  });

  describe('getSession', () => {
    it('should return session with answers', async () => {
      mockPrismaService.session.findUnique.mockResolvedValue({
        id: 'test-uuid',
        status: 'in_progress',
        answers: [{ screen: 1, value: 25 }],
      });

      const result = await service.getSession('test-uuid');

      expect(result.sessionId).toBe('test-uuid');
      expect(result.answers).toHaveLength(1);
    });

    it('should throw error when session not found', async () => {
      mockPrismaService.session.findUnique.mockResolvedValue(null);

      await expect(service.getSession('invalid-id')).rejects.toThrow('Session not found');
    });
  });

  describe('saveAnswer', () => {
    it('should save answer and return next screen', async () => {
      mockPrismaService.session.findUnique.mockResolvedValue({
        id: 'test-uuid',
        status: 'in_progress',
        answers: [],
      });
      mockPrismaService.answer.create.mockResolvedValue({
        screen: 1,
        value: 25,
      });

      const result = await service.saveAnswer('test-uuid', 1, 25) as { nextScreen: { screen: number } };

      expect(mockPrismaService.answer.create).toHaveBeenCalled();
      expect(result.nextScreen.screen).toBe(2);
    });

    it('should return result when reaching screen 15', async () => {
      mockPrismaService.session.findUnique.mockResolvedValue({
        id: 'test-uuid',
        status: 'in_progress',
        answers: [
          { screen: 1, value: 35 },
          { screen: 2, value: 90 },
          { screen: 3, value: 170 },
          { screen: 5, value: false },
          { screen: 6, value: [] },
          { screen: 7, value: false },
          { screen: 9, value: ['Normal (< 120/80)'] },
          { screen: 10, value: [] },
          { screen: 11, value: false },
          { screen: 12, value: 'Never' },
          { screen: 13, value: 'Moderate (3–4x/week)' },
          { screen: 14, value: ['Balanced diet'] },
        ],
      });
      mockPrismaService.answer.create.mockResolvedValue({});

      const result = await service.saveAnswer('test-uuid', 14, ['Balanced diet']);

      expect(result.result).toBe('eligible');
    });
  });
});