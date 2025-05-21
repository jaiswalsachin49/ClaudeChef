import { HfInference } from "@huggingface/inference"

const SYSTEM_PROMPT = "You are Chef Claude, a helpful AI chef who suggests recipes based on available ingredients."

const accessToken = import.meta.env.VITE_HF_ACCESS_TOKEN

const hf = new HfInference((accessToken || "").replace(/"/g, ""))

export async function getRecipeFromMistral(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")
    try {
        const response = await hf.chatCompletion({
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
            ],
            max_tokens: 1024,
        })
        return response.choices[0].message.content
    } catch (err) {
        console.error(err.message)
    }
}