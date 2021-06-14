// A mock function to mimic making an async request for data
export function fetchCount(amount = 1) {
	return new Promise(
		(resolve, reject) => setTimeout(() => resolve({ data: amount }), 500)

		// FOR REJECTION, either throw a new Error instance to return just a string message
		// OR
		// return whatever you like without the Error instance but handle it
		// in the thunk with 'rejectWithValue' inside a try/catch value.
		// setTimeout(() => reject({ message: 'NOPERS', amount: 0 }), 500)
	)
}
