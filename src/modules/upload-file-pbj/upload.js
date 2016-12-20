import { inject, Lazy } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { Service } from './service';


@inject(Router, Service, Element)
export class Create {

    constructor(router, service, element) {
        this.router = router;
        this.service = service;
        this.element = element;
        this.data = { items: [] };
    }

    activate(params) {
    }

    list() {
        this.router.navigateToRoute('list');
    }

    upload() {
        var e = {};
        var formData = new FormData();
        var fileInput = document.getElementById("fileCsv");
        var fileList = fileInput.files;
        var source = this.data.source;
        var destination = this.data.destination;
        var date = this.data.date;

        if (fileList[0] == undefined && date == undefined) {
            e.dateFrom = "Tanggal Kirim harus dipilih";
            e.file = "File Path harus dipilih";
            this.error = e;
        }
        else if (fileList[0] == undefined) {
            e.file = "File Path harus dipilih";
            this.error = e;
        } else if (date == undefined) {
            e.dateFrom = "Tanggal Kirim harus diisi";
            this.error = e;
        } else {
            formData.append("sourceId", source._id);
            formData.append("destinationId", destination._id);
            formData.append("date", date);
            formData.append("fileUpload", fileList[0]);

            var uri = require('../../host').merchandiser + '/upload';;
            var request = {
                method: 'POST',
                headers: {
                },
                body: formData
            };

            fetch(uri, request)
                .then(response => {
                    if (response.status == 200) {
                        var getRequest = fetch(uri, request);
                        this.service._downloadFile(getRequest);
                        this.service.publish(getRequest);
                        alert("Upload gagal!\n Ada beberapa data yang harus diperbaiki. Silahkan lihat Error Log untuk melihat detil dari error tersebut.");
                        this.list();
                    }
                    else if (response.status == 404) {
                        alert("Urutan format kolom CSV tidak sesuai.\n Format: Packing List, Password, Barcode, Name, Size, Price, UOM, QTY, RO");
                    }
                    else {
                        alert("Data Berhasil Diupload");
                        this.list();

                    }
                })
        }
    }
}
