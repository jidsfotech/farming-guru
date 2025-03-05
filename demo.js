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
            Authorization: "Bearer "
        }
    }).then(d => {
        console.log(d.data)
        console.log(d.data.choices[0].message)
    }).catch(e => console.error(e));
}

demo()