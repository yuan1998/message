<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>@yield('title', 'Bd')</title>

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <script>
        window.Laravel = {
            csrfToken: "{{ csrf_token() }}"
        };
    </script>
</head>
<body>
    <div id="app">
        <div class="container">
            <transition name="custom-classes-transition"
                        enter-active-class="animated fadeInLeft"
                        leave-active-class="animated fadeOutLeft"
            >
                <router-view>

                </router-view>
            </transition>
        </div>

    </div>
    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}"></script>
</body>
</html>
