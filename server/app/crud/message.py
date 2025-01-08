import openai

openai.api_key = "APIKEY"

def get_chat_response(prompt: str, max_tokens: int, temperature: float) -> str:
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",  # Use "gpt-4" if needed
            messages=[{"role": "user", "content": prompt}],
            max_tokens=max_tokens,
            temperature=temperature,
        )
        return response['choices'][0]['message']['content'].strip()
    except Exception as e:
        raise ValueError(f"Error in ChatGPT API: {str(e)}")