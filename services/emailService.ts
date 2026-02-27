// Email service for sending evaluation reports

interface EmailReportData {
    technicianName: string;
    technicianEmail: string;
    category: string;
    score: number;
    percentage: number;
    level: string;
    breakdown: Record<string, { correct: number; total: number }>;
    analysis: string;
    questions: Array<{
        text: string;
        isCorrect: boolean;
        difficulty: string;
        topic: string;
        explanation: string;
    }>;
}

export const sendEvaluationReport = async (data: EmailReportData): Promise<{ success: boolean; error?: string }> => {
    try {
        const response = await fetch('/send-report', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Failed to send report:', error);
        return { success: false, error: 'Network error sending report' };
    }
};
