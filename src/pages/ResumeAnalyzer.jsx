// frontend/src/pages/ResumeAnalyzer.jsx
import React, { useState, useCallback } from "react";
import axios from '../utils/axios.js'
import { motion } from "framer-motion";
import {
  Upload,
  FileText,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  Download,
  Trash2,
} from "lucide-react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";

const ResumeAnalyzer = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [resumes, setResumes] = useState([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    const uploadedFile = acceptedFiles[0];
    if (
      uploadedFile &&
      (uploadedFile.type === "application/pdf" ||
        uploadedFile.type === "text/plain")
    ) {
      setFile(uploadedFile);
    } else {
      toast.error("Please upload a PDF or TXT file");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"], "text/plain": [".txt"] },
    maxFiles: 1,
  });

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file first");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("resume", file);

    try {
      const response = await axios.post("/api/resume/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setAnalysis(response.data.resume.analysis);
      toast.success("Resume analyzed successfully!");
      fetchResumes();
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to analyze resume. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const fetchResumes = async () => {
    setLoadingResumes(true);
    try {
      const response = await axios.get("/api/resume");
      setResumes(response.data);
    } catch (error) {
      console.error("Fetch resumes error:", error);
    } finally {
      setLoadingResumes(false);
    }
  };

  const deleteResume = async (id) => {
    try {
      await axios.delete(`/api/resume/${id}`);
      toast.success("Resume deleted");
      fetchResumes();
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  React.useEffect(() => {
    fetchResumes();
  }, []);

  return (
    <div className="pt-20 pb-12 px-4 min-h-screen">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold">
            AI Resume <span className="gradient-text">Analyzer</span>
          </h1>
          <p className="text-gray-500 mt-2">
            Get AI-powered insights to optimize your resume for ATS
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-6"
          >
            <h2 className="text-xl font-semibold mb-4">Upload Resume</h2>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                isDragActive
                  ? "border-indigo-500 bg-indigo-50"
                  : "border-gray-300 hover:border-indigo-400"
              }`}
            >
              <input {...getInputProps()} />
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              {isDragActive ? (
                <p>Drop your resume here...</p>
              ) : (
                <div>
                  <p className="text-gray-600">Drag & drop your resume here</p>
                  <p className="text-sm text-gray-400 mt-1">
                    PDF or TXT (Max 5MB)
                  </p>
                </div>
              )}
            </div>

            {file && (
              <div className="mt-4 p-3 bg-indigo-50 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-indigo-600" />
                  <span className="text-sm font-medium">{file.name}</span>
                </div>
                <button
                  onClick={handleUpload}
                  disabled={uploading}
                  className="btn-primary py-2! px-4! text-sm cursor-pointer"
                >
                  {uploading ? "Analyzing..." : "Analyze"}
                </button>
              </div>
            )}

            {analysis && (
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span className="font-semibold">
                    ATS Score: {analysis.atsScore}%
                  </span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-linear-to-r from-green-500 to-emerald-500 rounded-full h-2 transition-all"
                      style={{ width: `${analysis.atsScore}%` }}
                    />
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Analysis Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-6"
          >
            <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>
            {analysis ? (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-green-600 flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4" /> Strengths
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    {analysis.strengths?.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-red-600 flex items-center gap-2 mb-2">
                    <XCircle className="w-4 h-4" /> Areas to Improve
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    {analysis.weaknesses?.map((w, i) => (
                      <li key={i}>{w}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-amber-600 flex items-center gap-2 mb-2">
                    <AlertCircle className="w-4 h-4" /> Suggestions
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    {analysis.suggestions?.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-indigo-600 mb-2">
                    Keywords Found
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {analysis.keywords?.slice(0, 8).map((k, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs"
                      >
                        {k}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">
                Upload a resume to see AI analysis
              </p>
            )}
          </motion.div>
        </div>

        {/* Previous Resumes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 glass-card p-6"
        >
          <h2 className="text-xl font-semibold mb-4">Previous Analyses</h2>
          {loadingResumes ? (
            <div className="text-center py-4">Loading...</div>
          ) : resumes.length > 0 ? (
            <div className="space-y-3">
              {resumes.map((res) => (
                <div
                  key={res._id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="font-medium">{res.fileName}</p>
                      <p className="text-xs text-gray-500">
                        ATS Score: {res.analysis?.atsScore}%
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteResume(res._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">
              No resumes analyzed yet
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ResumeAnalyzer;
