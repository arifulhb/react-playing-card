import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Result from '../components/result/index';


const mapStateToProps = (state, ownProps) => {
  return {
    peoples: [],
    cards: []

  };
}

export default connect(
  mapStateToProps,
  null
)(Result);
