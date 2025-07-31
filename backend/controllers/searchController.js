import { performSearch } from "../services/searchService.js";

export const search = async (req, res) => {
  try {
    console.log('Search request received:', req.body);
    const { query} = req.body;    

    if (!query) {
      console.log('No query provided');
      return res.status(400).json({
        success: false,
        error: "query is required"
      });
    }

    const searchQuery = query;
        
    const result = await performSearch(searchQuery);
    console.log('Search result:', result);
    
    if (!result.success) {
      console.log('Search failed:', result.error);
      return res.status(500).json(result);
    }

    return res.status(200).json({
      ...result,
    });
  } catch (error) {
    console.error("Search controller error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error"
    });
  }
}; 