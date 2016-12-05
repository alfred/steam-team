<!-- index.nunjucks -->
{% extends "templates/layout.njs" %}

{% block content %}
  {% for res in results %}
    {{ res.resultId }}, {{ res.query }}, {{ res.result }}
  {% endfor %}
{% endblock %}
