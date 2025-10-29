import pickle
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

# Dummy training data
texts = [
    "Breaking news: Scientists discover water on Mars!",
    "You won a million dollars! Click here to claim.",
    "Government launches new healthcare initiative.",
    "This is not a real news article, just a scam."
]
labels = [1, 0, 1, 0]  # 1 = real, 0 = fake

# Train a simple pipeline
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(texts)
clf = LogisticRegression()
clf.fit(X, labels)

# Save the model and vectorizer
with open("vectorizer.pkl", "wb") as f:
    pickle.dump(vectorizer, f)
with open("model.pkl", "wb") as f:
    pickle.dump(clf, f)