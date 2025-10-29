import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import api from '../services/api';

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await api.get('/articles/me');
        setArticles(res.data);
      } catch (err) {
        console.error("Failed to fetch user submissions");
      }
      setLoading(false);
    };
    fetchSubmissions();
  }, []);

  if (loading) return <div className="text-center p-10 dark:text-white">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-2 dark:text-white">My Profile</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">Email: {user?.email}</p>

      <h2 className="text-2xl font-bold mb-4 dark:text-white">My Submissions</h2>
      <div className="space-y-4">
        {articles.length > 0 ? (
          articles.map(article => (
            <div key={article._id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
              <h3 className="font-bold text-lg dark:text-white">{article.title}</h3>
              <p className={`font-semibold ${article.prediction === 'fake' ? 'text-red-600' : 'text-green-600'}`}>
                Prediction: {article.prediction.toUpperCase()}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Submitted on: {new Date(article.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        ) : (
          <p className="dark:text-gray-300">You haven't submitted any articles yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;