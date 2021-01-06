import altair as alt
import urllib.parse
import pandas as pd
from IPython.display import display, HTML

def plot_with_yoy(df, col, title):
    height = 150
    return alt.Chart(df.reset_index(), height=height).mark_bar().encode(
        x='Year:O',
        y=alt.Y(f'{col}:Q', 
                axis=alt.Axis(title=f'Number of {title}'), 
                scale=alt.Scale(domain=(0, df[col].max() + 10))),
        tooltip=['Year', alt.Tooltip(col, title=title)]
    ) | alt.Chart(df.diff().div(100).reset_index(), height=height).mark_bar().encode(
        x='Year:O',
        y=alt.Y(f'{col}:Q', 
                axis=alt.Axis(format="%", title='YoY Change'), 
                scale=alt.Scale()),
        tooltip=['Year', alt.Tooltip(col, format="%", title='YoY Change')]
    )


def price_subplot(df, color='Category', color_sort_order=['Clothes', 'Accessory'], 
                  color_scale='tableau10', price_scale=alt.Scale(), size=12, opacity=0.7):
    color_kwargs = {"scale": alt.Scale(scheme=color_scale)}
    if color_sort_order:
        color_kwargs['sort'] = color_sort_order
    chart = alt.Chart(df, width=50)
    result = chart.mark_circle(size=size, opacity=opacity).encode(
        x=alt.X(
            'jitter:Q',
            title=None,
            axis=alt.Axis(values=[0], ticks=True, grid=False, labels=False),
            scale=alt.Scale(),
        ),
        y=alt.Y("Price:Q", axis=alt.Axis(), scale=price_scale),
        color=alt.Color(f'{color}:N', **color_kwargs),
        tooltip=['Product', 'Price', 'Price-2020']
    ).transform_calculate(
        # Generate Gaussian jitter with a Box-Muller transform
        jitter='sqrt(-2*log(random()))*cos(2*PI*random())'
    )
    result = chart.mark_rule(color='red', size=2).encode(y=alt.Y("median(Price-2020):Q")) + result
    
    return result.facet(column=alt.Column(
        'Year:O',
        header=alt.Header(
            labelAngle=-90,
            titleOrient='top',
            labelOrient='bottom',
            labelAlign='right',
            labelPadding=3,
        ),
    ))


def price_plot(df, color='Category', color_sort_order=['Clothes', 'Accessory'], color_scale='tableau10', 
               size=12, opacity=0.7):
    return price_subplot(df, color, color_sort_order, color_scale, alt.Scale(), size, opacity).configure_facet(
        spacing=0
    ).configure_view(
        stroke=None
    )


def drop_chart(df):
    order = df.index
    src = df.fillna(0).unstack().reset_index()
    year_sums = src.groupby('Year').sum()
    for y in year_sums.index:
        src.loc[src['Year'] == y, 'sum'] = year_sums.loc[y, 0]
    year_count = src.loc[src[0] != 0].groupby('Year').count()
    for y in year_count.index:
        src.loc[src['Year'] == y, 'count'] = year_count.loc[y, 0]
    src.columns = ['Year', 'Product', 'Drops', 'Year Drop Total', 'Year Product Count']
    base = alt.Chart(src)
    return base.mark_rect().encode(
        x='Year:O',
        y=alt.Y('Product:N', sort=order.values.tolist()),
        color='Drops:O',
        tooltip=['Year Product Count:Q', 'Year Drop Total:Q']
    ) + base.mark_text(baseline='middle').encode(
        x='Year:O',
        y=alt.Y('Product:N', sort=order.values.tolist()),
        text='Drops:O',
        color=alt.condition(
            alt.datum.Drops > 0,
            alt.value('white'),
            alt.value('')
        )
    )


def reup_subplot(df, kind):
    chart = alt.Chart(df[df['Kind'] == kind], width=30)
    result = chart.mark_circle(size=30, opacity=0.7).encode(
        x=alt.X(
            'jitter:Q',
            title=None,
            axis=alt.Axis(values=[0], ticks=True, grid=False, labels=False),
            scale=alt.Scale(),
        ),
        y=alt.Y("Reups:Q", axis=alt.Axis(), scale=alt.Scale(domain=(0, 10))),
        color=alt.Color('Type:N', scale=alt.Scale(scheme='set1')),
        tooltip=['Type', 'Product', 'Reups']
    ).transform_calculate(
        # Generate Gaussian jitter with a Box-Muller transform
        jitter='sqrt(-2*log(random()))*cos(2*PI*random())'
    )

    return result.facet(column=alt.Column(
        'Year:O',
        header=alt.Header(
            labelAngle=-90,
            titleOrient='top',
            labelOrient='bottom',
            labelAlign='right',
            labelPadding=3,
            title=kind
        ),
    ))


