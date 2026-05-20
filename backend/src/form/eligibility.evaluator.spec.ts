import { describe, it, expect } from 'vitest'
import { evaluateEligibility } from './eligibility.evaluator'
import { Answers } from './eligibility.evaluator'

const baseAnswers: Answers = {
  age: 35,
  weight: 90,
  height: 170,
  pregnant: false,
  comorbidities: [],
  hasDiabetes: false,
  bloodPressure: ['Normal (< 120/80)'],
  medications: [],
  smoking: false,
  alcohol: 'Never',
  activityLevel: 'Moderate (3–4x/week)',
  diet: ['Balanced diet']
}

describe('evaluateEligibility', () => {
    //ineligible
    it('should return ineligible when age is under 18', () => {
        const answers = { ...baseAnswers, age: 16 }
        expect(evaluateEligibility(answers)).toBe('ineligible')
      })
      it('should return ineligible when bmi is under 25', () => {
        const answers = { ...baseAnswers, weight: 55, height: 150 }
        expect(evaluateEligibility(answers)).toBe('ineligible')
      })
      it('should return ineligible when pregnant', () => {
        const answers = { ...baseAnswers, pregnant: true}
        expect(evaluateEligibility(answers)).toBe('ineligible')
      })
      it('should return ineligible when HbA1c greater than 9.0', () => {
        const answers = { ...baseAnswers, hasDiabetes: true , hba1c: 9.2}
        expect(evaluateEligibility(answers)).toBe('ineligible')
      })
      it('should return ineligible when glp-1 receptor agonist selected', () => {
        const answers = { ...baseAnswers, medications: ['GLP-1 receptor agonist']}
        expect(evaluateEligibility(answers)).toBe('clinical_review')
      })

      //automatic clinical review
      it('should return clinical review when age is above 75', () => {
        const answers = { ...baseAnswers, age: 76 }
        expect(evaluateEligibility(answers)).toBe('clinical_review')
      })
      it('should return clinical review when bmi is greater than equal to 40', () => {
        const answers = { ...baseAnswers, weight: 90, height: 150 }
        expect(evaluateEligibility(answers)).toBe('clinical_review')
      })
      it('should return clinical review when stage 2 and has diabetes', () => {
        const answers = { ...baseAnswers, hasDiabetes: true, bloodPressure: ['Stage 2 Hypertension (≥140 / ≥90)']}
        expect(evaluateEligibility(answers)).toBe('clinical_review')
      })
      it('should return clinical review when Hypertensive Crisis selected', () => {
        const answers = { ...baseAnswers, bloodPressure: ['Hypertensive Crisis (>180 / >120)']}
        expect(evaluateEligibility(answers)).toBe('clinical_review')
      })
      it('should return clinical review when 3 or more comorbidities selected', () => {
        const answers = { ...baseAnswers, comorbidities: ['Hypertension', 'Dyslipidemia', 'Sleep Apnea'] }
        expect(evaluateEligibility(answers)).toBe('clinical_review')
      })

      //optional review rules
      it('should return optional review when Stage 1 Hypertension + Sedentary + High sugar diet', () => {
        const answers = { ...baseAnswers, bloodPressure: ['Stage 1 Hypertension (130–139 / 80–89)'], diet: ['High sugar intake'], activityLevel: 'Sedentary'  }
        expect(evaluateEligibility(answers)).toBe('clinical_review')
      })
      it('should return optional review when Daily alcohol + moderate/high risk factors', () => {
        const answers = { ...baseAnswers, bloodPressure: ['Stage 1 Hypertension (130–139 / 80–89)'], diet: ['High sugar intake', 'High processed foods', 'Frequent sugary beverages'], activityLevel: 'Sedentary' , smoking: true, alcohol: 'Daily' as const }
        expect(evaluateEligibility(answers)).toBe('clinical_review')
      })

      //happy path 
      it('should return eligible', () => {
        const answers = { ...baseAnswers }
        expect(evaluateEligibility(answers)).toBe('eligible')
      })

      it('should return review when blood Pressure is varying from normal to hypertensive crisis', () => {
        const answers = { ...baseAnswers, bloodPressure: ['Hypertensive Crisis (>180 / >120)', 'Normal (< 120/80)'] }
        expect(evaluateEligibility(answers)).toBe('clinical_review')
      })
})