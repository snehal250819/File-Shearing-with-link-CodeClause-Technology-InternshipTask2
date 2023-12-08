function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const fileLinkInput = document.getElementById('fileLink');
    const fileLinkContainer = document.getElementById('fileLinkContainer');

    if (fileInput.files.length === 0) {
        alert('Please select a file to upload.');
        return;
    }

    const file = fileInput.files[0];
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(file.name);

    fileRef.put(file)
        .then(snapshot => {
            console.log('File uploaded successfully:', snapshot);

            // Generate a download link for the uploaded file
            return fileRef.getDownloadURL();
        })
        .then(downloadURL => {
            // Display the download link
            fileLinkInput.value = downloadURL;
            fileLinkContainer.style.display = 'block';
        })
        .catch(error => {
            console.error('Error uploading file:', error);
            alert('Error uploading file. Please try again.');
        });
}
