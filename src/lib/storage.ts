export function saveSubmission(key: string, data: Record<string, unknown>) {
  try {
    const k = `sag:${key}`;
    const arr = JSON.parse(localStorage.getItem(k) || "[]");
    arr.push({ ...data, _ts: new Date().toISOString(), _id: crypto.randomUUID() });
    localStorage.setItem(k, JSON.stringify(arr));
  } catch {}
}

export function downloadBlob(filename: string, content: string, mime = "text/plain") {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
