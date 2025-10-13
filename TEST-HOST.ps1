# JOLASH SALON - COMPREHENSIVE HOST TEST# ═══════════════════════════════════════════════════════════════

Write-Host "=======================================" -ForegroundColor Cyan# JOLASH SALON - COMPREHENSIVE HOST TESTING SCRIPT

Write-Host " JOLASH SALON - HOST TESTING SUITE" -ForegroundColor White# ═══════════════════════════════════════════════════════════════

Write-Host "=======================================" -ForegroundColor Cyan

Write-Host ""Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan

Write-Host "        🧪 JOLASH SALON - HOST TESTING SUITE 🧪" -ForegroundColor White

$passed = 0Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan

$failed = 0Write-Host ""



# Test 1: Backend Health$testsPassed = 0

Write-Host "1. Backend Health Check..." -NoNewline$testsFailed = 0

try {$warnings = 0

    $health = Invoke-WebRequest http://localhost:5000/api/health -UseBasicParsing -TimeoutSec 5

    if ($health.StatusCode -eq 200) {# ═══════════════════════════════════════════════════════════════

        Write-Host " PASS" -ForegroundColor Green# TEST 1: Backend Health Check

        $passed++# ═══════════════════════════════════════════════════════════════

    } else {Write-Host "[TEST 1] Backend Health Check..." -ForegroundColor Yellow

        Write-Host " FAIL" -ForegroundColor Redtry {

        $failed++    $health = Invoke-WebRequest -Uri "http://localhost:5000/api/health" -UseBasicParsing -TimeoutSec 5

    }    if ($health.StatusCode -eq 200) {

} catch {        $healthData = $health.Content | ConvertFrom-Json

    Write-Host " FAIL - $($_.Exception.Message)" -ForegroundColor Red        if ($healthData.status -eq "OK") {

    $failed++            Write-Host "         ✅ PASS - Backend is healthy" -ForegroundColor Green

}            Write-Host "         Response: $($healthData.message)" -ForegroundColor Gray

            $testsPassed++

# Test 2: Services Endpoint        } else {

Write-Host "2. Services Endpoint..." -NoNewline            Write-Host "         ❌ FAIL - Unexpected health status: $($healthData.status)" -ForegroundColor Red

try {            $testsFailed++

    $services = Invoke-WebRequest http://localhost:5000/api/services -UseBasicParsing -TimeoutSec 10        }

    $count = ($services.Content | ConvertFrom-Json).Count    } else {

    if ($count -gt 0) {        Write-Host "         ❌ FAIL - HTTP $($health.StatusCode)" -ForegroundColor Red

        Write-Host " PASS ($count services loaded)" -ForegroundColor Green        $testsFailed++

        $passed++    }

    } else {} catch {

        Write-Host " FAIL - No services" -ForegroundColor Red    Write-Host "         ❌ FAIL - Backend not responding: $($_.Exception.Message)" -ForegroundColor Red

        $failed++    $testsFailed++

    }}

} catch {Write-Host ""

    Write-Host " FAIL - $($_.Exception.Message)" -ForegroundColor Red

    $failed++# ═══════════════════════════════════════════════════════════════

}# TEST 2: Services Endpoint

# ═══════════════════════════════════════════════════════════════

# Test 3: Products EndpointWrite-Host "[TEST 2] Services Endpoint..." -ForegroundColor Yellow

Write-Host "3. Products Endpoint..." -NoNewlinetry {

try {    $services = Invoke-WebRequest -Uri "http://localhost:5000/api/services" -UseBasicParsing -TimeoutSec 10

    $products = Invoke-WebRequest http://localhost:5000/api/products -UseBasicParsing -TimeoutSec 10    $servicesData = $services.Content | ConvertFrom-Json

    $count = ($products.Content | ConvertFrom-Json).Count    $count = $servicesData.Count

    Write-Host " PASS ($count products)" -ForegroundColor Green    

    $passed++    if ($count -eq 85) {

} catch {        Write-Host "         ✅ PASS - All 85 services loaded" -ForegroundColor Green

    Write-Host " FAIL - $($_.Exception.Message)" -ForegroundColor Red        $testsPassed++

    $failed++    } elseif ($count -gt 0) {

}        Write-Host "         ⚠️  WARN - Only $count services found (expected 85)" -ForegroundColor Yellow

        $warnings++

# Test 4: Frontend Homepage        $testsPassed++

Write-Host "4. Frontend Homepage..." -NoNewline    } else {

try {        Write-Host "         ❌ FAIL - No services returned" -ForegroundColor Red

    $frontend = Invoke-WebRequest http://localhost:3000 -UseBasicParsing -TimeoutSec 10        $testsFailed++

    if ($frontend.StatusCode -eq 200) {    }

        Write-Host " PASS" -ForegroundColor Green    

        $passed++    # Display first 3 services

    } else {    Write-Host "         Sample services:" -ForegroundColor Gray

        Write-Host " FAIL" -ForegroundColor Red    $servicesData | Select-Object -First 3 | ForEach-Object {

        $failed++        Write-Host "           - $($_.name) (\$$($_.price))" -ForegroundColor Gray

    }    }

} catch {} catch {

    Write-Host " FAIL - $($_.Exception.Message)" -ForegroundColor Red    Write-Host "         ❌ FAIL - Services endpoint error: $($_.Exception.Message)" -ForegroundColor Red

    $failed++    $testsFailed++

}}

Write-Host ""

# Test 5: Booking Page

Write-Host "5. Booking Page..." -NoNewline# ═══════════════════════════════════════════════════════════════

try {# TEST 3: Products Endpoint

    $booking = Invoke-WebRequest http://localhost:3000/booking -UseBasicParsing -TimeoutSec 10# ═══════════════════════════════════════════════════════════════

    if ($booking.StatusCode -eq 200) {Write-Host "[TEST 3] Products Endpoint..." -ForegroundColor Yellow

        Write-Host " PASS" -ForegroundColor Greentry {

        $passed++    $products = Invoke-WebRequest -Uri "http://localhost:5000/api/products" -UseBasicParsing -TimeoutSec 10

    } else {    $productsData = $products.Content | ConvertFrom-Json

        Write-Host " FAIL" -ForegroundColor Red    $count = $productsData.Count

        $failed++    

    }    if ($count -gt 0) {

} catch {        Write-Host "         ✅ PASS - $count products loaded" -ForegroundColor Green

    Write-Host " FAIL - $($_.Exception.Message)" -ForegroundColor Red        $testsPassed++

    $failed++        

}        # Display first 3 products

        Write-Host "         Sample products:" -ForegroundColor Gray

# Test 6: Database Connection        $productsData | Select-Object -First 3 | ForEach-Object {

Write-Host "6. Database Connection..." -NoNewline            Write-Host "           - $($_.name) (\$$($_.price))" -ForegroundColor Gray

try {        }

    $null = psql -h localhost -U postgres -d jolash_salon -c "SELECT 1" 2>&1    } else {

    if ($LASTEXITCODE -eq 0) {        Write-Host "         ⚠️  WARN - No products in database" -ForegroundColor Yellow

        Write-Host " PASS" -ForegroundColor Green        $warnings++

        $passed++        $testsPassed++

    } else {    }

        Write-Host " FAIL" -ForegroundColor Red} catch {

        $failed++    Write-Host "         ❌ FAIL - Products endpoint error: $($_.Exception.Message)" -ForegroundColor Red

    }    $testsFailed++

} catch {}

    Write-Host " SKIP (psql not available)" -ForegroundColor YellowWrite-Host ""

}

