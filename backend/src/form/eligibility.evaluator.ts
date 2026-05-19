export interface Answers {
    age: number
    weight: number
    height: number
    pregnant: boolean
    comorbidities: string[]
    hasDiabetes: boolean
    hba1c?: number
    bloodPressure: string[]
    medications: string[]
    smoking: boolean
    alcohol: 'Never' | 'Monthly' | 'Weekly' | 'Daily'
    activityLevel: string
    diet: string[]
  }
  
  export type EligibilityResult = 'eligible' | 'ineligible' | 'clinical_review'
  
  export const evaluateEligibility = (answers: Answers): EligibilityResult => {
    const bmi = answers.weight / Math.pow(answers.height / 100, 2)
  
    // immediate ineligibility
    if (answers.age < 18) return 'ineligible'
    if (bmi < 25) return 'ineligible'
    if (answers.pregnant) return 'ineligible'
    if (answers.hasDiabetes && answers.hba1c && answers.hba1c > 9.0) return 'ineligible'
    if (answers.medications.includes('GLP-1 receptor agonist')) return 'clinical_review'
  
    // automatic clinical review
    if (answers.age > 75) return 'clinical_review'
    if (bmi >= 40) return 'clinical_review'
    if (answers.hasDiabetes && answers.bloodPressure.includes('Stage 2 Hypertension (≥140 / ≥90)')) return 'clinical_review'
    if (answers.bloodPressure.includes('Hypertensive Crisis (>180 / >120)')) return 'clinical_review'
    if (answers.comorbidities.length >= 3) return 'clinical_review'
  
    // optional review rules
    if (
      answers.bloodPressure.includes('Stage 1 Hypertension (130–139 / 80–89)') &&
      answers.activityLevel === 'Sedentary' &&
      answers.diet.includes('High sugar intake')
    ) return 'clinical_review'
  
    const unhealthyDiet = ['High sugar intake', 'High processed foods', 'Frequent sugary beverages']
    const unhealthyDietCount = answers.diet.filter(d => unhealthyDiet.includes(d)).length
  
    if (
      answers.alcohol === 'Daily' &&
      (answers.smoking || unhealthyDietCount >= 2)
    ) return 'clinical_review'
  
    return 'eligible'
  }