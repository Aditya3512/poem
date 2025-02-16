async function generatePoem() {
    let topic = document.getElementById("topic").value;
    let language = document.getElementById("language").value; // Get selected language
    let poemDisplay = document.getElementById("poem");
    let copyBtn = document.getElementById("copyBtn");

    if (topic.trim() === "") {
        alert("Please enter a topic!");
        return;
    }

    poemDisplay.innerHTML = "⏳ Generating poem... Please wait."; 

    // Gemini API Key (Replace with your actual API key)
    const API_KEY = "AIzaSyCx6ZZLwH77ytVrksXcWwzOk8cZAe5DZrE"; 

    // Determine the language for the poem
    let languageText;
    if (language === "hindi") {
        languageText = "Hindi";
    } else if (language === "bhojpuri") {
        languageText = "Bhojpuri";
    } else {
        languageText = "English";
    }

    // API request body
    const requestBody = {
        contents: [{ 
            role: "user", 
            parts: [{ text: `Write a short, creative poem about ${topic} in ${languageText}.` }] 
        }]
    };

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();
        let poem = data.candidates?.[0]?.content?.parts?.[0]?.text || "No poem generated. Try again!";

        // Display the generated poem
        poemDisplay.innerHTML = poem;
        copyBtn.style.display = "block"; // Show copy button

    } catch (error) {
        poemDisplay.innerHTML = "❌ Error generating poem. Please try again!";
        console.error("Error:", error);
    }
}

// Function to copy the generated poem to clipboard
function copyPoem() {
    let poemText = document.getElementById("poem").innerText;
    navigator.clipboard.writeText(poemText).then(() => {
        alert("Poem copied to clipboard!");
    });
}
