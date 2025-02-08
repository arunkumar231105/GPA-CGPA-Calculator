export interface Course {
  id: string;
  name: string;
  grade: number;
  creditHours: number;
}

export interface GradePoint {
  min: number;
  max: number;
  letter: string;
  points: number;
}