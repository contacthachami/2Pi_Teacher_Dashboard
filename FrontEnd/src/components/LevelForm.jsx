import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Gamepad, Check, X, Trash, Package, Layers } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";

function LevelForm({ levelNumber, level, onChange }) {
  const { t } = useLanguage();
  const [levelType, setLevelType] = useState(level.level_type || "box");
  const [questions, setQuestions] = useState(level.questions || []);
  const [singleQuestion, setSingleQuestion] = useState(level.question || "");
  const [answers, setAnswers] = useState(level.answers || []);

  const handleLevelTypeChange = (type) => {
    setLevelType(type);
    if (type === "box") {
      onChange({
        level_number: levelNumber,
        level_stats: {
          coins: 0,
          lifes: 5,
          mistakes: 0,
          stars: 1,
          time_spent: 0,
        },
        level_type: type,
        questions: [],
      });
      setQuestions([]);
    } else {
      onChange({
        level_number: levelNumber,
        level_stats: {
          coins: 0,
          lifes: 5,
          mistakes: 0,
          stars: 1,
          time_spent: 0,
        },
        level_type: type,
        question: "",
        answers: [],
      });
      setSingleQuestion("");
      setAnswers([]);
    }
  };

  const handleAddQuestion = () => {
    if (levelType === "balloon") {
      if (answers.length < 10) {
        const newAnswer = { text: "", is_true: false };
        const newAnswers = [...answers, newAnswer];
        setAnswers(newAnswers);
        onChange({
          level_number: levelNumber,
          level_stats: level.level_stats,
          level_type: levelType,
          question: singleQuestion,
          answers: newAnswers,
        });
      }
    } else {
      if (questions.length < 5) {
        const newQuestions = [...questions, { text: "", answer: "" }];
        setQuestions(newQuestions);
        onChange({
          level_number: levelNumber,
          level_stats: level.level_stats,
          level_type: levelType,
          questions: newQuestions,
        });
      }
    }
  };

  const handleQuestionChange = (index, field, value) => {
    if (levelType === "balloon") {
      if (field === "question") {
        setSingleQuestion(value);
        onChange({
          level_number: levelNumber,
          level_stats: level.level_stats,
          level_type: levelType,
          question: value,
          answers,
        });
      } else {
        const newAnswers = answers.map((a, i) => {
          if (i === index) {
            return { ...a, [field === "answer" ? "text" : field]: value };
          }
          return a;
        });
        setAnswers(newAnswers);
        onChange({
          level_number: levelNumber,
          level_stats: level.level_stats,
          level_type: levelType,
          question: singleQuestion,
          answers: newAnswers,
        });
      }
    } else {
      const newQuestions = questions.map((q, i) => {
        if (i === index) {
          return { ...q, [field]: value };
        }
        return q;
      });
      setQuestions(newQuestions);
      onChange({
        level_number: levelNumber,
        level_stats: level.level_stats,
        level_type: levelType,
        questions: newQuestions,
      });
    }
  };

  const handleDeleteQuestion = (index) => {
    if (levelType === "balloon") {
      const newAnswers = answers.filter((_, i) => i !== index);
      setAnswers(newAnswers);
      onChange({
        level_number: levelNumber,
        level_stats: level.level_stats,
        level_type: levelType,
        question: singleQuestion,
        answers: newAnswers,
      });
    } else {
      const newQuestions = questions.filter((_, i) => i !== index);
      setQuestions(newQuestions);
      onChange({
        level_number: levelNumber,
        level_stats: level.level_stats,
        level_type: levelType,
        questions: newQuestions,
      });
    }
  };

  return (
    <motion.div
      className="glass-card p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-deep to-purple-main flex items-center justify-center shadow-md hover-glow">
          <Gamepad className="text-xl text-white" />
        </div>
        <h3 className="text-xl font-bold gradient-text">
          {t("level")} {levelNumber}
        </h3>
      </div>

      <div className="mb-6">
        <label className="form-label">{t("game_type")}</label>
        <div className="flex gap-4">
          <button
            onClick={() => handleLevelTypeChange("box")}
            className={`flex-1 py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 ${
              levelType === "box"
                ? "bg-gradient-to-r from-purple-deep to-purple-main text-white shadow-md"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            <Package
              className={
                levelType === "box"
                  ? "text-white"
                  : "text-purple-main dark:text-purple-light"
              }
              size={18}
            />
            {t("boxes")}
          </button>
          <button
            onClick={() => handleLevelTypeChange("balloon")}
            className={`flex-1 py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 ${
              levelType === "balloon"
                ? "bg-gradient-to-r from-cyan-main to-cyan-deep text-white shadow-md"
                : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            <Layers
              className={
                levelType === "balloon"
                  ? "text-white"
                  : "text-cyan-main dark:text-cyan-light"
              }
              size={18}
            />
            {t("balloons")}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {levelType === "balloon" ? (
          <>
            <motion.div layout>
              <label className="form-label">{t("question")}</label>
              <input
                type="text"
                value={singleQuestion}
                onChange={(e) =>
                  handleQuestionChange(0, "question", e.target.value)
                }
                placeholder={t("enter_your_question")}
                className="input-field"
              />
            </motion.div>

            <AnimatePresence>
              {answers.map((answer, index) => (
                <motion.div
                  key={index}
                  layout
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="flex gap-4 items-center bg-gray-50 dark:bg-gray-700 p-4 rounded-xl border border-gray-100 dark:border-gray-600"
                >
                  <input
                    type="text"
                    value={answer.text}
                    onChange={(e) =>
                      handleQuestionChange(index, "answer", e.target.value)
                    }
                    placeholder={t("answer")}
                    className="input-field flex-1"
                  />
                  <button
                    onClick={() =>
                      handleQuestionChange(index, "is_true", !answer.is_true)
                    }
                    className={`toggle-btn ${
                      answer.is_true ? "toggle-btn-true" : "toggle-btn-false"
                    }`}
                  >
                    {answer.is_true ? <Check size={18} /> : <X size={18} />}
                    {answer.is_true ? t("true") : t("false")}
                  </button>
                  <button
                    onClick={() => handleDeleteQuestion(index)}
                    className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                  >
                    <Trash size={18} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>

            {answers.length < 10 && (
              <motion.button
                onClick={handleAddQuestion}
                className="btn-secondary flex items-center justify-center gap-2 w-full"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Plus size={18} />
                {t("add_answer")} ({answers.length}/10)
              </motion.button>
            )}
          </>
        ) : (
          <>
            <AnimatePresence>
              {questions.map((q, index) => (
                <motion.div
                  key={index}
                  layout
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="flex gap-4 items-center bg-gray-50 dark:bg-gray-700 p-4 rounded-xl border border-gray-100 dark:border-gray-600"
                >
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-purple-main dark:text-purple-light w-24">
                        {t("question")} {index + 1}
                      </span>
                      <input
                        type="text"
                        value={q.text}
                        onChange={(e) =>
                          handleQuestionChange(index, "text", e.target.value)
                        }
                        placeholder={t("question")}
                        className="input-field"
                      />
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-purple-main dark:text-purple-light w-24">
                        {t("answer")}
                      </span>
                      <input
                        type="text"
                        value={q.answer}
                        onChange={(e) =>
                          handleQuestionChange(index, "answer", e.target.value)
                        }
                        placeholder={t("answer")}
                        className="input-field"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteQuestion(index)}
                    className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                  >
                    <Trash size={18} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>

            {questions.length < 5 && (
              <motion.button
                onClick={handleAddQuestion}
                className="btn-secondary flex items-center justify-center gap-2 w-full"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Plus size={18} />
                {t("add_question")} ({questions.length}/5)
              </motion.button>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}

export default LevelForm;