def reup_plot(df):
    return alt.hconcat(reup_subplot(df, 'Bottom'), 
        reup_subplot(df, 'Top')).configure_facet(
            spacing=0
        ).configure_view(
            stroke=None
        )


def fabric_chart(df):
    order = df.index
    src = df.fillna(0).unstack().reset_index()
    src.columns = ['Year', 'Fabric', 'Products']
    base = alt.Chart(src)
    return base.mark_rect().encode(
        x='Year:O',
        y=alt.Y('Fabric:N', sort=order.values.tolist()),
        color='Products:O'
    ) + base.mark_text(baseline='middle').encode(
        x='Year:O',
        y=alt.Y('Fabric:N', sort=order.values.tolist()),
        text='Products:O',
        color=alt.condition(
            alt.datum.Products > 0,
            alt.value('white'),
            alt.value('')
        )
    )


def accum_colors(all_colors, colors):
    if type(colors) == float and pd.isna(colors):
        return
    for c in colors:
        all_colors.add(c.strip())
        

def product_summary_frame(df):
    first_drop = df.iloc[-1]['Release'].year
    last_drop = df.iloc[0]['Release'].year
    fabric = df.iloc[-1]['Fabric']
    price_min = int(df['Price'].min())
    price_max = int(df['Price'].max())
    price_nominal = f"${price_min} — {price_max}" if price_min < price_max else price_max
    # price_2020 = f"${int(df['Price-2020'].min())} — {int(df['Price-2020'].max())}"
    all_colors = set()
    df['Colors'].str.split(",").apply(lambda r: accum_colors(all_colors, r))
    number_of_colors = len(all_colors)
    number_of_drops = len(df)
    fields = [("last drop", last_drop), ("price", price_nominal), ("number of drops", number_of_drops),
              ("fabric", fabric),
              ("number of colors", number_of_colors), ("colors", ", ".join(sorted(all_colors)))]
    return pd.DataFrame([f[1] for f in fields],
                        [f[0] for f in fields],
                        ['Value'])


def product_summary_html(df_all, product):
    tdf = df_all[df_all['Product'] == product]
    styles = [
        dict(selector="tbody tr th", props=[("width", "20%"),
                               ("text-align", "right"),
                               ("vertical-align", "top")]),
        dict(selector="thead tr th", props=[("display", "none")])
    ]
    link = f"https://outlier.illposed.com/product/{urllib.parse.quote_plus(product)}"
    img_src = f"<img width='100px' src={tdf.iloc[0]['Image']} />"
#     row = f"<h4><a href='{link}'>{product}</a></h4> \
#     <div style='display: flex;'> \
#       <div style='width: 100px; flex-grow: 0; flex-shrink:0;'>{img_src}</div> \
#       <div style='min-width: 200px;'>{product_summary_frame(tdf).style.set_table_styles(styles).render()}</div> \
#     </div>"
    row = f"<h4><a href='{link}'>{product}</a></h4> \
    <div style='display: flex;'> \
      <div class='product-image'>{img_src}</div> \
      <div class='product-table'>{product_summary_frame(tdf).to_html()}</div> \
    </div>"
    return HTML(row)

    
def product_summary_display(df_all, product):
    html = product_summary_html(df_all, product)
    display(html)


def year_summary_display(df_all, year, products):
    # Order by number of drops, not alphabetically
    # products = sorted(products)
    products = df_all[df_all['Product'].isin(products)].groupby('Product').count()['Type'].sort_values(ascending=False).index
    if len(products) < 1:
        return
    htmls = [product_summary_html(df_all, p) for p in products]
    fragments = [f"<div class='product'>{h.data}</div>" for h in htmls]
    row = f"<h3>{year}</h3><div class='year-products' style='display: flex'>{' '.join(fragments)}</div>"
    display(HTML(row))
    
    
def years_summary_display(df_all, year_df):
    year_summary_display(df_all, "2008 - 2012", year_df[year_df['Year'] < 2013].index)
    for y in range(2013, 2021):
        year_summary_display(df_all, str(y), year_df[year_df['Year'] == y].index)