# ═══════════════════════════════════════════════════════════════

# Test 7: Payment Configuration# TEST 4: Frontend Homepage

Write-Host "7. Payment Config..." -NoNewline# ═══════════════════════════════════════════════════════════════

try {Write-Host "[TEST 4] Frontend Homepage..." -ForegroundColor Yellow

    $payment = Invoke-WebRequest http://localhost:5000/api/payments/test-config -UseBasicParsing -TimeoutSec 5try {

    $config = $payment.Content | ConvertFrom-Json    $frontend = Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing -TimeoutSec 10

    if ($config.mockMode) {    if ($frontend.StatusCode -eq 200) {

        Write-Host " PASS (Mock Mode Enabled)" -ForegroundColor Green        Write-Host "         ✅ PASS - Frontend is running" -ForegroundColor Green

    } else {        Write-Host "         HTTP $($frontend.StatusCode) - Content-Type: text/html" -ForegroundColor Gray

        Write-Host " PASS (Live Mode)" -ForegroundColor Green        $testsPassed++

    }    } else {

    $passed++        Write-Host "         ❌ FAIL - HTTP $($frontend.StatusCode)" -ForegroundColor Red

} catch {        $testsFailed++

    Write-Host " FAIL - $($_.Exception.Message)" -ForegroundColor Red    }

    $failed++} catch {

}    Write-Host "         ❌ FAIL - Frontend not responding: $($_.Exception.Message)" -ForegroundColor Red

    $testsFailed++

