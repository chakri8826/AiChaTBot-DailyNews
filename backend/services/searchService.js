import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import { ENV_VARS } from "../config/ENV_VARS.js";

const token = ENV_VARS.GITHUB_TOKEN;
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4.1";

export async function performSearch(query) {
  try {
    console.log('Starting search with query:', query);
    
    if (!token) {
      console.error('GitHub token is not configured');
      throw new Error('GitHub token is not configured');
    }
    
    const client = ModelClient(
      endpoint,
      new AzureKeyCredential(token)
    );

    const response = await client.path("/chat/completions").post({
      body: {
        messages: [
          { role: "system", content: "You are a helpful search assistant that provides accurate and concise information." },
          { role: "user", content: query }
        ],
        temperature: 1,
        top_p: 1,
        model: model
      }
    });

    console.log('Azure AI Response status:', response.status);
    console.log('Azure AI Response headers:', response.headers);

    if (isUnexpected(response)) {
      console.error('Azure AI API Error:', response.body.error);
      throw response.body.error;
    }

    const result = response.body.choices[0].message.content;
    console.log('Search successful, result:', result);

    return {
      success: true,
      data: result
    };
  } catch (error) {
    console.error('Search error:', error);
    return {
      success: false,
      error: error.message || 'An error occurred during search'
    };
  }
} 