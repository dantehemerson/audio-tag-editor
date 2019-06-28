import { Button, Form, Input, InputNumber } from 'antd'
import get from 'lodash.get'
import React from 'react'
import { Cover } from './Cover'
import { ApiController } from '../api/apiControlller'
import { REQUEST_STATUS } from '../constants'

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
  constructor(...props) {
    super(...props)
    this.apiController = new ApiController(this.props.apiUrl)
  }

  state = {
    _recovery: {}, // Object with the initial metadata

    // Song id to sent to edit.
    id: undefined,

    tags: {
      cover: undefined, // base64 image
      title: '',
      artist: '',
      album: '',
      year: 2019,
      genre: '',
      trackNumber: 1
    },

    requestStatus: REQUEST_STATUS.NOT_SEND
  }

  componentDidMount() {
    const tags = get(this.props, 'tags')

    const data = {
      id: get(tags, 'id', undefined),
      tags: {
        title: get(tags, 'title', ''),
        cover: get(tags, 'image', undefined),
        artist: get(tags, 'artist', ''),
        album: get(tags, 'album', ''),
        year: get(tags, 'year', 2019),
        genre: get(tags, 'genre', ''),
        trackNumber: get(tags, 'trackNumber', 1)
      }
    }

    this.setState({
      ...data,
      _recovery: data
    })
  }

  handleChangeTitle = event => {
    this.setState({
      tags: {
        ...Object.assign({}, this.state.tags),
        title: event.target.value
      }
    })
  }

  handleChangeArtist = event => {
    this.setState({
      tags: {
        ...Object.assign({}, this.state.tags),
        artist: event.target.value
      }
    })
  }

  handleChangeAlbum = event => {
    this.setState({
      tags: {
        ...Object.assign({}, this.state.tags),
        album: event.target.value
      }
    })
  }

  handleChangeYear = year => {
    this.setState({
      tags: {
        ...Object.assign({}, this.state.tags),
        year
      }
    })
  }

  handleChangeGenre = event => {
    this.setState({
      tags: {
        ...Object.assign({}, this.state.tags),
        genre: event.target.value
      }
    })
  }

  handleChangeTrackNumber = trackNumber => {
    this.setState({
      tags: {
        ...Object.assign({}, this.state.tags),
        trackNumber
      }
    })
  }

  handleUpdateTags = async e => {
    this.setState({ requestStatus: REQUEST_STATUS.PROGRESS })
    console.log(`Updatestst`)
    try {
      const newTags = Object.assign({}, this.state.tags)
      delete newTags.cover
      const res = await this.apiController.sendToEdit(this.state.id, newTags)
      console.log(`res is`, res)
    } catch (e) {
      this.setState({ requestStatus: REQUEST_STATUS.ERROR })
    }
  }

  render() {
    return (
      <Form {...formItemLayout}>
        <Cover imageData={this.state.tags.cover} />
        <Form.Item label="Title">
          <Input
            value={this.state.tags.title}
            onChange={this.handleChangeTitle}
            placeholder="Song title"
            id="error"
          />
        </Form.Item>

        <Form.Item label="Artist">
          <Input
            value={this.state.tags.artist}
            onChange={this.handleChangeArtist}
            placeholder="Song artist"
            id="error"
          />
        </Form.Item>

        <Form.Item label="Album">
          <Input
            value={this.state.tags.album}
            onChange={this.handleChangeAlbum}
            placeholder="Song album"
            id="error"
          />
        </Form.Item>

        <Form.Item label="Year">
          <InputNumber
            min={300}
            max={2019}
            value={this.state.tags.year}
            id="error"
            onChange={this.handleChangeYear}
          />
        </Form.Item>

        <Form.Item label="Genre">
          <Input
            value={this.state.tags.genre}
            onChange={this.handleChangeGenre}
            placeholder="Song genre"
            id="error"
          />
        </Form.Item>

        <Form.Item label="Track Number">
          <InputNumber
            min={1}
            max={298} // I think that is the maximum that can exist
            value={this.state.tags.trackNumber}
            onChange={this.handleChangeTrackNumber}
            id="error"
          />
        </Form.Item>

        <Form.Item {...buttonItemLayout}>
          <Button
            onClick={this.handleUpdateTags}
            htmlType="submit"
            type="primary"
          >
            Update
          </Button>
        </Form.Item>
      </Form>
    )
  }
}
