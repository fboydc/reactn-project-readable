export function validate(category, title, author, body){
	const errors = [];

	if(category.length === 0 ){
		errors.push("empty category");
	}

	if(title.length === 0 ){
		errors.push("empty title");
	}

	if(author.length === 0){
		errors.push("no author");
	}

	if(body.length < 10 || body.length > 250){
		errors.push("your content should have at least 10 characters and less than 250.");
	}

	return errors;
}