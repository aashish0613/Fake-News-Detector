import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import api from '../services/api';
import { Link } from 'react-router-dom';
import { ShieldCheckIcon, MagnifyingGlassIcon, ChatBubbleLeftRightIcon, HandThumbUpIcon, HandThumbDownIcon } from '@heroicons/react/24/outline';

const HomePage = () => {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [commentText, setCommentText] = useState('');

  const handleCheck = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const res = await api.post('/articles/check', { title, content });
      setResult(res.data.article);
    } catch (err) {
      console.error(err);
      alert('An error occurred. Please try again.');
    }
    setLoading(false);
  };

  const handleVote = async (voteType) => {
    try {
      const res = await api.post('/articles/vote', { articleId: result._id, voteType });
      setResult(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    try {
      const res = await api.post('/articles/comment', { articleId: result._id, text: commentText });
      setResult(res.data);
      setCommentText('');
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-slate-100 to-blue-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 px-4">
        {/* Hero Icon */}
        <ShieldCheckIcon className="h-20 w-20 text-blue-600 dark:text-blue-400 mb-4" />
        <h1 className="text-4xl font-extrabold mb-2 text-gray-900 dark:text-white text-center">
          Welcome to <span className="text-blue-600 dark:text-blue-400">NewsCheck</span>
        </h1>
        <p className="mb-6 text-lg text-gray-700 dark:text-gray-300 text-center max-w-xl">
          NewsCheck helps you verify the authenticity of news articles using AI and community feedback.<br />
          <span className="font-medium text-blue-600 dark:text-blue-400">Fight misinformation with confidence.</span>
        </p>
        <div className="flex space-x-4 mb-8">
          <Link to="/login" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">Login</Link>
          <Link to="/signup" className="bg-white dark:bg-gray-800 border border-blue-600 text-blue-600 dark:text-blue-400 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-gray-700 transition">Sign Up</Link>
        </div>
        {/* How it works */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mt-4 max-w-2xl w-full">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white text-center">How It Works</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            <div className="flex flex-col items-center text-center">
              <MagnifyingGlassIcon className="h-10 w-10 text-blue-500 mb-2" />
              <span className="font-semibold text-gray-800 dark:text-gray-200">1. Paste Article</span>
              <span className="text-gray-500 dark:text-gray-400 text-sm">Submit the news you want to check.</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <ShieldCheckIcon className="h-10 w-10 text-green-500 mb-2" />
              <span className="font-semibold text-gray-800 dark:text-gray-200">2. AI Analysis</span>
              <span className="text-gray-500 dark:text-gray-400 text-sm">Get instant authenticity prediction.</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <ChatBubbleLeftRightIcon className="h-10 w-10 text-purple-500 mb-2" />
              <span className="font-semibold text-gray-800 dark:text-gray-200">3. Community Feedback</span>
              <span className="text-gray-500 dark:text-gray-400 text-sm">See votes & notes from others.</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-blue-50 via-slate-100 to-blue-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 py-8">
      <div className="w-full max-w-2xl">
        {/* Article Check Form */}
        <form
          onSubmit={handleCheck}
          className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-blue-100 dark:border-gray-700 mb-8"
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white text-center">Check News Authenticity</h2>
          <div className="mb-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter article title"
              required
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
          <div className="mb-6">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste the article content here..."
              required
              rows={7}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:bg-blue-400"
          >
            {loading ? 'Analyzing...' : 'Check Authenticity'}
          </button>
        </form>

        {/* Result Section */}
        {result && (
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-blue-100 dark:border-gray-700">
            <div className={`p-4 rounded-lg mb-6 flex flex-col items-center ${result.prediction === 'fake'
              ? 'bg-red-50 dark:bg-red-900/30'
              : 'bg-green-50 dark:bg-green-900/30'
              }`}>
              <h3 className={`text-2xl font-bold mb-2 ${result.prediction === 'fake'
                ? 'text-red-700 dark:text-red-300'
                : 'text-green-700 dark:text-green-300'
                }`}>
                AI Prediction: {result.prediction.toUpperCase()}
              </h3>
              <span className="text-gray-700 dark:text-gray-300 text-lg">
                Confidence: {(result.probability * 100).toFixed(2)}%
              </span>
            </div>

            {/* Community Feedback */}
            <div>
              <h4 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Community Feedback</h4>
              <div className="flex items-center space-x-8 mb-6 justify-center">
                <button
                  onClick={() => handleVote('upvote')}
                  className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 font-medium transition"
                >
                  <HandThumbUpIcon className="h-6 w-6" />
                  <span>{result.upvotes.length}</span>
                </button>
                <button
                  onClick={() => handleVote('downvote')}
                  className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 font-medium transition"
                >
                  <HandThumbDownIcon className="h-6 w-6" />
                  <span>{result.downvotes.length}</span>
                </button>
              </div>

              {/* Comments */}
              <h5 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Notes & Comments</h5>
              <form onSubmit={handleComment} className="flex space-x-2 mb-4">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Add a note..."
                  required
                  className="flex-grow p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
                <button
                  type="submit"
                  className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
                >
                  Post
                </button>
              </form>
              <div className="space-y-4 max-h-40 overflow-y-auto pr-2">
                {result.comments.map(comment => (
                  <div key={comment._id} className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-md">
                    <p className="text-gray-800 dark:text-gray-200">{comment.text}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      - {comment.user.email} on {new Date(comment.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;