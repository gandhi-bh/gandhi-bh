// Writes info-card.svg: a neofetch-style panel that prints line by line.
// Edit CARD below, then run: node scripts/make-info-card.mjs   (STATIC=1 for a frozen frame)
import { writeFileSync } from "node:fs";

const CARD = {
  user: "bhargav",
  host: "github",
  width: 490,
  rows: [
    ["Role", "AI Data Engineer · Boston, MA"],
    ["Status", "● Open to Data & AI Engineer roles", "ok"],
    ["Latest", "Software Engineer (Data) @ Northeastern"],
    ["Prev", "Data Analytics Engineer @ MBTA"],
    ["", "Software Engineer (Data) @ Finesse"],
    ["Edu", "MS Software Engineering, Northeastern"],
    null,
    ["Stack", "Databricks · Spark · dbt · Delta Lake"],
    ["", "Python · SQL · PySpark · Airflow"],
    ["AI", "LangGraph · RAG · FastAPI · Qdrant"],
    ["Cloud", "AWS · GCP · Azure"],
    null,
    ["Impact", "90M transit records modeled @ MBTA"],
    ["", "−22% support escalations (ML)"],
    ["", "+$65K ad revenue via A/B tests"],
    null,
    ["Web", "bhargavgandhi.me"],
  ],
};

const STATIC = process.env.STATIC === "1";
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const PADX = 22, LINE = 21, TOP = 70;

let y = TOP, i = 0;
const lines = [];
for (const r of CARD.rows) {
  if (!r) { y += 10; continue; }
  const [k, v, cls = "v"] = r;
  lines.push(`<text x="${PADX}" y="${y}" class="ln" style="animation-delay:${(0.5 + i * 0.12).toFixed(2)}s">${k ? `<tspan class="k">${esc(k)}</tspan>` : ""}<tspan x="${PADX + 74}" class="${cls}">${esc(v)}</tspan></text>`);
  y += LINE; i++;
}
const blocksY = y + 8;
const colors = ["#ef5b5b", "#e5c07b", "#8ad17a", "#3daee9", "#8b5cf6", "#ec4899", "#e6e9ee"];
const blocks = colors.map((c, j) => `<rect x="${PADX + j * 26}" y="${blocksY}" width="22" height="12" rx="2" fill="${c}"/>`).join("");
const H = blocksY + 34;
const prompt = `${CARD.user}@${CARD.host}`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${CARD.width}" height="${H}" viewBox="0 0 ${CARD.width} ${H}" role="img" aria-label="${CARD.rows.filter(Boolean).map((r) => esc(r[1])).join(", ")}">
<style>
  text{font-family:"JetBrains Mono","Cascadia Code",Consolas,Menlo,"DejaVu Sans Mono",monospace;font-size:13.5px}
  .k{fill:#3daee9;font-weight:700}.v{fill:#e6edf3}.p{fill:#8ad17a}.ok{fill:#39d353;font-weight:700}.dim{fill:#484f58}.t{fill:#9aa3ad;font-size:12px}
  ${STATIC ? "" : `.ln,.blk{opacity:0;animation:in .35s ease-out forwards}
  @keyframes in{from{opacity:0;transform:translateX(-6px)}to{opacity:1;transform:none}}
  .blk{animation-delay:${(0.6 + i * 0.12).toFixed(2)}s}`}
</style>
<rect x=".5" y=".5" width="${CARD.width - 1}" height="${H - 1}" rx="12" fill="#0d1117" stroke="#30363d"/>
<circle cx="20" cy="18" r="5" fill="#ef5b5b"/><circle cx="36" cy="18" r="5" fill="#e5c07b"/><circle cx="52" cy="18" r="5" fill="#8ad17a"/>
<text x="${CARD.width / 2}" y="22" text-anchor="middle" class="t">${prompt}: ~</text>
<text x="${PADX}" y="${TOP - 26}"><tspan class="p">${esc(prompt)}</tspan><tspan class="dim"> ${"─".repeat(Math.max(4, 34 - prompt.length))}</tspan></text>
${lines.join("\n")}
<g class="blk">${blocks}</g>
</svg>
`;
writeFileSync("info-card.svg", svg);
console.log(`info-card.svg: ${CARD.width}x${H}`);
