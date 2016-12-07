<!-- index.nunjucks -->
{% extends "templates/layout.njs" %}

{% import 'templates/macro/results-macro.njs' as result %}

{% block content %}
<div class="page-wrap">
  <div class="">
    <div class="container-fluid">
      <div class="row">
        <div class="page-header">
          <h1>Steam Team</h1>
        </div>

      </div>
    </div>
  </div>



  <div class="table-responsive">
    <table class="table table-striped">
      <thead>
        <tr>
          <th>queryId</th>
          <th>query</th>
          <th>result</th>
        </tr>
      </thead>
      <tbody>

        {% for res in results %}

          {{ result.template( res ) }}
        {% endfor %}
      </tbody>
    </table>
  </div>
</div>


{% endblock %}
