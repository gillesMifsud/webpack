// Maps th with data-label of td
document.querySelectorAll('.table-responsive').forEach(function (table) {
    let labels = Array.from(table.querySelectorAll('th')).map(function (th) {
        return th.innerText
    });
    table.querySelectorAll('td').forEach(function (td, i) {
        td.setAttribute('data-label', labels[i % labels.length])
    })
});