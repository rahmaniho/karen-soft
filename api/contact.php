<?php
header('Content-Type: application/json; charset=utf-8');

// دریافت اطلاعات از فرم
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
$subject = isset($_POST['subject']) ? trim($_POST['subject']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

// اعتبارسنجی
if (empty($name) || empty($email) || empty($message)) {
    echo json_encode(['status' => 'error', 'message' => 'لطفاً تمام فیلدهای ضروری را پر کنید.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['status' => 'error', 'message' => 'ایمیل وارد شده معتبر نیست.']);
    exit;
}

// تنظیمات ایمیل
$to = "info@karen-soft.ir";  // ایمیل مقصد (ایمیل خودتان را وارد کنید)
$from = "noreply@karen-soft.ir";  // ایمیل فرستنده

// موضوع ایمیل
$email_subject = "پیام جدید از فرم تماس کارن سافت - " . $subject;

// محتوای ایمیل (با نمایش شماره تماس)
$email_body = "==========================================\n";
$email_body .= "📩 پیام جدید از فرم تماس کارن سافت\n";
$email_body .= "==========================================\n\n";
$email_body .= "👤 نام و نام خانوادگی: $name\n";
$email_body .= "📧 ایمیل: $email\n";
$email_body .= "📱 شماره تماس: $phone\n";  // ✅ شماره تماس اینجا نمایش داده می‌شود
$email_body .= "📌 موضوع: $subject\n";
$email_body .= "------------------------------------------\n";
$email_body .= "💬 پیام:\n$message\n";
$email_body .= "------------------------------------------\n";
$email_body .= "📅 تاریخ ارسال: " . date('Y/m/d H:i:s') . "\n";
$email_body .= "🌐 IP کاربر: " . $_SERVER['REMOTE_ADDR'] . "\n";
$email_body .= "==========================================\n";

// هدرهای ایمیل
$headers = "From: $from\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// ارسال ایمیل
if (mail($to, $email_subject, $email_body, $headers)) {
    echo json_encode(['status' => 'success', 'message' => '✅ پیام شما با موفقیت ارسال شد!']);
} else {
    // اگر mail() کار نکرد، لاگ خطا
    error_log("خطا در ارسال ایمیل از فرم تماس - " . date('Y-m-d H:i:s'));
    echo json_encode(['status' => 'error', 'message' => '❌ خطا در ارسال پیام. لطفاً دوباره تلاش کنید.']);
}
?>
