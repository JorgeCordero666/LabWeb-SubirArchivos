const fileInput = document.getElementById('fileInput');
const fileInfo = document.getElementById('fileInfo');
const preview = document.getElementById('preview');
const progressBar = document.getElementById('progressBar');

fileInput.addEventListener('change', function(event) {
  const selectedFile = event.target.files[0];

  if (selectedFile.size > 7 * 1024 * 1024) {
    fileInfo.innerHTML = `El archivo excede el límite de 7 MB.`;
    preview.style.display = 'none';
    return;
  }

  fileInfo.innerHTML = `
    Nombre del archivo: ${selectedFile.name}<br>
    Tipo MIME: ${selectedFile.type}<br>
    Tamaño: ${selectedFile.size} bytes
  `;

  if (selectedFile.type.startsWith('image/')) {
    preview.style.display = 'block';
    const reader = new FileReader();
    reader.onload = function(e) {
      preview.src = e.target.result;
    };
    reader.readAsDataURL(selectedFile);

    // Subir archivo con Axios
    const formData = new FormData();
    formData.append('file', selectedFile);

    axios.post('http://localhost:3000/upload', formData, {
      onUploadProgress: progressEvent => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        progressBar.value = percentCompleted;
      }
    }).then(response => {
      console.log('Archivo subido exitosamente:', response.data);
    }).catch(error => {
      console.error('Error al subir el archivo:', error);
    });
  } else {
    preview.style.display = 'none';
  }
});
