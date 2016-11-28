<!DOCTYPE html>
<html>
<head>
  <title>Steam Team</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

  <link rel="stylesheet" type="text/css" href="/css/index.css">
</head>
<body>

  {# {% include "partials/nav.njs" %} #}
  <div class="">
    <div class="container">
      <div class="row">
        <div class="page-header">
          <h1>Steam Team</h1>
        </div>

      </div>
    </div>
  </div>
  {% block content %}
    <!-- Content will go here -->
  {% endblock %}

  <script   src="https://code.jquery.com/jquery-3.1.1.min.js"   integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="   crossorigin="anonymous"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
  <script type="text/javascript" src="/js/main.js"></script>
</body>
</html>
