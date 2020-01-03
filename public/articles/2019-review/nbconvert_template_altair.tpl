{% extends "full.tpl" %}

{% set altair = {'vis_number': 1} %}

{% block header %}
  <script src="https://cdn.jsdelivr.net/npm/vega@3"></script>
  <script src="https://cdn.jsdelivr.net/npm/vega@5"></script>
  <script src="https://cdn.jsdelivr.net/npm/vega-lite@2"></script>
  <script src="https://cdn.jsdelivr.net/npm/vega-lite@3"></script>
  <script src="https://cdn.jsdelivr.net/npm/vega-embed@3"></script>
  {{super()}}
{% endblock header %}

{% block data_png scoped %}
    {% if 'application/vnd.vegalite.v1+json' in output.data %}
    {% elif 'application/vnd.vegalite.v2+json' in output.data %}
    {% elif 'application/vnd.vegalite.v3+json' in output.data %}
    {% elif 'application/vnd.vega.v2+json' in output.data %}
    {% elif 'application/vnd.vega.v3+json' in output.data %}
    {% else %}
        {{super()}}
    {% endif %}
{% endblock data_png %}

{% block data_text scoped %}
    {% if 'application/vnd.vegalite.v1+json' in output.data %}
    {% elif 'application/vnd.vegalite.v2+json' in output.data %}
    {% elif 'application/vnd.vegalite.v3+json' in output.data %}
    {% elif 'application/vnd.vega.v2+json' in output.data %}
    {% elif 'application/vnd.vega.v3+json' in output.data %}
    {% else %}
        {{super()}}
    {% endif %}
{% endblock data_text %}

{% block data_priority scoped %}
   {% for mimetype in (
        'application/vnd.vegalite.v1+json',
        'application/vnd.vegalite.v2+json',
        'application/vnd.vegalite.v3+json',
        'application/vnd.vega.v2+json',
        'application/vnd.vega.v3+json')
    %}
        {% if mimetype in output.data %}
            {% if altair.update({'vis_number': altair.vis_number+1}) %}{% endif %}
            <div id="vis{{cell['execution_count']}}_{{ altair.vis_number }}"></div>
            <script type="text/javascript">
                var spec = {{ output.data[mimetype] | replace("None","null") | replace("True","true") | replace("False","false") }};
                var opt = {"renderer": "canvas", "actions": false};
                vegaEmbed("#vis{{cell['execution_count']}}_{{ altair.vis_number }}", spec, opt);
            </script>
        {% elif loop.index == 1 %}
            {{super()}}
        {% endif %}
    {% endfor %}
{% endblock data_priority %}