<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Card Page Distribution</title>

        <!-- Fonts -->
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500">
        {{-- <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"> --}}

        <script>
            window.myToken =  <?php echo json_encode([
                'csrfToken' => csrf_token(),
            ]); ?>
        </script>
    </head>
    <body>
        <div id="root">
                <h1>Loading React App..</h1>
        </div>
        <script type="application/javascript" src="{{ asset('/dist/vendor.bundle.js').'?t='.rand(1,99) }}"></script>
        <script type="application/javascript" src="{{ url('/dist/app.bundle.js').'?t='.rand(1,99)  }}"></script>
    </body>
</html>
