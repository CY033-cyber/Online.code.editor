document.getElementById('themeButton').addEventListener('click', function () {
    document.body.classList.toggle('dark');
    document.body.classList.toggle('light');
});

const editors = {
    "html-css-js": ["htmlCode", "cssCode", "jsCode"],
    "python": ["pythonCode"],
    "cpp": ["cppCode"],
    "java": ["javaCode"],
    // Additional languages can be added here
};

// Function to display the relevant editor group
const showEditorGroup = (value) => {
    // Hide all editor groups
    Object.keys(editors).forEach(lang => {
        editors[lang].forEach(editorId => {
            document.getElementById(editorId).parentElement.parentElement.classList.remove("active");
        });
    });

    // Show selected editor group
    if (editors[value]) {
        editors[value].forEach(editorId => {
            document.getElementById(editorId).parentElement.parentElement.classList.add("active");
        });
    }
};

// Event listener for editor selection
document.getElementById('editorSelect').addEventListener('change', function () {
    showEditorGroup(this.value);
});

// Code execution logic
document.getElementById('runButton').addEventListener('click', function () {
    const selectedLang = document.getElementById('editorSelect').value;
    let code;

    switch (selectedLang) {
        case "html-css-js":
            const htmlCode = document.getElementById('htmlCode').value;
            const cssCode = document.getElementById('cssCode').value;
            const jsCode = document.getElementById('jsCode').value;

            const outputFrame = document.getElementById('output');
            const output = outputFrame.contentWindow.document;

            output.open();
            output.write(htmlCode + `<style>${cssCode}</style>` + `<script>${jsCode}<\/script>`);
            output.close();
            break;
        case "python":
            code = document.getElementById('pythonCode').value;
            runPython(code);
            break;
        case "cpp":
            code = document.getElementById('cppCode').value;
            runCpp(code);
            break;
        case "java":
            code = document.getElementById('javaCode').value;
            runJava(code);
            break;
        // Additional languages can be implemented similarly
        default:
            alert("Selected language is not supported yet.");
    }
});

// Function to run Python code
function runPython(code) {
    alert("Running Python code: " + code); // Placeholder for actual execution
}

// Function to run C++ code
function runCpp(code) {
    alert("Running C++ code: " + code); // Placeholder for actual execution
}

// Function to run Java code
function runJava(code) {
    alert("Running Java code: " + code); // Placeholder for actual execution
}

// Load code from uploaded file
document.getElementById('fileUpload').addEventListener('change', function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const content = e.target.result;

        // Determine file type based on extension
        const extension = file.name.split('.').pop().toLowerCase();
        const editorMap = {
            "html": "htmlCode",
            "css": "cssCode",
            "js": "jsCode",
            "py": "pythonCode",
            "cpp": "cppCode",
            "java": "javaCode",
            // Add more mappings as needed
        };

        const editorId = editorMap[extension];
        if (editorId) {
            document.getElementById(editorId).value = content;
        } else {
            alert("Unsupported file type.");
        }
    };

    if (file) {
        reader.readAsText(file);
    }
});

// Resize functionality
const resizers = document.querySelectorAll('.resize-handle');

resizers.forEach(resizer => {
    resizer.addEventListener('mousedown', function (e) {
        const editor = e.target.parentElement; // Get the editor container
        const startX = e.clientX;
        const startWidth = parseInt(window.getComputedStyle(editor).width, 10);

        const doDrag = (e) => {
            editor.style.width = (startWidth + e.clientX - startX) + 'px';
        };

        const stopDrag = () => {
            window.removeEventListener('mousemove', doDrag);
            window.removeEventListener('mouseup', stopDrag);
        };

        window.addEventListener('mousemove', doDrag);
        window.addEventListener('mouseup', stopDrag);
    });
});

// Initialize the editor group based on the default selection
showEditorGroup(document.getElementById('editorSelect').value);
