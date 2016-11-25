<!-- index.nunjucks -->
{% extends "layout.njs" %}

{% block content %}
  <div class="jumbotron">
    <div class="container">
      <div class="row">
        <div class="page-header">
          <h1>Steam Team</h1>
        </div>

      </div>
    </div>
  </div>
  <div class="container">
    <div class="row action__prompt">
      <div class="col-md-12">
        <h2 class="text-center">What would you like to do?</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-md-3 col-xs-6">
        <div class="panel panel-default">
          <div class="panel-body text-center action__btn">
            <span class="glyphicon glyphicon-time"></span>
          </div>
        </div>
      </div>
      <div class="col-md-3 col-xs-6">
        <div class="panel panel-default">
          <div class="panel-body text-center action__btn">
            <span class="glyphicon glyphicon-user"></span>
          </div>
        </div>
      </div>
      <div class="col-md-3 col-xs-6">
        <div class="panel panel-default">
          <div class="panel-body text-center action__btn">
            <span class="glyphicon glyphicon-trash"></span>
          </div>
        </div>
      </div>
      <div class="col-md-3 col-xs-6">
        <div class="panel panel-default">
          <div class="panel-body text-center action__btn">
            <span class="glyphicon glyphicon-th-list"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
{% endblock %}
