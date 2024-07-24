<?php
header('Content-Type: application/json');

// Retrieve courseId from query parameters
$courseId = $_GET['courseId'] ?? null;

if (!$courseId) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing courseId parameter']);
    exit;
}

// Initialize cURL
$curl = curl_init();

if (!$curl) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to initialize cURL']);
    exit;
}

curl_setopt_array($curl, array(
    CURLOPT_URL => 'https://sikola-v2.unhas.ac.id/report/getLogMhs.php?courseId=' . $courseId,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 30, // Adjust timeout as needed
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => 'GET',
    CURLOPT_HTTPHEADER => array(
        'Authorization: Bearer ccd437b923b46aa49e922034903ac628a447f11f8cf4d464d7d21b790ccc6ab7e88a96fb5b4cee1a87ab1dddb3aea7e3a715ad9f0d9f730de09af7caa56b7a73044ef0a7be7fb15931152f0ecb66f78d1b202f1103d0820ccd445186896062f769a6818bbf1963a6790940b0059e47933637b60aecec366c7c62aebfce7f8e1f'
    ),
));

$response = curl_exec($curl);

if ($response === false) {
    $curlError = curl_error($curl);
    error_log("cURL error: " . $curlError); // Log cURL error
    http_response_code(500);
    echo json_encode(['error' => 'cURL error: ' . $curlError]);
    curl_close($curl);
    exit;
}

curl_close($curl);

// Assume response is in JSON format and decode it
$responseData = json_decode($response, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    error_log("JSON decode error: " . json_last_error_msg()); // Log JSON decode error
    error_log("Response was: " . $response); // Log the actual response for debugging
    http_response_code(500);
    echo json_encode(['error' => 'Invalid JSON response from external API']);
    exit;
}

// Output the response
echo json_encode($responseData);
?>
