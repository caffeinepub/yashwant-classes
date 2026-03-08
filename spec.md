# Yashwant Classes

## Current State
Naya project hai. Abhi koi code nahi hai.

## Requested Changes (Diff)

### Add
- Home page with Yashwant Classes branding
- Important Questions section: subject-wise question papers (admin add kar sake, students dekh sake)
- Quiz section: multiple choice quizzes with timer, score display at the end
- Admin panel: questions aur quizzes manage karne ke liye (add/edit/delete)
- Student view: quiz attempt karna, score dekhna, important questions browse karna
- Subject/topic categories for organizing content

### Modify
- N/A (new project)

### Remove
- N/A (new project)

## Implementation Plan
1. Backend (Motoko):
   - Subject/category data model
   - Important questions data model (subject, question text, answer/explanation)
   - Quiz data model (title, subject, list of MCQ questions with options and correct answer)
   - Quiz attempt/result tracking
   - CRUD APIs for admin
   - Read APIs for students

2. Frontend:
   - Home page with navigation
   - Important Questions page: subject filter, question list with answers
   - Quiz listing page: available quizzes by subject
   - Quiz attempt page: MCQ with timer, submit, score result
   - Admin panel: add/edit/delete questions and quizzes
   - Responsive design for mobile students
