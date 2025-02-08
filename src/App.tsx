import React, { useState } from 'react';
import { GradeTable } from './components/GradeTable';
import { Course } from './types';
import { calculateGPA, calculateCGPA, getLetterGrade } from './utils/gradeUtils';
import { GraduationCap, Plus, Trash2, History, User, Linkedin, X, School } from 'lucide-react';

function App() {
  const [courses, setCourses] = useState<Course[]>([
    { id: '1', name: '', grade: 0, creditHours: 0 },
  ]);
  const [previousGPA, setPreviousGPA] = useState<number>(0);
  const [previousCreditHours, setPreviousCreditHours] = useState<number>(0);
  const [showPreviousGPA, setShowPreviousGPA] = useState<boolean>(false);
  const [showDeveloperInfo, setShowDeveloperInfo] = useState<boolean>(false);

  const addCourse = () => {
    setCourses([
      ...courses,
      {
        id: Math.random().toString(),
        name: '',
        grade: 0,
        creditHours: 0,
      },
    ]);
  };

  const removeCourse = (id: string) => {
    if (courses.length > 1) {
      setCourses(courses.filter((course) => course.id !== id));
    }
  };

  const updateCourse = (
    id: string,
    field: keyof Course,
    value: string | number
  ) => {
    setCourses(
      courses.map((course) =>
        course.id === id
          ? {
              ...course,
              [field]:
                field === 'name'
                  ? value
                  : Math.max(0, Math.min(Number(value), field === 'grade' ? 100 : 99)),
            }
          : course
      )
    );
  };

  const currentGPA = calculateGPA(
    courses.map((c) => c.grade),
    courses.map((c) => c.creditHours)
  );

  const currentCreditHours = courses.reduce((sum, course) => sum + course.creditHours, 0);

  const cgpa = calculateCGPA(
    previousGPA,
    previousCreditHours,
    currentGPA,
    currentCreditHours
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <School className="h-12 w-12 text-blue-600 mr-3" />
            <GraduationCap className="h-12 w-12 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            SZABIST GPA Calculator
          </h1>
          <p className="mt-2 text-gray-600">
            Calculate your semester GPA and CGPA according to SZABIST grading policy
          </p>
          <button
            onClick={() => setShowDeveloperInfo(true)}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-600 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <User className="h-4 w-4 mr-2" />
            About Developer
          </button>
        </div>

        {showDeveloperInfo && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
              <button
                onClick={() => setShowDeveloperInfo(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="text-center">
                <User className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Arun Kumar</h2>
                <p className="text-gray-600 mb-4">Software Engineering Student</p>
                <p className="text-gray-600 mb-2">Web Frontend Developer (Trainee)</p>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Skills</h3>
                  <div className="flex flex-wrap justify-center gap-2">
                    {['Web Development', 'JavaScript', 'React', 'UI/UX Design'].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <a
                  href="https://www.linkedin.com/in/arun-kumar-b578a128b"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <Linkedin className="h-4 w-4 mr-2" />
                  Connect on LinkedIn
                </a>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Current Semester</h2>
            <button
              onClick={() => setShowPreviousGPA(!showPreviousGPA)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <History className="h-4 w-4 mr-2" />
              {showPreviousGPA ? 'Hide Previous GPA' : 'Add Previous GPA'}
            </button>
          </div>

          {showPreviousGPA && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Previous CGPA
                </label>
                <input
                  type="number"
                  value={previousGPA || ''}
                  onChange={(e) => setPreviousGPA(Number(e.target.value))}
                  min="0"
                  max="4"
                  step="0.01"
                  className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 w-full"
                  placeholder="Enter previous CGPA"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Total Credit Hours Completed
                </label>
                <input
                  type="number"
                  value={previousCreditHours || ''}
                  onChange={(e) => setPreviousCreditHours(Number(e.target.value))}
                  min="0"
                  className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 w-full"
                  placeholder="Enter total credit hours"
                />
              </div>
            </div>
          )}

          <div className="space-y-4">
            {courses.map((course) => (
              <div
                key={course.id}
                className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center"
              >
                <input
                  type="text"
                  placeholder="Course Name"
                  value={course.name}
                  onChange={(e) =>
                    updateCourse(course.id, 'name', e.target.value)
                  }
                  className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <input
                  type="number"
                  placeholder="Grade"
                  value={course.grade || ''}
                  onChange={(e) =>
                    updateCourse(course.id, 'grade', e.target.value)
                  }
                  min="0"
                  max="100"
                  className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <input
                  type="number"
                  placeholder="Credit Hours"
                  value={course.creditHours || ''}
                  onChange={(e) =>
                    updateCourse(course.id, 'creditHours', e.target.value)
                  }
                  min="0"
                  className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <button
                  onClick={() => removeCourse(course.id)}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={addCourse}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Course
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Results</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-600 font-medium">Current GPA</p>
              <p className="text-3xl font-bold text-blue-900">
                {isNaN(currentGPA) ? '0.00' : currentGPA.toFixed(2)}
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-purple-600 font-medium">CGPA</p>
              <p className="text-3xl font-bold text-purple-900">
                {showPreviousGPA ? (isNaN(cgpa) ? '0.00' : cgpa.toFixed(2)) : '-'}
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-green-600 font-medium">Letter Grade</p>
              <p className="text-3xl font-bold text-green-900">
                {getLetterGrade(currentGPA * 25)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            SZABIST Grading Scale
          </h2>
          <GradeTable />
        </div>
      </div>
    </div>
  );
}

export default App;