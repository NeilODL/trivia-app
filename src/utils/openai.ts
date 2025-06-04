import OpenAI from 'openai'

type TriviaQuestion = {
  question: string
  answer: string
}

const env = import.meta.env as unknown as { VITE_OPENAI_API_KEY?: string }
const apiKey = process.env.OPENAI_API_KEY || env.VITE_OPENAI_API_KEY

export const openai = new OpenAI({ apiKey })

export async function generateTrivia(questionCount: number): Promise<TriviaQuestion[]> {
  try {
    const prompt =
      `Generate ${questionCount} general knowledge trivia questions with answers as a JSON array ` +
      'of objects with "question" and "answer" fields.'

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    })
    const content = completion.choices[0]?.message?.content || '[]'
    return JSON.parse(content)
  } catch (err) {
    console.error('Error generating trivia:', err)
    throw err
  }
}
