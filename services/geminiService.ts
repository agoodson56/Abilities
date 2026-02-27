
import { GoogleGenAI, Type } from "@google/genai";
import { SystemCategory, Difficulty, Question } from "../types";

// For Vite/Cloudflare, environment variables must be prefixed with VITE_
const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || "";

// Validate API key is present
const isApiKeyConfigured = (): boolean => {
  return apiKey.length > 10 && apiKey.startsWith("AIza");
};

// Create AI instance only if key is valid
let ai: GoogleGenAI | null = null;
if (isApiKeyConfigured()) {
  ai = new GoogleGenAI({ apiKey });
}

export const generateQuestionsForCategory = async (
  category: SystemCategory
): Promise<Question[]> => {
  const systemContexts = {
    [SystemCategory.SECURITY]: `
      - HARDWARE FUNCTIONALITY: Deep focus on Pelco VideoXpert (Enhanced Decoders, CMG/VXS servers), Milestone XProtect (Recording Server vs Mobile Server roles), Genetec Security Center (Synergis Cloud Link, Streamvault storage logic), and BCDVideo (Storage controller management).
      - OPERATIONAL LOGIC: When to use a Pelco Op Center vs a Web Client; Purpose of Failover Recording in Milestone; Logic behind Genetec Federation for multi-site deployments.
      - CODES: Federal IT Security standards (FIPS 140-2), OSHA 1910.147, UL 294.`,
    [SystemCategory.CABLING]: `
      - HARDWARE FUNCTIONALITY: Fluke Versiv System (DSX-8000 Copper vs CertiFiber Pro vs OptiFiber Pro OTDR modules). Specific use cases for MPO vs LC connectors.
      - OPERATIONAL LOGIC: Understanding why an OTDR 'Event Map' is used versus a 'Trace'; Choosing between permanent link and channel testing based on TIA-568-D standards.
      - CODES: TIA/EIA-568.2-D, NEC Article 725/760/800, OSHA 1910.269.`,
    [SystemCategory.AUDIO_VIDEO]: `
      - HARDWARE FUNCTIONALITY: Biamp Tesira (FORTE vs SERVER-IO scaling), Q-SYS Core (Redundancy logic, Flex Channels), Crestron NVX (Encoders vs Decoders), Extron NAV (Purpose of the System Manager).
      - OPERATIONAL LOGIC: Programming DSP logic pins for AEC (Acoustic Echo Cancellation) vs standard gain; Logic of signal flow from HDMI 2.1 sources to HDBaseT receivers.
      - CODES: ADA 2010 compliance (mounting/proximity), OSHA 1926.451, NEC 640.`,
    [SystemCategory.FIRE_LIFE_SAFETY]: `
      - HARDWARE FUNCTIONALITY: Addressable sensors (Ionization vs Photoelectric vs Multi-criteria) and their specific environmental use cases. NAC Extender functions vs SLC loop isolators.
      - OPERATIONAL LOGIC: Programming 'Positive Alarm Sequence' logic; When to use a Class A vs Class B wiring based on NFPA 72 requirements for survivability.
      - CODES: NFPA 72 (2022), NFPA 70, NFPA 101, OSHA 1910.157, UL 864.`,
    [SystemCategory.NETWORKING]: `
      - HARDWARE FUNCTIONALITY: SFP+ vs QSFP+ modules and distance limitations. Layer 2 vs Layer 3 switching logic in a Video Surveillance environment. PoE++ (802.3bt) power requirements for high-draw PTZ cameras.
      - OPERATIONAL LOGIC: Configuring IGMP Snooping Querier specifically for Pelco Multicast Video streams; Setting up Port Security to prevent unauthorized device bridging.
      - CODES: NIST 800-53, OSHA 1910 Subpart S, IEEE 802.3 standards.`,
    [SystemCategory.DAS]: `
      - HARDWARE FUNCTIONALITY: CommScope ION-E (Optical to Ethernet conversion, Head-End vs Remote Unit roles), JMA Teko (MIMO antenna configurations, band-specific coverage), Corning ONE (Optical Network Evolution platform, SpiderCloud integration), SOLiD ALLIANCE (DAS Head-End capacity, band pass filtering). Radiating coax (Andrew RADIAX) signal propagation vs discrete antenna placement.
      - OPERATIONAL LOGIC: RF planning with link budget calculations; Understanding Uplink vs Downlink power balancing; Configuring PIM (Passive Intermodulation) testing procedures; Signal source integration (BDA/Signal Boosters vs Small Cells vs Off-Air repeaters); Fiber-to-the-antenna vs Coax distribution architecture decisions.
      - CODES: NFPA 72 (emergency communication), IBC Section 510/911 (in-building public safety DAS requirements), FCC Part 90 (public safety frequencies 700/800MHz), OSHA 1926 (tower/elevated work), local AHJ requirements for BDA signal boosters.`,
    [SystemCategory.INTRUSION]: `
      - HARDWARE FUNCTIONALITY: Bosch B9512G (48-599 zone commercial panel, SIA CP-01 compliant), Bosch DS938Z (Dual-Tech PIR/Microwave motion detector, anti-mask logic), Bosch DS1101i (Acoustic glass break detector, FlexCore technology), Bosch B920 (Keypad/Arming station, alpha-numeric display), Bosch B450 (IP/Cellular communicator, Contact ID and SIA format). GE 1076-N (Surface-mount door/window contacts). Altronix AL400ULACM (12/24VDC power supply with battery charger).
      - OPERATIONAL LOGIC: Programming zone types (Instant, Delayed, 24-Hour, Cross-Zone); DEOL vs EOL resistor wiring supervision; Walk test mode procedures; Swinger shutdown logic; Stay/Away/Night arming modes; Event-triggered relay automation (CCTV recording, door locking); Central station report code programming (Contact ID format); Dual-path IP/cellular communication failover.
      - CODES: UL 681 (Burglar/Holdup Alarm Installation), ANSI/SIA CP-01-2019 (False Alarm Reduction), NFPA 731 (Premises Security), NEC Article 725 (Class 2 Circuits), UL 1076 (Proprietary Alarm Units), OSHA 1910 (General Safety).`
  };

  const prompt = `You are the Chief Technical Evaluator at 3D Technology Services. 
  Generate EXACTLY 50 high-quality technical evaluation questions for the category: ${category}.
  
  CRITICAL OBJECTIVE: 
  You must evaluate the technician's mastery of MANUFACTURE-SPECIFIC HARDWARE and its OPERATIONAL FUNCTION. 
  Questions must cover not just 'how' to plug something in, but 'what' the hardware does, 'why' it is chosen for a specific application, and 'how' it is programmed within the proprietary software environment (Pelco, Genetec, Milestone, Biamp, etc.).

  MANUFACTURER CONTEXT:
  ${systemContexts[category]}
  
  DIFFICULTY DISTRIBUTION (12-13 questions per level, totaling 50):
  1. BEGINNER (Apprentice) - 13 questions: Safety (OSHA), identifying manufacturer components, basic connections (T568B), and tool safety.
  2. INTERMEDIATE (Junior Tech) - 13 questions: Software navigation (Logins, Basic Configuration), device discovery, and standard NEC code clearances.
  3. ADVANCED (Senior Tech) - 12 questions: Complex hardware-software interaction logic (Rules/Events), troubleshooting signal anomalies (dB loss, packet drops), and specific NFPA/NEC/OSHA code citations.
  4. EXPERT JOURNEYMAN (Lead Engineer) - 12 questions: System architecture design, advanced commissioning (Federation, DSP Logic, OTDR Analysis), Federal compliance auditing, and project-level engineering decisions.

  MANDATORY FORMAT:
  - Each question must be a multiple-choice item with 4 distinct options.
  - The 'explanation' must cite the specific hardware capability or code requirement (e.g., 'A Milestone Recording Server performs the function of... because...').
  
  CRITICAL - ANSWER POSITION RANDOMIZATION:
  - You MUST distribute correct answers EVENLY across all 4 positions (indices 0, 1, 2, 3).
  - Out of 50 questions: approximately 12-13 should have correctAnswerIndex=0, 12-13 should have correctAnswerIndex=1, 12-13 should have correctAnswerIndex=2, and 12-13 should have correctAnswerIndex=3.
  - NEVER put the correct answer in the same position for more than 3 consecutive questions.
  - This is MANDATORY to prevent answer pattern recognition.
  
  Return as a JSON array of 50 objects.`;

  // Check if API is configured
  if (!ai) {
    throw new Error("API_KEY_MISSING: Please add VITE_GEMINI_API_KEY to Cloudflare environment variables.");
  }

  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            category: { type: Type.STRING },
            difficulty: { type: Type.STRING, enum: Object.values(Difficulty) },
            text: { type: Type.STRING },
            options: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              minItems: 4,
              maxItems: 4
            },
            correctAnswerIndex: { type: Type.INTEGER },
            explanation: { type: Type.STRING },
            topic: { type: Type.STRING },
          },
          required: ["id", "category", "difficulty", "text", "options", "correctAnswerIndex", "explanation", "topic"],
        },
      },
    },
  });

  try {
    const questions = JSON.parse(response.text || "[]");
    if (questions.length === 0) throw new Error("Empty question set received from AI.");
    return questions;
  } catch (error) {
    console.error("Failed to parse Gemini response", error);
    throw new Error("Failed to generate questions. The AI service may be temporarily unavailable.");
  }
};

export const analyzeTechnicianLevel = async (
  category: SystemCategory,
  answers: { question: Question; isCorrect: boolean }[]
): Promise<string> => {
  const prompt = `Act as the CTO for 3D Technology Services. 
  Perform a deep-dive audit on a technician's evaluation in ${category}. 
  
  DATA: ${JSON.stringify(answers.map(a => ({
    difficulty: a.question.difficulty,
    correct: a.isCorrect,
    topic: a.question.topic,
    text: a.question.text
  })))}
  
  OBJECTIVE:
  1. Audit their understanding of Manufacturer Hardware Functions (what the device actually does in a system).
  2. Assess Programming Logic proficiency (ability to configure software for specific outcomes).
  3. Verify knowledge of Regulatory Codes (OSHA, NEC, NFPA).
  4. State clearly if they are ready for Lead/Journeyman status.
  
  Format in professional Markdown.`;

  // Check if API is configured
  if (!ai) {
    throw new Error("API_KEY_MISSING: Please add VITE_GEMINI_API_KEY to Cloudflare environment variables.");
  }

  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: prompt,
  });

  return response.text || "Diagnostic failed.";
};
