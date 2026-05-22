
// frontend/src/pages/CareerRecommendation.jsx
import React, { useState, useEffect } from "react";
import axios from '../utils/axios';
import { motion } from "framer-motion";
import {
  Sparkles,
  Lightbulb,
  TrendingUp,
  BookOpen,
  RefreshCw,
  Edit,
} from "lucide-react";
import toast from "react-hot-toast";

// Helper to safely convert any skill value to string
const formatSkill = (skill) => {
  if (skill === null || skill === undefined) return "";
  if (typeof skill === "string") return skill;
  if (typeof skill === "object")
    return skill.name || skill.title || JSON.stringify(skill);
  return String(skill);
};

// Function to add random variation to mock recommendations (for demo purposes)
const addRandomVariation = (recs) => {
  if (!recs || recs.length === 0) return recs;
  return recs.map((rec) => ({
    ...rec,
    confidence: Math.min(
      95,
      Math.max(65, rec.confidence + (Math.random() * 10 - 5)),
    ), // vary ±5%
    skills: [...rec.skills].sort(() => Math.random() - 0.5), // shuffle skills
  }));
};

const CareerRecommendation = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState({
    skills: "",
    interests: "",
    experience: "entry",
    education: "",
  });
  const [isEditing, setIsEditing] = useState(true);

  useEffect(() => {
    fetchProfileAndRecommendations();
  }, []);

  const fetchProfileAndRecommendations = async () => {
    try {
      const profileRes = await axios.get("/api/auth/me");
      const profile = profileRes.data;
      setUserProfile({
        skills: profile.profile?.skills?.join(", ") || "",
        interests: profile.profile?.interests?.join(", ") || "",
        experience: profile.profile?.experience || "entry",
        education: profile.profile?.education || "",
      });

      const recsRes = await axios.get("/api/ai/recommendations");
      if (recsRes.data.careerPaths) {
        // Add random variation for mock data (so each fetch looks different)
        setRecommendations(addRandomVariation(recsRes.data.careerPaths));
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const generateRecommendations = async () => {
    setLoading(true);
    try {
      // Update profile
      const skillsArray = userProfile.skills
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s);
      const interestsArray = userProfile.interests
        .split(",")
        .map((i) => i.trim())
        .filter((i) => i);

      await axios.put("/api/auth/profile", {
        skills: skillsArray,
        interests: interestsArray,
        experience: userProfile.experience,
        education: userProfile.education,
      });

      // Fetch fresh recommendations
      const response = await axios.get("/api/ai/recommendations");
      let newRecs = response.data.careerPaths || [];
      // Add random variation for demo (remove this when using real AI)
      newRecs = addRandomVariation(newRecs);
      setRecommendations(newRecs);
      setIsEditing(false);
      toast.success("AI recommendations generated successfully!");
    } catch (error) {
      console.error("Generation error:", error);
      toast.error("Failed to generate recommendations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setUserProfile({ ...userProfile, [e.target.name]: e.target.value });
  };

  const startEditing = () => {
    setIsEditing(true);
  };

  return (
    <div className="pt-20 pb-12 px-4 min-h-screen">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold">
            AI Career <span className="gradient-text">Recommendations</span>
          </h1>
          <p className="text-gray-500 mt-2">
            Discover your ideal career path with AI-powered insights
          </p>
        </motion.div>

        {isEditing ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card max-w-2xl mx-auto p-8"
          >
            <h2 className="text-2xl font-semibold mb-4">
              Tell us about yourself
            </h2>
            <p className="text-gray-500 mb-6">
              Provide your skills and interests for personalized recommendations
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Skills (comma separated)
                </label>
                <input
                  type="text"
                  name="skills"
                  value={userProfile.skills}
                  onChange={handleInputChange}
                  placeholder="React, Python, Data Analysis, Project Management"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Interests (comma separated)
                </label>
                <input
                  type="text"
                  name="interests"
                  value={userProfile.interests}
                  onChange={handleInputChange}
                  placeholder="Web Development, AI, Leadership, Design"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Experience Level
                </label>
                <select
                  name="experience"
                  value={userProfile.experience}
                  onChange={handleInputChange}
                  className="input-field"
                >
                  <option value="entry">Entry Level (0-2 years)</option>
                  <option value="mid">Mid Level (3-5 years)</option>
                  <option value="senior">Senior Level (6+ years)</option>
                  <option value="lead">Lead/Manager</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Education Background
                </label>
                <input
                  type="text"
                  name="education"
                  value={userProfile.education}
                  onChange={handleInputChange}
                  placeholder="B.Tech in Computer Science, MBA, etc."
                  className="input-field"
                />
              </div>

              <button
                onClick={generateRecommendations}
                disabled={loading}
                className="w-full btn-primary flex items-center justify-center gap-2 mt-6 cursor-pointer"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate AI Recommendations
                  </>
                )}
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="space-y-8">
            <div className="flex justify-end">
              <button
                onClick={startEditing}
                className="flex items-center gap-2 px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-xl transition cursor-pointer"
              >
                <Edit className="w-4 h-4" />
                Edit Profile & Regenerate
              </button>
            </div>

            {recommendations.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  No recommendations yet. Please edit your profile and generate.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recommendations.map((rec, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-card p-6 hover:shadow-xl transition-all"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold text-indigo-700">
                        {rec.title}
                      </h3>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                        {Math.round(rec.confidence)}% Match
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{rec.reasoning}</p>
                    <div className="mb-4">
                      <h4 className="font-semibold text-sm text-gray-700 mb-2 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        Key Skills to Develop
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {rec.skills?.map((skill, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-sm"
                          >
                            {formatSkill(skill)}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button className="flex-1 text-sm bg-indigo-50 text-indigo-600 py-2 rounded-lg hover:bg-indigo-100 transition">
                        <BookOpen className="w-4 h-4 inline mr-1" />
                        Learning Path
                      </button>
                      <button className="flex-1 text-sm bg-gray-50 text-gray-600 py-2 rounded-lg hover:bg-gray-100 transition">
                        <Lightbulb className="w-4 h-4 inline mr-1" />
                        Explore Jobs
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerRecommendation;
