# Project Guidelines - Jyotishasha

## Project Overview
Jyotishasha is a Next.js-powered astrology, horoscope, and Panchang platform. It provides daily horoscopes, Panchang information, birth chart calculations, and transit-related features.

## Architecture
- **Framework:** Next.js App Router (located in `/app`).
- **Internationalization (i18n):** Subfolders under `/app/[locale]` handle language routes (e.g., english `/en`, hindi `/hi`).
- **Components:** Reusable UI components are housed in `/components`.
- **Utilities & Logic:** Located in `/utils`, `/lib`, `/hooks`, and `/types`.

## Coding Standards
- **TypeScript:** Strict typing, no implicit `any`, use explicit interfaces/types in `/types` or local files.
- **Components:** Prefer functional components, reuse existing layout and layout wrappers.
- **Styling:** Tailored using standard CSS rules or Tailwind CSS where consistent with the design.

## SEO Standards
- **Metadata:** Use explicit Next.js metadata configurations or JSON-LD schema for SEO optimization.
- **Headings & Hierarchy:** Maintain correct semantic HTML tags (`h1`, `h2`, `h3`) for astrology and panchang content.
- **Keywords:** Integrate local astrological and panchang keyword contexts carefully.

## Panchang Authority Page Standards
- **Accuracy:** Ensure calculations and time-based astrological components (Tithi, Nakshatra, Yoga, Karana) are clear, precise, and authoritative.
- **UI Consistency:** Rely on authoritative panchang widgets, cards, and structured tables.

## ESR Workflow
This project follows Enterprise Software Refactoring (ESR) principles.
- **Preserve Behavior:** Do not change functional behavior unless explicitly requested.
- **No Unrelated Refactoring:** Focus strictly on the assigned task and do not refactor surrounding files or styles.
- **Incremental:** One task or feature should be implemented at a time.

## Git Workflow
- Modify only requested files.
- Never stage or commit changes unless specifically asked.
- Prepare clear, concise commit messages if asked to commit.

## Build Rules
- Maintain code safety and type compatibility.
- Ensure the project builds cleanly without warnings or errors.

## Review & Output Format
Upon completion, provide:
1. Files changed
2. Done

## Token Optimization Rules
- **No Global Scans:** Never scan the entire project or directory unless requested.
- **Targeted Reading:** Read only the files explicitly mentioned or directly required for the task.
- **Minimal Modifications:** Modify only requested files.
- **Single Task Focus:** Work on exactly one task per request.
- **Concise Responses:** Keep explanations, logs, and conversational output extremely brief and direct.
- **Build Execution:** Do not run build unless explicitly requested.