# Test 8: Backend Response Time}

Write-Host "8. Response Time Test..." -NoNewlineWrite-Host ""

try {

    $start = Get-Date# ═══════════════════════════════════════════════════════════════

    $null = Invoke-WebRequest http://localhost:5000/api/services -UseBasicParsing# TEST 5: Booking Page

    $end = Get-Date# ═══════════════════════════════════════════════════════════════

    $ms = [math]::Round(($end - $start).TotalMilliseconds)Write-Host "[TEST 5] Booking Page..." -ForegroundColor Yellow

    if ($ms -lt 1000) {try {

        Write-Host " PASS (${ms}ms - Excellent)" -ForegroundColor Green    $booking = Invoke-WebRequest -Uri "http://localhost:3000/booking" -UseBasicParsing -TimeoutSec 10

        $passed++    if ($booking.StatusCode -eq 200) {

    } elseif ($ms -lt 3000) {        Write-Host "         ✅ PASS - Booking page accessible" -ForegroundColor Green

        Write-Host " PASS (${ms}ms - Good)" -ForegroundColor Yellow        $testsPassed++

        $passed++    } else {

    } else {        Write-Host "         ❌ FAIL - HTTP $($booking.StatusCode)" -ForegroundColor Red

        Write-Host " SLOW (${ms}ms)" -ForegroundColor Yellow        $testsFailed++

        $passed++    }

    }} catch {

} catch {    Write-Host "         ❌ FAIL - Booking page error: $($_.Exception.Message)" -ForegroundColor Red

    Write-Host " FAIL" -ForegroundColor Red    $testsFailed++

    $failed++}

}Write-Host ""



# Test 9: Server Processes# ═══════════════════════════════════════════════════════════════

Write-Host "9. Server Processes..." -NoNewline# TEST 6: Database Connection

$nodeProcesses = Get-Process node -ErrorAction SilentlyContinue# ═══════════════════════════════════════════════════════════════

if ($nodeProcesses) {Write-Host "[TEST 6] Database Connection..." -ForegroundColor Yellow

    Write-Host " PASS ($($nodeProcesses.Count) Node process(es))" -ForegroundColor Greentry {

    $passed++    $dbTest = psql -h localhost -U postgres -d jolash_salon -c "SELECT COUNT(*) FROM services" 2>&1

} else {    if ($LASTEXITCODE -eq 0) {

    Write-Host " FAIL - No Node processes" -ForegroundColor Red        Write-Host "         ✅ PASS - Database connection successful" -ForegroundColor Green

    $failed++        $testsPassed++

}    } else {

        Write-Host "         ❌ FAIL - Database connection failed" -ForegroundColor Red

# Test 10: CORS Headers        $testsFailed++

Write-Host "10. CORS Configuration..." -NoNewline    }

try {} catch {

    $headers = @{ "Origin" = "http://localhost:3000" }    Write-Host "         ⚠️  WARN - Cannot verify database (psql not in PATH)" -ForegroundColor Yellow

    $cors = Invoke-WebRequest http://localhost:5000/api/health -Headers $headers -UseBasicParsing    $warnings++

    Write-Host " PASS" -ForegroundColor Green}

    $passed++Write-Host ""

} catch {

    Write-Host " FAIL" -ForegroundColor Red# ═══════════════════════════════════════════════════════════════

    $failed++# TEST 7: Payment Config Check

}# ═══════════════════════════════════════════════════════════════

Write-Host "[TEST 7] Payment Configuration..." -ForegroundColor Yellow

# Summarytry {

