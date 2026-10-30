const escape = (value) => String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

/** Subject, text and HTML for one inquiry; replying goes straight to the person who asked. */
export function inquiryEmail(interest) {
  const rows = [
    ["Name", interest.fullName],
    ["Email", interest.email],
    ["Company", interest.company],
    ["Role", interest.role],
    ["Robot", interest.robot],
    ["Stations", interest.quantity],
    ["Use case", interest.useCase],
    ["Product updates", interest.updatesOptIn ? "Yes" : "No"],
    ["Source", interest.source],
    ["Received", interest.createdAt],
  ].filter(([, value]) => value !== null && value !== undefined && value !== "");
  return {
    subject: `Prism preorder: ${interest.fullName}, ${interest.company}`,
    text: rows.map(([label, value]) => `${label}: ${value}`).join("\n"),
    html: `<table cellpadding="6" style="font:14px/1.5 -apple-system,Helvetica,Arial,sans-serif;border-collapse:collapse">${rows
      .map(([label, value]) => `<tr><td style="color:#667;vertical-align:top">${escape(label)}</td><td style="white-space:pre-wrap">${escape(value)}</td></tr>`)
      .join("")}</table>`,
  };
}
