/* Atlas Study Hall: student-facing mastery roadmap generated from the supplied GED course outline. */

export type StudyLesson = { id: string; title: string; time: string; study: string; mastery: string; practice: string; };
export type StudyChapter = StudyLesson & { number: number; lessons: StudyLesson[]; };
export type StudySubject = { name: string; shortName: string; color: string; chapters: StudyChapter[]; };

export const studyMap: StudySubject[] = [
  {
    "name": "Reasoning Through Language Arts",
    "shortName": "RLA",
    "color": "#496D72",
    "chapters": [
      {
        "id": "rla-1",
        "number": 1,
        "title": "Testing Basic English Usage",
        "time": "105 min",
        "study": "Preview the chapter, learn the core idea, and annotate one worked example before practicing.",
        "mastery": "Explain the main idea without notes and complete a short mixed check with at least 80% accuracy.",
        "practice": "Use a three-pass routine: guided example, untimed practice, then a timed GED-style set.",
        "lessons": [
          {
            "id": "rla-1-1",
            "title": "Practice: Testing Basic English Usage",
            "time": "45–75 min",
            "study": "Treat this as a checkpoint: work independently first, then mark every uncertain item.",
            "mastery": "Reach 80% or better and explain why each missed answer is wrong.",
            "practice": "Complete it timed, review errors by category, and repeat only the missed skill types."
          }
        ]
      },
      {
        "id": "rla-2",
        "number": 2,
        "title": "Testing Reading Comprehension",
        "time": "105 min",
        "study": "Preview the chapter, learn the core idea, and annotate one worked example before practicing.",
        "mastery": "Explain the main idea without notes and complete a short mixed check with at least 80% accuracy.",
        "practice": "Use a three-pass routine: guided example, untimed practice, then a timed GED-style set.",
        "lessons": [
          {
            "id": "rla-2-1",
            "title": "Basic Critical Reading Skills",
            "time": "25–35 min",
            "study": "Read actively, mark the claim or structure, and write a one-sentence explanation in your own words.",
            "mastery": "Answer a new question and point to the exact evidence, language, or structure that supports it.",
            "practice": "Complete one guided item, three independent items, and one timed mixed question."
          },
          {
            "id": "rla-2-2",
            "title": "Identifying the Main Idea in a Text",
            "time": "25–35 min",
            "study": "Read actively, mark the claim or structure, and write a one-sentence explanation in your own words.",
            "mastery": "Answer a new question and point to the exact evidence, language, or structure that supports it.",
            "practice": "Complete one guided item, three independent items, and one timed mixed question."
          },
          {
            "id": "rla-2-3",
            "title": "Finding Details in a Text",
            "time": "25–35 min",
            "study": "Read actively, mark the claim or structure, and write a one-sentence explanation in your own words.",
            "mastery": "Answer a new question and point to the exact evidence, language, or structure that supports it.",
            "practice": "Complete one guided item, three independent items, and one timed mixed question."
          },
          {
            "id": "rla-2-4",
            "title": "Analyzing Implicit Main Ideas",
            "time": "25–35 min",
            "study": "Read actively, mark the claim or structure, and write a one-sentence explanation in your own words.",
            "mastery": "Answer a new question and point to the exact evidence, language, or structure that supports it.",
            "practice": "Complete one guided item, three independent items, and one timed mixed question."
          },
          {
            "id": "rla-2-5",
            "title": "Making Inferences and Drawing Conclusions",
            "time": "25–35 min",
            "study": "Read actively, mark the claim or structure, and write a one-sentence explanation in your own words.",
            "mastery": "Answer a new question and point to the exact evidence, language, or structure that supports it.",
            "practice": "Complete one guided item, three independent items, and one timed mixed question."
          },
          {
            "id": "rla-2-6",
            "title": "Identifying Textual Evidence",
            "time": "25–35 min",
            "study": "Read actively, mark the claim or structure, and write a one-sentence explanation in your own words.",
            "mastery": "Answer a new question and point to the exact evidence, language, or structure that supports it.",
            "practice": "Complete one guided item, three independent items, and one timed mixed question."
          },
          {
            "id": "rla-2-7",
            "title": "Making Connections Between Ideas",
            "time": "25–35 min",
            "study": "Read actively, mark the claim or structure, and write a one-sentence explanation in your own words.",
            "mastery": "Answer a new question and point to the exact evidence, language, or structure that supports it.",
            "practice": "Complete one guided item, three independent items, and one timed mixed question."
          },
          {
            "id": "rla-2-8",
            "title": "Practice: Testing Reading Comprehension",
            "time": "45–75 min",
            "study": "Treat this as a checkpoint: work independently first, then mark every uncertain item.",
            "mastery": "Reach 80% or better and explain why each missed answer is wrong.",
            "practice": "Complete it timed, review errors by category, and repeat only the missed skill types."
          }
        ]
      },
      {
        "id": "rla-3",
        "number": 3,
        "title": "Structure and Author’s Choices",
        "time": "105 min",
        "study": "Preview the chapter, learn the core idea, and annotate one worked example before practicing.",
        "mastery": "Explain the main idea without notes and complete a short mixed check with at least 80% accuracy.",
        "practice": "Use a three-pass routine: guided example, untimed practice, then a timed GED-style set.",
        "lessons": [
          {
            "id": "rla-3-1",
            "title": "Practice: Structure and Author’s Choices",
            "time": "45–75 min",
            "study": "Treat this as a checkpoint: work independently first, then mark every uncertain item.",
            "mastery": "Reach 80% or better and explain why each missed answer is wrong.",
            "practice": "Complete it timed, review errors by category, and repeat only the missed skill types."
          }
        ]
      },
      {
        "id": "rla-4",
        "number": 4,
        "title": "Literary Texts",
        "time": "105 min",
        "study": "Preview the chapter, learn the core idea, and annotate one worked example before practicing.",
        "mastery": "Explain the main idea without notes and complete a short mixed check with at least 80% accuracy.",
        "practice": "Use a three-pass routine: guided example, untimed practice, then a timed GED-style set.",
        "lessons": [
          {
            "id": "rla-4-1",
            "title": "Using Textual Evidence to Analyze Elements of Fiction Theme",
            "time": "25–35 min",
            "study": "Read actively, mark the claim or structure, and write a one-sentence explanation in your own words.",
            "mastery": "Answer a new question and point to the exact evidence, language, or structure that supports it.",
            "practice": "Complete one guided item, three independent items, and one timed mixed question."
          },
          {
            "id": "rla-4-2",
            "title": "Interaction Between Characters",
            "time": "25–35 min",
            "study": "Read actively, mark the claim or structure, and write a one-sentence explanation in your own words.",
            "mastery": "Answer a new question and point to the exact evidence, language, or structure that supports it.",
            "practice": "Complete one guided item, three independent items, and one timed mixed question."
          },
          {
            "id": "rla-4-3",
            "title": "Practice: Literary Texts",
            "time": "45–75 min",
            "study": "Treat this as a checkpoint: work independently first, then mark every uncertain item.",
            "mastery": "Reach 80% or better and explain why each missed answer is wrong.",
            "practice": "Complete it timed, review errors by category, and repeat only the missed skill types."
          }
        ]
      },
      {
        "id": "rla-5",
        "number": 5,
        "title": "Informational Texts",
        "time": "105 min",
        "study": "Preview the chapter, learn the core idea, and annotate one worked example before practicing.",
        "mastery": "Explain the main idea without notes and complete a short mixed check with at least 80% accuracy.",
        "practice": "Use a three-pass routine: guided example, untimed practice, then a timed GED-style set.",
        "lessons": [
          {
            "id": "rla-5-1",
            "title": "Analyzing Arguments",
            "time": "25–35 min",
            "study": "Read actively, mark the claim or structure, and write a one-sentence explanation in your own words.",
            "mastery": "Answer a new question and point to the exact evidence, language, or structure that supports it.",
            "practice": "Complete one guided item, three independent items, and one timed mixed question."
          },
          {
            "id": "rla-5-2",
            "title": "Evaluating Claims",
            "time": "25–35 min",
            "study": "Read actively, mark the claim or structure, and write a one-sentence explanation in your own words.",
            "mastery": "Answer a new question and point to the exact evidence, language, or structure that supports it.",
            "practice": "Complete one guided item, three independent items, and one timed mixed question."
          },
          {
            "id": "rla-5-3",
            "title": "Practice: Informational Texts",
            "time": "45–75 min",
            "study": "Treat this as a checkpoint: work independently first, then mark every uncertain item.",
            "mastery": "Reach 80% or better and explain why each missed answer is wrong.",
            "practice": "Complete it timed, review errors by category, and repeat only the missed skill types."
          }
        ]
      },
      {
        "id": "rla-6",
        "number": 6,
        "title": "RLA Extended Response",
        "time": "105 min",
        "study": "Preview the chapter, learn the core idea, and annotate one worked example before practicing.",
        "mastery": "Explain the main idea without notes and complete a short mixed check with at least 80% accuracy.",
        "practice": "Use a three-pass routine: guided example, untimed practice, then a timed GED-style set.",
        "lessons": [
          {
            "id": "rla-6-1",
            "title": "Writing a Persuasive Essay",
            "time": "25–35 min",
            "study": "Read actively, mark the claim or structure, and write a one-sentence explanation in your own words.",
            "mastery": "Answer a new question and point to the exact evidence, language, or structure that supports it.",
            "practice": "Complete one guided item, three independent items, and one timed mixed question."
          },
          {
            "id": "rla-6-2",
            "title": "Practice: RLA Extended Response",
            "time": "45–75 min",
            "study": "Treat this as a checkpoint: work independently first, then mark every uncertain item.",
            "mastery": "Reach 80% or better and explain why each missed answer is wrong.",
            "practice": "Complete it timed, review errors by category, and repeat only the missed skill types."
          }
        ]
      }
    ]
  },
  {
    "name": "Mathematical Reasoning",
    "shortName": "Math",
    "color": "#C36B3D",
    "chapters": [
      {
        "id": "math-1",
        "number": 1,
        "title": "Whole Numbers and Operations",
        "time": "120 min",
        "study": "Preview the chapter, learn the core idea, and annotate one worked example before practicing.",
        "mastery": "Explain the main idea without notes and complete a short mixed check with at least 80% accuracy.",
        "practice": "Use a three-pass routine: guided example, untimed practice, then a timed GED-style set.",
        "lessons": []
      },
      {
        "id": "math-2",
        "number": 2,
        "title": "Exponents, Roots, and Number Properties",
        "time": "120 min",
        "study": "Preview the chapter, learn the core idea, and annotate one worked example before practicing.",
        "mastery": "Explain the main idea without notes and complete a short mixed check with at least 80% accuracy.",
        "practice": "Use a three-pass routine: guided example, untimed practice, then a timed GED-style set.",
        "lessons": [
          {
            "id": "math-2-1",
            "title": "The Rules of Exponents",
            "time": "25–40 min",
            "study": "Learn the rule, copy one worked example, then solve a similar problem without looking.",
            "mastery": "Solve 8 of 10 mixed problems correctly and explain the operation or representation used.",
            "practice": "Do 5 guided problems, 5 independent problems, then 2 timed GED-style applications."
          },
          {
            "id": "math-2-2",
            "title": "The Distributive Property",
            "time": "25–40 min",
            "study": "Learn the rule, copy one worked example, then solve a similar problem without looking.",
            "mastery": "Solve 8 of 10 mixed problems correctly and explain the operation or representation used.",
            "practice": "Do 5 guided problems, 5 independent problems, then 2 timed GED-style applications."
          }
        ]
      },
      {
        "id": "math-3",
        "number": 3,
        "title": "Decimal Numbers and Operations",
        "time": "120 min",
        "study": "Preview the chapter, learn the core idea, and annotate one worked example before practicing.",
        "mastery": "Explain the main idea without notes and complete a short mixed check with at least 80% accuracy.",
        "practice": "Use a three-pass routine: guided example, untimed practice, then a timed GED-style set.",
        "lessons": []
      },
      {
        "id": "math-4",
        "number": 4,
        "title": "Fractions and Operations",
        "time": "120 min",
        "study": "Preview the chapter, learn the core idea, and annotate one worked example before practicing.",
        "mastery": "Explain the main idea without notes and complete a short mixed check with at least 80% accuracy.",
        "practice": "Use a three-pass routine: guided example, untimed practice, then a timed GED-style set.",
        "lessons": [
          {
            "id": "math-4-1",
            "title": "Converting Between Fractions and Decimals on the Calculator Improper Fractions and Mixed Numbers",
            "time": "25–40 min",
            "study": "Learn the rule, copy one worked example, then solve a similar problem without looking.",
            "mastery": "Solve 8 of 10 mixed problems correctly and explain the operation or representation used.",
            "practice": "Do 5 guided problems, 5 independent problems, then 2 timed GED-style applications."
          },
          {
            "id": "math-4-2",
            "title": "Converting Between Mixed Numbers and Improper Fractions on the Calculator Comparing Fractions",
            "time": "25–40 min",
            "study": "Learn the rule, copy one worked example, then solve a similar problem without looking.",
            "mastery": "Solve 8 of 10 mixed problems correctly and explain the operation or representation used.",
            "practice": "Do 5 guided problems, 5 independent problems, then 2 timed GED-style applications."
          }
        ]
      },
      {
        "id": "math-5",
        "number": 5,
        "title": "Ratios, Rates, and Proportions",
        "time": "120 min",
        "study": "Preview the chapter, learn the core idea, and annotate one worked example before practicing.",
        "mastery": "Explain the main idea without notes and complete a short mixed check with at least 80% accuracy.",
        "practice": "Use a three-pass routine: guided example, untimed practice, then a timed GED-style set.",
        "lessons": []
      },
      {
        "id": "math-6",
        "number": 6,
        "title": "Percents and Applications",
        "time": "120 min",
        "study": "Preview the chapter, learn the core idea, and annotate one worked example before practicing.",
        "mastery": "Explain the main idea without notes and complete a short mixed check with at least 80% accuracy.",
        "practice": "Use a three-pass routine: guided example, untimed practice, then a timed GED-style set.",
        "lessons": [
          {
            "id": "math-6-1",
            "title": "Converting Between Fractions, Decimals, and Percents",
            "time": "25–40 min",
            "study": "Learn the rule, copy one worked example, then solve a similar problem without looking.",
            "mastery": "Solve 8 of 10 mixed problems correctly and explain the operation or representation used.",
            "practice": "Do 5 guided problems, 5 independent problems, then 2 timed GED-style applications."
          },
          {
            "id": "math-6-2",
            "title": "Converting a Percent to a Fraction Converting a Percent to a Decimal",
            "time": "25–40 min",
            "study": "Learn the rule, copy one worked example, then solve a similar problem without looking.",
            "mastery": "Solve 8 of 10 mixed problems correctly and explain the operation or representation used.",
            "practice": "Do 5 guided problems, 5 independent problems, then 2 timed GED-style applications."
          },
          {
            "id": "math-6-3",
            "title": "Converting a Decimal to a Percent",
            "time": "25–40 min",
            "study": "Learn the rule, copy one worked example, then solve a similar problem without looking.",
            "mastery": "Solve 8 of 10 mixed problems correctly and explain the operation or representation used.",
            "practice": "Do 5 guided problems, 5 independent problems, then 2 timed GED-style applications."
          },
          {
            "id": "math-6-4",
            "title": "Working with Percents",
            "time": "25–40 min",
            "study": "Learn the rule, copy one worked example, then solve a similar problem without looking.",
            "mastery": "Solve 8 of 10 mixed problems correctly and explain the operation or representation used.",
            "practice": "Do 5 guided problems, 5 independent problems, then 2 timed GED-style applications."
          },
          {
            "id": "math-6-5",
            "title": "Simple Interest",
            "time": "25–40 min",
            "study": "Learn the rule, copy one worked example, then solve a similar problem without looking.",
            "mastery": "Solve 8 of 10 mixed problems correctly and explain the operation or representation used.",
            "practice": "Do 5 guided problems, 5 independent problems, then 2 timed GED-style applications."
          }
        ]
      },
      {
        "id": "math-7",
        "number": 7,
        "title": "The Number Line and Negative",
        "time": "120 min",
        "study": "Preview the chapter, learn the core idea, and annotate one worked example before practicing.",
        "mastery": "Explain the main idea without notes and complete a short mixed check with at least 80% accuracy.",
        "practice": "Use a three-pass routine: guided example, untimed practice, then a timed GED-style set.",
        "lessons": [
          {
            "id": "math-7-1",
            "title": "The Number Line",
            "time": "25–40 min",
            "study": "Learn the rule, copy one worked example, then solve a similar problem without looking.",
            "mastery": "Solve 8 of 10 mixed problems correctly and explain the operation or representation used.",
            "practice": "Do 5 guided problems, 5 independent problems, then 2 timed GED-style applications."
          }
        ]
      },
      {
        "id": "math-8",
        "number": 8,
        "title": "Probability and Counting",
        "time": "120 min",
        "study": "Preview the chapter, learn the core idea, and annotate one worked example before practicing.",
        "mastery": "Explain the main idea without notes and complete a short mixed check with at least 80% accuracy.",
        "practice": "Use a three-pass routine: guided example, untimed practice, then a timed GED-style set.",
        "lessons": [
          {
            "id": "math-8-1",
            "title": "Basic Probability",
            "time": "25–40 min",
            "study": "Learn the rule, copy one worked example, then solve a similar problem without looking.",
            "mastery": "Solve 8 of 10 mixed problems correctly and explain the operation or representation used.",
            "practice": "Do 5 guided problems, 5 independent problems, then 2 timed GED-style applications."
          }
        ]
      },
      {
        "id": "math-9",
        "number": 9,
        "title": "Statistics and Data Analysis",
        "time": "120 min",
        "study": "Preview the chapter, learn the core idea, and annotate one worked example before practicing.",
        "mastery": "Explain the main idea without notes and complete a short mixed check with at least 80% accuracy.",
        "practice": "Use a three-pass routine: guided example, untimed practice, then a timed GED-style set.",
        "lessons": [
          {
            "id": "math-9-1",
            "title": "Analyzing Data Sets",
            "time": "25–40 min",
            "study": "Learn the rule, copy one worked example, then solve a similar problem without looking.",
            "mastery": "Solve 8 of 10 mixed problems correctly and explain the operation or representation used.",
            "practice": "Do 5 guided problems, 5 independent problems, then 2 timed GED-style applications."
          },
          {
            "id": "math-9-2",
            "title": "The Mean The Median The Mode",
            "time": "25–40 min",
            "study": "Learn the rule, copy one worked example, then solve a similar problem without looking.",
            "mastery": "Solve 8 of 10 mixed problems correctly and explain the operation or representation used.",
            "practice": "Do 5 guided problems, 5 independent problems, then 2 timed GED-style applications."
          },
          {
            "id": "math-9-3",
            "title": "The Range",
            "time": "25–40 min",
            "study": "Learn the rule, copy one worked example, then solve a similar problem without looking.",
            "mastery": "Solve 8 of 10 mixed problems correctly and explain the operation or representation used.",
            "practice": "Do 5 guided problems, 5 independent problems, then 2 timed GED-style applications."
          },
          {
            "id": "math-9-4",
            "title": "Relationships Between Data Sets",
            "time": "25–40 min",
            "study": "Learn the rule, copy one worked example, then solve a similar problem without looking.",
            "mastery": "Solve 8 of 10 mixed problems correctly and explain the operation or representation used.",
            "practice": "Do 5 guided problems, 5 independent problems, then 2 timed GED-style applications."
          }
        ]
      },
      {
        "id": "math-10",
        "number": 10,
        "title": "Algebraic Expressions",
        "time": "120 min",
        "study": "Preview the chapter, learn the core idea, and annotate one worked example before practicing.",
        "mastery": "Explain the main idea without notes and complete a short mixed check with at least 80% accuracy.",
        "practice": "Use a three-pass routine: guided example, untimed practice, then a timed GED-style set.",
        "lessons": [
          {
            "id": "math-10-1",
            "title": "Evaluating Expressions",
            "time": "25–40 min",
            "study": "Learn the rule, copy one worked example, then solve a similar problem without looking.",
            "mastery": "Solve 8 of 10 mixed problems correctly and explain the operation or representation used.",
            "practice": "Do 5 guided problems, 5 independent problems, then 2 timed GED-style applications."
          },
          {
            "id": "math-10-2",
            "title": "Writing Expressions",
            "time": "25–40 min",
            "study": "Learn the rule, copy one worked example, then solve a similar problem without looking.",
            "mastery": "Solve 8 of 10 mixed problems correctly and explain the operation or representation used.",
            "practice": "Do 5 guided problems, 5 independent problems, then 2 timed GED-style applications."
          }
        ]
      },
      {
        "id": "math-11",
        "number": 11,
        "title": "Solving Equations and Inequalities",
        "time": "120 min",
        "study": "Preview the chapter, learn the core idea, and annotate one worked example before practicing.",
        "mastery": "Explain the main idea without notes and complete a short mixed check with at least 80% accuracy.",
        "practice": "Use a three-pass routine: guided example, untimed practice, then a timed GED-style set.",
        "lessons": [
          {
            "id": "math-11-1",
            "title": "Solving Inequalities",
            "time": "25–40 min",
            "study": "Learn the rule, copy one worked example, then solve a similar problem without looking.",
            "mastery": "Solve 8 of 10 mixed problems correctly and explain the operation or representation used.",
            "practice": "Do 5 guided problems, 5 independent problems, then 2 timed GED-style applications."
          },
          {
            "id": "math-11-2",
            "title": "Graphing Solutions",
            "time": "25–40 min",
            "study": "Learn the rule, copy one worked example, then solve a similar problem without looking.",
            "mastery": "Solve 8 of 10 mixed problems correctly and explain the operation or representation used.",
            "practice": "Do 5 guided problems, 5 independent problems, then 2 timed GED-style applications."
          },
          {
            "id": "math-11-3",
            "title": "Writing Linear Equations and Inequalities",
            "time": "25–40 min",
            "study": "Learn the rule, copy one worked example, then solve a similar problem without looking.",
            "mastery": "Solve 8 of 10 mixed problems correctly and explain the operation or representation used.",
            "practice": "Do 5 guided problems, 5 independent problems, then 2 timed GED-style applications."
          },
          {
            "id": "math-11-4",
            "title": "Solving Quadratic Equations with the Square Root Rule",
            "time": "25–40 min",
            "study": "Learn the rule, copy one worked example, then solve a similar problem without looking.",
            "mastery": "Solve 8 of 10 mixed problems correctly and explain the operation or representation used.",
            "practice": "Do 5 guided problems, 5 independent problems, then 2 timed GED-style applications."
          },
          {
            "id": "math-11-5",
            "title": "Solving Quadratic Equations by Factoring",
            "time": "25–40 min",
            "study": "Learn the rule, copy one worked example, then solve a similar problem without looking.",
            "mastery": "Solve 8 of 10 mixed problems correctly and explain the operation or representation used.",
            "practice": "Do 5 guided problems, 5 independent problems, then 2 timed GED-style applications."
          },
          {
            "id": "math-11-6",
            "title": "Solving with the Quadratic Formula Writing Quadratic Equations",
            "time": "25–40 min",
            "study": "Learn the rule, copy one worked example, then solve a similar problem without looking.",
            "mastery": "Solve 8 of 10 mixed problems correctly and explain the operation or representation used.",
            "practice": "Do 5 guided problems, 5 independent problems, then 2 timed GED-style applications."
          }
        ]
      },
      {
        "id": "math-12",
        "number": 12,
        "title": "Graphing Equations",
        "time": "120 min",
        "study": "Preview the chapter, learn the core idea, and annotate one worked example before practicing.",
        "mastery": "Explain the main idea without notes and complete a short mixed check with at least 80% accuracy.",
        "practice": "Use a three-pass routine: guided example, untimed practice, then a timed GED-style set.",
        "lessons": [
          {
            "id": "math-12-1",
            "title": "Graphing Lines",
            "time": "25–40 min",
            "study": "Learn the rule, copy one worked example, then solve a similar problem without looking.",
            "mastery": "Solve 8 of 10 mixed problems correctly and explain the operation or representation used.",
            "practice": "Do 5 guided problems, 5 independent problems, then 2 timed GED-style applications."
          },
          {
            "id": "math-12-2",
            "title": "Calculating the Slope",
            "time": "25–40 min",
            "study": "Learn the rule, copy one worked example, then solve a similar problem without looking.",
            "mastery": "Solve 8 of 10 mixed problems correctly and explain the operation or representation used.",
            "practice": "Do 5 guided problems, 5 independent problems, then 2 timed GED-style applications."
          },
          {
            "id": "math-12-3",
            "title": "Interpreting Slope",
            "time": "25–40 min",
            "study": "Learn the rule, copy one worked example, then solve a similar problem without looking.",
            "mastery": "Solve 8 of 10 mixed problems correctly and explain the operation or representation used.",
            "practice": "Do 5 guided problems, 5 independent problems, then 2 timed GED-style applications."
          },
          {
            "id": "math-12-4",
            "title": "Finding the Equation of a Line",
            "time": "25–40 min",
            "study": "Learn the rule, copy one worked example, then solve a similar problem without looking.",
            "mastery": "Solve 8 of 10 mixed problems correctly and explain the operation or representation used.",
            "practice": "Do 5 guided problems, 5 independent problems, then 2 timed GED-style applications."
          }
        ]
      },
      {
        "id": "math-13",
        "number": 13,
        "title": "Functions",
        "time": "120 min",
        "study": "Preview the chapter, learn the core idea, and annotate one worked example before practicing.",
        "mastery": "Explain the main idea without notes and complete a short mixed check with at least 80% accuracy.",
        "practice": "Use a three-pass routine: guided example, untimed practice, then a timed GED-style set.",
        "lessons": [
          {
            "id": "math-13-1",
            "title": "Evaluating Functions",
            "time": "25–40 min",
            "study": "Learn the rule, copy one worked example, then solve a similar problem without looking.",
            "mastery": "Solve 8 of 10 mixed problems correctly and explain the operation or representation used.",
            "practice": "Do 5 guided problems, 5 independent problems, then 2 timed GED-style applications."
          },
          {
            "id": "math-13-2",
            "title": "Recognizing Functions",
            "time": "25–40 min",
            "study": "Learn the rule, copy one worked example, then solve a similar problem without looking.",
            "mastery": "Solve 8 of 10 mixed problems correctly and explain the operation or representation used.",
            "practice": "Do 5 guided problems, 5 independent problems, then 2 timed GED-style applications."
          },
          {
            "id": "math-13-3",
            "title": "Properties of Functions",
            "time": "25–40 min",
            "study": "Learn the rule, copy one worked example, then solve a similar problem without looking.",
            "mastery": "Solve 8 of 10 mixed problems correctly and explain the operation or representation used.",
            "practice": "Do 5 guided problems, 5 independent problems, then 2 timed GED-style applications."
          }
        ]
      },
      {
        "id": "math-14",
        "number": 14,
        "title": "Geometry",
        "time": "120 min",
        "study": "Preview the chapter, learn the core idea, and annotate one worked example before practicing.",
        "mastery": "Explain the main idea without notes and complete a short mixed check with at least 80% accuracy.",
        "practice": "Use a three-pass routine: guided example, untimed practice, then a timed GED-style set.",
        "lessons": [
          {
            "id": "math-14-1",
            "title": "3-Dimensional Objects",
            "time": "25–40 min",
            "study": "Learn the rule, copy one worked example, then solve a similar problem without looking.",
            "mastery": "Solve 8 of 10 mixed problems correctly and explain the operation or representation used.",
            "practice": "Do 5 guided problems, 5 independent problems, then 2 timed GED-style applications."
          },
          {
            "id": "math-14-2",
            "title": "Complex Figures",
            "time": "25–40 min",
            "study": "Learn the rule, copy one worked example, then solve a similar problem without looking.",
            "mastery": "Solve 8 of 10 mixed problems correctly and explain the operation or representation used.",
            "practice": "Do 5 guided problems, 5 independent problems, then 2 timed GED-style applications."
          },
          {
            "id": "math-14-3",
            "title": "The Pythagorean Theorem",
            "time": "25–40 min",
            "study": "Learn the rule, copy one worked example, then solve a similar problem without looking.",
            "mastery": "Solve 8 of 10 mixed problems correctly and explain the operation or representation used.",
            "practice": "Do 5 guided problems, 5 independent problems, then 2 timed GED-style applications."
          }
        ]
      }
    ]
  },
  {
    "name": "Science",
    "shortName": "Science",
    "color": "#5C7399",
    "chapters": [
      {
        "id": "science-1",
        "number": 1,
        "title": "Structures and Functions of Life Cells, Tissues, and Organs",
        "time": "105 min",
        "study": "Preview the chapter, learn the core idea, and annotate one worked example before practicing.",
        "mastery": "Explain the main idea without notes and complete a short mixed check with at least 80% accuracy.",
        "practice": "Use a three-pass routine: guided example, untimed practice, then a timed GED-style set.",
        "lessons": [
          {
            "id": "science-1-1",
            "title": "Levels of Organization Cell Functions and Components",
            "time": "25–35 min",
            "study": "Make a small concept sketch, define the key terms, and connect the idea to evidence or a system.",
            "mastery": "Interpret a new passage, diagram, or data display and justify the answer with evidence.",
            "practice": "Practice one reading item, one data item, and one “why” explanation before a mixed set."
          },
          {
            "id": "science-1-2",
            "title": "Cell Components",
            "time": "25–35 min",
            "study": "Make a small concept sketch, define the key terms, and connect the idea to evidence or a system.",
            "mastery": "Interpret a new passage, diagram, or data display and justify the answer with evidence.",
            "practice": "Practice one reading item, one data item, and one “why” explanation before a mixed set."
          },
          {
            "id": "science-1-3",
            "title": "Cell Division Mitosis",
            "time": "25–35 min",
            "study": "Make a small concept sketch, define the key terms, and connect the idea to evidence or a system.",
            "mastery": "Interpret a new passage, diagram, or data display and justify the answer with evidence.",
            "practice": "Practice one reading item, one data item, and one “why” explanation before a mixed set."
          }
        ]
      },
      {
        "id": "science-2",
        "number": 2,
        "title": "Life Functions and Energy Intake",
        "time": "105 min",
        "study": "Preview the chapter, learn the core idea, and annotate one worked example before practicing.",
        "mastery": "Explain the main idea without notes and complete a short mixed check with at least 80% accuracy.",
        "practice": "Use a three-pass routine: guided example, untimed practice, then a timed GED-style set.",
        "lessons": []
      },
      {
        "id": "science-3",
        "number": 3,
        "title": "Heredity",
        "time": "105 min",
        "study": "Preview the chapter, learn the core idea, and annotate one worked example before practicing.",
        "mastery": "Explain the main idea without notes and complete a short mixed check with at least 80% accuracy.",
        "practice": "Use a three-pass routine: guided example, untimed practice, then a timed GED-style set.",
        "lessons": [
          {
            "id": "science-3-1",
            "title": "DNA and Chromosomes",
            "time": "25–35 min",
            "study": "Make a small concept sketch, define the key terms, and connect the idea to evidence or a system.",
            "mastery": "Interpret a new passage, diagram, or data display and justify the answer with evidence.",
            "practice": "Practice one reading item, one data item, and one “why” explanation before a mixed set."
          },
          {
            "id": "science-3-2",
            "title": "Alleles and Traits",
            "time": "25–35 min",
            "study": "Make a small concept sketch, define the key terms, and connect the idea to evidence or a system.",
            "mastery": "Interpret a new passage, diagram, or data display and justify the answer with evidence.",
            "practice": "Practice one reading item, one data item, and one “why” explanation before a mixed set."
          },
          {
            "id": "science-3-3",
            "title": "Assortment of Alleles",
            "time": "25–35 min",
            "study": "Make a small concept sketch, define the key terms, and connect the idea to evidence or a system.",
            "mastery": "Interpret a new passage, diagram, or data display and justify the answer with evidence.",
            "practice": "Practice one reading item, one data item, and one “why” explanation before a mixed set."
          },
          {
            "id": "science-3-4",
            "title": "Environmental Altering of Traits",
            "time": "25–35 min",
            "study": "Make a small concept sketch, define the key terms, and connect the idea to evidence or a system.",
            "mastery": "Interpret a new passage, diagram, or data display and justify the answer with evidence.",
            "practice": "Practice one reading item, one data item, and one “why” explanation before a mixed set."
          },
          {
            "id": "science-3-5",
            "title": "Expression of Traits",
            "time": "25–35 min",
            "study": "Make a small concept sketch, define the key terms, and connect the idea to evidence or a system.",
            "mastery": "Interpret a new passage, diagram, or data display and justify the answer with evidence.",
            "practice": "Practice one reading item, one data item, and one “why” explanation before a mixed set."
          },
          {
            "id": "science-3-6",
            "title": "Simple Inheritance",
            "time": "25–35 min",
            "study": "Make a small concept sketch, define the key terms, and connect the idea to evidence or a system.",
            "mastery": "Interpret a new passage, diagram, or data display and justify the answer with evidence.",
            "practice": "Practice one reading item, one data item, and one “why” explanation before a mixed set."
          },
          {
            "id": "science-3-7",
            "title": "Probability of Inheriting Traits",
            "time": "25–35 min",
            "study": "Make a small concept sketch, define the key terms, and connect the idea to evidence or a system.",
            "mastery": "Interpret a new passage, diagram, or data display and justify the answer with evidence.",
            "practice": "Practice one reading item, one data item, and one “why” explanation before a mixed set."
          }
        ]
      },
      {
        "id": "science-4",
        "number": 4,
        "title": "Evolution",
        "time": "105 min",
        "study": "Preview the chapter, learn the core idea, and annotate one worked example before practicing.",
        "mastery": "Explain the main idea without notes and complete a short mixed check with at least 80% accuracy.",
        "practice": "Use a three-pass routine: guided example, untimed practice, then a timed GED-style set.",
        "lessons": []
      },
      {
        "id": "science-5",
        "number": 5,
        "title": "Ecosystems",
        "time": "105 min",
        "study": "Preview the chapter, learn the core idea, and annotate one worked example before practicing.",
        "mastery": "Explain the main idea without notes and complete a short mixed check with at least 80% accuracy.",
        "practice": "Use a three-pass routine: guided example, untimed practice, then a timed GED-style set.",
        "lessons": [
          {
            "id": "science-5-1",
            "title": "Energy in Ecosystems",
            "time": "25–35 min",
            "study": "Make a small concept sketch, define the key terms, and connect the idea to evidence or a system.",
            "mastery": "Interpret a new passage, diagram, or data display and justify the answer with evidence.",
            "practice": "Practice one reading item, one data item, and one “why” explanation before a mixed set."
          },
          {
            "id": "science-5-2",
            "title": "Flow of Energy",
            "time": "25–35 min",
            "study": "Make a small concept sketch, define the key terms, and connect the idea to evidence or a system.",
            "mastery": "Interpret a new passage, diagram, or data display and justify the answer with evidence.",
            "practice": "Practice one reading item, one data item, and one “why” explanation before a mixed set."
          },
          {
            "id": "science-5-3",
            "title": "Conservation of Energy",
            "time": "25–35 min",
            "study": "Make a small concept sketch, define the key terms, and connect the idea to evidence or a system.",
            "mastery": "Interpret a new passage, diagram, or data display and justify the answer with evidence.",
            "practice": "Practice one reading item, one data item, and one “why” explanation before a mixed set."
          },
          {
            "id": "science-5-4",
            "title": "Matter in Ecosystems",
            "time": "25–35 min",
            "study": "Make a small concept sketch, define the key terms, and connect the idea to evidence or a system.",
            "mastery": "Interpret a new passage, diagram, or data display and justify the answer with evidence.",
            "practice": "Practice one reading item, one data item, and one “why” explanation before a mixed set."
          },
          {
            "id": "science-5-5",
            "title": "Food Chains",
            "time": "25–35 min",
            "study": "Make a small concept sketch, define the key terms, and connect the idea to evidence or a system.",
            "mastery": "Interpret a new passage, diagram, or data display and justify the answer with evidence.",
            "practice": "Practice one reading item, one data item, and one “why” explanation before a mixed set."
          },
          {
            "id": "science-5-6",
            "title": "Food Webs",
            "time": "25–35 min",
            "study": "Make a small concept sketch, define the key terms, and connect the idea to evidence or a system.",
            "mastery": "Interpret a new passage, diagram, or data display and justify the answer with evidence.",
            "practice": "Practice one reading item, one data item, and one “why” explanation before a mixed set."
          },
          {
            "id": "science-5-7",
            "title": "Capacity for Change",
            "time": "25–35 min",
            "study": "Make a small concept sketch, define the key terms, and connect the idea to evidence or a system.",
            "mastery": "Interpret a new passage, diagram, or data display and justify the answer with evidence.",
            "practice": "Practice one reading item, one data item, and one “why” explanation before a mixed set."
          },
          {
            "id": "science-5-8",
            "title": "Limiting Factors",
            "time": "25–35 min",
            "study": "Make a small concept sketch, define the key terms, and connect the idea to evidence or a system.",
            "mastery": "Interpret a new passage, diagram, or data display and justify the answer with evidence.",
            "practice": "Practice one reading item, one data item, and one “why” explanation before a mixed set."
          },
          {
            "id": "science-5-9",
            "title": "Relationships in Ecosystems",
            "time": "25–35 min",
            "study": "Make a small concept sketch, define the key terms, and connect the idea to evidence or a system.",
            "mastery": "Interpret a new passage, diagram, or data display and justify the answer with evidence.",
            "practice": "Practice one reading item, one data item, and one “why” explanation before a mixed set."
          },
          {
            "id": "science-5-10",
            "title": "Disruption of Ecosystems",
            "time": "25–35 min",
            "study": "Make a small concept sketch, define the key terms, and connect the idea to evidence or a system.",
            "mastery": "Interpret a new passage, diagram, or data display and justify the answer with evidence.",
            "practice": "Practice one reading item, one data item, and one “why” explanation before a mixed set."
          }
        ]
      },
      {
        "id": "science-6",
        "number": 6,
        "title": "The Human Body and Health",
        "time": "105 min",
        "study": "Preview the chapter, learn the core idea, and annotate one worked example before practicing.",
        "mastery": "Explain the main idea without notes and complete a short mixed check with at least 80% accuracy.",
        "practice": "Use a three-pass routine: guided example, untimed practice, then a timed GED-style set.",
        "lessons": [
          {
            "id": "science-6-1",
            "title": "Body Systems",
            "time": "25–35 min",
            "study": "Make a small concept sketch, define the key terms, and connect the idea to evidence or a system.",
            "mastery": "Interpret a new passage, diagram, or data display and justify the answer with evidence.",
            "practice": "Practice one reading item, one data item, and one “why” explanation before a mixed set."
          },
          {
            "id": "science-6-2",
            "title": "Interaction Between Body Systems",
            "time": "25–35 min",
            "study": "Make a small concept sketch, define the key terms, and connect the idea to evidence or a system.",
            "mastery": "Interpret a new passage, diagram, or data display and justify the answer with evidence.",
            "practice": "Practice one reading item, one data item, and one “why” explanation before a mixed set."
          },
          {
            "id": "science-6-3",
            "title": "Effects of External Environments",
            "time": "25–35 min",
            "study": "Make a small concept sketch, define the key terms, and connect the idea to evidence or a system.",
            "mastery": "Interpret a new passage, diagram, or data display and justify the answer with evidence.",
            "practice": "Practice one reading item, one data item, and one “why” explanation before a mixed set."
          },
          {
            "id": "science-6-4",
            "title": "Nutrition Nutrition Concepts",
            "time": "25–35 min",
            "study": "Make a small concept sketch, define the key terms, and connect the idea to evidence or a system.",
            "mastery": "Interpret a new passage, diagram, or data display and justify the answer with evidence.",
            "practice": "Practice one reading item, one data item, and one “why” explanation before a mixed set."
          },
          {
            "id": "science-6-5",
            "title": "Disease and Pathogens",
            "time": "25–35 min",
            "study": "Make a small concept sketch, define the key terms, and connect the idea to evidence or a system.",
            "mastery": "Interpret a new passage, diagram, or data display and justify the answer with evidence.",
            "practice": "Practice one reading item, one data item, and one “why” explanation before a mixed set."
          },
          {
            "id": "science-6-6",
            "title": "Prevention of Disease",
            "time": "25–35 min",
            "study": "Make a small concept sketch, define the key terms, and connect the idea to evidence or a system.",
            "mastery": "Interpret a new passage, diagram, or data display and justify the answer with evidence.",
            "practice": "Practice one reading item, one data item, and one “why” explanation before a mixed set."
          },
          {
            "id": "science-6-7",
            "title": "Effects of Disease on Populations",
            "time": "25–35 min",
            "study": "Make a small concept sketch, define the key terms, and connect the idea to evidence or a system.",
            "mastery": "Interpret a new passage, diagram, or data display and justify the answer with evidence.",
            "practice": "Practice one reading item, one data item, and one “why” explanation before a mixed set."
          },
          {
            "id": "science-6-8",
            "title": "Practice: Life Science",
            "time": "45–75 min",
            "study": "Treat this as a checkpoint: work independently first, then mark every uncertain item.",
            "mastery": "Reach 80% or better and explain why each missed answer is wrong.",
            "practice": "Complete it timed, review errors by category, and repeat only the missed skill types."
          }
        ]
      },
      {
        "id": "science-7",
        "number": 7,
        "title": "Chemical Interactions",
        "time": "105 min",
        "study": "Preview the chapter, learn the core idea, and annotate one worked example before practicing.",
        "mastery": "Explain the main idea without notes and complete a short mixed check with at least 80% accuracy.",
        "practice": "Use a three-pass routine: guided example, untimed practice, then a timed GED-style set.",
        "lessons": [
          {
            "id": "science-7-1",
            "title": "Atomic Particles",
            "time": "25–35 min",
            "study": "Make a small concept sketch, define the key terms, and connect the idea to evidence or a system.",
            "mastery": "Interpret a new passage, diagram, or data display and justify the answer with evidence.",
            "practice": "Practice one reading item, one data item, and one “why” explanation before a mixed set."
          },
          {
            "id": "science-7-2",
            "title": "Ions and Isotopes",
            "time": "25–35 min",
            "study": "Make a small concept sketch, define the key terms, and connect the idea to evidence or a system.",
            "mastery": "Interpret a new passage, diagram, or data display and justify the answer with evidence.",
            "practice": "Practice one reading item, one data item, and one “why” explanation before a mixed set."
          },
          {
            "id": "science-7-3",
            "title": "Physical and Chemical Properties",
            "time": "25–35 min",
            "study": "Make a small concept sketch, define the key terms, and connect the idea to evidence or a system.",
            "mastery": "Interpret a new passage, diagram, or data display and justify the answer with evidence.",
            "practice": "Practice one reading item, one data item, and one “why” explanation before a mixed set."
          },
          {
            "id": "science-7-4",
            "title": "States of Matter",
            "time": "25–35 min",
            "study": "Make a small concept sketch, define the key terms, and connect the idea to evidence or a system.",
            "mastery": "Interpret a new passage, diagram, or data display and justify the answer with evidence.",
            "practice": "Practice one reading item, one data item, and one “why” explanation before a mixed set."
          },
          {
            "id": "science-7-5",
            "title": "Chemical Formulas and Equations",
            "time": "25–35 min",
            "study": "Make a small concept sketch, define the key terms, and connect the idea to evidence or a system.",
            "mastery": "Interpret a new passage, diagram, or data display and justify the answer with evidence.",
            "practice": "Practice one reading item, one data item, and one “why” explanation before a mixed set."
          },
          {
            "id": "science-7-6",
            "title": "Conservation of Mass",
            "time": "25–35 min",
            "study": "Make a small concept sketch, define the key terms, and connect the idea to evidence or a system.",
            "mastery": "Interpret a new passage, diagram, or data display and justify the answer with evidence.",
            "practice": "Practice one reading item, one data item, and one “why” explanation before a mixed set."
          },
          {
            "id": "science-7-7",
            "title": "Balancing Chemical Equations",
            "time": "25–35 min",
            "study": "Make a small concept sketch, define the key terms, and connect the idea to evidence or a system.",
            "mastery": "Interpret a new passage, diagram, or data display and justify the answer with evidence.",
            "practice": "Practice one reading item, one data item, and one “why” explanation before a mixed set."
          },
          {
            "id": "science-7-8",
            "title": "Limiting Reactants",
            "time": "25–35 min",
            "study": "Make a small concept sketch, define the key terms, and connect the idea to evidence or a system.",
            "mastery": "Interpret a new passage, diagram, or data display and justify the answer with evidence.",
            "practice": "Practice one reading item, one data item, and one “why” explanation before a mixed set."
          },
          {
            "id": "science-7-9",
            "title": "Types of Chemical Reactions",
            "time": "25–35 min",
            "study": "Make a small concept sketch, define the key terms, and connect the idea to evidence or a system.",
            "mastery": "Interpret a new passage, diagram, or data display and justify the answer with evidence.",
            "practice": "Practice one reading item, one data item, and one “why” explanation before a mixed set."
          },
          {
            "id": "science-7-10",
            "title": "Solutions and Solubility",
            "time": "25–35 min",
            "study": "Make a small concept sketch, define the key terms, and connect the idea to evidence or a system.",
            "mastery": "Interpret a new passage, diagram, or data display and justify the answer with evidence.",
            "practice": "Practice one reading item, one data item, and one “why” explanation before a mixed set."
          },
          {
            "id": "science-7-11",
            "title": "Saturation Weak and Strong Solutions",
            "time": "25–35 min",
            "study": "Make a small concept sketch, define the key terms, and connect the idea to evidence or a system.",
            "mastery": "Interpret a new passage, diagram, or data display and justify the answer with evidence.",
            "practice": "Practice one reading item, one data item, and one “why” explanation before a mixed set."
          }
        ]
      },
      {
        "id": "science-8",
        "number": 8,
        "title": "Energy",
        "time": "105 min",
        "study": "Preview the chapter, learn the core idea, and annotate one worked example before practicing.",
        "mastery": "Explain the main idea without notes and complete a short mixed check with at least 80% accuracy.",
        "practice": "Use a three-pass routine: guided example, untimed practice, then a timed GED-style set.",
        "lessons": [
          {
            "id": "science-8-1",
            "title": "Types of Energy",
            "time": "25–35 min",
            "study": "Make a small concept sketch, define the key terms, and connect the idea to evidence or a system.",
            "mastery": "Interpret a new passage, diagram, or data display and justify the answer with evidence.",
            "practice": "Practice one reading item, one data item, and one “why” explanation before a mixed set."
          },
          {
            "id": "science-8-2",
            "title": "Energy Transformations",
            "time": "25–35 min",
            "study": "Make a small concept sketch, define the key terms, and connect the idea to evidence or a system.",
            "mastery": "Interpret a new passage, diagram, or data display and justify the answer with evidence.",
            "practice": "Practice one reading item, one data item, and one “why” explanation before a mixed set."
          },
          {
            "id": "science-8-3",
            "title": "Types of Electromagnetic Radiation Uses and Dangers of Electromagnetic Radiation Heat",
            "time": "25–35 min",
            "study": "Make a small concept sketch, define the key terms, and connect the idea to evidence or a system.",
            "mastery": "Interpret a new passage, diagram, or data display and justify the answer with evidence.",
            "practice": "Practice one reading item, one data item, and one “why” explanation before a mixed set."
          },
          {
            "id": "science-8-4",
            "title": "Heat Transfer",
            "time": "25–35 min",
            "study": "Make a small concept sketch, define the key terms, and connect the idea to evidence or a system.",
            "mastery": "Interpret a new passage, diagram, or data display and justify the answer with evidence.",
            "practice": "Practice one reading item, one data item, and one “why” explanation before a mixed set."
          },
          {
            "id": "science-8-5",
            "title": "Energy in Reactions",
            "time": "25–35 min",
            "study": "Make a small concept sketch, define the key terms, and connect the idea to evidence or a system.",
            "mastery": "Interpret a new passage, diagram, or data display and justify the answer with evidence.",
            "practice": "Practice one reading item, one data item, and one “why” explanation before a mixed set."
          },
          {
            "id": "science-8-6",
            "title": "Sources of Energy",
            "time": "25–35 min",
            "study": "Make a small concept sketch, define the key terms, and connect the idea to evidence or a system.",
            "mastery": "Interpret a new passage, diagram, or data display and justify the answer with evidence.",
            "practice": "Practice one reading item, one data item, and one “why” explanation before a mixed set."
          }
        ]
      },
      {
        "id": "science-9",
        "number": 9,
        "title": "Motion and Force",
        "time": "105 min",
        "study": "Preview the chapter, learn the core idea, and annotate one worked example before practicing.",
        "mastery": "Explain the main idea without notes and complete a short mixed check with at least 80% accuracy.",
        "practice": "Use a three-pass routine: guided example, untimed practice, then a timed GED-style set.",
        "lessons": [
          {
            "id": "science-9-1",
            "title": "Motion Momentum and Collisions",
            "time": "25–35 min",
            "study": "Make a small concept sketch, define the key terms, and connect the idea to evidence or a system.",
            "mastery": "Interpret a new passage, diagram, or data display and justify the answer with evidence.",
            "practice": "Practice one reading item, one data item, and one “why” explanation before a mixed set."
          },
          {
            "id": "science-9-2",
            "title": "Newton’s Laws",
            "time": "25–35 min",
            "study": "Make a small concept sketch, define the key terms, and connect the idea to evidence or a system.",
            "mastery": "Interpret a new passage, diagram, or data display and justify the answer with evidence.",
            "practice": "Practice one reading item, one data item, and one “why” explanation before a mixed set."
          },
          {
            "id": "science-9-3",
            "title": "Mass and Weight",
            "time": "25–35 min",
            "study": "Make a small concept sketch, define the key terms, and connect the idea to evidence or a system.",
            "mastery": "Interpret a new passage, diagram, or data display and justify the answer with evidence.",
            "practice": "Practice one reading item, one data item, and one “why” explanation before a mixed set."
          },
          {
            "id": "science-9-4",
            "title": "Work and Machines",
            "time": "25–35 min",
            "study": "Make a small concept sketch, define the key terms, and connect the idea to evidence or a system.",
            "mastery": "Interpret a new passage, diagram, or data display and justify the answer with evidence.",
            "practice": "Practice one reading item, one data item, and one “why” explanation before a mixed set."
          },
          {
            "id": "science-9-5",
            "title": "Simple Machines",
            "time": "25–35 min",
            "study": "Make a small concept sketch, define the key terms, and connect the idea to evidence or a system.",
            "mastery": "Interpret a new passage, diagram, or data display and justify the answer with evidence.",
            "practice": "Practice one reading item, one data item, and one “why” explanation before a mixed set."
          },
          {
            "id": "science-9-6",
            "title": "Mechanical Advantage and Power",
            "time": "25–35 min",
            "study": "Make a small concept sketch, define the key terms, and connect the idea to evidence or a system.",
            "mastery": "Interpret a new passage, diagram, or data display and justify the answer with evidence.",
            "practice": "Practice one reading item, one data item, and one “why” explanation before a mixed set."
          },
          {
            "id": "science-9-7",
            "title": "Practice: Physical Science",
            "time": "45–75 min",
            "study": "Treat this as a checkpoint: work independently first, then mark every uncertain item.",
            "mastery": "Reach 80% or better and explain why each missed answer is wrong.",
            "practice": "Complete it timed, review errors by category, and repeat only the missed skill types."
          }
        ]
      },
      {
        "id": "science-10",
        "number": 10,
        "title": "Space Systems",
        "time": "105 min",
        "study": "Preview the chapter, learn the core idea, and annotate one worked example before practicing.",
        "mastery": "Explain the main idea without notes and complete a short mixed check with at least 80% accuracy.",
        "practice": "Use a three-pass routine: guided example, untimed practice, then a timed GED-style set.",
        "lessons": [
          {
            "id": "science-10-1",
            "title": "The Age of Earth",
            "time": "25–35 min",
            "study": "Make a small concept sketch, define the key terms, and connect the idea to evidence or a system.",
            "mastery": "Interpret a new passage, diagram, or data display and justify the answer with evidence.",
            "practice": "Practice one reading item, one data item, and one “why” explanation before a mixed set."
          },
          {
            "id": "science-10-2",
            "title": "The Solar System",
            "time": "25–35 min",
            "study": "Make a small concept sketch, define the key terms, and connect the idea to evidence or a system.",
            "mastery": "Interpret a new passage, diagram, or data display and justify the answer with evidence.",
            "practice": "Practice one reading item, one data item, and one “why” explanation before a mixed set."
          },
          {
            "id": "science-10-3",
            "title": "The Universe",
            "time": "25–35 min",
            "study": "Make a small concept sketch, define the key terms, and connect the idea to evidence or a system.",
            "mastery": "Interpret a new passage, diagram, or data display and justify the answer with evidence.",
            "practice": "Practice one reading item, one data item, and one “why” explanation before a mixed set."
          }
        ]
      },
      {
        "id": "science-11",
        "number": 11,
        "title": "Earth Systems",
        "time": "105 min",
        "study": "Preview the chapter, learn the core idea, and annotate one worked example before practicing.",
        "mastery": "Explain the main idea without notes and complete a short mixed check with at least 80% accuracy.",
        "practice": "Use a three-pass routine: guided example, untimed practice, then a timed GED-style set.",
        "lessons": [
          {
            "id": "science-11-1",
            "title": "The Structure of Earth",
            "time": "25–35 min",
            "study": "Make a small concept sketch, define the key terms, and connect the idea to evidence or a system.",
            "mastery": "Interpret a new passage, diagram, or data display and justify the answer with evidence.",
            "practice": "Practice one reading item, one data item, and one “why” explanation before a mixed set."
          },
          {
            "id": "science-11-2",
            "title": "Effects of Gases on Earth",
            "time": "25–35 min",
            "study": "Make a small concept sketch, define the key terms, and connect the idea to evidence or a system.",
            "mastery": "Interpret a new passage, diagram, or data display and justify the answer with evidence.",
            "practice": "Practice one reading item, one data item, and one “why” explanation before a mixed set."
          },
          {
            "id": "science-11-3",
            "title": "The Oceans",
            "time": "25–35 min",
            "study": "Make a small concept sketch, define the key terms, and connect the idea to evidence or a system.",
            "mastery": "Interpret a new passage, diagram, or data display and justify the answer with evidence.",
            "practice": "Practice one reading item, one data item, and one “why” explanation before a mixed set."
          }
        ]
      },
      {
        "id": "science-12",
        "number": 12,
        "title": "Interactions Between Earth’s Systems and Living Things",
        "time": "105 min",
        "study": "Preview the chapter, learn the core idea, and annotate one worked example before practicing.",
        "mastery": "Explain the main idea without notes and complete a short mixed check with at least 80% accuracy.",
        "practice": "Use a three-pass routine: guided example, untimed practice, then a timed GED-style set.",
        "lessons": [
          {
            "id": "science-12-1",
            "title": "Effects of Natural Hazards",
            "time": "25–35 min",
            "study": "Make a small concept sketch, define the key terms, and connect the idea to evidence or a system.",
            "mastery": "Interpret a new passage, diagram, or data display and justify the answer with evidence.",
            "practice": "Practice one reading item, one data item, and one “why” explanation before a mixed set."
          },
          {
            "id": "science-12-2",
            "title": "Practice: Earth and Space Science",
            "time": "45–75 min",
            "study": "Treat this as a checkpoint: work independently first, then mark every uncertain item.",
            "mastery": "Reach 80% or better and explain why each missed answer is wrong.",
            "practice": "Complete it timed, review errors by category, and repeat only the missed skill types."
          }
        ]
      }
    ]
  },
  {
    "name": "Social Studies",
    "shortName": "Social Studies",
    "color": "#8A6B42",
    "chapters": [
      {
        "id": "social-studies-1",
        "number": 1,
        "title": "Civics and Government",
        "time": "105 min",
        "study": "Preview the chapter, learn the core idea, and annotate one worked example before practicing.",
        "mastery": "Explain the main idea without notes and complete a short mixed check with at least 80% accuracy.",
        "practice": "Use a three-pass routine: guided example, untimed practice, then a timed GED-style set.",
        "lessons": [
          {
            "id": "social-studies-1-1",
            "title": "Types of Historical and Modern Governments",
            "time": "25–35 min",
            "study": "Build a short timeline or claim–evidence note, then identify viewpoint, purpose, and context.",
            "mastery": "Analyze an unfamiliar source and support the answer with a specific detail from the document or data.",
            "practice": "Use document annotation, eliminate distractors, and finish with a timed source-based question set."
          },
          {
            "id": "social-studies-1-2",
            "title": "Basic Principles of American Constitutional Democracy",
            "time": "25–35 min",
            "study": "Build a short timeline or claim–evidence note, then identify viewpoint, purpose, and context.",
            "mastery": "Analyze an unfamiliar source and support the answer with a specific detail from the document or data.",
            "practice": "Use document annotation, eliminate distractors, and finish with a timed source-based question set."
          },
          {
            "id": "social-studies-1-3",
            "title": "Structure and Design of the U.S. Federal Government",
            "time": "25–35 min",
            "study": "Build a short timeline or claim–evidence note, then identify viewpoint, purpose, and context.",
            "mastery": "Analyze an unfamiliar source and support the answer with a specific detail from the document or data.",
            "practice": "Use document annotation, eliminate distractors, and finish with a timed source-based question set."
          },
          {
            "id": "social-studies-1-4",
            "title": "The Legislative Branch",
            "time": "25–35 min",
            "study": "Build a short timeline or claim–evidence note, then identify viewpoint, purpose, and context.",
            "mastery": "Analyze an unfamiliar source and support the answer with a specific detail from the document or data.",
            "practice": "Use document annotation, eliminate distractors, and finish with a timed source-based question set."
          },
          {
            "id": "social-studies-1-5",
            "title": "The Executive Branch",
            "time": "25–35 min",
            "study": "Build a short timeline or claim–evidence note, then identify viewpoint, purpose, and context.",
            "mastery": "Analyze an unfamiliar source and support the answer with a specific detail from the document or data.",
            "practice": "Use document annotation, eliminate distractors, and finish with a timed source-based question set."
          },
          {
            "id": "social-studies-1-6",
            "title": "The President’s Cabinet",
            "time": "25–35 min",
            "study": "Build a short timeline or claim–evidence note, then identify viewpoint, purpose, and context.",
            "mastery": "Analyze an unfamiliar source and support the answer with a specific detail from the document or data.",
            "practice": "Use document annotation, eliminate distractors, and finish with a timed source-based question set."
          },
          {
            "id": "social-studies-1-7",
            "title": "The Judicial Branch",
            "time": "25–35 min",
            "study": "Build a short timeline or claim–evidence note, then identify viewpoint, purpose, and context.",
            "mastery": "Analyze an unfamiliar source and support the answer with a specific detail from the document or data.",
            "practice": "Use document annotation, eliminate distractors, and finish with a timed source-based question set."
          },
          {
            "id": "social-studies-1-8",
            "title": "Political Parties",
            "time": "25–35 min",
            "study": "Build a short timeline or claim–evidence note, then identify viewpoint, purpose, and context.",
            "mastery": "Analyze an unfamiliar source and support the answer with a specific detail from the document or data.",
            "practice": "Use document annotation, eliminate distractors, and finish with a timed source-based question set."
          },
          {
            "id": "social-studies-1-9",
            "title": "Political Campaigns, Elections, and the Electoral Process",
            "time": "25–35 min",
            "study": "Build a short timeline or claim–evidence note, then identify viewpoint, purpose, and context.",
            "mastery": "Analyze an unfamiliar source and support the answer with a specific detail from the document or data.",
            "practice": "Use document annotation, eliminate distractors, and finish with a timed source-based question set."
          },
          {
            "id": "social-studies-1-10",
            "title": "Practice: Civics and Government",
            "time": "45–75 min",
            "study": "Treat this as a checkpoint: work independently first, then mark every uncertain item.",
            "mastery": "Reach 80% or better and explain why each missed answer is wrong.",
            "practice": "Complete it timed, review errors by category, and repeat only the missed skill types."
          }
        ]
      },
      {
        "id": "social-studies-2",
        "number": 2,
        "title": "United States History",
        "time": "105 min",
        "study": "Preview the chapter, learn the core idea, and annotate one worked example before practicing.",
        "mastery": "Explain the main idea without notes and complete a short mixed check with at least 80% accuracy.",
        "practice": "Use a three-pass routine: guided example, untimed practice, then a timed GED-style set.",
        "lessons": [
          {
            "id": "social-studies-2-1",
            "title": "European Exploration of the Americas",
            "time": "25–35 min",
            "study": "Build a short timeline or claim–evidence note, then identify viewpoint, purpose, and context.",
            "mastery": "Analyze an unfamiliar source and support the answer with a specific detail from the document or data.",
            "practice": "Use document annotation, eliminate distractors, and finish with a timed source-based question set."
          },
          {
            "id": "social-studies-2-2",
            "title": "The English Colony in Virginia English Colonies in New England and Maryland The Thirteen Colonies Take Shape",
            "time": "25–35 min",
            "study": "Build a short timeline or claim–evidence note, then identify viewpoint, purpose, and context.",
            "mastery": "Analyze an unfamiliar source and support the answer with a specific detail from the document or data.",
            "practice": "Use document annotation, eliminate distractors, and finish with a timed source-based question set."
          },
          {
            "id": "social-studies-2-3",
            "title": "Tensions Rise Between the Colonies and Great Britain The First Continental Congress and the Beginning of the American Revolution The Second Continental Congress and the Declaration of Independence",
            "time": "25–35 min",
            "study": "Build a short timeline or claim–evidence note, then identify viewpoint, purpose, and context.",
            "mastery": "Analyze an unfamiliar source and support the answer with a specific detail from the document or data.",
            "practice": "Use document annotation, eliminate distractors, and finish with a timed source-based question set."
          },
          {
            "id": "social-studies-2-4",
            "title": "The Revolutionary War",
            "time": "25–35 min",
            "study": "Build a short timeline or claim–evidence note, then identify viewpoint, purpose, and context.",
            "mastery": "Analyze an unfamiliar source and support the answer with a specific detail from the document or data.",
            "practice": "Use document annotation, eliminate distractors, and finish with a timed source-based question set."
          },
          {
            "id": "social-studies-2-5",
            "title": "From the Articles of Confederation to the U.S. Constitution The War of 1812",
            "time": "25–35 min",
            "study": "Build a short timeline or claim–evidence note, then identify viewpoint, purpose, and context.",
            "mastery": "Analyze an unfamiliar source and support the answer with a specific detail from the document or data.",
            "practice": "Use document annotation, eliminate distractors, and finish with a timed source-based question set."
          },
          {
            "id": "social-studies-2-6",
            "title": "The Monroe Doctrine",
            "time": "25–35 min",
            "study": "Build a short timeline or claim–evidence note, then identify viewpoint, purpose, and context.",
            "mastery": "Analyze an unfamiliar source and support the answer with a specific detail from the document or data.",
            "practice": "Use document annotation, eliminate distractors, and finish with a timed source-based question set."
          },
          {
            "id": "social-studies-2-7",
            "title": "U.S. Policy Toward Native Americans",
            "time": "25–35 min",
            "study": "Build a short timeline or claim–evidence note, then identify viewpoint, purpose, and context.",
            "mastery": "Analyze an unfamiliar source and support the answer with a specific detail from the document or data.",
            "practice": "Use document annotation, eliminate distractors, and finish with a timed source-based question set."
          },
          {
            "id": "social-studies-2-8",
            "title": "Civil War and Reconstruction The United States Becomes a Major Industrial Nation The United States Becomes a World Power",
            "time": "25–35 min",
            "study": "Build a short timeline or claim–evidence note, then identify viewpoint, purpose, and context.",
            "mastery": "Analyze an unfamiliar source and support the answer with a specific detail from the document or data.",
            "practice": "Use document annotation, eliminate distractors, and finish with a timed source-based question set."
          },
          {
            "id": "social-studies-2-9",
            "title": "World War I",
            "time": "25–35 min",
            "study": "Build a short timeline or claim–evidence note, then identify viewpoint, purpose, and context.",
            "mastery": "Analyze an unfamiliar source and support the answer with a specific detail from the document or data.",
            "practice": "Use document annotation, eliminate distractors, and finish with a timed source-based question set."
          },
          {
            "id": "social-studies-2-10",
            "title": "The Great Depression World War II",
            "time": "25–35 min",
            "study": "Build a short timeline or claim–evidence note, then identify viewpoint, purpose, and context.",
            "mastery": "Analyze an unfamiliar source and support the answer with a specific detail from the document or data.",
            "practice": "Use document annotation, eliminate distractors, and finish with a timed source-based question set."
          },
          {
            "id": "social-studies-2-11",
            "title": "Postwar America The Cold War",
            "time": "25–35 min",
            "study": "Build a short timeline or claim–evidence note, then identify viewpoint, purpose, and context.",
            "mastery": "Analyze an unfamiliar source and support the answer with a specific detail from the document or data.",
            "practice": "Use document annotation, eliminate distractors, and finish with a timed source-based question set."
          },
          {
            "id": "social-studies-2-12",
            "title": "The Civil Rights Movement and the Women’s Movement",
            "time": "25–35 min",
            "study": "Build a short timeline or claim–evidence note, then identify viewpoint, purpose, and context.",
            "mastery": "Analyze an unfamiliar source and support the answer with a specific detail from the document or data.",
            "practice": "Use document annotation, eliminate distractors, and finish with a timed source-based question set."
          },
          {
            "id": "social-studies-2-13",
            "title": "The Great Society, the Vietnam War, and Watergate",
            "time": "25–35 min",
            "study": "Build a short timeline or claim–evidence note, then identify viewpoint, purpose, and context.",
            "mastery": "Analyze an unfamiliar source and support the answer with a specific detail from the document or data.",
            "practice": "Use document annotation, eliminate distractors, and finish with a timed source-based question set."
          },
          {
            "id": "social-studies-2-14",
            "title": "Presidencies in the Late 20th and Early 21st Centuries",
            "time": "25–35 min",
            "study": "Build a short timeline or claim–evidence note, then identify viewpoint, purpose, and context.",
            "mastery": "Analyze an unfamiliar source and support the answer with a specific detail from the document or data.",
            "practice": "Use document annotation, eliminate distractors, and finish with a timed source-based question set."
          },
          {
            "id": "social-studies-2-15",
            "title": "Issues Facing the United States at the Start of the 21st Century",
            "time": "25–35 min",
            "study": "Build a short timeline or claim–evidence note, then identify viewpoint, purpose, and context.",
            "mastery": "Analyze an unfamiliar source and support the answer with a specific detail from the document or data.",
            "practice": "Use document annotation, eliminate distractors, and finish with a timed source-based question set."
          },
          {
            "id": "social-studies-2-16",
            "title": "Practice: United States History",
            "time": "45–75 min",
            "study": "Treat this as a checkpoint: work independently first, then mark every uncertain item.",
            "mastery": "Reach 80% or better and explain why each missed answer is wrong.",
            "practice": "Complete it timed, review errors by category, and repeat only the missed skill types."
          }
        ]
      },
      {
        "id": "social-studies-3",
        "number": 3,
        "title": "Economics",
        "time": "105 min",
        "study": "Preview the chapter, learn the core idea, and annotate one worked example before practicing.",
        "mastery": "Explain the main idea without notes and complete a short mixed check with at least 80% accuracy.",
        "practice": "Use a three-pass routine: guided example, untimed practice, then a timed GED-style set.",
        "lessons": [
          {
            "id": "social-studies-3-1",
            "title": "Fundamental Economic Concepts",
            "time": "25–35 min",
            "study": "Build a short timeline or claim–evidence note, then identify viewpoint, purpose, and context.",
            "mastery": "Analyze an unfamiliar source and support the answer with a specific detail from the document or data.",
            "practice": "Use document annotation, eliminate distractors, and finish with a timed source-based question set."
          },
          {
            "id": "social-studies-3-2",
            "title": "Microeconomics and Macroeconomics",
            "time": "25–35 min",
            "study": "Build a short timeline or claim–evidence note, then identify viewpoint, purpose, and context.",
            "mastery": "Analyze an unfamiliar source and support the answer with a specific detail from the document or data.",
            "practice": "Use document annotation, eliminate distractors, and finish with a timed source-based question set."
          },
          {
            "id": "social-studies-3-3",
            "title": "Banking and Credit",
            "time": "25–35 min",
            "study": "Build a short timeline or claim–evidence note, then identify viewpoint, purpose, and context.",
            "mastery": "Analyze an unfamiliar source and support the answer with a specific detail from the document or data.",
            "practice": "Use document annotation, eliminate distractors, and finish with a timed source-based question set."
          },
          {
            "id": "social-studies-3-4",
            "title": "The Role of Government in the National Economy",
            "time": "25–35 min",
            "study": "Build a short timeline or claim–evidence note, then identify viewpoint, purpose, and context.",
            "mastery": "Analyze an unfamiliar source and support the answer with a specific detail from the document or data.",
            "practice": "Use document annotation, eliminate distractors, and finish with a timed source-based question set."
          },
          {
            "id": "social-studies-3-5",
            "title": "International Trade",
            "time": "25–35 min",
            "study": "Build a short timeline or claim–evidence note, then identify viewpoint, purpose, and context.",
            "mastery": "Analyze an unfamiliar source and support the answer with a specific detail from the document or data.",
            "practice": "Use document annotation, eliminate distractors, and finish with a timed source-based question set."
          },
          {
            "id": "social-studies-3-6",
            "title": "Key Economic Events in U.S. History",
            "time": "25–35 min",
            "study": "Build a short timeline or claim–evidence note, then identify viewpoint, purpose, and context.",
            "mastery": "Analyze an unfamiliar source and support the answer with a specific detail from the document or data.",
            "practice": "Use document annotation, eliminate distractors, and finish with a timed source-based question set."
          },
          {
            "id": "social-studies-3-7",
            "title": "Practice: Economics",
            "time": "45–75 min",
            "study": "Treat this as a checkpoint: work independently first, then mark every uncertain item.",
            "mastery": "Reach 80% or better and explain why each missed answer is wrong.",
            "practice": "Complete it timed, review errors by category, and repeat only the missed skill types."
          }
        ]
      },
      {
        "id": "social-studies-4",
        "number": 4,
        "title": "Geography and the World",
        "time": "105 min",
        "study": "Preview the chapter, learn the core idea, and annotate one worked example before practicing.",
        "mastery": "Explain the main idea without notes and complete a short mixed check with at least 80% accuracy.",
        "practice": "Use a three-pass routine: guided example, untimed practice, then a timed GED-style set.",
        "lessons": [
          {
            "id": "social-studies-4-1",
            "title": "Geography and the Development of Human Societies",
            "time": "25–35 min",
            "study": "Build a short timeline or claim–evidence note, then identify viewpoint, purpose, and context.",
            "mastery": "Analyze an unfamiliar source and support the answer with a specific detail from the document or data.",
            "practice": "Use document annotation, eliminate distractors, and finish with a timed source-based question set."
          },
          {
            "id": "social-studies-4-2",
            "title": "Human Changes to the Environment",
            "time": "25–35 min",
            "study": "Build a short timeline or claim–evidence note, then identify viewpoint, purpose, and context.",
            "mastery": "Analyze an unfamiliar source and support the answer with a specific detail from the document or data.",
            "practice": "Use document annotation, eliminate distractors, and finish with a timed source-based question set."
          },
          {
            "id": "social-studies-4-3",
            "title": "Human Migration Population Trends and Issues",
            "time": "25–35 min",
            "study": "Build a short timeline or claim–evidence note, then identify viewpoint, purpose, and context.",
            "mastery": "Analyze an unfamiliar source and support the answer with a specific detail from the document or data.",
            "practice": "Use document annotation, eliminate distractors, and finish with a timed source-based question set."
          },
          {
            "id": "social-studies-4-4",
            "title": "Geography Tools and Skills",
            "time": "25–35 min",
            "study": "Build a short timeline or claim–evidence note, then identify viewpoint, purpose, and context.",
            "mastery": "Analyze an unfamiliar source and support the answer with a specific detail from the document or data.",
            "practice": "Use document annotation, eliminate distractors, and finish with a timed source-based question set."
          },
          {
            "id": "social-studies-4-5",
            "title": "Practice: Geography and the World",
            "time": "45–75 min",
            "study": "Treat this as a checkpoint: work independently first, then mark every uncertain item.",
            "mastery": "Reach 80% or better and explain why each missed answer is wrong.",
            "practice": "Complete it timed, review errors by category, and repeat only the missed skill types."
          }
        ]
      },
      {
        "id": "social-studies-5",
        "number": 5,
        "title": "Focusing Themes",
        "time": "105 min",
        "study": "Preview the chapter, learn the core idea, and annotate one worked example before practicing.",
        "mastery": "Explain the main idea without notes and complete a short mixed check with at least 80% accuracy.",
        "practice": "Use a three-pass routine: guided example, untimed practice, then a timed GED-style set.",
        "lessons": [
          {
            "id": "social-studies-5-1",
            "title": "The Earliest Civilizations",
            "time": "25–35 min",
            "study": "Build a short timeline or claim–evidence note, then identify viewpoint, purpose, and context.",
            "mastery": "Analyze an unfamiliar source and support the answer with a specific detail from the document or data.",
            "practice": "Use document annotation, eliminate distractors, and finish with a timed source-based question set."
          },
          {
            "id": "social-studies-5-2",
            "title": "Early China Early India Classical Greece",
            "time": "25–35 min",
            "study": "Build a short timeline or claim–evidence note, then identify viewpoint, purpose, and context.",
            "mastery": "Analyze an unfamiliar source and support the answer with a specific detail from the document or data.",
            "practice": "Use document annotation, eliminate distractors, and finish with a timed source-based question set."
          },
          {
            "id": "social-studies-5-3",
            "title": "The Great Migration and the Middle Ages",
            "time": "25–35 min",
            "study": "Build a short timeline or claim–evidence note, then identify viewpoint, purpose, and context.",
            "mastery": "Analyze an unfamiliar source and support the answer with a specific detail from the document or data.",
            "practice": "Use document annotation, eliminate distractors, and finish with a timed source-based question set."
          },
          {
            "id": "social-studies-5-4",
            "title": "Feudalism",
            "time": "25–35 min",
            "study": "Build a short timeline or claim–evidence note, then identify viewpoint, purpose, and context.",
            "mastery": "Analyze an unfamiliar source and support the answer with a specific detail from the document or data.",
            "practice": "Use document annotation, eliminate distractors, and finish with a timed source-based question set."
          },
          {
            "id": "social-studies-5-5",
            "title": "The Middle East and Africa Civilizations in the Americas",
            "time": "25–35 min",
            "study": "Build a short timeline or claim–evidence note, then identify viewpoint, purpose, and context.",
            "mastery": "Analyze an unfamiliar source and support the answer with a specific detail from the document or data.",
            "practice": "Use document annotation, eliminate distractors, and finish with a timed source-based question set."
          },
          {
            "id": "social-studies-5-6",
            "title": "Renaissance and Reformation in Europe",
            "time": "25–35 min",
            "study": "Build a short timeline or claim–evidence note, then identify viewpoint, purpose, and context.",
            "mastery": "Analyze an unfamiliar source and support the answer with a specific detail from the document or data.",
            "practice": "Use document annotation, eliminate distractors, and finish with a timed source-based question set."
          },
          {
            "id": "social-studies-5-7",
            "title": "The Scientific Revolution, the Enlightenment, and the Industrial",
            "time": "25–35 min",
            "study": "Build a short timeline or claim–evidence note, then identify viewpoint, purpose, and context.",
            "mastery": "Analyze an unfamiliar source and support the answer with a specific detail from the document or data.",
            "practice": "Use document annotation, eliminate distractors, and finish with a timed source-based question set."
          },
          {
            "id": "social-studies-5-8",
            "title": "Revolutions in Britain and France",
            "time": "25–35 min",
            "study": "Build a short timeline or claim–evidence note, then identify viewpoint, purpose, and context.",
            "mastery": "Analyze an unfamiliar source and support the answer with a specific detail from the document or data.",
            "practice": "Use document annotation, eliminate distractors, and finish with a timed source-based question set."
          },
          {
            "id": "social-studies-5-9",
            "title": "New Political Ideas in the 19th Century",
            "time": "25–35 min",
            "study": "Build a short timeline or claim–evidence note, then identify viewpoint, purpose, and context.",
            "mastery": "Analyze an unfamiliar source and support the answer with a specific detail from the document or data.",
            "practice": "Use document annotation, eliminate distractors, and finish with a timed source-based question set."
          },
          {
            "id": "social-studies-5-10",
            "title": "Political Developments in 19th-Century Europe",
            "time": "25–35 min",
            "study": "Build a short timeline or claim–evidence note, then identify viewpoint, purpose, and context.",
            "mastery": "Analyze an unfamiliar source and support the answer with a specific detail from the document or data.",
            "practice": "Use document annotation, eliminate distractors, and finish with a timed source-based question set."
          },
          {
            "id": "social-studies-5-11",
            "title": "World War I and the Russian Revolution The Rise of Fascism",
            "time": "25–35 min",
            "study": "Build a short timeline or claim–evidence note, then identify viewpoint, purpose, and context.",
            "mastery": "Analyze an unfamiliar source and support the answer with a specific detail from the document or data.",
            "practice": "Use document annotation, eliminate distractors, and finish with a timed source-based question set."
          },
          {
            "id": "social-studies-5-12",
            "title": "World War II",
            "time": "25–35 min",
            "study": "Build a short timeline or claim–evidence note, then identify viewpoint, purpose, and context.",
            "mastery": "Analyze an unfamiliar source and support the answer with a specific detail from the document or data.",
            "practice": "Use document annotation, eliminate distractors, and finish with a timed source-based question set."
          },
          {
            "id": "social-studies-5-13",
            "title": "The End of European Dominance and the Formation of the European Union The End of the Soviet Union China Today",
            "time": "25–35 min",
            "study": "Build a short timeline or claim–evidence note, then identify viewpoint, purpose, and context.",
            "mastery": "Analyze an unfamiliar source and support the answer with a specific detail from the document or data.",
            "practice": "Use document annotation, eliminate distractors, and finish with a timed source-based question set."
          },
          {
            "id": "social-studies-5-14",
            "title": "The Arab World",
            "time": "25–35 min",
            "study": "Build a short timeline or claim–evidence note, then identify viewpoint, purpose, and context.",
            "mastery": "Analyze an unfamiliar source and support the answer with a specific detail from the document or data.",
            "practice": "Use document annotation, eliminate distractors, and finish with a timed source-based question set."
          },
          {
            "id": "social-studies-5-15",
            "title": "Practice: Focusing Themes",
            "time": "45–75 min",
            "study": "Treat this as a checkpoint: work independently first, then mark every uncertain item.",
            "mastery": "Reach 80% or better and explain why each missed answer is wrong.",
            "practice": "Complete it timed, review errors by category, and repeat only the missed skill types."
          }
        ]
      }
    ]
  }
];

export const studyMapStats = studyMap.map((subject) => ({ name: subject.name, chapters: subject.chapters.length, lessons: subject.chapters.reduce((sum, chapter) => sum + chapter.lessons.length, 0), }));
