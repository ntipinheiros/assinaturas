// ========================================
// SESC Signature Generator - JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const nomeInput = document.getElementById('nome');
    const setorInput = document.getElementById('setor');
    const ramalInput = document.getElementById('ramal');

    const previewNome = document.getElementById('preview-nome');
    const previewSetor = document.getElementById('preview-setor');
    const previewRamal = document.getElementById('preview-ramal');

    const btnCopiar = document.getElementById('btn-copiar');
    const toast = document.getElementById('toast');
    const signature = document.getElementById('signature');

    // Update preview in real-time
    function updatePreview() {
        // Update name
        const nome = nomeInput.value.trim();
        previewNome.textContent = nome;

        // Update sector - always append " | Sesc Pinheiros" if there's content
        const setor = setorInput.value.trim();
        previewSetor.textContent = setor ? `${setor} | Sesc Pinheiros` : '<Setor> | Sesc Pinheiros';

        // Update extension
        const ramal = ramalInput.value.trim();
        previewRamal.textContent = ramal;
    }

    // Add input event listeners for real-time updates
    nomeInput.addEventListener('input', updatePreview);
    setorInput.addEventListener('input', updatePreview);
    ramalInput.addEventListener('input', updatePreview);

    // Restrict ramal input to numbers only
    ramalInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4);
        updatePreview();
    });

    // Show toast notification
    function showToast() {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }

    // Copy signature to clipboard
    function copySignature() {
        const range = document.createRange();
        const selection = window.getSelection();
        const element = document.getElementById('signature');

        // Clear any existing selection
        selection.removeAllRanges();

        // Select the signature element contents
        range.selectNodeContents(element);
        selection.addRange(range);

        try {
            // Copy the selected content
            document.execCommand('copy');
            showToast();
        } catch (err) {
            console.error('Failed to copy signature:', err);
            alert('Não foi possível copiar a assinatura. Por favor, tente novamente.');
        }

        // Clear the selection
        selection.removeAllRanges();
    }

    // Add click event listener to copy button
    btnCopiar.addEventListener('click', copySignature);

    // Initial preview update
    updatePreview();
});
