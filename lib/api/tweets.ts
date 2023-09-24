import axios from "axios";
import { API_URL } from "./config";
import { authToken } from "./config";
export const listTweets = async () => {
    try {
        // Replace "YOUR_MACHINE_IP" with your development machine's IP address
              const response = await axios.get(`${API_URL}/tweet`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (response.status !== 200) {
            console.error("Error Fetching the API. Status:", response.status);
            throw new Error("Error fetching tweets")
          // Handle the error here, for example, by setting a state variable or displaying an error message.
        } else {
            return response.data;
          // Handle successful response here
        //   console.log("API response data:", response.data);
        }
      } catch (error) {
        console.error("An error occurred:", error);
        throw new Error("Error fetching tweets")
        // Handle the error here, for example, by setting a state variable or displaying an error message.
      }
}

export const getTweet = async (id:string) => {
    try {
        // Replace "YOUR_MACHINE_IP" with your development machine's IP address
              const response = await axios.get(`${API_URL}/tweet/${id}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (response.status !== 200) {
            console.error("Error Fetching the API. Status:", response.status);
            throw new Error("Error fetching tweet")
          // Handle the error here, for example, by setting a state variable or displaying an error message.
        } else {
            return response.data;
          // Handle successful response here
        //   console.log("API response data:", response.data);
        }
      } catch (error) {
        console.error("An error occurred:", error);
        throw new Error("Error fetching tweet")
        // Handle the error here, for example, by setting a state variable or displaying an error message.
      }
}




export const createTweet = async (data: { content: string }) => {
  try {
    const response = await axios.post(
      `${API_URL}/tweet`,
      JSON.stringify(data),
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json', // Set the content type explicitly
        },
      }
    );

    if (response.status !== 200) {
      console.error("Error Creating the API. Status:", response.status);
      throw new Error("Error Creating tweet");
    } else {
      return response.data;
    }
  } catch (error) {
    console.error("An error occurred:", error);
    throw new Error("Error Creating tweet");
  }
};
