<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function respond(int $code, string $status, string $message): void
{
    http_response_code($code);
    echo json_encode(
        ['status' => $status, 'message' => $message],
        JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
    );
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, 'error', 'روش درخواست مجاز نیست.');
}

// A hidden honeypot field may be added to any form without changing this endpoint.
if (!empty($_POST['website'] ?? '')) {
    respond(200, 'success', 'درخواست شما ثبت شد.');
}

$name = trim((string) ($_POST['name'] ?? ''));
$email = trim((string) ($_POST['email'] ?? ''));
$phone = trim((string) ($_POST['phone'] ?? ''));
$subject = trim((string) ($_POST['subject'] ?? ''));
$message = trim((string) ($_POST['message'] ?? ''));

if ($name === '' || $phone === '' || $subject === '' || $message === '') {
    respond(422, 'error', 'لطفاً فیلدهای ضروری را کامل کنید.');
}

if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(422, 'error', 'نشانی ایمیل واردشده معتبر نیست.');
}

if (mb_strlen($name) > 100 || mb_strlen($phone) > 30 || mb_strlen($subject) > 150 || mb_strlen($message) > 4000) {
    respond(422, 'error', 'طول اطلاعات واردشده بیش از حد مجاز است.');
}

// Strip control characters to prevent mail-header injection.
$clean = static fn(string $value): string => trim((string) preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $value));
$name = $clean($name);
$phone = $clean($phone);
$subject = str_replace(["\r", "\n"], ' ', $clean($subject));
$message = $clean($message);

$to = 'info@karen-soft.ir';
$mailSubject = 'درخواست جدید سایت کارن سافت — ' . $subject;
$body = "درخواست جدید از وب‌سایت کارن سافت\n";
$body .= "----------------------------------------\n";
$body .= "نام: {$name}\n";
$body .= "شماره تماس: {$phone}\n";
$body .= "ایمیل: " . ($email !== '' ? $email : 'وارد نشده') . "\n";
$body .= "موضوع: {$subject}\n\n";
$body .= "پیام:\n{$message}\n\n";
$body .= "زمان: " . date('Y-m-d H:i:s') . "\n";
$body .= "IP: " . ($_SERVER['REMOTE_ADDR'] ?? 'unknown') . "\n";

$headers = [
    'From: Karen Soft Website <noreply@karen-soft.ir>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . PHP_VERSION,
];
if ($email !== '') {
    $headers[] = 'Reply-To: ' . $email;
}

if (!mail($to, $mailSubject, $body, implode("\r\n", $headers))) {
    error_log('Karen Soft contact form: mail delivery failed at ' . date(DATE_ATOM));
    respond(500, 'error', 'ارسال انجام نشد؛ لطفاً با شماره ۰۹۱۵۲۵۲۱۱۶۶ تماس بگیرید.');
}

respond(200, 'success', 'درخواست شما ثبت شد؛ به‌زودی با شما تماس می‌گیریم.');
