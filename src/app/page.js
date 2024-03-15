"use client";
import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function Home() {

  const [file, setFile] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  // Replace 'YOUR_API_KEY' with your actual API key for Gemini Pro Vision
  // const API_KEY = API_K;
  const genAI = new GoogleGenerativeAI(
    "AIzaSyCviopNcVWjtNjHr7fxegFdNtqrbQ1UK58"
  );
  console.log("genAI", genAI);
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  console.log("model", model);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFile(reader.result);
    };
    if (file && allowedTypes.includes(file.type)) {
      reader.readAsDataURL(file);
    } else {
      alert("Please select a valid image file");
      event.target.value = null;
    }
  };

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const fetchDataProVision = async () => {
    // console.log("file", file);
    // console.log("prompt", prompt);

    // const chat = model?.startChat({
    //   history: [
    //     {
    //       role: "user",
    //       parts: "Hello, I have 2 dogs in my house.",
    //     },
    //     {
    //       role: "model",
    //       parts: "Great to meet you. What would you like to know?",
    //     },
    //   ],
    //   generationConfig: {
    //     maxOutputTokens: 100,
    //   },
    // });

    

    if (!prompt) {
      alert("Please select an image and enter a prompt");
      return;
    }
    setLoading(true);
    try {
      // Here you would send the image and prompt to Gemini Pro Vision
      // and set the response with the result
      // console.log(typeof prompt);

      const result = await model.generateContent(prompt);
      console.log("result", result?.response?.text());
      setResponse(result?.response?.text());
    } catch (error) {
      console.error("Error fetching data from Gemini Pro Vision:", error);
    } finally {
      setLoading(false);
    }
  };



  

  console.log("resp",response)

  return (
    <div>
      {/* <input type="file" onChange={handleFileChange} className="text-black" /> */}
      <textarea
        rows="4"
        cols="50"
        value={prompt}
        onChange={handlePromptChange}
        placeholder="Enter a prompt. Example: What do you see in the image?"
        className="text-black"
      />
      <button onClick={fetchDataProVision} disabled={loading}>
        {loading ? "Loading..." : "Generate"}
      </button>
      {response && <div>{response}</div>}
      
    </div>
  );
}
