export type SocialStudiesLesson = {
  id: string;
  subject: "Social Studies";
  shortSubject: string;
  title: string;
  chapter: string;
  sourcePages: [number, number];
  sourceImage: string;
  focus: string;
  studyText: string;
  practiceLabel: string;
  accent: string;
};

export const socialStudiesLessons: readonly SocialStudiesLesson[] = [
  {
    id: "social-civics-government",
    subject: "Social Studies",
    shortSubject: "Civics and Government",
    title: "Civics and Government",
    chapter: "Chapter 1 · McGraw Hill Social Studies",
    sourcePages: [939, 980],
    sourceImage: "/manus-storage/civics_11cbe625.jpg",
    focus: "Understand how the Constitution, the branches of government, federalism, rights, and civic participation organize public power.",
    studyText: "Read each source, identify the institution or constitutional principle involved, and then connect the evidence to the question. The chapter’s practice is designed to make you reason from primary sources, quotations, charts, and government structure rather than rely on memorized labels.",
    practiceLabel: "Practice Civics and Government",
    accent: "#8A6B42",
  },
  {
    id: "social-us-history",
    subject: "Social Studies",
    shortSubject: "U.S. History",
    title: "U.S. History",
    chapter: "Chapter 2 · McGraw Hill Social Studies",
    sourcePages: [981, 1047],
    sourceImage: "/manus-storage/history_9b223463.jpg",
    focus: "Read historical documents and timelines for cause, consequence, change over time, and the ideas that shaped the United States.",
    studyText: "Treat every historical passage as evidence. First locate the time and speaker, then ask what changed, what stayed the same, and which consequence the source supports. Timelines, quotations, and public documents should be read together with the question’s wording.",
    practiceLabel: "Practice U.S. History",
    accent: "#9B7650",
  },
  {
    id: "social-economics",
    subject: "Social Studies",
    shortSubject: "Economics",
    title: "Economics",
    chapter: "Chapter 3 · McGraw Hill Social Studies",
    sourcePages: [1048, 1068],
    sourceImage: "/manus-storage/economics_13ec5658.jpg",
    focus: "Use supply, demand, incentives, markets, production, and economic data to explain why people and institutions make choices.",
    studyText: "When a question includes a graph or table, describe the movement before explaining it. Name the variable that changed, identify the direction of the relationship, and use the economic principle that best accounts for the evidence.",
    practiceLabel: "Practice Economics",
    accent: "#A06A3B",
  },
  {
    id: "social-geography-world",
    subject: "Social Studies",
    shortSubject: "Geography and the World",
    title: "Geography and the World",
    chapter: "Chapter 4 · McGraw Hill Social Studies",
    sourcePages: [1069, 1125],
    sourceImage: "/manus-storage/geography_1a0e8f4b.jpg",
    focus: "Interpret maps, population patterns, energy data, regions, resources, and the relationships between people and place.",
    studyText: "Start with the map or data display, not the answer choices. Establish the region, scale, direction, or trend; then match the evidence to the claim. The GED rewards careful interpretation of geographic information more than recall of isolated facts.",
    practiceLabel: "Practice Geography and the World",
    accent: "#6F7D55",
  },
];

export function getSocialStudiesLesson(id: string) {
  return socialStudiesLessons.find((lesson) => lesson.id === id);
}
