document.addEventListener("DOMContentLoaded", onDOMContentLoaded);

function onDOMContentLoaded(evt) {
	const textarea = document.getElementById("box");
	textarea.placeholder = "Start typing or paste your text in this field, and your text analysis will be displayed at the bottom.";

	textarea.addEventListener("input", onTextChange);
	textarea.textContent = textStore("get");
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

	textStore("set", txt);
}

function textStore(o, txt) {
	const store = localStorage;

	if (o === "get") return store.getItem("text");
	if (o === "set") return store.setItem("text", txt);

	return "";
}

function clearInsights() {
	document.getElementById("chars-t").textContent = "Character: 0";
	document.getElementById("words-t").textContent = "Word: 0";
	document.getElementById("paras-t").textContent = "Paragraph: 0";
	document.getElementById("reading-t").textContent = "Reading Time: 0 min";
}

function resetButton() {
	document.getElementById("box").value = "";
	
	clearInsights();
	textStore("set", "");
}

function downloadButton() {
	const text = document.getElementById("box").value;
	if (text.length < 1) return;

	const blob = new Blob([text], { type: "text/plain"});
	const url = window.URL.createObjectURL(blob);

	const a = document.createElement("a");
	a.href = url;
	a.download = "Wordx.txt";

	a.click();
	window.URL.revokeObjectURL(url);
}