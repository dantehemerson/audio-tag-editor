import React from 'react'
import Edit from '../components/Edit'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Upload from '../components/upload'
import { STEPPER } from '../constants'

class IndexPage extends React.Component {
  state = {
    stepper: STEPPER.UPLOAD,
    tags: {},
    apiUrl: undefined
  }

  componentDidMount() {
    this.setState({ apiUrl: this.props.data.site.siteMetadata.env.apiUrl })
  }

  handleUploaded = tags => {
    console.log(`Tags are: `, tags)
    // After song is uploaded the next step is edit.
    this.setState({ stepper: STEPPER.EDIT, tags })
  }

  renderStep() {
    switch (this.state.stepper) {
      case STEPPER.EDIT:
        return <Edit apiUrl={this.state.apiUrl} tags={this.state.tags} />
      case STEPPER.DOWNLOAD:
        return <div>Downloaddding</div>
      default:
        return (
          <Upload
            apiUrl={this.state.apiUrl}
            handleUploaded={this.handleUploaded}
          />
        )
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

export const queryIndex = graphql`
  query QueryIndex {
    site {
      siteMetadata {
        title
        env {
          apiUrl
        }
      }
    }
  }
`

export default IndexPage
