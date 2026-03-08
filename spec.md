# Yashwant Classes

## Current State
Full-stack app with backend (Motoko) and React frontend. Features: subjects, important questions, quiz, quiz attempts, admin panel. Seed data includes NCERT-style pre-loaded questions and quizzes.

## Requested Changes (Diff)

### Add
- Nothing new to add

### Modify
- Remove all pre-loaded questions and quiz questions from seed.ts
- Keep only subject creation in seed (Mathematics, Science, English, History, Hindi, Geography)
- App starts empty — admin adds questions and quizzes via Admin Panel

### Remove
- All hardcoded question/answer seed data from seed.ts
- All hardcoded quiz question seed data from seed.ts
- All hardcoded quiz creation from seed.ts

## Implementation Plan
1. Update seed.ts to only create subjects, no questions or quizzes
2. Backend and all pages remain unchanged
3. Admin Panel still fully functional for adding content
