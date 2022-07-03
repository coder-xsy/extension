import * as React from 'react'
import {Form, Input, Card, Button, InputNumber} from '@arco-design/web-react'
import { HexColorPicker } from 'react-colorful'

const FormItem = Form.Item

function getImage (config) {
  console.log('test:', config)
  const { width, height, bg } = config;
  const canvas = document.createElement('canvas');
  canvas.width = typeof width === 'string' ? parseInt(width) : width;
  canvas.height = typeof height === 'string' ? parseInt(height) : height;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const canvasUrl = canvas.toDataURL("image/png");
  return canvasUrl
}

function getTime() {
  const now  = new Date();
  return `${now.getFullYear()}${now.getMonth() + 1}${now.getDate()}${now.getHours()}${now.getMinutes()}${now.getSeconds()}`
}

const CreateImage = () => {
  const [form] = Form.useForm()
  const [bg, setbg] = React.useState('#18e972')
  const [url, setUrl] = React.useState('')
  const [time, setTime] = React.useState('')

  const handleCreate = () => {
    const value = form.getFieldsValue();
    const url = getImage({...value, bg})
    console.log('test:', url)
    setUrl(url)
    setTime(getTime())
  }
  // const download = () => {
  //   const link = document.createElement('a');
  //   a.setAttribute('download', 'imageTool.png');
  //   a.setAttribute('href')
  // }
  return (
    <div>
      <Card title="图片参数">
        <Form form={form} initialValues={{height: 400, width: 375}} layout="inline" labelCol={{span: 16}}>
          <FormItem field="height" label="高度">
            <InputNumber suffix="像素" />
          </FormItem> 
          <FormItem field="width" label="宽度">
            <InputNumber suffix="像素" />
          </FormItem>
          <FormItem label="背景色">
            <div style={{display: 'flex'}}>
              <Input value={bg} disabled />
              <div style={{position: 'relative'}} className="color-pick-container">
                <Button>
                  颜色选择器
                </Button>
                <HexColorPicker style={{position: 'absolute', top: 0, left: '100%'}} value={bg} onChange={setbg} className="color-picker"  />
              </div>
            </div>
          </FormItem>
        </Form>
        <Button type="primary" onClick={handleCreate}>创建</Button>
        <style>
          {
            `
              .color-picker {
                z-index: 2;
                display: none;
              }
              .color-pick-container:hover .color-picker{
                display: flex
              }
            `
          }
        </style>
      </Card>
      {
        url && (
          <Card>
            <div>
              <small>点击图片下载</small>
            </div>
            <a href={url.replace("image/png", "image/octet-stream")} download={`${time}.png`}>
              <img src ={url} />
            </a>
          </Card>
        )
      }
    </div>
  )
}

export default CreateImage