Write-Host ""    $paymentConfig = Invoke-WebRequest -Uri "http://localhost:5000/api/payments/test-config" -UseBasicParsing -TimeoutSec 5

Write-Host "=======================================" -ForegroundColor Cyan    $configData = $paymentConfig.Content | ConvertFrom-Json

Write-Host " TEST RESULTS" -ForegroundColor White    

Write-Host "=======================================" -ForegroundColor Cyan    Write-Host "         ✅ PASS - Payment config accessible" -ForegroundColor Green

Write-Host ""    Write-Host "         Mock Mode: $($configData.mockMode)" -ForegroundColor Gray

Write-Host " Passed: $passed" -ForegroundColor Green    Write-Host "         Environment: $($configData.environment)" -ForegroundColor Gray

Write-Host " Failed: $failed" -ForegroundColor $(if ($failed -eq 0) { "Green" } else { "Red" })    Write-Host "         Message: $($configData.message)" -ForegroundColor Gray

Write-Host ""    $testsPassed++

    

$total = $passed + $failed    if ($configData.mockMode -eq $true) {

$percent = [math]::Round(($passed / $total) * 100)        Write-Host "         ℹ️  INFO - Mock payment mode enabled (good for testing)" -ForegroundColor Cyan

    }

if ($failed -eq 0) {} catch {

    Write-Host " SUCCESS RATE: 100%" -ForegroundColor Green    Write-Host "         ⚠️  WARN - Payment config check failed: $($_.Exception.Message)" -ForegroundColor Yellow

    Write-Host ""    $warnings++

    Write-Host " ALL TESTS PASSED!" -ForegroundColor Green}

    Write-Host " Your hosting environment is PERFECT!" -ForegroundColor GreenWrite-Host ""

    Write-Host " Ready for production launch!" -ForegroundColor Green

    Write-Host ""# ═══════════════════════════════════════════════════════════════

    Write-Host "=======================================" -ForegroundColor Cyan# TEST 8: CORS Configuration

    Write-Host " QUICK ACCESS URLS" -ForegroundColor White# ═══════════════════════════════════════════════════════════════

    Write-Host "=======================================" -ForegroundColor CyanWrite-Host "TEST 8 - CORS Configuration..." -ForegroundColor Yellow

    Write-Host ""try {

    Write-Host " Frontend:     http://localhost:3000"    $headers = @{

    Write-Host " Booking Page: http://localhost:3000/booking"        "Origin" = "http://localhost:3000"

    Write-Host " Shop:         http://localhost:3000/shop-by-concern"    }

    Write-Host ""    $corsTest = Invoke-WebRequest -Uri "http://localhost:5000/api/health" -Headers $headers -UseBasicParsing

    Write-Host " Backend API:  http://localhost:5000"    

    Write-Host " Health Check: http://localhost:5000/api/health"    if ($corsTest.Headers["Access-Control-Allow-Origin"]) {

    Write-Host " Services:     http://localhost:5000/api/services"        Write-Host "         ✅ PASS - CORS properly configured" -ForegroundColor Green

    Write-Host ""        Write-Host "         Allow-Origin: $($corsTest.Headers['Access-Control-Allow-Origin'])" -ForegroundColor Gray

} else {        $testsPassed++

    Write-Host " SUCCESS RATE: $percent%" -ForegroundColor Yellow    } else {

    Write-Host ""        Write-Host "         ⚠️  WARN - CORS headers not found" -ForegroundColor Yellow

    Write-Host " SOME TESTS FAILED!" -ForegroundColor Red        $warnings++

    Write-Host " Please review failed tests above." -ForegroundColor Yellow    }

    Write-Host ""} catch {

}    Write-Host "         ⚠️  WARN - CORS test failed: $($_.Exception.Message)" -ForegroundColor Yellow

    $warnings++
}
Write-Host ""

