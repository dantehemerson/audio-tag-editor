import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Upload from '../components/upload'
import Edit from '../components/Edit'
import { STEPPER } from '../constants'

class IndexPage extends React.Component {
  state = {
    stepper: STEPPER.UPLOAD,
    tags: {}
  }

  handleUploaded(stepper, tags) {
    this.setState({ stepper, tags })
  }

  renderStep() {
    switch (this.state.stepper) {
      case STEPPER.EDIT:
        return <Edit tags={this.state.tags} />
      case STEPPER.DOWNLOAD:
        return <div>Downloaddding</div>
      default:
        return <Upload />
    }
  }

  render() {
    return (
      <Layout>
        <SEO title="Home" />
        {this.renderStep()}
      </Layout>
    )
  }
}

export default IndexPage
