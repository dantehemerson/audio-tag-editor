import React from 'react'
import {
  Form,
  Input,
  Button,
  DatePicker,
  TimePicker,
  Select,
  Cascader,
  InputNumber
} from 'antd'

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
    this.state = {
      tile: ''
    }
  }

  handleChange = event => {
    this.setState({ title: event.target.value })
  }

  render() {
    return (
      <Form {...formItemLayout}>
        <Form.Item label="Title">
          <Input
            value={this.state.title}
            onChange={this.handleChange}
            placeholder="Song title"
            id="error"
          />
        </Form.Item>

        <Form.Item label="Artist">
          <Input
            value={this.state.title}
            onChange={this.handleChange}
            placeholder="Song artist"
            id="error"
          />
        </Form.Item>

        <Form.Item label="Album">
          <Input
            value={this.state.title}
            onChange={this.handleChange}
            placeholder="Song album"
            id="error"
          />
        </Form.Item>

        <Form.Item label="Year">
          <InputNumber min={300} max={2019} defaultValue={2019} id="error" />
        </Form.Item>

        <Form.Item label="Genre">
          <Input
            value={this.state.title}
            onChange={this.handleChange}
            placeholder="Song genre"
            id="error"
          />
        </Form.Item>

        <Form.Item label="Track Number">
          <InputNumber
            value={this.state.title}
            onChange={this.handleChange}
            id="error"
          />
        </Form.Item>

        <Form.Item label="Date" hasFeedback>
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item {...buttonItemLayout}>
          <Button type="primary">Submit</Button>
        </Form.Item>
      </Form>
    )
  }
}
