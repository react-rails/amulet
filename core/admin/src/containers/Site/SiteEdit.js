import React, {Component} from 'react';
import { connect } from 'react-redux';
import {reduxForm} from 'redux-form';
import {createSite, getSite, editSite} from '../../actions/siteActions';
import SiteForm from '../../components/SiteForm';

class SiteEdit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      setForm: false
    }
  }

  componentWillMount() {
    if(this.props.params.id) {
      this.props.dispatch(getSite(this.props.params.id))
      this.setState({
        setForm: true
      })
    }
  }

  render() {
    const {site} = this.props
    if(!site) {
      return <div>Loading...</div>
    }
    return (
      <div className="SiteEdit">
        {this.props.params.id ? <h1>EDIT SITE</h1> : <h1>NEW SITE</h1>}
        <SiteForm {...this.props} init={this.state.setForm} submit={this.state.setForm ? editSite : createSite} />
      </div>
    )
  }
}

SiteEdit = reduxForm({
  form: 'siteEditForm'
})(SiteEdit)

const mapStateToProps = (state) => ({
  site: state.sites.showSite
})

SiteEdit = connect(mapStateToProps)(SiteEdit)

export default SiteEdit