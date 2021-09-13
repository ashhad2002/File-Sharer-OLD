import React from 'react';
import axios from 'axios';
// import FileSaver from 'file-saver';

export default function File({ File }) {
    async function handleDownload() {
        const dataForm = new FormData();
        dataForm.append('filename', File.filename);
        await axios.post(' http://localhost:3000/send_id', dataForm, {
    });
      console.log("please get here");
      await axios.get('http://localhost:3000/download')
        .then((response) => {
            console.log(response.data);
            window.open("http://localhost:3000/download")
    });
    console.log("done part 1");
    }
    
    // async function second() {
    //     console.log("done part 1");
    // }

    return (
      <div>
        <label>
          <button onClick={handleDownload}>Download</button>
          {File.filename}
        </label>
      </div>
    )
}
