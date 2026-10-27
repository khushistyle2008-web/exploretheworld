const patterns = {
  square: {
    title: "Number square",
    file: "square_pattern.c",
    meta: n => `${n} rows · ${n} columns`,
    output: n => Array.from({length:n},()=>Array.from({length:n},(_,i)=>i+1).join("  ")).join("\n"),
    code: n => `#include <stdio.h>\n\nint main(void) {\n    int size = ${n};\n\n    for (int row = 1; row <= size; row++) {\n        for (int number = 1; number <= size; number++) {\n            printf("%d  ", number);\n        }\n        printf("\\n");\n    }\n\n    return 0;\n}`
  },
  triangle: {
    title: "Growing triangle",
    file: "growing_triangle.c",
    meta: n => `${n} rows · 1 to ${n} numbers`,
    output: n => Array.from({length:n},(_,row)=>Array.from({length:row+1},(_,i)=>i+1).join("  ")).join("\n"),
    code: n => `#include <stdio.h>\n\nint main(void) {\n    int height = ${n};\n\n    for (int row = 1; row <= height; row++) {\n        for (int number = 1; number <= row; number++) {\n            printf("%d  ", number);\n        }\n        printf("\\n");\n    }\n\n    return 0;\n}`
  },
  count: {
    title: "Counting triangle",
    file: "counting_triangle.c",
    meta: n => `${n} rows · row number repeated`,
    output: n => Array.from({length:n},(_,row)=>Array.from({length:row+1},()=>row+1).join("  ")).join("\n"),
    code: n => `#include <stdio.h>\n\nint main(void) {\n    int height = ${n};\n\n    for (int row = 1; row <= height; row++) {\n        for (int column = 1; column <= row; column++) {\n            printf("%d  ", row);\n        }\n        printf("\\n");\n    }\n\n    return 0;\n}`
  },
  pyramid: {
    title: "Number pyramid",
    file: "number_pyramid.c",
    meta: n => `${n} rows · centered pyramid`,
    output: n => Array.from({length:n},(_,row)=>" ".repeat((n-row-1)*2)+Array.from({length:row+1},(_,i)=>i+1).join(" ")).join("\n"),
    code: n => `#include <stdio.h>\n\nint main(void) {\n    int height = ${n};\n\n    for (int row = 1; row <= height; row++) {\n        for (int space = 1; space <= height - row; space++) {\n            printf("  ");\n        }\n        for (int number = 1; number <= row; number++) {\n            printf("%d ", number);\n        }\n        printf("\\n");\n    }\n\n    return 0;\n}`
  },
  stars: {
    title: "Starry checkerboard",
    file: "starry_checkerboard.c",
    meta: n => `${n} rows · stars alternate by column`,
    output: n => Array.from({length:n},(_,row)=>Array.from({length:n},(_,col)=>(row+col)%2===0?"*":"+").join("  ")).join("\n"),
    code: n => `#include <stdio.h>\n\nint main(void) {\n    int size = ${n};\n\n    for (int row = 0; row < size; row++) {\n        for (int column = 0; column < size; column++) {\n            if ((row + column) % 2 == 0) {\n                printf("*  ");\n            } else {\n                printf("+  ");\n            }\n        }\n        printf("\\n");\n    }\n\n    return 0;\n}`
  },
  constellation: {
    title: "Constellation",
    file: "constellation.c",
    meta: n => `${n} rows · two starry diagonals`,
    output: n => Array.from({length:n},(_,row)=>Array.from({length:n},(_,col)=>(row===col||row+col===n-1)?"*":".").join("  ")).join("\n"),
    code: n => `#include <stdio.h>\n\nint main(void) {\n    int size = ${n};\n\n    for (int row = 0; row < size; row++) {\n        for (int column = 0; column < size; column++) {\n            if (row == column || row + column == size - 1) {\n                printf("*  ");\n            } else {\n                printf(".  ");\n            }\n        }\n        printf("\\n");\n    }\n\n    return 0;\n}`
  },
  blooms: {
    title: "Blooming triangle",
    file: "blooming_triangle.c",
    meta: n => `${n} rows · little blooms grow by one`,
    output: n => Array.from({length:n},(_,row)=>"  ".repeat(n-row-1)+Array.from({length:row+1},(_,col)=>(row+col)%2===0?"*":"o").join(" ")).join("\n"),
    code: n => `#include <stdio.h>\n\nint main(void) {\n    int height = ${n};\n\n    for (int row = 0; row < height; row++) {\n        for (int space = 0; space < height - row - 1; space++) {\n            printf("  ");\n        }\n        for (int bloom = 0; bloom <= row; bloom++) {\n            if ((row + bloom) % 2 == 0) {\n                printf("* ");\n            } else {\n                printf("o ");\n            }\n        }\n        printf("\\n");\n    }\n\n    return 0;\n}`
  }
};

let selected = "square";
let size = 7;
const $ = selector => document.querySelector(selector);
const choices = [...document.querySelectorAll(".pattern-choice")];
function render() {
  const pattern = patterns[selected];
  $("#pattern-title").textContent = pattern.title;
  $("#pattern-index").textContent = `PATTERN ${String(choices.findIndex(item => item.dataset.pattern === selected)+1).padStart(2,"0")}`;
  $("#size-value").textContent = size;
  $("#output-meta").textContent = pattern.meta(size);
  $("#output-text").textContent = pattern.output(size);
  $("#code-text").textContent = pattern.code(size);
  $("#file-name").textContent = pattern.file;
  choices.forEach(item => {
    const active = item.dataset.pattern === selected;
    item.classList.toggle("active", active);
    item.setAttribute("aria-pressed", String(active));
  });
}
choices.forEach(item => item.addEventListener("click", () => { selected = item.dataset.pattern; render(); }));
$("#size-down").addEventListener("click", () => { if (size > 2) { size--; render(); } });
$("#size-up").addEventListener("click", () => { if (size < 10) { size++; render(); } });
document.querySelectorAll(".tab").forEach(tab => tab.addEventListener("click", () => {
  const showCode = tab.dataset.tab === "code";
  document.querySelectorAll(".tab").forEach(item => { const active = item === tab; item.classList.toggle("active", active); item.setAttribute("aria-selected", String(active)); });
  $("#output-panel").hidden = showCode;
  $("#code-panel").hidden = !showCode;
}));
async function copyText(text, button, defaultLabel) {
  try {
    await navigator.clipboard.writeText(text);
    button.textContent = "Copied!";
    window.setTimeout(() => { button.textContent = defaultLabel; }, 1500);
  } catch {
    button.textContent = "Select and copy";
    window.setTimeout(() => { button.textContent = defaultLabel; }, 1800);
  }
}
$("#copy-output").addEventListener("click", event => copyText($("#output-text").textContent, event.currentTarget, "Copy output"));
$("#copy-code").addEventListener("click", event => copyText($("#code-text").textContent, event.currentTarget, "Copy code"));
render();
