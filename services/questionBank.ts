// Static Question Bank — parses the markdown assessment files at import time
// Uses Vite's ?raw import to load markdown as strings (zero API calls)

import { SystemCategory, Difficulty, Question } from '../types';

// Vite raw imports — loads file content as a string at build time
import cablingMd from '../test-questions/structured-cabling-assessment.md?raw';
import securityMd from '../test-questions/cctv-assessment.md?raw';
import avMd from '../test-questions/av-assessment.md?raw';
import fireMd from '../test-questions/fire-alarm-assessment.md?raw';
import networkingMd from '../test-questions/access-control-assessment.md?raw';
import dasMd from '../test-questions/das-assessment.md?raw';
import intrusionMd from '../test-questions/intrusion-assessment.md?raw';

// ── Markdown Parser ──────────────────────────────────────────────

function parseDifficulty(sectionHeader: string, questionIndex: number): Difficulty {
    // Each section has 10 questions: 3 Entry, 3 Intermediate, 4 Advanced
    // But some have 3/3/4 split. We map based on the sub-header that preceded the question.
    const lower = sectionHeader.toLowerCase();
    if (lower.includes('entry')) return Difficulty.BEGINNER;
    if (lower.includes('intermediate')) return Difficulty.INTERMEDIATE;
    if (lower.includes('advanced')) return Difficulty.EXPERT_JOURNEYMAN;
    // Fallback: distribute evenly
    if (questionIndex < 3) return Difficulty.BEGINNER;
    if (questionIndex < 6) return Difficulty.INTERMEDIATE;
    return Difficulty.ADVANCED;
}

function parseMarkdownQuestions(markdown: string, category: SystemCategory): Question[] {
    const questions: Question[] = [];
    const lines = markdown.split('\n');

    let currentSection = '';      // e.g. "Standards & Codes"
    let currentDifficulty = '';   // e.g. "Entry Level"
    let globalId = 0;

    let i = 0;
    while (i < lines.length) {
        const line = lines[i].trim();

        // Track section headers (## SECTION 1: STANDARDS & CODES)
        if (line.startsWith('## SECTION') || (line.startsWith('## ') && line.includes('('))) {
            const match = line.match(/##\s*SECTION\s*\d+:\s*(.+)/i);
            if (match) {
                currentSection = match[1].replace(/\(.*\)/, '').trim();
            }
            i++;
            continue;
        }

        // Track difficulty sub-headers (### Entry Level, ### Intermediate Level, ### Advanced Level)
        if (line.startsWith('### ')) {
            currentDifficulty = line.replace('### ', '').trim();
            i++;
            continue;
        }

        // Detect question start: **Q1.** or **Q10.**
        const qMatch = line.match(/^\*\*Q\d+\.\*\*\s*(.+)/);
        if (qMatch) {
            globalId++;
            const questionText = qMatch[1];
            const options: string[] = [];
            let correctAnswerIndex = 0;
            let explanation = '';

            // Read options (lines starting with "- A)", "- B)", etc.)
            i++;
            while (i < lines.length) {
                const optLine = lines[i].trim();
                const optMatch = optLine.match(/^-\s*([A-D])\)\s*(.+)/);
                if (optMatch) {
                    options.push(optMatch[2]);
                    i++;
                } else {
                    break;
                }
            }

            // Read answer line: **Answer:** X) ...
            while (i < lines.length) {
                const ansLine = lines[i].trim();
                if (ansLine === '' || ansLine === '---') {
                    i++;
                    continue;
                }
                const ansMatch = ansLine.match(/^\*\*Answer:\*\*\s*([A-D])\)/);
                if (ansMatch) {
                    const letter = ansMatch[1];
                    correctAnswerIndex = letter.charCodeAt(0) - 'A'.charCodeAt(0);
                    // Extract explanation from the answer line (after the letter and closing paren)
                    explanation = ansLine.replace(/^\*\*Answer:\*\*\s*[A-D]\)\s*/, '').trim();
                    i++;
                    break;
                }
                // If we hit another question, break
                if (ansLine.match(/^\*\*Q\d+\.\*\*/)) break;
                i++;
            }

            // Check for > *Reference: ... lines as additional explanation
            while (i < lines.length) {
                const refLine = lines[i].trim();
                if (refLine.startsWith('> *Reference:') || refLine.startsWith('> *Calculation:')) {
                    const refText = refLine.replace(/^>\s*\*/, '').replace(/\*$/, '').trim();
                    explanation = explanation ? `${explanation} — ${refText}` : refText;
                    i++;
                } else {
                    break;
                }
            }

            // Map difficulty
            let difficulty: Difficulty;
            const diffLower = currentDifficulty.toLowerCase();
            if (diffLower.includes('entry')) difficulty = Difficulty.BEGINNER;
            else if (diffLower.includes('intermediate')) difficulty = Difficulty.INTERMEDIATE;
            else if (diffLower.includes('advanced')) difficulty = Difficulty.EXPERT_JOURNEYMAN;
            else difficulty = Difficulty.ADVANCED;

            if (options.length === 4) {
                questions.push({
                    id: `${category.replace(/\s+/g, '_').toLowerCase()}_${globalId}`,
                    category,
                    difficulty,
                    text: questionText,
                    options,
                    correctAnswerIndex,
                    explanation: explanation || 'See reference materials.',
                    topic: currentSection || category,
                });
            }
            continue;
        }

        i++;
    }

    return questions;
}

// ── Pre-parsed question banks (runs once at module load) ──────────

const QUESTION_BANKS: Record<SystemCategory, Question[]> = {
    [SystemCategory.CABLING]: parseMarkdownQuestions(cablingMd, SystemCategory.CABLING),
    [SystemCategory.SECURITY]: parseMarkdownQuestions(securityMd, SystemCategory.SECURITY),
    [SystemCategory.AUDIO_VIDEO]: parseMarkdownQuestions(avMd, SystemCategory.AUDIO_VIDEO),
    [SystemCategory.FIRE_LIFE_SAFETY]: parseMarkdownQuestions(fireMd, SystemCategory.FIRE_LIFE_SAFETY),
    [SystemCategory.NETWORKING]: parseMarkdownQuestions(networkingMd, SystemCategory.NETWORKING),
    [SystemCategory.DAS]: parseMarkdownQuestions(dasMd, SystemCategory.DAS),
    [SystemCategory.INTRUSION]: parseMarkdownQuestions(intrusionMd, SystemCategory.INTRUSION),
};

// ── Fisher-Yates Shuffle ──────────────────────────────────────────

function shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// ── Public API ────────────────────────────────────────────────────

const QUESTIONS_PER_QUIZ = 40;

/**
 * Returns a random selection of questions for a category — instant, zero API calls.
 * Selects QUESTIONS_PER_QUIZ from the full pool so each attempt is different.
 */
export function getQuestionsForCategory(category: SystemCategory): Question[] {
    const questions = QUESTION_BANKS[category];
    if (!questions || questions.length === 0) {
        throw new Error(`No questions found for category: ${category}`);
    }
    const shuffled = shuffleArray(questions);
    return shuffled.slice(0, QUESTIONS_PER_QUIZ);
}
