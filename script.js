document.addEventListener('DOMContentLoaded', () => {
    const projectSelect = document.getElementById('project-select');
    const documentTypeSelect = document.getElementById('document-type-select');
    const subgroupSelect = document.getElementById('subgroup-select');
    const quill = new Quill('#editor', {
        theme: 'snow',
        modules: {
            toolbar: [
                [{ 'font': [] }, { 'size': [] }],
                ['bold', 'italic', 'underline', 'strike', { 'script': 'sub'}, { 'script': 'super' }], // Bold, italic, underline, strikethrough, subscript, superscript
                [{ 'color': [] }, { 'background': [] }], // Font color and background color
                [{ 'header': '1' }, { 'header': '2' }, 'blockquote', 'code-block'], // Headers, blockquote, code block
                [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }], // Lists, indent
                [{ 'direction': 'rtl' }, { 'align': [] }], // Text direction and alignment
                ['link', 'image', 'video'], // Link, image, video
                [{ 'script': 'super' }, { 'script': 'sub' }], // Superscript, subscript
                [{ 'code-block': 'javascript' }, { 'code-block': 'html' }], // Code block languages
                ['clean'] // Remove formatting
            ]
        }
    });

    projectSelect.addEventListener('change', () => {
        const selectedProject = projectSelect.options[projectSelect.selectedIndex].text;
        insertTextAtCursor(quill, `Proyecto seleccionado: ${selectedProject}\n`);
    });

    documentTypeSelect.addEventListener('change', () => {
        const selectedDocumentType = documentTypeSelect.options[documentTypeSelect.selectedIndex].text;
        insertTextAtCursor(quill, `Tipo de documento seleccionado: ${selectedDocumentType}\n`);
    });

    subgroupSelect.addEventListener('change', () => {
        const selectedSubgroup = subgroupSelect.options[subgroupSelect.selectedIndex].text;
        insertTextAtCursor(quill, `Subgrupo seleccionado: ${selectedSubgroup}\n`);
    });

    const connectors = document.querySelectorAll('.connector');
    connectors.forEach(connector => {
        connector.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', connector.getAttribute('data-connector'));
        });
    });

    const editor = document.getElementById('editor');
    editor.addEventListener('drop', (e) => {
        e.preventDefault();
        const text = e.dataTransfer.getData('text/plain');
        insertTextAtCursor(quill, `%${text}%`);
    });

    editor.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    document.getElementById('preview-button').addEventListener('click', () => {
        alert('Previsualización del documento:\n' + quill.root.innerHTML);
    });

    document.getElementById('save-form').addEventListener('submit', function(e) {
        const content = quill.root.innerHTML;
        document.getElementById('document-content').value = content;
    });

    document.getElementById('new-task-button').addEventListener('click', () => {
        alert('Nueva Tarea clickeada');
    });

    const menuItems = document.querySelectorAll('.main-menu li, .submenu ul li');
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const parentMenu = item.parentElement;
            const activeItems = parentMenu.querySelectorAll('.active');
            activeItems.forEach(activeItem => activeItem.classList.remove('active'));
            item.classList.add('active');
            alert(`Menú ${item.textContent} seleccionado`);
        });
    });
});

function insertTextAtCursor(quill, text) {
    const range = quill.getSelection();
    if (range) {
        quill.insertText(range.index, text);
        quill.setSelection(range.index + text.length);
    }
}
