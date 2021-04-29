const table = document.querySelector(".table");

table.tHead.addEventListener("click", (event) => {
  const rows = Array.from(table.rows);
  const cellNum = Array.from(rows[0].cells).indexOf(event.target);
  const sortedRows = rows.slice(1).sort((rowA, rowB) => {
    if (isNumeric(rowA.cells[cellNum].innerHTML)) {
      return rowA.cells[cellNum].innerHTML - rowB.cells[cellNum].innerHTML;
    }
    return rowA.cells[cellNum].innerHTML > rowB.cells[cellNum].innerHTML
      ? 1
      : -1;
  });
  table.tBodies[0].append(...sortedRows);
});

table.tBodies[0].addEventListener("click", (event) => {
  if (event.target.children.length) {
    return;
  }
  const input = document.createElement("input");
  const save = document.createElement("button");
  const cancel = document.createElement("button");
  const prevData = event.target.innerHTML;
  input.value = event.target.innerHTML;
  save.innerHTML = "Save";
  save.addEventListener("click", () => {
    event.target.innerHTML = input.value;
    input.remove();
    save.remove();
    cancel.remove();
  });
  cancel.innerHTML = "Cancel";
  cancel.addEventListener("click", () => {
    event.target.innerHTML = prevData;
    input.remove();
    save.remove();
    cancel.remove();
  });
  event.target.innerHTML = "";
  event.target.append(input, save, cancel);
});

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
