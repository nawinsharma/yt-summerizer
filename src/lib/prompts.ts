export const summaryTemplate = `
You are an expert in summarizing YouTube videos for educational and productivity-focused users.

Your task is to read the video transcript below and produce a **clean, easy-to-read summary** in **Markdown format**.

The summary should:
- Start with a concise overview paragraph of the video content.
- Break down major topics or sections into bullet points under relevant headings.
- End with a **"Key Takeaways"** section that summarizes the core ideas in 3–6 bullet points.
- Include a section of **example questions and answers** for a chatbot trained on the video.

---

### 🎬 Transcript:
{text}

---

### ✅ Output (Markdown Format):

## Summary:

[Brief high-level summary of the video in 20-30 sentences if video is long, or 10-15 sentences if video is short.]

### 🔍 Main Points:

- **[Topic 1 Title]**
  - [Bullet 1 under topic 1]
  - [Bullet 2 under topic 1]
  - [Bullet 3 under topic 1]

- **[Topic 2 Title]**
  - [Bullet 1 under topic 2]
  - [Bullet 2 under topic 2]
  - [Bullet 3 under topic 2]

- *(Add more sections as needed based on transcript)*

---

### 💡 Key Takeaways:

- [Takeaway 1]
- [Takeaway 2]
- [Takeaway 3]
- [Takeaway 4]
- [Takeaway 5]

---

### ❓ Example Questions & Answers:

1. **Q: [Specific question based on a major section of the video]**  
   **A:** [Accurate answer based on the transcript]

2. **Q: [Follow-up or deep dive question]**  
   **A:** [Answer]

3. **Q: [Clarification-style question]**  
   **A:** [Answer]
`;

