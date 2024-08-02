<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $content = $_POST['document_content'];

    // Aquí puedes elegir el formato de salida, por ejemplo RTF o Word
    $filename = "documento.doc";
    $contentType = "application/msword";

    // Generar contenido en formato Word
    $documentContent = '
    <html xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office"
    xmlns:w="urn:schemas-microsoft-com:office:word"
    xmlns:m="http://schemas.microsoft.com/office/2004/12/omml"
    xmlns="http://www.w3.org/TR/REC-html40">
    <head><title>Documento</title></head>
    <body>'.$content.'</body></html>';

    // Establecer encabezados para descarga
    header("Content-Type: $contentType");
    header("Content-Disposition: attachment; filename=$filename");
    echo $documentContent;
    exit();
}
?>
