document.getElementById('themeButton').addEventListener('click', function() {
    document.body.classList.toggle('dark');
    document.body.classList.toggle('light');
});

document.getElementById('runButton').addEventListener('click', function () {
    const htmlCode = document.getElementById('htmlCode').value;
    const cssCode = document.getElementById('cssCode').value;
    const jsCode = document.getElementById('jsCode').value;

    const outputFrame = document.getElementById('output');
    const output = outputFrame.contentWindow.document;

    output.open();
    output.write(htmlCode + `<style>${cssCode}</style>` + `<script>${jsCode}<\/script>`);
    output.close();
});

// Simple syntax highlighting for the textareas
const highlightSyntax = (textarea) => {
    let content = textarea.value;

    // Replace keyword and tag placeholders with spans (add highlighting classes)
    content = content
        .replace(/(&lt;\/?[a-z][^\ &gt;]*)(\s*[^\>]*&gt;)/gi, '<span class="tag">$1$2</span>') // HTML Tags
        .replace(/\b(function|var|let|const|if|else|return|for|while|switch|case|break|continue)\b/g, '<span class="keyword">$&</span>'); // JS Keywords

    // Update textarea's inner HTML (not directly possible)
    // Highlighting would usually be done using a rich text editor
}

document.querySelectorAll('textarea').forEach(textarea => {
    textarea.addEventListener('input', () => highlightSyntax(textarea));
});
