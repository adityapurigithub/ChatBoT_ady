import express from "express";

import * as dotenv from "dotenv";

import cors from "cors";

import { Configuration, OpenAIApi } from "openai";
//because we have use import not require for importing module so add type:module in package json..
// for starting server add server:"nodemon _File_NAME_" in script

dotenv.config();

console.log(process.env.OPENAI_API_KEY);
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();

app.use(cors()); //for cors err

app.use(express.json()); //used for json req

app.get("/", async (req, res) => {
  res.status(200).send({
    message: "HelloADY",
  });
});

app.post("/", async (req, res) => {
  //some err....
  // try {
  //   //name=prompt in textarea
  //   const prompt = req.body.prompt;

  //   const response = await openai.createCompletion({
  //     //read docs
  //     model: "text-davinci-003",
  //     prompt: `${prompt}`, //passes users prompt

  //     temperature: 0, //high temp means model will take more risk so temp:0
  //     max_tokens: 3000, //no of tokens to generate after completion
  //     top_p: 1,
  //     frequency_penalty: 0.5, //freq penality means that it not going to repeate similar sentence...
  //     presence_penalty: 0,
  //     // stop: ['"""'], //we dont need stop
  //   });
  //   res.status(200).send({
  //     bot: response.data.choices[0].text,
  //   });
  //}
  try {
    const prompt = req.body.prompt;
    console.log(prompt);
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    res.status(200).send({
      bot: response.data.choices[0].text,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ err });
  }
});

//server to listen always
app.listen(5000, () => {
  console.log("Server up on port 5000");
});
