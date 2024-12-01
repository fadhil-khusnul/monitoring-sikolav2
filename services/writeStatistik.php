<?php
// Path to statistik.json
$filePath = __DIR__ . '/data/statistik.json';

// Get JSON input from the request body
$inputJSON = file_get_contents(filename: 'php://input');
$data = json_decode($inputJSON, true);


// echo json_encode($data);

// Check if data is valid
if ($data) {
    // Write JSON data to file
    if (file_put_contents($filePath, json_encode($data, JSON_PRETTY_PRINT))) {



        echo json_encode( [
            'status' => 'success',
            'message' => 'Data berhasil ditulis ke statistik.json'
        ]);
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'Gagal menulis file'
        ]);
    }
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'Data tidak valid'
    ]);
}
?>
