module.exports = function fixer(arr) {
	let result = arr.sort();
	result = result.map((item) => {
		return item.charAt(0).toUpperCase() + item.substr(1);
	})
	return result;
}