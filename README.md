# MCQ_Login_Signup
This is the backend of Login Signup and questionnaire endpoints using Nodejs and MongoDb
Backend Task: Create REST API for a questionnaire using Node.js and a database of your choice.


Mandatory endpoint 1: A simple request response endpoint

[GET] /api/welcome
Success response
Status code 200
Content
{
	success: true,
	message: “API successfully called”
}

Mandatory endpoint 2: Sign up endpoint with phone number as a not required field

[POST] /api/signup

Request body
{
	name: “Gaurav Kumar Verma”,
	email: “1905530@kiit.ac.in”,
	password: “example@123”,
	phone_number: “+917735709660”
}

Response body
{
	success: true,
	message: “Signed up successfully”
}
NOTE: Password should be stored in encrypted format

Mandatory endpoint 3: Sign in endpoint

[POST] /api/login

Request body
{
email: “1905530@kiit.ac.in”,
password: “example@123”
}



Response body
{
success: true,
message: “hewwo”
}
Note: You should get the message string by calling the API endpoint https://api.catboys.com/catboy.


Mandatory endpoint 4: Let the user edit (if already exists) or add phone number

Depending on your authentication technique / method, you’ve to perform this request while the user is logged in by passing the authToken in request headers.

[PUT] /api/edit/phonenumber

Request body
{
phone_number: “+917735709660”
}



Response body
{
success: true,
message: “Phone number changed / added successfully”
}

Questionnaire: Design and implement an endpoint for a questionnaire system that allows users to choose and complete a test from a selection of available tests. The tests consist of multiple-choice questions (MCQs) with single or multiple correct answers. Each test can have a varying number of questions. The test and question details can be hardcoded in the database.

Your task is to create an endpoint that handles user responses, stores their answers, calculates the score obtained, and returns the score to the user. Please make reasonable assumptions for any unspecified details or requirements.

Requirements:
The endpoint should be accessible via a POST request.
The endpoint URL should be /submit-test.

The request should include the following data:
User ID: A unique identifier for the user taking the test.
Test ID: A unique identifier for the selected test.
Question ID: A unique identifier for each question.
Answers: An array of selected answer(or answer_id) choices for each question.
The endpoint should store the user's responses along with the test details in a database.
Calculate the score for the user's responses based on the correct answers defined in the database.
The response from the endpoint should include the following data:
User ID: The unique identifier of the user.
Test ID: The unique identifier of the completed test.
Score: The calculated score obtained by the user.
The system should enforce that a user can only take a test once.

Follow best coding practices and techniques to build the API.

