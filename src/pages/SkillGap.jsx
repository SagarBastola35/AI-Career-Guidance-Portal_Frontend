
// frontend/src/pages/SkillGap.jsx
import React, { useState, useEffect } from "react";
import axios from '../utils/axios.js';
import { motion } from "framer-motion";
import {
  TrendingUp,
  Target,
  BookOpen,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Sparkles,
} from "lucide-react";
import toast from "react-hot-toast";

const SkillGap = () => {
  const [targetRole, setTargetRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [skillGap, setSkillGap] = useState(null);
  const [currentSkills, setCurrentSkills] = useState([]);

  useEffect(() => {
    fetchUserSkills();
  }, []);

  const fetchUserSkills = async () => {
    try {
      const response = await axios.get("/api/auth/me");
      setCurrentSkills(response.data.profile?.skills || []);
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  const analyzeSkillGap = async () => {
    if (!targetRole.trim()) {
      toast.error("Please enter a target role");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/ai/skill-gap", { targetRole });
      setSkillGap(response.data);
      toast.success("Skill gap analysis complete!");
    } catch (error) {
      console.error("Analysis error:", error);
      toast.error("Failed to analyze skill gap");
    } finally {
      setLoading(false);
    }
  };

  const popularRoles = [
    "Full Stack Developer",
    "Data Scientist",
    "Product Manager",
    "DevOps Engineer",
    "AI/ML Engineer",
    "Cloud Architect",
    "UX Designer",
    "Cybersecurity Analyst",
    "Technical Writer",
  ];

  // Helper to safely format course (handles strings and objects)
  const formatCourse = (course) => {
    if (typeof course === "string") {
      return { displayText: course, providerText: "" };
    }
    if (course && typeof course === "object") {
      const displayText =
        course.course || course.name || course.title || "Course";
      const providerText = course.platform || course.provider || "";
      return { displayText, providerText };
    }
    return { displayText: String(course), providerText: "" };
  };

  // Helper to safely format skill
  const formatSkill = (skill) => {
    if (typeof skill === "string") return skill;
    if (skill && typeof skill === "object") {
      return skill.name || skill.skill || JSON.stringify(skill);
    }
    return String(skill);
  };

  return (
    <div className="pt-20 pb-12 px-4 min-h-screen">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold">
            AI Skill Gap <span className="gradient-text">Analyzer</span>
          </h1>
          <p className="text-gray-500 mt-2">
            Identify missing skills and get personalized learning
            recommendations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Current Skills */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-6"
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Your Current Skills
            </h2>
            {currentSkills.length > 0 ? (
              <div className="flex flex-wrap gap-2 mb-6">
                {currentSkills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium"
                  >
                    {formatSkill(skill)}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 mb-4">
                No skills added yet. Update your profile to get better analysis.
              </p>
            )}

            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">
                Target Career Role
              </label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g., Senior Full Stack Developer"
                className="input-field mb-4"
              />
              <button
                onClick={analyzeSkillGap}
                disabled={loading}
                className="w-full btn-primary flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Sparkles className="w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Target className="w-5 h-5" />
                    Analyze Skill Gap
                  </>
                )}
              </button>
            </div>

            <div className="mt-6">
              <p className="text-sm text-gray-500 mb-2">
                Popular target roles:
              </p>
              <div className="flex flex-wrap gap-2">
                {popularRoles.slice(0, 6).map((role, idx) => (
                  <button
                    key={idx}
                    onClick={() => setTargetRole(role)}
                    className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-md text-xs transition cursor-pointer"
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Skill Gap Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-6"
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-amber-600" />
              Skill Gap Analysis
            </h2>

            {skillGap ? (
              <div className="space-y-5">
                <div>
                  <h3 className="font-semibold text-red-600 flex items-center gap-2 mb-3">
                    <XCircle className="w-4 h-4" />
                    Missing Skills ({skillGap.missingSkills?.length || 0})
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skillGap.missingSkills?.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-red-50 text-red-600 rounded-full text-sm"
                      >
                        {formatSkill(skill)}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-blue-600 flex items-center gap-2 mb-3">
                    <BookOpen className="w-4 h-4" />
                    Recommended Courses
                  </h3>
                  <div className="space-y-2">
                    {skillGap.recommendedCourses?.map((course, idx) => {
                      const { displayText, providerText } =
                        formatCourse(course);
                      return (
                        <div key={idx} className="p-3 bg-blue-50 rounded-xl">
                          <p className="font-medium text-blue-800">
                            {displayText}
                          </p>
                          {providerText && (
                            <p className="text-sm text-blue-600 mt-1">
                              {providerText}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="p-4 bg-amber-50 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                    <h3 className="font-semibold text-amber-700">
                      Learning Path Suggestion
                    </h3>
                  </div>
                  <p className="text-sm text-amber-800">
                    Focus on acquiring the missing skills through online
                    courses, certifications, and hands-on projects. Set a
                    3-month learning plan for the top 3 skills.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Target className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">
                  Enter a target role to see skill gap analysis
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SkillGap;
