from fastapi import FastAPI
from pydantic import BaseModel
import pickle

app = FastAPI()

with open("vectorizer.pkl", "rb") as f:
    vectorizer = pickle.load(f)
with open("model.pkl", "rb") as f:
    model = pickle.load(f)

class Article(BaseModel):
    title: str
    content: str

@app.post("/predict")
def predict(article: Article):
    print(f"Received prediction request: {article.title}")
    text = article.title + " " + article.content
    X = vectorizer.transform([text])
    proba = model.predict_proba(X)[0][1]
    prediction = "real" if proba > 0.5 else "fake"
    return {"prediction": prediction, "probability": float(proba)}