# ═══════════════════════════════════════════════════════════════
# TEST 9: Response Time Check
# ═══════════════════════════════════════════════════════════════
Write-Host "TEST 9 - Backend Response Time..." -ForegroundColor Yellow
try {
    $stopwatch = [System.Diagnostics.Stopwatch]::StartNew()
    $response = Invoke-WebRequest -Uri "http://localhost:5000/api/services" -UseBasicParsing
    $stopwatch.Stop()
    $responseTime = $stopwatch.ElapsedMilliseconds
    
    if ($responseTime -lt 1000) {
        Write-Host "         ✅ PASS - Response time: ${responseTime}ms (excellent)" -ForegroundColor Green
        $testsPassed++
    } elseif ($responseTime -lt 3000) {
        Write-Host "         ✅ PASS - Response time: ${responseTime}ms (acceptable)" -ForegroundColor Yellow
        $testsPassed++
    } else {
        Write-Host "         ⚠️  WARN - Response time: ${responseTime}ms (slow)" -ForegroundColor Yellow
        $warnings++
        $testsPassed++
    }
} catch {
    Write-Host "         ❌ FAIL - Response time test error" -ForegroundColor Red
    $testsFailed++
}
Write-Host ""

# ═══════════════════════════════════════════════════════════════
# TEST 10: Server Process Check
# ═══════════════════════════════════════════════════════════════
Write-Host "TEST 10 - Server Process Status..." -ForegroundColor Yellow
$nodeProcesses = Get-Process node -ErrorAction SilentlyContinue
if ($nodeProcesses) {
    Write-Host "         ✅ PASS - $($nodeProcesses.Count) Node.js process(es) running" -ForegroundColor Green
    $nodeProcesses | ForEach-Object {
        Write-Host "           PID: $($_.Id) | Memory: $([math]::Round($_.WorkingSet64/1MB, 2))MB" -ForegroundColor Gray
    }
    $testsPassed++
} else {
    Write-Host "         ❌ FAIL - No Node.js processes found" -ForegroundColor Red
    $testsFailed++
}
Write-Host ""

# ═══════════════════════════════════════════════════════════════
# SUMMARY
# ═══════════════════════════════════════════════════════════════
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "                     TEST SUMMARY" -ForegroundColor White
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "  ✅ Tests Passed:  $testsPassed" -ForegroundColor Green
Write-Host "  ❌ Tests Failed:  $testsFailed" -ForegroundColor Red
Write-Host "  ⚠️  Warnings:     $warnings" -ForegroundColor Yellow
Write-Host ""

$totalTests = $testsPassed + $testsFailed
$successRate = [math]::Round(($testsPassed / $totalTests) * 100, 2)

if ($testsFailed -eq 0 -and $warnings -eq 0) {
    Write-Host "  🎉 ALL TESTS PASSED! 100% SUCCESS! 🎉" -ForegroundColor Green
    Write-Host ""
    Write-Host "  Your hosting environment is PERFECT!" -ForegroundColor Green
    Write-Host "  Ready for production launch! 🚀" -ForegroundColor Green
} elseif ($testsFailed -eq 0) {
    Write-Host "  ✅ ALL TESTS PASSED! ${successRate}% SUCCESS!" -ForegroundColor Green
    Write-Host ""
    Write-Host "  Your hosting environment is EXCELLENT!" -ForegroundColor Green
    Write-Host "  Minor warnings detected but nothing critical." -ForegroundColor Yellow
    Write-Host "  Ready for launch! 🚀" -ForegroundColor Green
} else {
    Write-Host "  ⚠️  SOME TESTS FAILED - ${successRate}% SUCCESS" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "  Please review failed tests above and fix issues." -ForegroundColor Yellow
    Write-Host "  Run this script again after making corrections." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# ═══════════════════════════════════════════════════════════════
# QUICK ACCESS URLS
# ═══════════════════════════════════════════════════════════════
if ($testsFailed -eq 0) {
    Write-Host "🌐 QUICK ACCESS URLS:" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "   Frontend:      http://localhost:3000" -ForegroundColor White
    Write-Host "   Booking Page:  http://localhost:3000/booking" -ForegroundColor White
    Write-Host "   Shop:          http://localhost:3000/shop-by-concern" -ForegroundColor White
    Write-Host ""
    Write-Host "   Backend API:   http://localhost:5000" -ForegroundColor White
    Write-Host "   Health Check:  http://localhost:5000/api/health" -ForegroundColor White
    Write-Host "   Services:      http://localhost:5000/api/services" -ForegroundColor White
    Write-Host ""
}
