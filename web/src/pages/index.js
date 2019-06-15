import { Link } from 'gatsby'
import React from 'react'
import Image from '../components/image'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Upload from '../components/upload'

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Upload />
  </Layout>
)

export default IndexPage
