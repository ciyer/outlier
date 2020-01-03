import altair as alt

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
                  color_scale='tableau10', price_scale=alt.Scale()):
    color_kwargs = {"scale": alt.Scale(scheme=color_scale)}
    if color_sort_order:
        color_kwargs['sort'] = color_sort_order
    chart = alt.Chart(df, width=50)
    result = chart.mark_circle(size=12, opacity=0.7).encode(
        x=alt.X(
            'jitter:Q',
            title=None,
            axis=alt.Axis(values=[0], ticks=True, grid=False, labels=False),
            scale=alt.Scale(),
        ),
        y=alt.Y("Price:Q", axis=alt.Axis(), scale=price_scale),
        color=alt.Color(f'{color}:N', **color_kwargs),
        tooltip=['Product', 'Price', 'Price-2019']
    ).transform_calculate(
        # Generate Gaussian jitter with a Box-Muller transform
        jitter='sqrt(-2*log(random()))*cos(2*PI*random())'
    )
    result = chart.mark_rule(color='red', size=2).encode(y=alt.Y("median(Price-2019):Q")) + result
    
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


def price_plot(df, color='Category', color_sort_order=['Clothes', 'Accessory'], color_scale='tableau10'):
    return price_subplot(df, color, color_sort_order, color_scale, alt.Scale()).configure_facet(
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
