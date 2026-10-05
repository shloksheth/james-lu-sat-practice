# Regression practice coverage

Regression Part 1 and Part 2 each contain 32 original questions. This is coverage of the reviewed lesson methods and relevant SAT/PSAT model families, not a guarantee of every possible wording or combination.

## Answer verification

All 64 answer keys were independently checked with exact rational arithmetic, direct substitution, polynomial coefficient comparisons, admissible-root checks, or exact least-squares normal equations. The corrected offset-exponential item uses a new question ID so previously saved answers to its old incorrect key are not treated as current mastery.

## Coverage

### Regression Part 1

1. Linear model from two points
2. Exponential model from separated inputs
3. Vertex constraint
4. Offset exponential growth
5. Enough independent points
6. Circle through three points
7. Symmetry and identifiable quantities
8. Requested intercept
9. Verify original observations
10. Restricted quadratic structure
11. Standard-form fitting
12. Quadratic from three points
13. Roots as model constraints
14. Vertex and maximum in context
15. Transformed outputs
16. Unequal time intervals and growth
17. Exponential decay
18. Offset exponential decay
19. Structured polynomial fitting
20. Circle fitting and radius
21. Noisy linear least-squares prediction
22. Residual and units
23. Selecting the model
24. Scaling ambiguity
25. Correct table headers and tilde
26. Slope interpretation with scaled axes
27. Average rate from observations
28. Choose a line from a scatterplot
29. Count overpredictions on a graph
30. Rescaling a fitted data set
31. Equivalent exponential form showing a value
32. Input translation and quadratic minimum

### Regression Part 2

1. Multiple scalar roots
2. Quadratic identity
3. Known intersection output
4. Outlier removal and coefficient ratio
5. Rational identity and domain
6. Invariant across a system
7. Function input and positivity
8. Positive-parameter scalar regression
9. Factored polynomial identity
10. Quadratic coefficient recovery
11. Simultaneous nonlinear constraints
12. List order and all constraints
13. Polynomial identity beyond quadratics
14. Rational identity by regression
15. Integer factor structure
16. Exponential identities and common bases
17. Known intersection coordinate
18. Regressing a composed input
19. Radical equation and extraneous solution
20. Tangency and minimum parameter
21. Structured polynomial with enough constraints
22. Overconstraint and nonzero residuals
23. Quadratic outlier at the center: coefficient changes
24. Off-center outlier: opposite coefficient changes
25. Factor condition as a parameter constraint
26. Compare fitted growth models
27. Recover a growth-period parameter
28. Inverse exponential input
29. Offset exponential with separated inputs
30. Reciprocal model fitting
31. Radical model: square outputs carefully
32. Fitted quadratic to root information

## Explicit regression explanations

All 64 questions across Part 1 and Part 2 include setup instructions, entries to enter on separate lines, and a result/domain check after answer submission. Leave fitted parameter letters undefined, start a fresh calculation when old definitions conflict, and check the original conditions after fitting. The explanations distinguish exact interpolation from noisy least-squares fitting and an inconsistent system with nonzero residuals.

Some questions require symmetry, a factor theorem, an identity, a root relationship, or a units conversion before or after fitting; those steps are stated explicitly. When a question already supplies its model or asks a conceptual question, any convenient demonstration points are labeled as samples or illustrations rather than additional observed data. Seven earlier interpretation or insufficient-data exercises in Part 2 were replaced with solvable parameter-fitting questions. Changed questions have new IDs to preserve the meaning of saved progress.

Part 1 Question 24 now explicitly supplies **two distinct points on a nonvertical line**. This condition is needed to determine a unique slope; the individual standard-form coefficients still have a common scaling ambiguity.

The copy controls use clipboard-safe LaTeX for parameter restrictions, including visible restriction braces, grouped exponents, and paired list delimiters. The readable entries remain available for manual typing. Type or paste each line separately; a definition such as `a=1` would fix that parameter instead of letting the regression fit it.

## Actual Desmos screenshots

Six representative demonstrations were performed in the [College Board version of the Desmos calculator](https://www.desmos.com/testing/cb-digital-sat/graphing): three for Part 1 and three for Part 2. The screenshots show the real calculator interface, fitted parameters, requested outputs, and relevant graphs. They are examples of particular questions, not a claim that every one of the 64 entries was executed in the browser.

| Lesson and question | Demonstration | Verified visible result | Screenshot |
| --- | --- | --- | --- |
| Part 1, Q12 | Exact quadratic through three supplied points | a=1, b=−7, c=14; f(0)=14 | [Quadratic fit](assets/desmos-quadratic-three-points.png) |
| Part 1, Q18 | Offset exponential decay with restrictions | a=12, b=0.5, c=9; 2c=18 | [Offset exponential](assets/desmos-offset-exponential-decay.png) |
| Part 1, Q21 | Noisy least-squares line and prediction | m=1.5, b=2.5; prediction at x=4 is 8.5 | [Noisy line](assets/desmos-noisy-linear-prediction.png) |
| Part 2, Q11 | Two simultaneous unknown constraints | a=2, b=5; a²+b²=29 | [Simultaneous constraints](assets/desmos-two-unknown-constraints.png) |
| Part 2, Q20 | Radical tangency and minimum parameter | v=39.5, k=39.75; 4k=159; original intersection at (39.5,0.5) | [Radical tangency](assets/desmos-radical-tangency-minimum.png) |
| Part 2, Q23 | Quadratic fit before and after removing (0,12) | Before: a=1, c=8.4. After: r=2, s=5 | [Outlier comparison](assets/desmos-quadratic-outlier-both-fits.png) |

The outlier screenshot uses different letters for the second fit so both parameter panels remain visible: r is the refitted a and s is the refitted c. All six images were visually checked at their saved resolution. Required parameter/output panels are unobscured, the plotted points and curves match their stated models, and the tangency graph shows the original radical rather than only its squared equation.

## Sources used for the coverage audit

- Previously reviewed James Lu lesson transcripts and examples, documented in the local lesson-review notes.
- Relevant Hard questions in the user-supplied complete PSAT/NMSQT and PSAT 10 question-bank PDF: 54 records matched model/scatterplot, exponential, quadratic, or regression terms. This keyword review can miss unrecognized OCR, so it is not an exhaustive classification of the bank.
- [Desmos regression documentation](https://help.desmos.com/hc/en-us/articles/4406972958733-Regressions) and [nonlinear fitting limitations](https://help.desmos.com/hc/en-us/articles/360042428612-Nonlinear-Regressions).

Existing downloadable PDFs retain their earlier 10-question versions. The expanded sets and current corrected answer keys are on the website.
