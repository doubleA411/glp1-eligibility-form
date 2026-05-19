export enum PromptType {
    Number = 'number',
    Radio = 'radio',
    Checkbox = 'checkbox',
    Computed = 'computed'
  }
  
  export interface Screen {
    screen: number;
    prompt: string;
    type: PromptType;
    options?: string[];
  }
  
  export const formSchema: Screen[] = [
    {
      screen: 1,
      prompt: 'What is your age?',
      type: PromptType.Number,
    },
    {
      screen: 2,
      prompt: 'Enter your weight in kilograms.',
      type: PromptType.Number,
    },
    {
      screen: 3,
      prompt: 'Enter your height in centimeters.',
      type: PromptType.Number,
    },
    {
      screen: 4,
      prompt: '',
      type: PromptType.Computed,
    },
    {
      screen: 5,
      prompt: 'Are you currently pregnant?',
      type: PromptType.Radio,
      options: ['Yes', 'No'],
    },
    {
      screen: 6,
      prompt: 'Which chronic conditions have you been diagnosed with? (Select all that apply)',
      type: PromptType.Checkbox,
      options: ['Hypertension', 'Dyslipidemia', 'Sleep Apnea', 'GERD', 'Thyroid Disorder'],
    },
    {
      screen: 7,
      prompt: 'Have you ever been diagnosed with diabetes?',
      type: PromptType.Radio,
      options: ['Yes', 'No'],
    },
    {
      screen: 8,
      prompt: 'Enter your latest HbA1c (%) result.',
      type: PromptType.Number,
    },
    {
      screen: 9,
      prompt: 'Check all that apply based on your most recent blood pressure reading.',
      type: PromptType.Checkbox,
      options: ['Normal (< 120/80)', 'Elevated (120–129 / <80)', 'Stage 1 Hypertension (130–139 / 80–89)', 'Stage 2 Hypertension (≥140 / ≥90)', 'Hypertensive Crisis (>180 / >120)'],
    },
    {
      screen: 10,
      prompt: 'Which medications are you currently prescribed?',
      type: PromptType.Checkbox,
      options: ['ACE inhibitors', 'Beta blockers', 'Statins', 'Thyroid medication', 'GLP-1 receptor agonist'],
    },
    {
      screen: 11,
      prompt: 'Do you currently smoke tobacco?',
      type: PromptType.Radio,
      options: ['Yes', 'No'],
    },
    {
      screen: 12,
      prompt: 'How often do you consume alcohol?',
      type: PromptType.Radio,
      options: ['Never', 'Monthly', 'Weekly', 'Daily'],
    },
    {
      screen: 13,
      prompt: 'How would you describe your typical activity level?',
      type: PromptType.Radio,
      options: ['Sedentary', 'Light (1–2x/week)', 'Moderate (3–4x/week)', 'Vigorous (5+x/week)'],
    },
    {
      screen: 14,
      prompt: 'Which best describes your diet? (Select all that apply)',
      type: PromptType.Checkbox,
      options: ['High sugar intake', 'High processed foods', 'Frequent sugary beverages', 'High fiber diet', 'Balanced diet'],
    },
    {
      screen: 15,
      prompt: '',
      type: PromptType.Computed,
    },
  ]