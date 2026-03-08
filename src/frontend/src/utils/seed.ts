import type { backendInterface } from "../backend.d";

export async function seedInitialData(actor: backendInterface) {
  try {
    const existingSubjects = await actor.getAllSubjects();
    if (existingSubjects.length > 0) return; // Already seeded

    // Add default subjects — Admin can add questions via Admin Panel
    await actor.addSubject(
      "Mathematics",
      "Algebra, Geometry, Trigonometry and more",
    );
    await actor.addSubject(
      "Science",
      "Physics, Chemistry and Biology fundamentals",
    );
    await actor.addSubject(
      "English",
      "Grammar, Literature and Comprehension skills",
    );
    await actor.addSubject(
      "History",
      "Ancient, Medieval and Modern Indian history",
    );
    await actor.addSubject(
      "Hindi",
      "Hindi Grammar, Literature and Comprehension",
    );
    await actor.addSubject("Geography", "Physical, Human and Indian Geography");
  } catch (err) {
    console.error("Seeding error:", err);
  }
}
