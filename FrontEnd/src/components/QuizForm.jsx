import { useState } from 'react';
import LevelForm from './LevelForm';
import { FaPlay, FaGamepad } from 'react-icons/fa';

function QuizForm({ onDataChange }) {
  const [formData, setFormData] = useState({
    course: '',
    topic: '',
    gameNumber: '',
    numLevels: '2',
    levels: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = { ...prev, [name]: value };
      onDataChange(newData);
      return newData;
    });
  };

  const handleStart = (e) => {
    e.preventDefault();
    setFormData(prev => ({
      ...prev,
      levels: Array(parseInt(prev.numLevels)).fill().map(() => ({
        gameType: 'Boxes',
        questions: []
      }))
    }));
  };

  return (
    <div className="card p-8 space-y-8">
      <div className="flex items-center gap-3 mb-6">
        <FaGamepad className="text-3xl text-primary-500" />
        <h2 className="text-2xl font-bold text-gray-800">Create Quiz</h2>
      </div>
      
      <div className="space-y-6">
        <div className="group">
          <label className="form-label">Course Name</label>
          <input
            type="text"
            name="course"
            value={formData.course}
            onChange={handleInputChange}
            className="input-field"
            placeholder="Enter course name"
          />
        </div>

        <div className="group">
          <label className="form-label">Topic</label>
          <input
            type="text"
            name="topic"
            value={formData.topic}
            onChange={handleInputChange}
            className="input-field"
            placeholder="Enter topic"
          />
        </div>

        <div className="group">
          <label className="form-label">Game Number</label>
          <input
            type="number"
            name="gameNumber"
            value={formData.gameNumber}
            onChange={handleInputChange}
            className="input-field"
            placeholder="Enter game number"
          />
        </div>

        <div className="group">
          <label className="form-label">Number of Levels</label>
          <select
            name="numLevels"
            value={formData.numLevels}
            onChange={handleInputChange}
            className="input-field"
          >
            {[1, 2, 3, 4].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>

        <button 
          onClick={handleStart} 
          className="btn-primary flex items-center justify-center gap-2"
        >
          <FaPlay />
          Start Creating
        </button>
      </div>

      {formData.levels.map((level, index) => (
        <LevelForm
          key={index}
          levelNumber={index + 1}
          level={level}
          onChange={(levelData) => {
            const newLevels = [...formData.levels];
            newLevels[index] = levelData;
            setFormData(prev => {
              const newData = { ...prev, levels: newLevels };
              onDataChange(newData);
              return newData;
            });
          }}
        />
      ))}
    </div>
  );
}

export default QuizForm;