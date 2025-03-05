import axios from "axios"

function demo() {
    axios.post("https://openrouter.ai/api/v1/chat/completions", {
        "model": "deepseek/deepseek-chat:free",
        "messages": [
            { "role": "system", "content": `The user will ask you to get farming types or categories

                EXAMPLE INPUT:
                what are farming types and categories


                EXAMPLE JSON OUTPUT:
                {
                "answer": []
                }`
            },
            { "role": "user", "content": "What are the categories of farming and the types" }
        ],
        // "stream": false
    }, {
        headers: {
            Authorization: "Bearer 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"
        }
    }).then(d => {
        console.log(d.data)
        console.log(d.data.choices[0].message)
    }).catch(e => console.error(e));
}

demo()