/**
 * Nakala API integration
 * API Documentation: https://api.nakala.fr/doc
 */

const NAKALA_API_BASE = 'https://api.nakala.fr';

/**
 * Get all datasets for the authenticated user
 * @param {string} apiKey - Your Nakala API key
 * @returns {Promise<Array>} Array of datasets
 */
async function getMyDatasets(apiKey) {
    try {
        const response = await fetch(`${NAKALA_API_BASE}/datas`, {
            method: 'GET',
            headers: {
                'X-API-KEY': apiKey,
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching datasets from Nakala:', error);
        throw error;
    }
}

/**
 * Get a specific dataset by its identifier
 * @param {string} identifier - The Nakala dataset identifier
 * @param {string} apiKey - Your Nakala API key (optional for public datasets)
 * @returns {Promise<Object>} Dataset details
 */
async function getDataset(identifier, apiKey = null) {
    try {
        const headers = {
            'Accept': 'application/json'
        };
        
        if (apiKey) {
            headers['X-API-KEY'] = apiKey;
        }

        const response = await fetch(`${NAKALA_API_BASE}/datas/${identifier}`, {
            method: 'GET',
            headers: headers
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching dataset from Nakala:', error);
        throw error;
    }
}

/**
 * Search for datasets
 * @param {Object} params - Search parameters
 * @param {string} params.q - Search query
 * @param {number} params.page - Page number (default: 1)
 * @param {number} params.size - Results per page (default: 10)
 * @param {string} apiKey - Your Nakala API key (optional)
 * @returns {Promise<Object>} Search results
 */
async function searchDatasets(params = {}, apiKey = null) {
    try {
        const searchParams = new URLSearchParams({
            page: params.page || 1,
            size: params.size || 10,
            ...(params.q && { q: params.q })
        });

        const headers = {
            'Accept': 'application/json'
        };
        
        if (apiKey) {
            headers['X-API-KEY'] = apiKey;
        }

        const response = await fetch(`${NAKALA_API_BASE}/search?${searchParams}`, {
            method: 'GET',
            headers: headers
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error searching datasets on Nakala:', error);
        throw error;
    }
}

/**
 * Get user information
 * @param {string} apiKey - Your Nakala API key
 * @returns {Promise<Object>} User information
 */
async function getUserInfo(apiKey) {
    try {
        const response = await fetch(`${NAKALA_API_BASE}/users/me`, {
            method: 'GET',
            headers: {
                'X-API-KEY': apiKey,
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching user info from Nakala:', error);
        throw error;
    }
}

// Export functions if using modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getMyDatasets,
        getDataset,
        searchDatasets,
        getUserInfo
    };
}
