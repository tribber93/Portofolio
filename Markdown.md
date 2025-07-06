# 🎯 Quisiin: An App-Based Questionnaire Marketplace to Help Gather Data for Specific Targets

In the world of research and data collection, finding the right respondents for a questionnaire is crucial. On the other hand, for potential respondents, discovering questionnaires that are relevant to their interests and demographics can also be a challenge. This project aims to bridge that gap by building a **Content-Based Recommendation System** using **deep learning**.

📌 This project was developed as part of the **Capstone Project in the Bangkit Academy 2023 program**, with a focus on applying machine learning to improve the efficiency of questionnaire-based research.

---

## 🗺️ Project Stages

The project is divided into several key phases:

1. **Data Preparation & Analysis**
2. **Feature Engineering**
3. **Model Training & Evaluation**
4. **Generating Recommendations**

---

## 📊 1. Data Preparation & Analysis

The first step involved loading the questionnaire dataset and user data. Each questionnaire entry includes information such as title, description, target age range, category, and average rating.

### Sample Questionnaire Data

| questionnaire_id | title                        | age range           | category              | rating |
| ---------------- | ---------------------------- | ------------------- | --------------------- | ------ |
| 1                | Risk Perception Impact...    | general             | online shop           | 4.0    |
| 2                | Parenting, Social Support... | 18–25, 26–35, 36–45 | social                | 4.5    |
| 3                | Research Questionnaire...    | general             | economics, technology | 3.9    |

The data was cleaned (e.g., converted to lowercase), and compound fields such as categories and age ranges were split into lists.

---

## ⚙️ 2. Feature Engineering & Preprocessing

Features such as categories and age ranges were transformed into numerical vectors using **One-Hot Encoding**. The same approach was applied to user data, including preferences, age, and occupation.

All vectors were then normalized using **StandardScaler** to ensure balanced feature distribution and improve training stability.

---

## 📈 3. Model Training & Evaluation

The model was built using a **deep learning-based content filtering approach**. It takes input from both sides: user vectors and item vectors (questionnaires), then calculates the similarity between the two.

The dataset was split into training and testing sets. The model was trained for several epochs using the _Adam_ optimizer and _MeanSquaredError_ as the loss function.

The loss consistently decreased during training, indicating that the model successfully learned the relationships between user and item features.

---

## 🚀 4. Generating Recommendations

After training, the model was tested using a hypothetical user profile:

- Preferred categories: business, technology
- Age range: 18–25
- Status: student

The model produced a ranked list of questionnaires based on the highest similarity scores between the user and questionnaire vectors.

---

## ✅ Conclusion

This project demonstrated that a **Content-Based Recommendation** approach using **deep learning** can be effectively applied to match questionnaires with suitable respondents automatically.

By transforming features into numerical representations and training the model on this structured data, the system is able to deliver personalized and relevant recommendations for each user.

## 🔗 Project Link

You can explore the project source code and demo here:  
[GitHub Repository - Quisiin](https://github.com/Bangkit-Capstone-C23-PC667/ML-Capstone-Project)
