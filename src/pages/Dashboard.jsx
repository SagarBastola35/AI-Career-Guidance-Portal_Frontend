// frontend/src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import {
  Sparkles,
  TrendingUp,
  FileText,
  MessageCircle,
  Award,
  Clock,
  Target,
  ChevronRight,
} from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const [insights, setInsights] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [insightsRes, jobsRes] = await Promise.all([
        axios.get("/api/ai/insights"),
        axios.get("/api/career/jobs"),
      ]);
      setInsights(insightsRes.data);
      setJobs(jobsRes.data.slice(0, 3));
    } catch (error) {
      console.error("Dashboard fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    {
      icon: Target,
      label: "Profile Completion",
      value: insights?.profileCompletion || 0,
      unit: "%",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: Award,
      label: "Career Matches",
      value: insights?.topRecommendations?.length || 0,
      unit: "",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Clock,
      label: "Actions Pending",
      value: insights?.suggestedActions?.length || 0,
      unit: "",
      color: "from-amber-500 to-orange-500",
    },
  ];

  const quickActions = [
    {
      title: "AI Career Recommendations",
      icon: Sparkles,
      path: "/career-recommendation",
      description: "Get personalized career paths",
    },
    {
      title: "AI Career Chat",
      icon: MessageCircle,
      path: "/ai-chat",
      description: "Chat with your career assistant",
    },
    {
      title: "Resume Analyzer",
      icon: FileText,
      path: "/resume-analyzer",
      description: "Optimize your resume with AI",
    },
    {
      title: "Skill Gap Analysis",
      icon: TrendingUp,
      path: "/skill-gap",
      description: "Identify missing skills",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold">
            Welcome back, <span className="gradient-text">{user?.name}</span>
          </h1>
          <p className="text-gray-500 mt-2">
            Your AI-powered career journey continues here
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6"
            >
              <div
                className={`w-12 h-12 bg-linear-to-r ${stat.color} rounded-xl flex items-center justify-center mb-4`}
              >
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold">
                {stat.value}
                {stat.unit}
              </div>
              <div className="text-gray-500 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.path}
                className="glass-card p-5 hover:shadow-xl transition-all hover:-translate-y-1 group"
              >
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mb-3 group-hover:bg-indigo-200 transition">
                  <action.icon className="w-5 h-5 text-indigo-600" />
                </div>
                <h3 className="font-semibold mb-1">{action.title}</h3>
                <p className="text-gray-500 text-sm">{action.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Suggested Actions & Job Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Suggested Actions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-6"
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              Recommended Actions
            </h3>
            {insights?.suggestedActions?.length > 0 ? (
              <ul className="space-y-3">
                {insights.suggestedActions.map((action, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 text-gray-600"
                  >
                    <ChevronRight className="w-4 h-4 text-indigo-500" />
                    {action}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">
                Complete your profile to get personalized recommendations
              </p>
            )}
          </motion.div>

          {/* Job Recommendations */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-6"
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-600" />
              Top Job Matches
            </h3>
            <div className="space-y-4">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="border-b border-gray-100 pb-3 last:border-0"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{job.title}</h4>
                      <p className="text-sm text-gray-500">
                        {job.company} • {job.location}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-green-600">
                      {job.matchScore}% Match
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{job.salary}</p>
                </div>
              ))}
              {jobs.length === 0 && (
                <p className="text-gray-500">No job matches found</p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
