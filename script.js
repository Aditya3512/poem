function generatePoem() {
    let topic = document.getElementById("topic").value;

    if (topic.trim() === "") {
        alert("Please enter a topic!");
        return;
    }

    // Construct a Google search query for poems about the topic
    let query = `short poem about ${encodeURIComponent(topic)}`;
    let googleSearchUrl = `https://www.google.com/search?q=${query}`;

    // Open Google search in a new tab
    window.open(googleSearchUrl, "_blank");
}
