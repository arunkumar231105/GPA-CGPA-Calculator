import React from 'react';
import { gradePoints } from '../utils/gradeUtils';

export const GradeTable: React.FC = () => {
  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Marks Range
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Letter Grade
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Grade Points
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {gradePoints.map((grade, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {grade.min}-{grade.max}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {grade.letter}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {grade.points.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};