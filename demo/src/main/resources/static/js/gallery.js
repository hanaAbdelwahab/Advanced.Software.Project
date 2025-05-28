window.onload = function () {
    const gallery = document.getElementById("gallery");
    const userPost = JSON.parse(localStorage.getItem("userPost"));
  
    if (!userPost) {
      gallery.innerHTML = "<p>No posts found.</p>";
      return;
    }
  
    const blob = new Blob([
      `
      <html>
        <head><style>${userPost.css}</style></head>
        <body>
          ${userPost.html}
          <script>${userPost.js}<\/script>
        </body>
      </html>
      `
    ], { type: "text/html" });
  
    const iframeURL = URL.createObjectURL(blob);
  
    const card = document.createElement("div");
    card.className = "card";
  
    card.innerHTML = `
      <iframe src="${iframeURL}"></iframe>
      <div class="card-footer">
        <img src="https://api.dicebear.com/7.x/pixel-art/svg?seed=Abdelrahman" alt="Avatar"/>
        <div>
          <h4>Hello World Example</h4>
          <p>@Hana.Abdelwahab</p>
        </div>
      </div>
      <div class="code-section hidden">
        <h5>HTML</h5>
        <pre>${escapeHTML(userPost.html)}</pre>
        <h5>CSS</h5>
        <pre>${escapeHTML(userPost.css)}</pre>
        <h5>JavaScript</h5>
        <pre>${escapeHTML(userPost.js)}</pre>
      </div>
    `;
  
    card.addEventListener("click", () => {
      const code = card.querySelector(".code-section");
      code.classList.toggle("hidden");
    });
  
    gallery.appendChild(card);
  };
  
  function escapeHTML(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }