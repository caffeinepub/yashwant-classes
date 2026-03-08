import type { backendInterface } from "../backend.d";

export async function seedInitialData(actor: backendInterface) {
  try {
    const existingSubjects = await actor.getAllSubjects();
    if (existingSubjects.length > 0) return; // Already seeded

    // Add subjects
    const mathId = await actor.addSubject(
      "Mathematics",
      "Algebra, Geometry, Trigonometry and more",
    );
    const scienceId = await actor.addSubject(
      "Science",
      "Physics, Chemistry and Biology fundamentals",
    );
    const englishId = await actor.addSubject(
      "English",
      "Grammar, Literature and Comprehension skills",
    );
    const historyId = await actor.addSubject(
      "History",
      "Ancient, Medieval and Modern Indian history",
    );

    // Mathematics important questions
    await actor.addImportantQuestion(
      mathId,
      "What is the quadratic formula and when is it used?",
      "x = (-b ± √(b²-4ac)) / 2a",
      "The quadratic formula solves any quadratic equation of the form ax² + bx + c = 0. The discriminant (b²-4ac) tells us the nature of roots: if positive → 2 real roots, if zero → 1 real root, if negative → no real roots.",
      "Algebra",
    );
    await actor.addImportantQuestion(
      mathId,
      "State and prove the Pythagoras Theorem.",
      "In a right triangle, the square of the hypotenuse equals the sum of squares of the other two sides: a² + b² = c²",
      "Proof using area method: Consider a right triangle with legs a, b and hypotenuse c. Draw a square on each side. The area of the large square (a+b)² equals the sum of the four triangles plus the inner square, giving a² + b² = c².",
      "Geometry",
    );
    await actor.addImportantQuestion(
      mathId,
      "What are the trigonometric ratios for standard angles?",
      "sin30°=1/2, cos30°=√3/2, tan30°=1/√3; sin45°=1/√2, cos45°=1/√2, tan45°=1; sin60°=√3/2, cos60°=1/2, tan60°=√3",
      "Remember using the table: Start with sin from 0° to 90° as √0/2, √1/2, √2/2, √3/2, √4/2. Cos is the reverse. Tan = sin/cos.",
      "Trigonometry",
    );
    await actor.addImportantQuestion(
      mathId,
      "How do you find the area of a circle and its derivation?",
      "Area = πr², where r is the radius",
      "Derivation using integration: Divide circle into thin concentric rings. Each ring of radius x has area 2πx·dx. Integrating from 0 to r gives ∫₀ʳ 2πx dx = π[x²]₀ʳ = πr².",
      "Mensuration",
    );

    // Science important questions
    await actor.addImportantQuestion(
      scienceId,
      "State Newton's three laws of motion with examples.",
      "1. Law of Inertia: Body stays at rest or motion unless acted upon by force. 2. F = ma: Force equals mass times acceleration. 3. Every action has equal and opposite reaction.",
      "Example for each: 1. Passengers jerk forward when bus brakes suddenly. 2. A heavier truck needs more force to accelerate than a car. 3. A rocket expels gas downward, rocket goes upward.",
      "Physics - Mechanics",
    );
    await actor.addImportantQuestion(
      scienceId,
      "What is photosynthesis? Write the complete chemical equation.",
      "6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂",
      "Photosynthesis is the process by which green plants convert CO₂ and water into glucose using sunlight. It occurs in chloroplasts. The two stages are: Light reactions (in thylakoids) and Dark reactions/Calvin Cycle (in stroma).",
      "Biology - Plants",
    );
    await actor.addImportantQuestion(
      scienceId,
      "Explain the structure of an atom with Bohr's model.",
      "Atom has a central nucleus containing protons (+) and neutrons (0), surrounded by electrons (-) in fixed circular orbits called shells/energy levels.",
      "Bohr's postulates: 1. Electrons revolve in fixed circular orbits without radiating energy. 2. Each orbit has a fixed energy level. 3. Electrons jump orbits by absorbing or emitting specific energy quanta (photons).",
      "Chemistry - Atomic Structure",
    );

    // English important questions
    await actor.addImportantQuestion(
      englishId,
      "What is the difference between Active and Passive Voice?",
      "Active: Subject performs the action (Ram ate the apple). Passive: Subject receives the action (The apple was eaten by Ram).",
      "Rules for conversion: 1. Object becomes subject in passive. 2. Subject becomes object with 'by'. 3. Verb changes to 'be + past participle'. 4. Tense of 'be' matches the original tense.",
      "Grammar",
    );
    await actor.addImportantQuestion(
      englishId,
      "Explain the concept of Direct and Indirect Speech with rules.",
      "Direct: Repeating exact words in quotes. Indirect: Reporting the meaning without exact words, with appropriate pronoun and tense changes.",
      "Key changes: 1. Present becomes Past (is→was, am→was, are→were). 2. Will→Would, Can→Could, May→Might. 3. 'This'→'That', 'Here'→'There', 'Today'→'That day'. 4. Remove inverted commas, add 'that'.",
      "Grammar",
    );

    // History important questions
    await actor.addImportantQuestion(
      historyId,
      "What were the main causes of the First War of Independence (1857)?",
      "Immediate cause: Introduction of Enfield rifle with greased cartridges. Other causes: Doctrine of Lapse, high taxation, social interference, economic exploitation by British.",
      "The 1857 revolt is called India's First War of Independence. It began on May 10 at Meerut. Key leaders included Mangal Pandey, Rani Lakshmibai, Tantia Tope, Nana Sahib, and Bahadur Shah Zafar. It failed due to lack of unified command.",
      "Modern India",
    );
    await actor.addImportantQuestion(
      historyId,
      "Describe the Harappan (Indus Valley) Civilization and its key features.",
      "Flourished around 2600-1900 BCE. Key features: Advanced town planning with grid system, great bath, drainage system, standardized weights and measures, trade with Mesopotamia.",
      "Major sites: Mohenjo-daro (Pakistan), Harappa (Pakistan), Lothal (Gujarat), Dholavira (Gujarat), Kalibangan (Rajasthan). The civilization was peaceful with no evidence of warfare. The script remains undeciphered.",
      "Ancient India",
    );

    // Quiz Questions for Mathematics
    const mq1 = await actor.addQuizQuestion(
      "If a² + b² = c² in a triangle, what type of triangle is it?",
      "Acute triangle",
      "Right-angled triangle",
      "Obtuse triangle",
      "Equilateral triangle",
      "B",
      "By the Pythagorean theorem, a² + b² = c² is the condition for a right-angled triangle, where c is the hypotenuse (longest side) and the right angle is opposite to it.",
    );
    const mq2 = await actor.addQuizQuestion(
      "What is the value of sin²θ + cos²θ?",
      "0",
      "2",
      "1",
      "√2",
      "C",
      "This is the fundamental Pythagorean identity in trigonometry. sin²θ + cos²θ = 1 for all values of θ. It can be derived from the Pythagorean theorem applied to a unit circle.",
    );
    const mq3 = await actor.addQuizQuestion(
      "The HCF of 36 and 48 is:",
      "6",
      "12",
      "24",
      "4",
      "B",
      "Using prime factorization: 36 = 2² × 3² and 48 = 2⁴ × 3. HCF = 2² × 3 = 4 × 3 = 12. HCF takes the smallest power of common prime factors.",
    );
    const mq4 = await actor.addQuizQuestion(
      "If x + y = 10 and xy = 21, what is x² + y²?",
      "100",
      "58",
      "42",
      "79",
      "B",
      "Using the identity: x² + y² = (x + y)² - 2xy = 10² - 2(21) = 100 - 42 = 58. This is a standard algebraic identity that's very useful in exams.",
    );

    // Quiz Questions for Science
    const sq1 = await actor.addQuizQuestion(
      "Which gas is produced when zinc reacts with dilute sulphuric acid?",
      "Oxygen",
      "Carbon dioxide",
      "Hydrogen",
      "Sulphur dioxide",
      "C",
      "Zn + H₂SO₄ → ZnSO₄ + H₂↑. Hydrogen gas is produced. This is a displacement reaction where zinc, being more reactive than hydrogen, displaces hydrogen from the acid.",
    );
    const sq2 = await actor.addQuizQuestion(
      "The powerhouse of the cell is:",
      "Nucleus",
      "Mitochondria",
      "Ribosome",
      "Golgi apparatus",
      "B",
      "Mitochondria is called the powerhouse of the cell because it produces ATP (Adenosine Triphosphate) through cellular respiration (aerobic). ATP is the energy currency of the cell.",
    );
    const sq3 = await actor.addQuizQuestion(
      "Which of Newton's laws explains why we wear seatbelts?",
      "Third law",
      "Law of gravitation",
      "Second law",
      "First law",
      "D",
      "Newton's First Law (Law of Inertia) explains why seatbelts are necessary. When a car stops suddenly, passengers continue moving forward due to inertia. Seatbelts provide the external force needed to stop passengers.",
    );

    // Create quizzes
    await actor.addQuiz(
      "Mathematics Fundamentals Quiz",
      mathId,
      "Test your knowledge of Algebra, Geometry and Trigonometry basics",
      BigInt(15),
      [mq1, mq2, mq3, mq4],
    );

    await actor.addQuiz(
      "Science Explorer Quiz",
      scienceId,
      "Chemistry, Physics and Biology fundamental concepts",
      BigInt(10),
      [sq1, sq2, sq3],
    );
  } catch (err) {
    console.error("Seeding error:", err);
  }
}
