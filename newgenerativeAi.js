
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const genAI = new GoogleGenerativeAI("AIzaSyB2FdgUenas9NKI4hEP3_ggtKEv6z0pTQ4");
let m=require('readline-sync').questionInt("Enter the number of problems:  ");
async function run() {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt =
  "Please provide valid JSON format. Please make sure JSON is valid and take care of quotes in generated code block. Do not add comments in JSON. You are tasked with generating "+m+" hard difficulty level javscript interview & placement related coding questions (make sure that questions are not getting repeated) it's code with test cases and it's validation script (Which displays passed and failed testcases) covering the range of possible scenarios for the Problem Statement. Test should cover these topics Variables, Data types, Operators, Switch Case, Loops, Scope, Functions, Objects, Arrays, Strings, Date Object, Math Object";

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  // Save the JSON object to a file
  const filePath = "generated_test_cases.json";

  saveToFile(text, filePath)
    .then(() => {
      console.log(`Data has been saved to ${filePath}`);
    })
    .catch((error) => {
      console.error("An error occurred while saving the file:", error);
    });

  function saveToFile(data, filePath) {
    const trimmedString = text.replace(/^```json|```$/g, '');
    return new Promise((resolve, reject) => {
      fs.writeFile(filePath, trimmedString, "utf8", (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}
run();

