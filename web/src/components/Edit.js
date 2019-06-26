import { Button, Form, Input, InputNumber } from 'antd'
import get from 'lodash.get'
import React from 'react'

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 }
  }
}

const buttonItemLayout = { wrapperCol: { span: 14, offset: 9 } }

export default class Edit extends React.Component {
  state = {
    _recovery: {}, // Object with the initial metadata
    cover: undefined, // base64 image
    title: '',
    artist: '',
    album: '',
    year: 2019,
    genre: '',
    trackNumber: 1
  }

  componentDidMount() {
    const tags = get(this.props, 'tags')

    const data = {
      title: get(tags, 'title', ''),
      cover: get(tags, 'image', undefined),
      artist: get(tags, 'artist', ''),
      album: get(tags, 'album', ''),
      year: get(tags, 'year', 2019),
      genre: get(tags, 'genre', ''),
      trackNumber: get(tags, 'trackNumber', 1)
    }

    this.setState({
      ...data,
      _recovery: data
    })
  }

  handleChangeTitle = event => {
    this.setState({ title: event.target.value })
  }

  handleChangeArtist = event => {
    this.setState({ artist: event.target.value })
  }

  handleChangeAlbum = event => {
    this.setState({ album: event.target.value })
  }

  handleChangeYear = year => {
    this.setState({ year })
  }

  handleChangeGenre = event => {
    this.setState({ genre: event.target.value })
  }

  handleChangeTrackNumber = trackNumber => {
    this.setState({ trackNumber })
  }

  render() {
    return (
      <Form {...formItemLayout}>
        <img src={`data:image/jpeg;base64,${this.state.cover}`} />
        <Form.Item label="Title">
          <Input
            value={this.state.title}
            onChange={this.handleChangeTitle}
            placeholder="Song title"
            id="error"
          />
        </Form.Item>

        <Form.Item label="Artist">
          <Input
            value={this.state.artist}
            onChange={this.handleChangeArtist}
            placeholder="Song artist"
            id="error"
          />
        </Form.Item>

        <Form.Item label="Album">
          <Input
            value={this.state.album}
            onChange={this.handleChangeAlbum}
            placeholder="Song album"
            id="error"
          />
        </Form.Item>

        <Form.Item label="Year">
          <InputNumber
            min={300}
            max={2019}
            value={this.state.year}
            id="error"
            onChange={this.handleChangeYear}
          />
        </Form.Item>

        <Form.Item label="Genre">
          <Input
            value={this.state.genre}
            onChange={this.handleChangeGenre}
            placeholder="Song genre"
            id="error"
          />
        </Form.Item>

        <Form.Item label="Track Number">
          <InputNumber
            min={1}
            max={298} // I think that is the maximum that can exist
            value={this.state.trackNumber}
            onChange={this.handleChangeTrackNumber}
            id="error"
          />
        </Form.Item>

        <Form.Item {...buttonItemLayout}>
          <Button type="primary">Submit</Button>
        </Form.Item>
      </Form>
    )
  }
}
