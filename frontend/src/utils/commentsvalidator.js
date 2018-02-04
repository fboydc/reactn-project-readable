export function validate(author, body){
	const errors = [];

	if(author.length === 0){
		errors.push("empty author field");
	}

	if(body.length < 10 || body.length > 250){
		errors.push("your content should have at least 10 characters and less than 250.");
	}

	return errors;
}