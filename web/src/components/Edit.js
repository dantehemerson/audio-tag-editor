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
      ...this.props.data
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
