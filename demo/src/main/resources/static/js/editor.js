function updatePreview() {
    const htmlCode = document.getElementById('htmlCode').value;
    const cssCode = document.getElementById('cssCode').value;
    const jsCode = document.getElementById('jsCode').value;

    const iframe = document.getElementById('preview');
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

    iframeDoc.open();
    iframeDoc.write(`
        <html>
            <head>
                <style>${cssCode}</style>
            </head>
            <body onload="resizeParent()">
                ${htmlCode}
                <script>
                    function resizeParent() {
                        const height = document.body.scrollHeight;
                        parent.document.getElementById('preview').style.height = height + 'px';
                    }
                    ${jsCode}
                </script>
            </body>
        </html>
    `);
    iframeDoc.close();
}

function postCode() {
    const htmlCode = document.getElementById('htmlCode').value;
    const cssCode = document.getElementById('cssCode').value;
    const jsCode = document.getElementById('jsCode').value;

    const postData = {
        html: htmlCode,
        css: cssCode,
        js: jsCode
    };

    // Log to check if the data is being captured
    console.log(postData);

    // Save the user code to localStorage
    localStorage.setItem("userPost", JSON.stringify(postData));

    // Redirect to post page
    window.location.replace("gallery.html"); // Full redirect
}