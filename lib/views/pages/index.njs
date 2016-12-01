<!-- index.nunjucks -->
{% extends "templates/layout.njs" %}

{% block content %}

  <div class="container">
    <div class="row action__prompt">
      <div class="col-md-12 text-center">
        <h2 >What would you like to do?</h2>
        <p>
          Choose a button, and then enter steam community URLs in the box that appears below.
        </p>
        <strong>
          Use a new line for each url added to the input box
        </strong>
      </div>
    </div>

    <div class="row action__options">
      <div class="col-md-3 col-xs-6 text-center">
        <p class="action__desc">Most Popular Game by Playtime</p>
        <div class="panel panel-default">
          <div class="panel-body text-center action__btn" data-path="/steam/popular/playtime">
            <span class="glyphicon glyphicon-time"></span>
          </div>
        </div>
      </div>
      <div class="col-md-3 col-xs-6 text-center">
        <p class="action__desc">Most Popular Game by Ownership</p>
        <div class="panel panel-default">
          <div class="panel-body text-center action__btn" data-path="/steam/popular/ownership">
            <span class="glyphicon glyphicon-user"></span>
          </div>
        </div>
      </div>
      <div class="col-md-3 col-xs-6 text-center">
        <p class="action__desc">Remove users from our DB</p>
        <div class="panel panel-default">
          <div class="panel-body text-center action__btn" data-path="/steam/delete">
            <span class="glyphicon glyphicon-trash"></span>
          </div>
        </div>
      </div>
      <div class="col-md-3 col-xs-6 text-center">
        <p class="action__desc">See past results</p>
        <div class="panel panel-default">
          <div class="panel-body text-center action__btn" data-path="/steam/results">
            <span class="glyphicon glyphicon-th-list"></span>
          </div>
        </div>
      </div>
    </div>

    <div class="row action__form hidden">
      <div class="col-md-12">
        <form class="" role="">
          <div class="form-group">
            <textarea type="text" rows="10" class="form-control form__textinput" placeholder=""></textarea>
          </div>
          <div class="col-md-4">
            <button type="button" class="btn btn-info col-md-12 bust-cache">Refresh</button>
          </div>
          <div class="col-md-4">
            <button type="button" class="btn btn-success col-md-12 use-friends">Use My Friends</button>
          </div>
          <div class="col-md-4">
            <button type="button" class="btn btn-primary col-md-12 use-cache">Submit</button>
          </div>
        </form>
      </div>

    </div>

    <div class="row action__result hidden">

    </div>

  </div>
{% endblock %}
