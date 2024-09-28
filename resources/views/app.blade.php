<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <meta name="csrf-token" content="{{ csrf_token() }}">

    {{-- <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet"> --}}

    <link href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css">
    <link href="https://cdn.jsdelivr.net/npm/daisyui@4.12.10/dist/full.min.css" rel="stylesheet" type="text/css" />

    <style>
        .swal2-shown .swal2-container .swal2-popup .swal2-actions .swal2-confirm{
            color: #fff;
            background-color: #dc3741;
            border-color: #dc3741;
        }

        .swal2-shown .swal2-container .swal2-popup .swal2-actions .swal2-cancel{
            color: #fff;
            border-color: #6e7881;
            background-color: #6e7881;
        }

        .overlay {
        position: fixed;
        display: none;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 999999;
        cursor: pointer;
      }

      .overlay .overlay-content {
        position: absolute;
        top: 50%;
        left: 50%;
        font-size: 50px;
        color: white;
        transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
      }

      .overlay .overlay-content .overlay-loader {
        width: 48px;
        height: 48px;
        display: block;
        margin: 15px auto;
        position: relative;
        color: #FFF;
        box-sizing: border-box;
        animation: rotation 1s linear infinite;
      }

      .overlay .overlay-content .overlay-loader::after,
      .overlay .overlay-content .overlay-loader::before {
        content: '';
        box-sizing: border-box;
        position: absolute;
        width: 24px;
        height: 24px;
        top: 50%;
        left: 50%;
        transform: scale(0.5) translate(0, 0);
        background-color: #FFF;
        border-radius: 50%;
        animation: animloader 1s infinite ease-in-out;
      }

      .overlay .overlay-content .overlay-loader::before {
        background-color: #4936f8;
        transform: scale(0.5) translate(-48px, -48px);
      }

      @keyframes rotation {
        0% {
          transform: rotate(0deg);
        }

        100% {
          transform: rotate(360deg);
        }
      }

      @keyframes animloader {
        50% {
          transform: scale(1) translate(-50%, -50%);
        }
      }
    </style>

    @viteReactRefresh
    @vite('resources/css/app.css')
    @vite('resources/css/index.css')
    @vite('resources/js/app.jsx')
    @inertiaHead
  </head>
  <body>

    <div class="overlay" id="overlay">
      <div class="overlay-content">
        <div class="overlay-loader"></div>
      </div>
    </div>

      @inertia
      <script src="https://cdn.tailwindcss.com"></script>
      <script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>
      <script src="https://unpkg.com/@popperjs/core@2"></script>
      <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
      <script>
        // function dropDown() {
        //   document.querySelector('#submenu').classList.toggle('hidden')
        //   document.querySelector('#arrow').classList.toggle('rotate-0')
        // }
        // dropDown()
    
        // function Openbar() {
        //   document.querySelector('.sidebar').classList.toggle('left-[-300px]')
        // }
      </script>
  </body>
</html>