# James Lu SAT Practice

A personal SAT practice workspace organized around the four core James Lu course sections.

## Website

The website embeds the selected SATQuestionBank.org items directly, so Next and Previous load the next question inside the practice screen. The bank provides equations, figures, answer controls, explanations, and its calculator. It requires an internet connection and may show its own sign-in notice.

- Desmos Mastery: 29 questions
- Grammar Mastery: 25 questions
- Non-Desmos: 33 questions
- Reading Comprehension: 25 questions

Active questions were excluded during selection on October 3, 2026. The site remembers the last opened question in each section on the current device. It does not create a separate score record.

## Practice materials

The repository includes 17 daily or standalone lesson PDFs with 199 original questions and answer explanations, plus four cumulative linked question-bank test booklets. `Start_Here.html` provides the complete file index, recommended Khan Academy units, practice counts, and videos to revisit. `SAT_Practice_Library.zip` contains the PDF library and guide.

The original practice was independently authored from the course topics. It is not endorsed by James Lu or College Board. Bank questions remain displayed by SATQuestionBank.org rather than copied into this repository.

## GitHub Pages

Publish from the `main` branch and `/ (root)` folder. The site is plain HTML, CSS, and JavaScript and requires no build command. Open `index.html` through GitHub Pages, or run a local static web server to preview it.


## Interactive course
The homepage offers Course, Daily Practice, Reading Plan, and Section Tests. The core course has 25 video-specific lessons and 279 original questions, including expanded regression practice and a 36-question punctuation review. The earlier PDF library remains available. Profiles save progress in localStorage on the current browser; backups can be exported and imported. There is no online authentication or cloud sync. Videos use original Loom/YouTube embeds and may require source-site access. Section tests use a live bank iframe; this independent site cannot read their answer/scoring data.

## Integrated reading study course
`reading-plan.html` combines the two core James Lu reading strategy videos, his transitions video, and Khan Academy's full SAT Reading and Writing curriculum. Nine reading/rhetoric skill modules include transcript-based James study segments, verified direct Khan lesson/video/exercise links, original notes, error-review fields, and a Foundations → Medium → Advanced → Challenge practice progression. The required grammar bridge links all eight Khan grammar practice topics with the existing Grammar Mastery unit.

The reading plan adds 50 independently authored questions: 27 guided questions and 23 reserved mixed-assessment questions. They include fictional literary prose, original poetry, paired texts, tables, original SVG graphs, and rhetorical notes. Each has one keyed answer and reasoning for every distractor. Difficulty labels and study thresholds are author estimates, not official calibrations or score predictions. The mixed assessment saves drafts and reveals feedback only after full submission. It covers reading/rhetoric; the final fresh Khan/Bluebook check includes grammar.

Khan materials stay on Khan Academy. The site records only results entered by the learner; it cannot access a Khan account or score. The reading plan shares local profiles and backups with the core course, including first-attempt results and review notes. `READING-STUDY-PLAN.md` contains a written syllabus and resource links.

## Lesson 16 flashcards and practice

`lesson16-punctuation.html` adds 34 original flashcards and 32 original punctuation questions with explanations for every distractor. It is linked from lesson 16, its practice route, and the corresponding daily set. Study mode provides immediate feedback; test mode delays feedback until the selected set is fully answered and submitted. Missed-question and flagged-question filters, card review ratings, and JSON progress export support review. Progress is saved separately from the main course profiles in browser localStorage. The Markdown study pack and tab-separated front/back flashcard file are downloadable from the page. The files require no build step and publish with the existing GitHub Pages root deployment.
