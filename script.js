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

// Code saving functionality
document.getElementById('saveButton').addEventListener('click', function() {
    const htmlCode = document.getElementById('htmlCode').value;
    const cssCode = document.getElementById('cssCode').value;
    const jsCode = document.getElementById('jsCode').value;

    const code = {
        html: htmlCode,
        css: cssCode,
        js: jsCode
    };

    const blob = new Blob([JSON.stringify(code, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'code.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

// Hide/show textareas based on editor selection
document.getElementById('editorSelect').addEventListener('change', function() {
    const selectedEditor = this.value;
    document.getElementById('htmlCode').style.display = selectedEditor === 'html' ? 'block' : 'none';
    document.getElementById('cssCode').style.display = selectedEditor === 'css' ? 'block' : 'none';
    document.getElementById('jsCode').style.display = selectedEditor === 'js' ? 'block' : 'none';

    // Initially hide all except the HTML editor
    document.getElementById('htmlCode').style.display = 'block';
    document.getElementById('cssCode').style.display = 'none';
    document.getElementById('jsCode').style.display = 'none';
});

// Simple syntax highlighting for the textareas (functionality is limited)
const highlightSyntax = (textarea) => {
    let content = textarea.value;
    content = content
        .replace(/(&lt;\/?[a-z][^\ &gt;]*)(\s*[^\>]*&gt;)/gi, '<span class="tag">$1$2</span>') // HTML Tags
        .replace(/\b(function|var|let|const|if|else|return|for|while|switch|case|break|continue)\b/g, '<span class="keyword">$&</span>'); // JS Keywords

    // For now, this is just a placeholder. Full syntax highlighting would be complex.
}

document.querySelectorAll('textarea').forEach(textarea => {
    textarea.addEventListener('input', () => highlightSyntax(textarea));
});
