export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { jobDescription, cvSummary } = req.body;

  if (!jobDescription || !cvSummary) {
    return res.status(400).json({ error: 'jobDescription y cvSummary son requeridos' });
  }

  try {
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': process.env['GEMINI_API_KEY'] ?? '',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Analise esta descrição de vaga e o resumo do currículo do candidato. Responda APENAS em JSON válido, sem markdown, no formato: {"requisitosChave": ["req1", "req2", "req3"], "matchScore": 75, "sugestoes": ["sugestão1", "sugestão2"]}

Descrição da vaga: ${jobDescription}

Resumo do currículo: ${cvSummary}`,
                },
              ],
            },
          ],
        }),
      },
    );

    const data = await geminiRes.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '{}';
    const cleaned = text.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(cleaned);

    return res.status(200).json(parsed);
  } catch (error) {
    console.error('Error calling Gemini:', error);
    return res.status(500).json({ error: 'Error al analizar la vaga' });
  }
}
