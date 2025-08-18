function createTable(items) {
  const table = document.createElement("div");
  table.className = "table";

  const headerRow = document.createElement("div");
  headerRow.className = "row header";
  ["품목코드", "품목명", "단위", "금일재고량"].forEach((text) => {
    const col = document.createElement("div");
    col.className = "column";
    col.textContent = text;
    headerRow.appendChild(col);
  });
  table.appendChild(headerRow);

  items.forEach(([code, name, unit]) => {
    const row = document.createElement("div");
    row.className = "row";

    [code, name, unit].forEach((value) => {
      const col = document.createElement("div");
      col.className = "column";
      col.textContent = value;
      row.appendChild(col);
    });

    const inputCol = document.createElement("div");
    inputCol.className = "column";
    const input = document.createElement("input");
    input.type = "number";
    inputCol.appendChild(input);
    row.appendChild(inputCol);

    table.appendChild(row);
  });

  return table;
}

// 간단 CSV 파서: 따옴표 안의 콤마까지 완벽히는 처리하지 않음
function parseCSVBasic(text) {
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);

  if (lines.length === 0) return [];

  // 헤더 감지(첫 칼럼이 숫자가 아니면 헤더로 판단)
  let startIdx = 0;
  const firstCols = lines[0].split(",");
  if (isNaN(Number(firstCols[0]))) startIdx = 1;

  const items = [];
  for (let i = startIdx; i < lines.length; i++) {
    const cols = lines[i].split(",").map((c) => c.trim());
    if (cols.length < 3) continue;
    const [code, name, unit] = cols;
    items.push([code, name, unit]);
  }
  return items;
}

async function loadItemsFromCSV(url) {
  const res = await fetch(url, { cache: "no-cache" });
  if (!res.ok) throw new Error(`CSV 로드 실패: ${res.status}`);
  const text = await res.text();
  return parseCSVBasic(text);
}

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("table-container");
  try {
    const items = await loadItemsFromCSV(window.CSV_URL);
    container.appendChild(createTable(items));
  } catch (err) {
    container.textContent = `에러: ${err.message}`;
    console.error(err);
  }
});

// index.js 맨 아래
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js"); // 루트 sw 래퍼
  });
}
