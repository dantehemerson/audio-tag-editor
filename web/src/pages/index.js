import React from 'react'
import Edit from '../components/Edit'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Upload from '../components/Upload'
import { STEPPER } from '../constants'
import { Download } from '../components/Download'

class IndexPage extends React.Component {
  state = {
    stepper: STEPPER.DOWNLOAD,
    tags: {},
    downloadUrl: undefined,
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

  handleEdited = downloadId => {
    this.setState({
      stepper: STEPPER.DOWNLOAD,
      downloadUrl: `${this.state.apiUrl}/download/${downloadId}`
    })
  }

  renderStep() {
    switch (this.state.stepper) {
      case STEPPER.EDIT:
        return (
          <Edit
            apiUrl={this.state.apiUrl}
            tags={this.state.tags}
            handleEdited={this.handleEdited}
          />
        )
      case STEPPER.DOWNLOAD:
        return <Download downloadUrl={this.state.downloadUrl} />
      default:
        return (
          <Upload
            apiUrl={this.state.apiUrl}
            handleUploaded={this.handleUploaded}
          />
        )
    }
  }

  getTitle = () => {
    switch (this.state.stepper) {
      case STEPPER.EDIT:
        return 'Edit Tags'

      case STEPPER.DOWNLOAD:
        return 'Download Song'
      default:
        return 'Upload File'
    }
  }

  render() {
    return (
      <Layout title={this.getTitle()}>
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
