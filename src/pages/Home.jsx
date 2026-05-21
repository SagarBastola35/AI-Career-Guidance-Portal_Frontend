// frontend/src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sparkles,
  Brain,
  FileCheck,
  TrendingUp,
  ArrowRight,
  Star,
  Users,
  Award,
} from "lucide-react";

const Home = () => {
  const features = [
    {
      icon: Brain,
      title: "AI Career Recommendations",
      description:
        "Get personalized career paths based on your skills and interests using advanced AI algorithms.",
    },
    {
      icon: MessageCircle,
      title: "Career Chat Assistant",
      description:
        "Chat with our AI assistant for instant career advice and guidance anytime.",
    },
    {
      icon: FileCheck,
      title: "Resume Analyzer",
      description:
        "Get AI-powered resume analysis with ATS scoring and improvement suggestions.",
    },
    {
      icon: TrendingUp,
      title: "Skill Gap Analysis",
      description:
        "Identify missing skills and get course recommendations for your dream role.",
    },
  ];

  const stats = [
    { icon: Users, value: "10K+", label: "Active Users" },
    { icon: Star, value: "95%", label: "Satisfaction Rate" },
    { icon: Award, value: "500+", label: "Career Matches" },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 bg-linear-to-br from-indigo-50 via-white to-purple-50 -z-10" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float animation-delay-2000" />

        <div className="container mx-auto px-4 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center px-4 py-2 bg-indigo-100 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-indigo-600 mr-2" />
              <span className="text-sm font-medium text-indigo-600">
                AI-Powered Career Guidance
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Your AI-Powered
              <span className="gradient-text block"> Career Navigator</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
              Navigate your professional journey with intelligent AI insights,
              personalized recommendations, and real-time career guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="btn-primary inline-flex items-center justify-center gap-2"
              >
                Start Free Journey <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/login"
                className="btn-secondary inline-flex items-center justify-center"
              >
                Sign In
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 glass-card"
              >
                <stat.icon className="w-12 h-12 text-indigo-600 mx-auto mb-3" />
                <div className="text-4xl font-bold text-gray-800">
                  {stat.value}
                </div>
                <div className="text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful AI Features
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover how our AI agents transform your career planning
              experience
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-linear-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-r from-indigo-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Career?
          </h2>
          <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have discovered their ideal
            career path with AI guidance.
          </p>
          <Link
            to="/register"
            className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-semibold hover:shadow-xl transition-all inline-flex items-center gap-2"
          >
            Get Started Now <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

// Add missing import
import { MessageCircle } from "lucide-react";
export default Home;
