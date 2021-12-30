import pandas as pd
from datetime import datetime


def month_to_quarter(month):
    q = ((month-1) // 3) + 1
    return "Q{}".format(q)

def product_to_exp(product):
    if product.startswith("Experiment"):
        return True
    if product.startswith("Public Prototype"):
        return True
    return False


def drops_to_products(df, scope, max_year):
    """Convert a frame of drops to one row per product.

    'Product' should be the last entry in the scope list."""
    s = scope + ['Type', 'Category', 'Fabric']
    return df.groupby(s)[['Release', 'Price', f"Price-{max_year}"]].max().reset_index()


def drops_to_product_counts(df, scope):
    """Convert a frame of drops to one row per product.

    'Product' should be the last entry in the scope list."""
    return df.groupby(scope).count()


def rectify_product_names(df):
    """Change Product to reflect the latest name"""
    df['ProductOrig'] = df['Product']
    prev_ser = df['Previous Iteration'].dropna()
    for idx, val in prev_ser.iteritems():
        new_name = df.loc[idx]['Product']
        df.loc[df['Product'] == val, 'Product'] = new_name


def outlier_df(path, max_year):
    """Return a frame with outlier data, formatted."""

    # Read in and prepare data
    df_all = pd.read_csv(path)
    df_all['Release'] = pd.to_datetime(df_all['Release'], format="%Y-%m-%d")
    df_all = df_all[('2012-01-01' < df_all['Release']) & (df_all['Release'] < f"{max_year+1}-01-01") & (df_all['Price'] > 0)]
    df_all['Year'] = df_all['Release'].map(lambda x: x.year)
    df_all['Month'] = df_all['Release'].map(lambda x: x.month)
    df_all['Quarter'] = df_all['Month'].map(month_to_quarter)
    df_all['Exp'] = df_all['Product'].apply(product_to_exp)
    rectify_product_names(df_all)
    df_all['Category'] = df_all['Category'].replace('Accessory', 'Objects')

    df_cpi = pd.read_csv("./cpi.csv")
    df_cpi['date_dt'] = pd.to_datetime(df_cpi['DATE'])
    cpi_s = df_cpi.set_index('date_dt').drop('DATE', axis=1)
    bpl = cpi_s.iloc[-1]


    # Inflation adjust prices
    def price_adjusted(price, year, month):
        try:
            factor = cpi_s.loc["{}-{}-01".format(year, month)]
        except KeyError:
            # If no value is found, it is too new and we can assume the price level is at the base
            factor = bpl
        return int(price * bpl / factor)
    df_all[f"Price-{max_year}"] = df_all.apply(lambda x: price_adjusted(x['Price'], x['Year'], x['Month']), 1)
    return df_all


def cat_year_df(reups_df, category):
    cat_df = reups_df.loc[category, :]
    df = cat_df.unstack().reset_index().rename(columns={0:'Count'})
    df = df.dropna(subset=['Count']).groupby('Product').min().sort_values('Year').drop('Count', axis=1)
    return df
