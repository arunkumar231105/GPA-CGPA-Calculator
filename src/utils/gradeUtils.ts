import { GradePoint } from '../types';

// ✅ Corrected Grading System 
export const gradePoints: GradePoint[] = [
  { min: 90, max: 100, letter: 'A+', points: 4.00 },
  { min: 85, max: 89, letter: 'A', points: 3.75 },
  { min: 80, max: 84, letter: 'A-', points: 3.50 },
  { min: 75, max: 79, letter: 'B+', points: 3.25 },
  { min: 70, max: 74, letter: 'B', points: 3.00 },
  { min: 66, max: 69, letter: 'B-', points: 2.75 },
  { min: 63, max: 65, letter: 'C+', points: 2.50 },
  { min: 60, max: 62, letter: 'C', points: 2.00 },
  { min: 55, max: 59, letter: 'C-', points: 1.50 },
  { min: 0, max: 54, letter: 'F', points: 0.00 },
];

// ✅ Function to Get GPA Points from Marks
export const getGradePoints = (grade: number): number => {
  const gradePoint = gradePoints.find((gp) => grade >= gp.min && grade <= gp.max);
  
  if (!gradePoint) {
    console.error(`⚠️ Invalid Grade: ${grade}`);
    return 0;
  }

  console.log(`✅ Marks: ${grade}, Matched Grade: ${gradePoint.letter}, Points: ${gradePoint.points}`);
  return gradePoint.points;
};

// ✅ Function to Get Letter Grade from Marks
export const getLetterGrade = (grade: number): string => {
  const gradePoint = gradePoints.find((gp) => grade >= gp.min && grade <= gp.max);

  if (!gradePoint) {
    console.error(`⚠️ Invalid Grade: ${grade}`);
    return '-';
  }

  console.log(`✅ Marks: ${grade}, Matched Letter: ${gradePoint.letter}`);
  return gradePoint.letter;
};

// ✅ Function to Calculate GPA (for a Semester)
export const calculateGPA = (grades: number[], creditHours: number[]): number => {
  if (grades.length === 0 || creditHours.length === 0) return 0;

  const totalPoints = grades.reduce((sum, grade, index) => {
    return sum + getGradePoints(grade) * creditHours[index];
  }, 0);

  const totalCreditHours = creditHours.reduce((sum, hours) => sum + hours, 0);
  
  return totalCreditHours > 0 ? parseFloat((totalPoints / totalCreditHours).toFixed(2)) : 0;
};

// ✅ Function to Calculate CGPA
export const calculateCGPA = (
  previousGPA: number,
  previousCreditHours: number,
  currentGPA: number,
  currentCreditHours: number
): number => {
  if (previousCreditHours < 0 || currentCreditHours <= 0) return 0;

  const totalPoints = (previousGPA * previousCreditHours) + (currentGPA * currentCreditHours);
  const totalHours = previousCreditHours + currentCreditHours;

  return totalHours > 0 ? parseFloat((totalPoints / totalHours).toFixed(2)) : 0;
};
