import React from 'react';
import axios from 'axios';

export default function File({ File }) {
    async function handleDownload() {
        const dataForm = new FormData();
        dataForm.append('filename', File.filename);
        await axios.post(' http://localhost:3000/send_id', dataForm, {
    });
      await axios.get('http://localhost:3000/download')
        .then((response) => {
            window.open("http://localhost:3000/download")
    });
    }
    return (
      <div>
        <label>
          <button onClick={handleDownload}>Download</button>
          {File.filename}
        </label>
      </div>
    )
}
