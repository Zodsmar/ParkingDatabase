function arrayToTable(tableData) {

    var table = $('<table></table>');
    $(table).attr('id', 'plateTable');
    $(tableData).each(function (i, rowData) {
      if(rowData != ""){
        var row = $('<tr></tr>');
        $(row).attr('id', 'tr' + i);
        $(rowData).each(function (j, cellData) {
          row.append($('<td>'+cellData+'</td>'));
        });
        table.append(row);
      }
    });
    return table;
}

function search(colToSearch) {
  var input, filter, table, tr, td, i;
  input = document.getElementById("plateSearch");
  filter = input.value.toUpperCase();
  table = document.getElementById("plateTable");
  tr = document.getElementsByTagName("tr");
  for (i = tr.length - 1; i>=0; i--) {
    td = tr[i].getElementsByTagName("td")[colToSearch];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else{
          if(tr[i] != tr[0])
            tr[i].remove();
      }
    }
  }
console.log("Searched!");
}


function checkWhichCheckState(){
 if(document.getElementById('dateIn').checked) {
    search(1);
  } else if(document.getElementById('dateOut').checked) {
    search(2);
  }else if(document.getElementById('timeIn').checked) {
    search(3);
  }else if(document.getElementById('timeOut').checked) {
    search(4);
  } else {
    document.getElementById('plateSearch').placeholder = "";
    search(0);
  }
}

function loadCSV(){
  var dom = document.getElementById('CSVTable').innerHTML;
  if(document.getElementById('plateSearch').value != ""){
    if($.trim(dom) ===""){
  $.ajax({
      type: "GET",
      url: "https://raw.githubusercontent.com/Zodsmar/ParkingDatabase/master/FinalPlates.csv",
      success: function (data) {
          $('#CSVTable').html(arrayToTable(Papa.parse(data).data));
          console.log("Success!");
          checkWhichCheckState();
      }
  });
  console.log("CSV LOADED!");
} else {
  checkWhichCheckState();
}
}
}
