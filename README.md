# Interactive-Form
Using JavaScript to create an interactive registration form for a fictional conference.

Adding customized and conditional behavior and interactivity.
Validating user input and providing helpful error messages when the user enters invalid information into the form fields

Real-Time Error Messages:
On all required fields, I added real-time validation errors that listen to the user input and display errors if the input doesn't match the desired pattern.
For instance, in the name field, if the user enters a number, the error displays so that the user deletes that to enter a character. When they enter characters, 
the check icon shows that their input is valid.

Conditional Error Message (on the name field):

When the page loads, the focus is on the Name field by default. If the user clicks enter to go to the email field or tries to submit the form with an empty Name field,
the first error message is displayed (Name field cannot be blank). 
If the user types random non-letter characters, they get the second error message(The Name must be letter characters). Once they enter letter characters, the Name is validated.
