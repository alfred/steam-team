<!-- index.nunjucks -->
{% extends "layout.njs" %}

{% block content %}

  <div class="container">
    <div class="row action__prompt">
      <div class="col-md-12">
        <h2 class="text-center">What would you like to do?</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-md-3 col-xs-6 text-center">
        <p class="action__desc">Most Popular Game by Playtime</p>
        <div class="panel panel-default">
          <div class="panel-body text-center action__btn">
            <span class="glyphicon glyphicon-time"></span>
          </div>
        </div>
      </div>
      <div class="col-md-3 col-xs-6 text-center">
        <p class="action__desc">Most Popular Game by Ownership</p>
        <div class="panel panel-default">
          <div class="panel-body text-center action__btn">
            <span class="glyphicon glyphicon-user"></span>
          </div>
        </div>
      </div>
      <div class="col-md-3 col-xs-6 text-center">
        <p class="action__desc">Remove a user from our DB</p>
        <div class="panel panel-default">
          <div class="panel-body text-center action__btn">
            <span class="glyphicon glyphicon-trash"></span>
          </div>
        </div>
      </div>
      <div class="col-md-3 col-xs-6 text-center">
        <p class="action__desc">See past results</p>
        <div class="panel panel-default">
          <div class="panel-body text-center action__btn">
            <span class="glyphicon glyphicon-th-list"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
{% endblock %}
