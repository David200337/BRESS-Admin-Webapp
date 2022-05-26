import { Component, OnInit, Output, VERSION, ViewChild, EventEmitter, Input } from '@angular/core';

export class CsvData {
  public firstName?: string;
  public lastName?: string;
  public email?: string;
  public skillLevel?: string;
}

@Component({
  selector: 'app-read-csv',
  templateUrl: './read-csv.component.html',
  styleUrls: ['./read-csv.component.scss']
})
export class ReadCSVComponent implements OnInit {
  name = 'Angular ' + VERSION.major;
  public records: any[] = [];
  @ViewChild('csvReader') csvReader: any;

  @Input() jsonData: any[] = [];
  @Output() dataChanged: EventEmitter<any[]> = new EventEmitter();

  jsondatadisplay: any;

  ngOnInit(): void {
  }

  uploadListener($event: any): void {

    let text = [];
    let files = $event.srcElement.files;

    if (this.isValidCSVFile(files[0])) {

      let input = $event.target;
      let reader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = () => {
        let csvData = this.ab2str(reader.result);
        let csvRecordsArray = csvData.split(/\r\n|\n/);

        let headersRow = this.getHeaderArray(csvRecordsArray);

        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);

        this.dataChanged.emit(this.records)
      };

      reader.onerror = function () {
        console.log('error is occured while reading file!');
      };

    } else {
      alert("Please import valid .csv file.");
      this.fileReset();
    }
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    let csvArr = [];

    for (let i = 1; i < csvRecordsArray.length; i++) {
      let curruntRecord = (csvRecordsArray[i]).split(',');
      if (curruntRecord.length == headerLength) {
        let csvRecord: CsvData = new CsvData();
        csvRecord.firstName = curruntRecord[2].trim();
        csvRecord.lastName = curruntRecord[3].trim();
        csvRecord.email = curruntRecord[4].trim();
        csvRecord.skillLevel = curruntRecord[6].trim();

        csvRecord.firstName = csvRecord.firstName!.replace('"', '')
        csvRecord.lastName = csvRecord.lastName!.replace('"', '')
        csvRecord.email = csvRecord.email!.replace('"', '')
        csvRecord.skillLevel = csvRecord.skillLevel!.replace('"', '')

        csvRecord.firstName = csvRecord.firstName!.replace('"', '')
        csvRecord.lastName = csvRecord.lastName!.replace('"', '')
        csvRecord.email = csvRecord.email!.replace('"', '')
        csvRecord.skillLevel = csvRecord.skillLevel!.replace('"', '')

        csvArr.push(csvRecord);
      }
    }
    return csvArr;
  }

  //check extension
  isValidCSVFile(file: any) {
    return file.name.endsWith(".csv");
  }

  getHeaderArray(csvRecordsArr: any) {
    let headers = (csvRecordsArr[0]).split(',');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  fileReset() {
    this.csvReader.nativeElement.value = "";
    this.records = [];
    this.jsondatadisplay = '';
  }

  getJsonData(records: any[]): string {
    return JSON.stringify(records);
  }

  ab2str(buf: ArrayBuffer | string | null): String {
    if (typeof buf === "string") {
      return buf
    } else if (buf === null) {
      return "failed"
    } else {
      var dec = new TextDecoder()
      return dec.decode(buf)
    }
  }
}
