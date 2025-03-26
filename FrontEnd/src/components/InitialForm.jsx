import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calculator,
  GraduationCap,
  BookOpen,
  Gamepad,
  Layers,
  Play,
} from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";

function InitialForm({ data, onDataChange }) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    course: "",
    topic: "",
    gameNumber: "",
    numLevels: "2",
    levels: [],
  });

  useEffect(() => {
    // Clear form data when component mounts
    localStorage.removeItem("quizFormData");
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newData = { ...formData, [name]: value };
    setFormData(newData);
    onDataChange(newData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create initial level structure
    const numLevels = parseInt(formData.numLevels, 10);
    const newLevels = Array(numLevels)
      .fill()
      .map((_, index) => ({
        level_number: index + 1,
        level_type: "box",
        level_stats: {
          coins: 0,
          lifes: 5,
          mistakes: 0,
          stars: 1,
          time_spent: 0,
        },
        questions: [],
      }));

    // Update the entire data object
    const updatedData = {
      ...formData,
      levels: newLevels,
      player_info: {
        current_level: 1,
        lives: 3,
        score: 0,
      },
    };

    onDataChange(updatedData);
  };

  return (
    <motion.div
      className="glass-card p-8 max-w-2xl mx-auto"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="text-center mb-8">
        <div className="flex justify-center items-center gap-3 mb-4">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-purple-deep to-purple-main flex items-center justify-center shadow-lg shadow-purple-deep/20 hover-glow">
            <Calculator className="text-3xl text-white" />
          </div>
          <h2 className="text-3xl font-bold gradient-text">
            {t("create_math_quiz")}
          </h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          {t("design_interactive_quizzes")}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="group">
          <label className="form-label flex items-center gap-2">
            <BookOpen className="text-purple-main" size={18} />
            {t("course_name")}
          </label>
          <input
            type="text"
            name="course"
            value={formData.course}
            onChange={handleInputChange}
            className="input-field"
            placeholder={t("e.g., algebra_geometry")}
            required
          />
        </div>

        <div className="group">
          <label className="form-label flex items-center gap-2">
            <GraduationCap className="text-purple-main" size={18} />
            {t("topic")}
          </label>
          <input
            type="text"
            name="topic"
            value={formData.topic}
            onChange={handleInputChange}
            className="input-field"
            placeholder={t("e.g., quadratic_equations")}
            required
          />
        </div>

        <div className="group">
          <label className="form-label flex items-center gap-2">
            <Gamepad className="text-purple-main" size={18} />
            {t("game_number")}
          </label>
          <input
            type="number"
            name="gameNumber"
            value={formData.gameNumber}
            onChange={handleInputChange}
            className="input-field"
            placeholder={t("enter_game_number")}
            required
            min="1"
          />
        </div>

        <div className="group">
          <label className="form-label flex items-center gap-2">
            <Layers className="text-purple-main" size={18} />
            {t("number_of_levels")}
          </label>
          <select
            name="numLevels"
            value={formData.numLevels}
            onChange={handleInputChange}
            className="input-field"
            required
          >
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        <motion.button
          type="submit"
          className="btn-primary flex items-center justify-center gap-2 mt-8 w-full"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Play size={18} />
          {t("start_creating")}
        </motion.button>
      </form>
    </motion.div>
  );
}

export default InitialForm;
