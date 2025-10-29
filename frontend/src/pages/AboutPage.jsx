import React from 'react';

const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4 dark:text-white">About NewsCheck</h1>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          NewsCheck is a tool designed to combat misinformation by leveraging the power of machine learning and community wisdom.
        </p>
        <h2 className="text-2xl font-semibold mb-2 dark:text-white">How It Works</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li><strong>Submit an Article:</strong> Users can submit the title and content of a news article they wish to verify.</li>
          <li><strong>AI Analysis:</strong> Our backend uses a machine learning model to predict whether the article is likely real or fake, providing a confidence score.</li>
          <li><strong>Community Feedback:</strong> If an article has been checked before, you can see how other users have voted on the prediction. You can also add your own vote and leave comments to help others.</li>
          <li><strong>Duplicate Checking:</strong> To save resources and centralize feedback, the system checks for existing articles before running a new analysis.</li>
        </ol>
      </div>
    </div>
  );
};

export default AboutPage;