import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
    const { userId, prompt, tag } = await request.json();

    try {
        await connectToDB();
        const newPrompt = new Prompt({ creator: userId, prompt, tag });

        await newPrompt.save();
        return new Response(JSON.stringify(newPrompt), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new prompt", { status: 500 });
    }
}

// this code is used to create a new prompt, it will be called when the user submits the form.
// it will take the prompt and tag from the request body and the userId from the session.
// it will then connect to the database, create a new prompt, and save it.
// if successful, it will return the new prompt with a status of 201.
// if there is an error, it will return a status of 500.
// the POST method is used to create a new resource.
// the request body is used to send data to the server.
// the response is used to send data back to the client.
// the connectToDB function is used to connect to the database.
// the Prompt model is used to create a new prompt.
// the new prompt is saved to the database.

// overall the above code is used to create a new prompt, it will be called when the user submits the form.