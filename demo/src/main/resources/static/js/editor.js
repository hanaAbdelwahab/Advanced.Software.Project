function createParticles() {
  const container = document.getElementById('particles');
  for (let i = 0; i < 50; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.top = Math.random() * 100 + '%';
    p.style.animationDelay = Math.random() * 6 + 's';
    p.style.animationDuration = (Math.random() * 3 + 3) + 's';
    container.appendChild(p);
  }
}

function updatePreview() {
  const html = document.getElementById('htmlCode').value;
  const css = document.getElementById('cssCode').value;
  const js = document.getElementById('jsCode').value;
  const iframe = document.getElementById('preview');
  const overlay = document.getElementById('previewOverlay');
  const doc = iframe.contentDocument || iframe.contentWindow.document;
  overlay.style.display = 'none';
  doc.open();
  doc.write(`
    <html>
      <head><style>${css}</style></head>
      <body>
        ${html}
        <script>${js}<\/script>
      </body>
    </html>
  `);
  doc.close();
}

function shareCode() {
  const html = document.getElementById('htmlCode').value;
  const css = document.getElementById('cssCode').value;
  const js = document.getElementById('jsCode').value;
  if (!html.trim() && !css.trim() && !js.trim()) {
    alert('Please write some code before sharing!');
    return;
  }
  alert(`Code ready to share!\n\nHTML:\n${html}\n\nCSS:\n${css}\n\nJS:\n${js}`);
}

document.addEventListener('DOMContentLoaded', () => {
  createParticles();
  document.getElementById('htmlCode').value = `<div class="welcome-container">
  <h1 class="title">Welcome to CodeCraft!</h1>
  <p class="subtitle">Create amazing web experiences</p>
  <button class="cta-button" onclick="showMessage()">Click Me!</button>
</div>`;
  document.getElementById('cssCode').value = `.welcome-container {
  text-align: center;
  padding: 60px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.title {
  font-size: 3em;
  color: white;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}
.subtitle {
  font-size: 1.2em;
  color: rgba(255,255,255,0.9);
  margin-bottom: 30px;
}
.cta-button {
  padding: 15px 30px;
  font-size: 18px;
  background: rgba(255,255,255,0.2);
  border: 2px solid white;
  color: white;
  border-radius: 50px;
  cursor: pointer;
}
.cta-button:hover {
  background: white;
  color: #667eea;
  transform: translateY(-2px);
}`;
  document.getElementById('jsCode').value = `function showMessage() {
  const messages = [
    "🎉 You're awesome!",
    "✨ Keep coding!",
    "🚀 You're doing great!",
    "💝 Code with passion!"
  ];
  alert(messages[Math.floor(Math.random() * messages.length)]);
}`;
});
