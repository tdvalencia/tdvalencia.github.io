$web = New-Object System.Net.WebClient

#< == -lt
#> == -gt
#<= == -le
#>= == -ge

function Desktop {

    $src = "https://i.redd.it/k8wi6rmsbpt31.jpg"
    $dest = "C:\Users\" + $env:USERNAME + "\Desktop\"

    for ($i=0; $i -lt 20; $i++) {
        $dest += "hjonk" + $i + ".jpg"
        $web.DownloadFile($src, $dest)
        $dest = "C:\Users\" + $env:USERNAME + "\Desktop\"
    }
}

Out-Null
Desktop