let fakeProgress;
let percent = 0;

async function generate() {
  // UI switch
  document.getElementById("formBox").classList.add("hide");
  document.getElementById("loadingBox").classList.remove("hide");

  // Fake progress
  percent = 0;
  fakeProgress = setInterval(() => {
    if (percent < 90) {
      percent++;
      document.getElementById("progress").value = percent;
    }
  }, 800);

  // Backend call
  const res = await fetch("https://YOUR-BACKEND-URL/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      prompt: prompt.value,
      style: style.value,
      duration: duration.value
    })
  });

  const data = await res.json();

  // Finish
  clearInterval(fakeProgress);
  document.getElementById("progress").value = 100;

  document.getElementById("loadingBox").classList.add("hide");
  document.getElementById("resultBox").classList.remove("hide");
  document.getElementById("video").src = data.video;
}

function resetUI() {
  document.getElementById("resultBox").classList.add("hide");
  document.getElementById("formBox").classList.remove("hide");
  document.getElementById("progress").value = 0;
}
