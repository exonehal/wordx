document.addEventListener("DOMContentLoaded", onDOMContentLoaded);

function onDOMContentLoaded(evt) {
	const textarea = document.getElementById("box");
	textarea.placeholder = "Start typing or paste your text in this field, and your text analysis will be displayed at the bottom.";

	textarea.addEventListener("input", onTextChange);
	textarea.style.display = "unset";
}

function onTextChange(em) {
	const txt = em.target.value;
	const chars = document.getElementById("chars-t");
	const words = document.getElementById("words-t");
	const paras = document.getElementById("paras-t");
	const reading = document.getElementById("reading-t");

	const charsCount = txt.length;
	chars.textContent = `Character${charsCount > 1 ? "s" : ""}: ${charsCount}`;

	const wordsCount = txt.split(/\s+/).filter(w => w !== "").length;
	words.textContent = `Word${wordsCount > 1 ? "s" : ""}: ${wordsCount}`;

	const parasCount = txt.split(/\n\s*\n/).filter(p => p.trim() !== "").length;
	paras.textContent = `Paragraph${parasCount > 1 ? "s" : ""}: ${parasCount}`;

	const readingTime = txt.split(/\s+/).length;
	reading.textContent = `${txt.length === 0 ? 0 : readingTime / 200} min`;
}