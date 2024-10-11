import axios from "axios";

const baseUrl = import.meta.env.DHIS2_API_URL;
const username = import.meta.env.DHIS2_USERNAME;
const password = import.meta.env.DHIS2_PASSWORD;

const encodedCredentials = btoa(`${username}:${password}`);

export const fetchClientCategoryOptions = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/optionSets/v49HLVv7S5F`, {
      params: {
        fields: "options[id,displayName]",
      },
      headers: {
        Authorization: `Basic ${encodedCredentials}`,
      },
    });
    return response.data.options;
  } catch (error) {
    console.error("Error fetching client category options:", error);
    throw error;
  }
};
