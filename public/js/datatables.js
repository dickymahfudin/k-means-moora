$(document).ready(function () {
  const url = $('#dataTable').attr('url');
  const parsUrl = url.split('/')[1];

  $.ajax({
    type: 'GET',
    url,
    dataType: 'json',
    success: function (response) {
      if (parsUrl != 'dashboard') {
        response.columns.push({
          data: 'id',
          title: '',
          searchable: false,
          sortable: false,
          export:false,
          width: '8%',
          render: function (id, type, full, meta) {
            return `<span><a href="/${parsUrl}/form/${id}" class="modal-open lg" title="Edit ${full.name}" id="${id}"><i class='h3 bx bxs-message-square-edit bx-tada bx-flip-horizontal'></i></a> |
              <a href="/${parsUrl}/delete/${id}"  onclick="return confirm('Anda yakin ingin menghapus item ini?');" title="Delete ${full.name}" id="${id}"><i class='h3 bx bxs-trash-alt bx-tada' style='color:#f50000'></i></a></span>
              `;
          },
        });
      }

      $('#dataTable').DataTable({
        rowReorder: {
          selector: 'td:nth-child(2)',
        },
        processing: true,
        retrieve: true,
        responsive: true,
        dom: "Blrtip",
        buttons: [
            'excel', 'pdf',
        ],
        data: response.data,
        columns: response.columns,
     
      });
    },
  });
});
