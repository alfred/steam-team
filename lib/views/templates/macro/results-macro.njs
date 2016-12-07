{% macro template( result ) %}
  {% if result.query.url.indexOf('delete') !== -1 %}
    <tr>
      <td>{{ result.resultId }}</td>
      <td>
        <ol>
          {% for url in result.query.vanityUrls %}
            <li><a href="{{url}}">{{url}}</a></li>
          {% endfor %}
        </ol>
      </td>
      <td>Successfully deleted</td>
    </tr>
  {% elseif result.query.url.indexOf('/popular/playtime') !== -1 %}
    <tr>
      <td>{{ result.resultId }}</td>
      <td>
        <ol>
          {% for url in result.query.vanityUrls %}
            <li><a href="{{url}}">{{url}}</a></li>
          {% endfor %}
        </ol>

      </td>
      <!-- Wish I named this better -->
      <td>{{ result.result.name }} with {{ result.result.playtime_forever / 60 }} hours</td>
    </tr>
  {% elseif result.query.url.indexOf('/popular/ownership') !== -1 %}
    <tr>
      <td>{{ result.resultId }}</td>
      <td>
        <ol>
          {% for url in result.query.vanityUrls %}
            <li><a href="{{url}}">{{url}}</a></li>
          {% endfor %}
        </ol>
      </td>
      <!-- Wish I named this better -->
      <td>{{ result.result.name }} with {{ result.result.players.length}} players</td>

    </tr>
  {% endif %}
{% endmacro %}
