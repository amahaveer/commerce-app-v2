
const Utils = {

	toSlug: function (text: string) {
		return text
			.toLowerCase()                    // Convert to lowercase
			.trim()                            // Remove whitespace from both ends
			.replace(/[^a-z0-9\s-]/g, '')      // Remove all non-alphanumeric chars except spaces and hyphens
			.replace(/\s+/g, '-')              // Replace spaces with hyphens
			.replace(/-+/g, '-');              // Collapse multiple hyphens into one
	}
}

export default Utils;
