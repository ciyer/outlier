import { connect } from 'react-redux';
import { productNameFromUrlString } from '../../utils';
import ProductPagePresent from './ProductPage';
import { ReleaseSummary, releasesForProduct } from '../../data';

function mapStateToProps(state, ownProps) {
  const archive = state.archive;
  const productName = productNameFromUrlString(ownProps.product);
  const {filteredReleases, numberOfReleaseNames} = releasesForProduct(archive.data.full, productName);
  const summary = (archive.summary.baseline.priceBins == null) ?
    null :
    (new ReleaseSummary(filteredReleases, archive.summary.baseline)).compute();
  return { productName, summary,
    releases: filteredReleases,
    showReleaseNames: numberOfReleaseNames > 1,
    productUrlString: ownProps.product };
}

function mapDispatchToProps(dispatch) {
  return {}
}

const ProductPage = connect(mapStateToProps, mapDispatchToProps)(ProductPagePresent)

export default ProductPage;
