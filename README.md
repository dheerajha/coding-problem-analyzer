# Core Problem

Turns a verbose, story-wrapped competitive-programming problem into its
essential algorithmic specification: core problem, input, output,
constraints, objective, likely algorithm pattern, and time/space
complexity — without inventing anything the original problem didn't state.

Two-stage pipeline, run server-side:

```
Stage 1 — Problem Extraction        Stage 2 — Algorithm Analysis
messy problem -> clean spec    ->   clean spec -> pattern + complexity
```

Kept as two separate calls (see `server/services/`) so you can tell
whether a bad result came from *understanding* the problem or from
*solving* it.

## Project structure

```
coding-problem-analyzer/
├── client/               React + Vite + Tailwind frontend
│   └── src/
│       ├── components/   ProblemInput, ProblemStatement, InputOutput,
│       │                 Constraints, Algorithm, Complexity
│       ├── pages/        Home.jsx
│       └── services/     api.js (fetch wrapper for /api/analyze)
│
├── server/                Node.js + Express backend
│   ├── controllers/       analyzerController.js
│   ├── services/          problemExtractor.js, algorithmAnalyzer.js
│   ├── prompts/           extractionPrompt.js, algorithmPrompt.js
│   ├── routes/            analyzerRoutes.js
│   └── server.js
│
└── README.md
```

## Setup

### 1. Backend

```bash
cd server
npm install
cp .env.example .env
# edit .env and add your GEMINI_API_KEY (https://aistudio.google.com/apikey)
npm run dev
```

Runs on `http://localhost:5000`. Health check: `GET /health`.

### 2. Frontend

In a second terminal:

```bash
cd client
npm install
npm run dev
```

Runs on `http://localhost:5173` and proxies `/api/*` to the backend
(configured in `client/vite.config.js`), so you don't need CORS
workarounds or an `.env` on the client — the API key never leaves the
server.

Open `http://localhost:5173`, paste a problem, click **Extract problem**.

## API

`POST /api/analyze`

```json
// request
{ "problem": "Rahul is preparing for a marathon..." }
```

```json
// response
{
  "core_problem": "...",
  "input_format": "...",
  "output_format": "...",
  "constraints": ["1 ≤ N ≤ 2×10⁵"],
  "objective": "...",
  "operations": ["..."],
  "algorithm_patterns": ["Greedy", "Sorting"],
  "recommended_approach": "...",
  "reasoning": "...",
  "time_complexity": "O(N log N)",
  "space_complexity": "O(N)",
  "stats": { "original_words": 1842, "clean_words": 127, "reduction_pct": 93 }
}
```

Errors return `{ "error": "..." }` with a 4xx/5xx status.

## Notes

- Models occasionally wrap JSON in a code fence or add a stray sentence;
  `server/services/parseJson.js` extracts the JSON object leniently
  rather than failing on the first hiccup.
- The prompts explicitly forbid inventing constraints, algorithms, or
  complexities the source problem doesn't support — under-specified
  fields come back as `"Not enough information given"` instead of a
  guess.
- No database in this version (see the design doc's V1–V7 build order
  for where history/auth/MongoDB would go next).

## Roadmap (from the original design doc)

1. ~~Paste problem → clean problem~~ (done)
2. ~~+ input/output/constraints/objective~~ (done)
3. ~~+ algorithm pattern, approach, complexity~~ (done)
4. Hints, examples, edge cases
5. Generate C++/Java/Python solution
6. Login, problem history, saved problems (add MongoDB here)
7. Paste a LeetCode/Codeforces/HackerRank URL and auto-fetch the problem
