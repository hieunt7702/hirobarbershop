$files = @('index.html', 'vi.html', 'en.html', 'de.html', 'es.html')

$oldIframe = '            <iframe class="w-full h-full" src="https://www.youtube.com/embed/S2H_k8B2T44" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>'

$newVideo = @'
            <video id="hiro-video" class="w-full h-full object-cover" src="assets/images/video.mp4"
                   controls autoplay muted loop playsinline
                   preload="none"
                   poster="assets/images/hero.jpg">
                Your browser does not support the video tag.
            </video>
'@

$oldCloseBtn = '        <button onclick="document.getElementById(''video-modal'').classList.add(''hidden'')" class="absolute top-6 right-6 text-white hover:text-primary transition-colors focus:outline-none">'
$newCloseBtn = '        <button onclick="closeVideoModal()" class="absolute top-6 right-6 text-white hover:text-primary transition-colors focus:outline-none z-[101]">'

$oldModalOpen = '    <div id="video-modal" class="fixed inset-0 z-[100] hidden bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 lg:p-12 transition-all">'
$newModalOpen = '    <div id="video-modal" class="fixed inset-0 z-[100] hidden bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 lg:p-12 transition-all"
         onclick="if(event.target===this){closeVideoModal()}">'

$closeScript = @'
    <script>
        function closeVideoModal() {
            var modal = document.getElementById('video-modal');
            var vid = document.getElementById('hiro-video');
            modal.classList.add('hidden');
            vid.pause();
            vid.currentTime = 0;
        }
    </script>
'@

foreach ($f in $files) {
    $path = Join-Path (Get-Location) $f
    $content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
    
    $changed = $false

    if ($content.Contains($oldIframe)) {
        $content = $content.Replace($oldIframe, $newVideo.TrimEnd())
        $changed = $true
    }
    
    if ($content.Contains($oldCloseBtn)) {
        $content = $content.Replace($oldCloseBtn, $newCloseBtn)
        $changed = $true
    }

    if ($content.Contains($oldModalOpen)) {
        $content = $content.Replace($oldModalOpen, $newModalOpen)
        $changed = $true
    }

    # Insert script before </div> closing of video-modal if not present
    if ($changed -and -not $content.Contains('function closeVideoModal()')) {
        $content = $content.Replace('    </div>' + "`n`n    <!-- Lightbox Modal -->", $closeScript + '    </div>' + "`n`n    <!-- Lightbox Modal -->")
    }

    if ($changed) {
        [System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)
        Write-Host "Updated: $f"
    } else {
        Write-Host "No match found in: $f"
    }
}
