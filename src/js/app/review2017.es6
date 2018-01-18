/**
 *  Independent Outlier Archive
 *
 *  Copyright (c) 2014-2018 Chandrasekhar Ramakrishnan
 *
 *  Released under GPL license.
 */

 /**
  * Text for the 2017 review
  */

import React from 'react'

var Text = React.createClass({
  render: function() {
    return (<div className="col-md-8">
              <h1 id="outlier_2017_the_year_in_data">Outlier 2017, The Year in Data</h1>
              <p>This started out as an answer a simple question: is Outlier getting more expensive or not?</p>
              <p>Throughout 2017, comments repeatedly came up on the <a href="http://reddit.com/r/Outlier">Outlier subreddit</a> complaining that this was happening and, furthermore, that the brand had shifted focus away from its core customer base to a new, more fashion-forward audience, resulting in a greater number of experimental drops with higher prices and neglect of its staple styles. I thought it would be interesting to take a closer look at the data and see if it was true.</p>
              <p>But, as often happens, once I started exploring the data, the situation become more complex. There were different ways to look at the problem, there were a lot of ins, a lot of outs, a lot of what-have-yous&#8230; I began asking other questions, like does Outlier produce equal numbers of tops, bottoms, and layers? Has it always been this way? Is it different in different quarters? The result is this sprawling document.</p>
              <h1 id="drops_and_products">Drops and Products</h1>
              <p>Outlier has been growing. This is something that was obvious already in 2016, and was <a href="https://www.reddit.com/r/Outlier/comments/5mmsc2/is_outlier_growing/">confirmed by Abe</a> at the beginning of 2017. This growth is visible in the number of drops and products per year, but in 2017, year-over-year change in the number of drops was basically stagnant. The big growth periods were 2013 and 2016.</p>
              <p><img src="2017_review_img/output_2_0.png" alt="png" title="" /></p>
              <p>Digging a little deeper to see how drops and products are distributed between clothes and items, between re-ups and experiments, we see that split between clothes and objects has been constant over the years, hovering at around 80% and not changing much in 2017, but there is a visible shift towards items explicitly labeled as experimental. Comparing to 2012 isn&#8217;t entirely fair, since some pieces then were not designated as experimental but probably were thought of that way, but comparing to 2015 is.
              In 2017, experimental drops made up over 20% of all drops and almost 40% of all products, considerably more than in 2015.</p>
              <p><img src="2017_review_img/output_4_0.png" alt="png" title="" /></p>
              <p>Also clear is the change in the percentage of <em>products</em> that get re-upped. The percentage of re-up drops is close to its peak in 2015, but in 2017 percentage of products that were re-upped was down noticeably and even overtaken by the percentage of experimental products.</p>
              <h1 id="prices">Prices</h1>
              <p><img src="2017_review_img/output_7_0.png" alt="png" title="" /></p>
              <p>The optics of trends in the evolution of prices depends on how you make the comparison: with a suitable choice of time period, summary statistic, scope (all drops or all products), and inflation adjustment, you could plausibly make the case that Outlier has gotten cheaper, more expensive, or not changed dramatically in price.</p>
              <p>For me, there are two time points that are especially salient. One is the year 2012, the first year for which the archive has solid data. At that time, Outlier was a small, but expanding, company putting out a mix of office staples and more experimental pieces, though not focused on keeping things in stock. Compared against that year, I would use inflation-adjusted 2017 dollars and argue that Outlier is very similar in price to what it was then: the median product is very slightly more expensive (in 2017 dollars), but the number of drops has increased 6-fold, so you are much more likely to be able to buy at least staples, and the median drop is slightly less expensive.</p>
              <p>The other point of comparison would be 2015, which I think represents the most full development of the previous iteration of Outlier. It was the first year in which staples were reliably kept in stock; there were the occasional experimental OPP drops that year, but Outlier was largely focused on office-compatible clothing. Compared to 2015, Outlier has gotten somewhat more expensive: the median drop price hasn&#8217;t changed, and the median product price has gone up, even in inflation-adjusted dollars.</p>
              <h2 id="regular_vs_experimental">Regular vs. Experimental</h2>
              <p>Another way of looking at the evolution of prices is to consider the effect of the introduction of the experimental products line. As many have remarked, experimental products have a higher median price than regular products. Explicitly designated experiments were first introduced in 2015 as <em>Public Prototypes</em>. In that year, the median price for experiments was only slightly higher than the median price for all products. Since then, the median price for regular products has stayed basically the same, whereas the median price of experimental products was around $100 higher in 2017.</p>
              <p><img src="2017_review_img/output_9_0.png" alt="png" title="" /></p>
              <h1 id="bottoms_layers_tops">Bottoms, Layers, Tops</h1>
              <h2 id="category_percentages">Category Percentages</h2>
              <p><img src="2017_review_img/output_12_0.png" alt="png" title="" /></p>
              <p>Outlier&#8217;s attention seems fairly evenly split between bottoms, layers, and tops. As a percentage of releases, bottoms have hovered around 40% of all drops and around 30% of all clothing products for the last 5 years. Tops have followed closely behind as a percentage of drops, and generally gotten more attention as a percentage of products. The last two years have seen layers taking the top slot in the percentage of products, followed by Tops, and then Bottoms, though the split is very close to even.</p>
              <p>A more detailed picture arises if we look at the breakdown of drops per quarter.</p>
              <p><img src="2017_review_img/output_14_0.png" alt="png" title="" /></p>
              <p>Here we see where in the year particular categories are emphasized, and how the emphasis has been changing. Unsurprisingly, layers are dominant in the last quarter of the year. For the rest of the year, bottoms and tops generally make up a higher percentage of drops, tops a higher percentage of products, but the split is close to even.</p>
              <h2 id="category_details">Category Details</h2>
              <p>Finally, we close by zooming in on the trends within individual categories. The following graphs show, for different classes of items within the categories, the following:
              <ul>
              <li>The evolution of median prices (in 2017 Dollars)</li>
              <li>The numbers of drops</li>
              <li>The percentage of products in each class</li>
              </ul></p>
              <h3 id="bottoms">Bottoms</h3>
              <p><img src="2017_review_img/output_17_0.png" alt="png" title="" /></p>
              <p>The price of regular items has been very consistent; the experimental items command a premium. The number of drops of regular products has also been consistent over the last few years, but the the product-percentage composition has changed as a result of the experimental lines.</p>
              <h3 id="tops">Tops</h3>
              <p><img src="2017_review_img/output_19_0.png" alt="png" title="" /></p>
              <p>Tops exhibit quite a bit of fluctuation. The price of t-shirts has remained consistent, but the price regular shirts has been steadily increasing over the last few years, and experimental shirts are even more expensive than the regular ones.</p>
              <p>T-Shirts have been dominating recently in terms of the number of drops, but those drops are drawn from a constant number of products.</p>
              <h3 id="layers">Layers</h3>
              <p><img src="2017_review_img/output_21_0.png" alt="png" title="" /></p>
              <p>Regular layers have been declining in aggregate price. In 2017, layers were split 50/50 between regular products and experimental ones.</p>
              <h1 id="fabrics">Fabrics</h1>

              <p>Since its start, Outlier has differentiated itself through their choice of fabrics. How have they utilized their fabrics accross their products? How often do they re-use fabrics for multiple products?</p>

              <p><img src="2017_review_img/output_24_0.png" alt="png" title="" /></p>

              <p>Looking at the number of products per fabric gives a picture of how many different materials Outlier works with. During the period between 2013 and 2015, an aspect of Outlier&#8217;s growth was in the variety of fabrics they employed: not only were they increasing the number of products and drops, they were using a greater variety of fabrics as well, as evidenced by the decling number of products per fabric. Between 2015 and 2017, Outlier continued to grew in terms of products and drops, but they started using the same fabrics in a larger number of products.</p>

              <h1 id="the_price_of_free_shipping">The Price of <em>Free</em> Shipping</h1>
              <p>In July 2017, <a href="https://www.reddit.com/r/Outlier/comments/6mnjfm/free_shipping_and_price_increases_july_14th/">Outlier announced</a> that they were changing how they handled shipping. Domestic shipping became free, international shipping became cheaper, but the price of products increased. For products that were released both before and after the price change, here is a list of price differences before and after July 14, 2017.</p>
              <div>
              <table border="1" class="dataframe">
                <thead>
                  <tr style={{"text-align": "right"}}>
                    <th></th>
                    <th>Price Change</th>
                  </tr>
                  <tr>
                    <th>Product</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Gostwyck Merino Turtleneck</th>
                    <td>-50.0</td>
                  </tr>
                  <tr>
                    <th>Alphacharge Vest</th>
                    <td>-38.0</td>
                  </tr>
                  <tr>
                    <th>Doublefine Merino Pullover</th>
                    <td>-27.0</td>
                  </tr>
                  <tr>
                    <th>Alphacharge Track Jacket</th>
                    <td>-7.0</td>
                  </tr>
                  <tr>
                    <th>Co/Weight Crewneck Sweatshirt</th>
                    <td>0.0</td>
                  </tr>
                  <tr>
                    <th>Doublefine Merino Hoodie</th>
                    <td>0.0</td>
                  </tr>
                  <tr>
                    <th>Freecotton Button-up</th>
                    <td>0.0</td>
                  </tr>
                  <tr>
                    <th>Futureworks</th>
                    <td>0.0</td>
                  </tr>
                  <tr>
                    <th>Injected Linen Pants</th>
                    <td>0.0</td>
                  </tr>
                  <tr>
                    <th>Runweight Merino T-Shirt</th>
                    <td>0.0</td>
                  </tr>
                  <tr>
                    <th>Slim Dungarees</th>
                    <td>0.0</td>
                  </tr>
                  <tr>
                    <th>Slim Dungarees (Long)</th>
                    <td>0.0</td>
                  </tr>
                  <tr>
                    <th>Ultrafine Merino Longsleeve</th>
                    <td>0.0</td>
                  </tr>
                  <tr>
                    <th>OG Classics</th>
                    <td>8.0</td>
                  </tr>
                  <tr>
                    <th>Ultrafine Merino T-Shirt</th>
                    <td>12.0</td>
                  </tr>
                  <tr>
                    <th>Runweight Merino V-Neck</th>
                    <td>13.0</td>
                  </tr>
                  <tr>
                    <th>Strong Dungarees</th>
                    <td>13.0</td>
                  </tr>
                  <tr>
                    <th>60/30 Chinos</th>
                    <td>19.0</td>
                  </tr>
                  <tr>
                    <th>M-Back Track Pants</th>
                    <td>19.0</td>
                  </tr>
                  <tr>
                    <th>Nyco Oxford</th>
                    <td>22.0</td>
                  </tr>
                  <tr>
                    <th>Runweight Merino Long Sleeve</th>
                    <td>22.0</td>
                  </tr>
                  <tr>
                    <th>Co/Weight Merino Pullover Hoodie</th>
                    <td>23.0</td>
                  </tr>
                  <tr>
                    <th>Co/Weight Merino Zip Front Hoodie</th>
                    <td>23.0</td>
                  </tr>
                  <tr>
                    <th>GD Cottonweight Merino T-Shirt</th>
                    <td>27.0</td>
                  </tr>
                  <tr>
                    <th>Deck Jacket</th>
                    <td>50.0</td>
                  </tr>
                </tbody>
              </table>
              </div>
              <h1 id="looking_to_2018">Looking to 2018</h1>
              <p>Looking forward to see how these trends develop in 2018.</p>
            </div>)
  }
});


var Review2017Class = React.createClass({
  displayName: 'Review2017',
  render: function() {
    return (<div className='row' style={{padding: "10px 0px 0px 0px"}}><Text {...this.props} /></div>)
  }
});

var Review2017 = React.createFactory(Review2017Class);

export default { Review2017: Review2017 }
